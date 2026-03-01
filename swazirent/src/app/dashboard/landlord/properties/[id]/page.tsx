// src/app/dashboard/landlord/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Home,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
  Loader2,
  TrendingUp,
  Users,
  MessageSquare,
  Calendar,
  DollarSign,
  AlertCircle,
  BarChart3,
  Clock,
  Building2,
  FileText,
  Star,
  Mail,
  Phone,
  MapPin,
  Settings,
  HelpCircle,
} from 'lucide-react';

// Define types for Supabase responses
// interface ProfileResponse {
//   is_verified?: 'pending' | 'verified' | 'rejected';
// }

interface PropertyPhotoResponse {
  id: string;
  property_id: string;
  photo_url: string;
  caption?: string;
  display_order: number;
  created_at: string;
}

interface PropertyResponse extends Omit<Property, 'photos'> {
  photos: PropertyPhotoResponse[];
}

interface InquiryResponse {
  id: string;
  property_id: string;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'replied';
  properties: {
    title: string;
  } | null;
  profiles: {
    full_name: string;
    email: string;
    phone: string;
  } | null;
}

interface DashboardStats {
  totalProperties: number;
  activeListings: number;
  pendingApproval: number;
  rentedProperties: number;
  totalViews: number;
  totalInquiries: number;
  averageRating: number;
  monthlyRevenue: number;
}

interface Inquiry {
  id: string;
  property_id: string;
  property_title: string;
  renter_name: string;
  renter_email: string;
  renter_phone: string;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'replied';
}

type PeriodType = 'week' | 'month' | 'year';

