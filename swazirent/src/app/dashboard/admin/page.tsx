'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Home,
  Users,
  Flag,
  CheckCircle,
  XCircle,
  Loader2,
  Eye,
  AlertTriangle,
  Ban,
  UserCheck,
  UserX,
} from 'lucide-react';

// Define constants
const CITIES = [
  'Manzini',
  'Mbabane',
  'Matsapha',
  'Nhlangano',
  'Siteki',
  'Big Bend',
];

const AMENITIES = [
  'Parking',
  'Backup Water',
  'Security',
  'Garden',
  'Furnished',
  'Built-in Wardrobes',
  'Pet Friendly',
  'Electric Fence',
  '24hr Security',
  'Swimming Pool',
  'Staff Quarters',
  'Solar Power',
];

interface DashboardStats {
  totalUsers: number;
  totalLandlords: number;
  totalRenters: number;
  totalListings: number;
  activeListings: number;
  pendingListings: number;
  reportedListings: number;
  totalViews: number;
}

interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  user_type: 'renter' | 'landlord' | 'admin';
  is_verified: boolean;
  created_at: string;
}

interface Listing {
  id: string;
  title: string;
  landlord_id: string;
  landlord: {
    full_name: string;
    email: string;
  } | null;
  price: number;
  location_city: string;
  status: string;
  is_featured: boolean;
  created_at: string;
  views: number;
}

interface Report {
  id: string;
  property_id: string;
  reporter_id: string;
  reason: string;
  description: string;
  status: string;
  created_at: string;
  property: {
    title: string;
    landlord: {
      full_name: string;
    } | null;
  } | null;
  reporter: {
    email: string;
  } | null;
}