export default function LandlordDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    activeListings: 0,
    pendingApproval: 0,
    rentedProperties: 0,
    totalViews: 0,
    totalInquiries: 0,
    averageRating: 0,
    monthlyRevenue: 0,
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('month');
  const [verificationStatus, setVerificationStatus] = useState<
    'pending' | 'verified' | 'rejected' | null
  >(null);
  const [verificationLoading, setVerificationLoading] = useState(true);

  // Check authentication and load data
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  // Fetch landlord verification status
  // Replace the fetchVerificationStatus function with this:

  const fetchVerificationStatus = useCallback(async () => {
    if (!user) {
      setVerificationLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_verified')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        // If there's an error, assume verified to allow access
        setVerificationStatus('verified');
      } else if (data) {
        // Convert boolean is_verified to string status
        // You can decide what 'pending' means - for now, let's assume:
        // - If is_verified is true -> 'verified'
        // - If is_verified is false -> 'pending' (or you could default to 'verified' to allow access)
        setVerificationStatus(data.is_verified ? 'verified' : 'pending');
      } else {
        // No profile found - create one?
        console.log('No profile found for user');
        setVerificationStatus('pending');
      }
    } catch (error) {
      console.error('Error fetching verification status:', error);
      setVerificationStatus('verified');
    } finally {
      setVerificationLoading(false);
    }
  }, [user]);

  // Fetch properties
  const fetchProperties = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('properties')
        .select(
          `
          *,
          photos:property_photos (
            id,
            property_id,
            photo_url,
            caption,
            display_order,
            created_at
          )
        `,
        )
        .eq('landlord_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const propertiesData = data as unknown as PropertyResponse[];

      // Transform the data to match the Property type
      const transformedProperties: Property[] = propertiesData.map((prop) => ({
        ...prop,
        photos: prop.photos || [],
      }));

      setProperties(transformedProperties);

      // Calculate property stats
      const total = transformedProperties.length;
      const active = transformedProperties.filter(
        (p) => p.status === 'active',
      ).length;
      const pending = transformedProperties.filter(
        (p) => p.status === 'pending',
      ).length;
      const rented = transformedProperties.filter(
        (p) => p.status === 'rented',
      ).length;
      const totalViews = transformedProperties.reduce(
        (sum, p) => sum + (p.views || 0),
        0,
      );

      // Calculate monthly revenue (from rented properties)
      const monthlyRevenue = transformedProperties
        .filter((p) => p.status === 'rented')
        .reduce((sum, p) => sum + (p.price || 0), 0);

      setStats((prev) => ({
        ...prev,
        totalProperties: total,
        activeListings: active,
        pendingApproval: pending,
        rentedProperties: rented,
        totalViews,
        monthlyRevenue,
      }));
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to load properties');
    }
  }, [user]);

  // Fetch inquiries
  const fetchInquiries = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('property_inquiries')
        .select(
          `
          id,
          property_id,
          message,
          created_at,
          status,
          properties:property_id (
            title
          ),
          profiles:renter_id (
            full_name,
            email,
            phone
          )
        `,
        )
        .eq('landlord_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        // If table doesn't exist, just set empty array
        if (error.code === '42P01') {
          // Relation does not exist
          setInquiries([]);
          return;
        }
        throw error;
      }

      const inquiryData = data as unknown as InquiryResponse[];

      const formattedInquiries: Inquiry[] = inquiryData.map((item) => ({
        id: item.id,
        property_id: item.property_id,
        property_title: item.properties?.title || 'Unknown Property',
        renter_name: item.profiles?.full_name || 'Unknown',
        renter_email: item.profiles?.email || '',
        renter_phone: item.profiles?.phone || '',
        message: item.message,
        created_at: item.created_at,
        status: item.status || 'new',
      }));

      setInquiries(formattedInquiries);
      setStats((prev) => ({
        ...prev,
        totalInquiries: formattedInquiries.length,
      }));
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      // Don't show error to user for inquiries
      setInquiries([]);
    }
  }, [user]);

  // Load all data
  useEffect(() => {
    if (user) {
      Promise.all([
        fetchVerificationStatus(),
        fetchProperties(),
        fetchInquiries(),
      ]).finally(() => setLoading(false));
    }
  }, [user, fetchVerificationStatus, fetchProperties, fetchInquiries]);

  // Handle property deletion
  async function handleDeleteProperty() {
    if (!propertyToDelete) return;

    setDeleting(true);
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyToDelete);

      if (error) throw error;

      setProperties(properties.filter((p) => p.id !== propertyToDelete));
      setDeleteDialogOpen(false);
      setPropertyToDelete(null);
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Failed to delete property');
    } finally {
      setDeleting(false);
    }
  }

  // Handle property status change
  async function handleStatusChange(
    propertyId: string,
    newStatus: 'active' | 'rented',
  ) {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status: newStatus })
        .eq('id', propertyId);

      if (error) throw error;

      setProperties(
        properties.map((p) =>
          p.id === propertyId ? { ...p, status: newStatus } : p,
        ),
      );
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update property status');
    }
  }

  // Handle marking inquiry as read
  async function markInquiryAsRead(inquiryId: string) {
    try {
      const { error } = await supabase
        .from('property_inquiries')
        .update({ status: 'read' })
        .eq('id', inquiryId);

      if (error) {
        // If table doesn't exist, just update local state
        if (error.code === '42P01') {
          setInquiries(
            inquiries.map((i) =>
              i.id === inquiryId ? { ...i, status: 'read' } : i,
            ),
          );
        }
        return;
      }

      setInquiries(
        inquiries.map((i) =>
          i.id === inquiryId ? { ...i, status: 'read' } : i,
        ),
      );
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  }

  // Handle period change with proper typing
  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value as PeriodType);
  };

  if (authLoading || loading || verificationLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-100">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // Show verification warning if not verified (only if status is explicitly pending or rejected)
  if (verificationStatus === 'pending' || verificationStatus === 'rejected') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              {verificationStatus === 'pending' ? (
                <>
                  <div className="bg-yellow-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    Verification Pending
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your account is awaiting verification. While you wait, you
                    can browse the platform and prepare your listings.
                    You&apos;ll be able to post properties once verified.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
                    <h3 className="font-semibold mb-2">Next Steps:</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Email confirmed ✓</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Loader2 className="h-4 w-4 text-yellow-500 animate-spin mt-0.5 shrink-0" />
                        <span>
                          Identity verification in progress (usually takes 24-48
                          hours)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                        <span>
                          You&apos;ll be notified via email once verified
                        </span>
                      </li>
                    </ul>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/">Browse Properties</Link>
                  </Button>
                </>
              ) : (
                <>
                  <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    Verification Failed
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We couldn&apos;t verify your account. Please contact support
                    or try again with valid documents.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline">Contact Support</Button>
                    <Button>Try Again</Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Header with Welcome and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back,{' '}
            {user?.user_metadata?.full_name?.split(' ')[0] || 'Landlord'}!
          </h1>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your properties
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/landlord/analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/landlord/add-property">
              <Plus className="mr-2 h-4 w-4" />
              Add New Property
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Properties</p>
                <p className="text-2xl font-bold">{stats.totalProperties}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex gap-3 text-sm">
              <span className="text-green-600">
                {stats.activeListings} active
              </span>
              <span className="text-yellow-600">
                {stats.pendingApproval} pending
              </span>
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
              <div className="bg-blue-100 p-3 rounded-full">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">Across all properties</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Inquiries</p>
                <p className="text-2xl font-bold">{stats.totalInquiries}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              {inquiries.filter((i) => i.status === 'new').length} unread
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Est. Monthly Revenue</p>
                <p className="text-2xl font-bold">
                  E{stats.monthlyRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              From {stats.rentedProperties} rented properties
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="properties" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="inquiries">
            Inquiries
            {inquiries.filter((i) => i.status === 'new').length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {inquiries.filter((i) => i.status === 'new').length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Properties Tab */}
        <TabsContent value="properties">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Properties</CardTitle>
              <div className="flex gap-2">
                <select
                  className="text-sm border rounded-md px-2 py-1"
                  value={selectedPeriod}
                  onChange={handlePeriodChange}
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              {properties.length === 0 ? (
                <div className="text-center py-12">
                  <Home className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No properties yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start earning by listing your first property today.
                  </p>
                  <Button asChild size="lg">
                    <Link href="/dashboard/landlord/add-property">
                      <Plus className="mr-2 h-5 w-5" />
                      List Your First Property
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Inquiries</TableHead>
                        <TableHead>Listed</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {properties.map((property) => (
                        <TableRow key={property.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
                                {property.photos &&
                                property.photos.length > 0 ? (
                                  <Image
                                    src={property.photos[0].photo_url}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Home className="w-5 h-5 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="font-medium line-clamp-1">
                                  {property.title}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {property.location_suburb},{' '}
                                  {property.location_city}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">
                            E{property.price.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                property.status === 'active'
                                  ? 'default'
                                  : property.status === 'pending'
                                    ? 'secondary'
                                    : property.status === 'rented'
                                      ? 'outline'
                                      : 'destructive'
                              }
                            >
                              {property.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{property.views || 0}</TableCell>
                          <TableCell>
                            {
                              inquiries.filter(
                                (i) => i.property_id === property.id,
                              ).length
                            }
                          </TableCell>
                          <TableCell>
                            {new Date(property.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/properties/${property.id}`}
                                    target="_blank"
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Listing
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/landlord/edit-property/${property.id}`}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/landlord/inquiries?property=${property.id}`}
                                  >
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    View Inquiries
                                  </Link>
                                </DropdownMenuItem>
                                {property.status === 'active' && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(property.id, 'rented')
                                    }
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                    Mark as Rented
                                  </DropdownMenuItem>
                                )}
                                {property.status === 'rented' && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(property.id, 'active')
                                    }
                                  >
                                    <XCircle className="mr-2 h-4 w-4 text-yellow-600" />
                                    Mark as Available
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => {
                                    setPropertyToDelete(property.id);
                                    setDeleteDialogOpen(true);
                                  }}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inquiries Tab */}
        <TabsContent value="inquiries">
          <Card>
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              {inquiries.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No inquiries yet
                  </h3>
                  <p className="text-gray-500">
                    When potential tenants contact you about your properties,
                    they&apos;ll appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inquiry) => (
                    <Card
                      key={inquiry.id}
                      className={`hover:shadow-md transition-shadow cursor-pointer ${
                        inquiry.status === 'new'
                          ? 'border-primary/50 bg-primary/5'
                          : ''
                      }`}
                      onClick={() => markInquiryAsRead(inquiry.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">
                                {inquiry.property_title}
                              </h3>
                              {inquiry.status === 'new' && (
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  New
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-3">
                              {inquiry.message}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <span className="flex items-center gap-1 text-gray-500">
                                <Users className="h-4 w-4" />
                                {inquiry.renter_name}
                              </span>
                              <span className="flex items-center gap-1 text-gray-500">
                                <Mail className="h-4 w-4" />
                                {inquiry.renter_email}
                              </span>
                              {inquiry.renter_phone && (
                                <span className="flex items-center gap-1 text-gray-500">
                                  <Phone className="h-4 w-4" />
                                  {inquiry.renter_phone}
                                </span>
                              )}
                              <span className="flex items-center gap-1 text-gray-500">
                                <Calendar className="h-4 w-4" />
                                {new Date(
                                  inquiry.created_at,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Mail className="h-4 w-4 mr-1" />
                              Reply
                            </Button>
                            <Button size="sm" variant="ghost">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Performance Chart Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      View to Inquiry Rate
                    </p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">
                        {stats.totalViews > 0
                          ? (
                              (stats.totalInquiries / stats.totalViews) *
                              100
                            ).toFixed(1)
                          : 0}
                        %
                      </span>
                      <span className="text-sm text-gray-500 mb-1">
                        ({stats.totalInquiries} inquiries from{' '}
                        {stats.totalViews} views)
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Occupancy Rate</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">
                        {stats.totalProperties > 0
                          ? (
                              (stats.rentedProperties / stats.totalProperties) *
                              100
                            ).toFixed(1)
                          : 0}
                        %
                      </span>
                      <span className="text-sm text-gray-500 mb-1">
                        ({stats.rentedProperties} of {stats.totalProperties}{' '}
                        properties)
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/landlord/analytics">
                        View Detailed Analytics
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-20 flex-col" asChild>
                    <Link href="/dashboard/landlord/add-property">
                      <Plus className="h-5 w-5 mb-1" />
                      <span>Add Property</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" asChild>
                    <Link href="/dashboard/landlord/analytics">
                      <BarChart3 className="h-5 w-5 mb-1" />
                      <span>Analytics</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" asChild>
                    <Link href="/profile">
                      <Settings className="h-5 w-5 mb-1" />
                      <span>Settings</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" asChild>
                    <Link href="/help">
                      <HelpCircle className="h-5 w-5 mb-1" />
                      <span>Help</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Tips to Maximize Your Listings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">High-Quality Photos</h4>
                    <p className="text-sm text-gray-600">
                      Properties with professional photos get 3x more views. Add
                      at least 5 clear photos.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Detailed Descriptions</h4>
                    <p className="text-sm text-gray-600">
                      Highlight unique features, nearby amenities, and move-in
                      dates to attract more tenants.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Quick Responses</h4>
                    <p className="text-sm text-gray-600">
                      Respond to inquiries within 24 hours to increase your
                      chances of renting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this property? This action cannot
              be undone. All photos and associated data will be permanently
              removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProperty}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Property'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