export default function AdminDashboard() {
  const { user, userType, isLoading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalLandlords: 0,
    totalRenters: 0,
    totalListings: 0,
    activeListings: 0,
    pendingListings: 0,
    reportedListings: 0,
    totalViews: 0,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    'verify' | 'reject' | 'suspend' | null
  >(null);
  const [processing, setProcessing] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchStats(),
        fetchUsers(),
        fetchListings(),
        fetchReports(),
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!user || userType !== 'admin') {
        router.push('/');
      } else {
        fetchDashboardData();
      }
    }
  }, [user, userType, isLoading, router, fetchDashboardData]);

  async function fetchStats() {
    // Get user counts
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    const { count: totalLandlords } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('user_type', 'landlord');

    const { count: totalRenters } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('user_type', 'renter');

    // Get listing counts
    const { count: totalListings } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true });

    const { count: activeListings } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    const { count: pendingListings } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: reportedListings } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'reported');

    // Get total views
    const { data: viewsData } = await supabase
      .from('properties')
      .select('views');

    const totalViews =
      viewsData?.reduce((sum, item) => sum + (item.views || 0), 0) || 0;

    setStats({
      totalUsers: totalUsers || 0,
      totalLandlords: totalLandlords || 0,
      totalRenters: totalRenters || 0,
      totalListings: totalListings || 0,
      activeListings: activeListings || 0,
      pendingListings: pendingListings || 0,
      reportedListings: reportedListings || 0,
      totalViews,
    });
  }

  async function fetchUsers() {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    setUsers(data || []);
  }

  async function fetchListings() {
    const { data } = await supabase
      .from('properties')
      .select(
        `
        *,
        landlord:profiles!properties_landlord_id_fkey (
          full_name,
          email
        )
      `,
      )
      .order('created_at', { ascending: false })
      .limit(50);

    setListings(data || []);
  }

  async function fetchReports() {
    const { data } = await supabase
      .from('property_reports')
      .select(
        `
        *,
        property:properties (
          title,
          landlord:profiles!properties_landlord_id_fkey (
            full_name
          )
        ),
        reporter:profiles!property_reports_reporter_id_fkey (
          email
        )
      `,
      )
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    setReports(data || []);
  }

  async function handleVerifyListing(listingId: string) {
    setProcessing(true);
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status: 'active' })
        .eq('id', listingId);

      if (error) throw error;

      const listing = listings.find((l) => l.id === listingId);
      if (listing?.landlord?.email) {
        // Send notification to landlord (we'll implement this later)
        await sendEmailNotification({
          to: listing.landlord.email,
          subject: 'Your listing has been approved',
          message:
            'Your property listing has been approved and is now live on SwaziRent.',
        });
      }

      setListings(
        listings.map((l) =>
          l.id === listingId ? { ...l, status: 'active' } : l,
        ),
      );
      setDialogOpen(false);
    } catch (error) {
      console.error('Error verifying listing:', error);
    } finally {
      setProcessing(false);
    }
  }

  async function handleRejectListing(listingId: string) {
    setProcessing(true);
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status: 'rejected' })
        .eq('id', listingId);

      if (error) throw error;

      const listing = listings.find((l) => l.id === listingId);
      if (listing?.landlord?.email) {
        // Send rejection reason to landlord
        await sendEmailNotification({
          to: listing.landlord.email,
          subject: 'Your listing needs attention',
          message: `Your property listing was not approved. Reason: ${rejectionReason}`,
        });
      }

      setListings(listings.filter((l) => l.id !== listingId));
      setDialogOpen(false);
      setRejectionReason('');
    } catch (error) {
      console.error('Error rejecting listing:', error);
    } finally {
      setProcessing(false);
    }
  }

  async function handleToggleUserVerification(
    userId: string,
    currentStatus: boolean,
  ) {
    setProcessing(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_verified: !currentStatus })
        .eq('id', userId);

      if (error) throw error;

      setUsers(
        users.map((u) =>
          u.id === userId ? { ...u, is_verified: !currentStatus } : u,
        ),
      );
    } catch (error) {
      console.error('Error toggling user verification:', error);
    } finally {
      setProcessing(false);
    }
  }

  async function handleResolveReport(reportId: string) {
    setProcessing(true);
    try {
      const { error } = await supabase
        .from('property_reports')
        .update({ status: 'resolved' })
        .eq('id', reportId);

      if (error) throw error;

      setReports(reports.filter((r) => r.id !== reportId));
    } catch (error) {
      console.error('Error resolving report:', error);
    } finally {
      setProcessing(false);
    }
  }

  async function handleFeatureListing(
    listingId: string,
    currentStatus: boolean,
  ) {
    setProcessing(true);
    try {
      const { error } = await supabase
        .from('properties')
        .update({ is_featured: !currentStatus })
        .eq('id', listingId);

      if (error) throw error;

      setListings(
        listings.map((l) =>
          l.id === listingId ? { ...l, is_featured: !currentStatus } : l,
        ),
      );
    } catch (error) {
      console.error('Error toggling featured status:', error);
    } finally {
      setProcessing(false);
    }
  }

  // Placeholder for email notifications
  async function sendEmailNotification({
    to,
    subject,
    message,
  }: {
    to: string;
    subject: string;
    message: string;
  }) {
    // We'll implement this with a proper email service later
    console.log('Sending email to:', to, subject, message);
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-100">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage users, listings, and platform settings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-primary opacity-50" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {stats.totalLandlords} landlords • {stats.totalRenters} renters
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Listings</p>
                <p className="text-2xl font-bold">{stats.totalListings}</p>
              </div>
              <Home className="h-8 w-8 text-primary opacity-50" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {stats.activeListings} active • {stats.pendingListings} pending
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Reported Listings</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.reportedListings}
                </p>
              </div>
              <Flag className="h-8 w-8 text-red-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-2xl font-bold">{stats.totalViews}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="listings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Listings Tab */}
        <TabsContent value="listings">
          <Card>
            <CardHeader>
              <CardTitle>Manage Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Landlord</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Listed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{listing.title}</div>
                          <div className="text-sm text-gray-500">
                            {listing.location_city}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {listing.landlord?.full_name || 'N/A'}
                      </TableCell>
                      <TableCell>E{listing.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            listing.status === 'active'
                              ? 'default'
                              : listing.status === 'pending'
                                ? 'secondary'
                                : listing.status === 'reported'
                                  ? 'destructive'
                                  : 'outline'
                          }
                        >
                          {listing.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {listing.is_featured ? (
                          <Badge variant="default" className="bg-yellow-500">
                            Featured
                          </Badge>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleFeatureListing(
                                listing.id,
                                listing.is_featured,
                              )
                            }
                            disabled={processing}
                          >
                            Mark Featured
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>{listing.views}</TableCell>
                      <TableCell>
                        {new Date(listing.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {listing.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => {
                                  setSelectedListing(listing);
                                  setDialogType('verify');
                                  setDialogOpen(true);
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  setSelectedListing(listing);
                                  setDialogType('reject');
                                  setDialogOpen(true);
                                }}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              window.open(`/properties/${listing.id}`, '_blank')
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Manage Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {user.full_name?.substring(0, 2).toUpperCase() ||
                                'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.full_name}</div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.phone}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">
                        {user.user_type}
                      </TableCell>
                      <TableCell>
                        {user.is_verified ? (
                          <Badge variant="default" className="bg-green-500">
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="outline">Unverified</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {user.user_type === 'landlord' && (
                            <Button
                              size="sm"
                              variant={user.is_verified ? 'outline' : 'default'}
                              onClick={() =>
                                handleToggleUserVerification(
                                  user.id,
                                  user.is_verified,
                                )
                              }
                              disabled={processing}
                            >
                              {user.is_verified ? (
                                <>
                                  <UserX className="h-4 w-4 mr-1" />
                                  Unverify
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-4 w-4 mr-1" />
                                  Verify
                                </>
                              )}
                            </Button>
                          )}
                          <Button size="sm" variant="destructive">
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reported Listings</CardTitle>
            </CardHeader>
            <CardContent>
              {reports.length === 0 ? (
                <div className="text-center py-8">
                  <Flag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Reports</h3>
                  <p className="text-gray-500">
                    All listings are in good standing
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">
                              {report.property?.title || 'Unknown Property'}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Landlord:{' '}
                              {report.property?.landlord?.full_name || 'N/A'}
                            </p>
                          </div>
                          <Badge variant="destructive">{report.status}</Badge>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md mb-3">
                          <p className="text-sm font-medium">Report Reason:</p>
                          <p className="text-sm text-gray-700">
                            {report.reason}
                          </p>
                          {report.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {report.description}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            Reported by: {report.reporter?.email || 'Unknown'} •{' '}
                            {new Date(report.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              window.open(
                                `/properties/${report.property_id}`,
                                '_blank',
                              )
                            }
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Listing
                          </Button>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleResolveReport(report.id)}
                            disabled={processing}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              const listing = listings.find(
                                (l) => l.id === report.property_id,
                              );
                              if (listing) {
                                setSelectedListing(listing);
                                setDialogType('reject');
                                setDialogOpen(true);
                              }
                            }}
                          >
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Remove Listing
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Cities</h3>
                <div className="space-y-2">
                  {CITIES.map((city: string) => (
                    <div
                      key={city}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span>{city}</span>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="mt-4" variant="outline">
                  Add City
                </Button>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {AMENITIES.map((amenity: string) => (
                    <div
                      key={amenity}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span>{amenity}</span>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="mt-4" variant="outline">
                  Add Amenity
                </Button>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Email Templates</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="font-medium">Listing Approved</p>
                    <p className="text-sm text-gray-500">
                      Sent when a listing is verified
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="font-medium">Listing Rejected</p>
                    <p className="text-sm text-gray-500">
                      Sent when a listing is rejected
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="font-medium">Welcome Email</p>
                    <p className="text-sm text-gray-500">Sent to new users</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'verify' && 'Approve Listing'}
              {dialogType === 'reject' && 'Reject Listing'}
            </DialogTitle>
            <DialogDescription>
              {dialogType === 'verify' &&
                'This listing will be published and visible to all users.'}
              {dialogType === 'reject' &&
                'This listing will be removed. Please provide a reason.'}
            </DialogDescription>
          </DialogHeader>

          {dialogType === 'reject' && (
            <div className="py-4">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                placeholder="Explain why this listing is being rejected..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="mt-2"
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={dialogType === 'verify' ? 'default' : 'destructive'}
              onClick={() => {
                if (dialogType === 'verify' && selectedListing) {
                  handleVerifyListing(selectedListing.id);
                } else if (dialogType === 'reject' && selectedListing) {
                  handleRejectListing(selectedListing.id);
                }
              }}
              disabled={
                processing || (dialogType === 'reject' && !rejectionReason)
              }
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : dialogType === 'verify' ? (
                'Approve'
              ) : (
                'Reject'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
