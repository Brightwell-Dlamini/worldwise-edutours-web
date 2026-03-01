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
} from 'lucide-react';
import { toast } from 'sonner';

export default function LandlordDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    rented: 0,
    totalViews: 0,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

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
      setProperties(data || []);

      // Calculate stats
      const total = data?.length || 0;
      const active = data?.filter((p) => p.status === 'active').length || 0;
      const rented = data?.filter((p) => p.status === 'rented').length || 0;
      const totalViews = data?.reduce((sum, p) => sum + (p.views || 0), 0) || 0;

      setStats({
        total,
        active,
        rented,
        totalViews,
      });
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchProperties();
    }
  }, [user, fetchProperties]);

  // Helper function to get primary photo (lowest display_order)
  const getPrimaryPhoto = (photos?: Property['photos']) => {
    if (!photos || photos.length === 0) return null;
    return [...photos].sort((a, b) => a.display_order - b.display_order)[0];
  };

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
      toast.success('Property deleted successfully');
      setDeleteDialogOpen(false);
      setPropertyToDelete(null);
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    } finally {
      setDeleting(false);
    }
  }

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

      toast.success(`Property marked as ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  }

  if (isLoading || loading) {
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Landlord Dashboard</h1>
          <p className="text-gray-600">
            Manage your properties and track performance
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/landlord/add-property">
            <Plus className="mr-2 h-4 w-4" />
            Add New Property
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Properties</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Home className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Listings</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.active}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rented</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.rented}
                </p>
              </div>
              <Home className="h-8 w-8 text-blue-500 opacity-50" />
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
              <Eye className="h-8 w-8 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {properties.length === 0 ? (
            <div className="text-center py-12">
              <Home className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No properties yet</h3>
              <p className="text-gray-500 mb-4">
                Start by adding your first property listing. It will be live
                immediately!
              </p>
              <Button asChild>
                <Link href="/dashboard/landlord/add-property">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Property
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Listed</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => {
                  const primaryPhoto = getPrimaryPhoto(property.photos);

                  return (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden relative shrink-0">
                            {primaryPhoto ? (
                              <Image
                                src={primaryPhoto.photo_url}
                                alt={property.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Home className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/dashboard/landlord/properties/${property.id}`}
                              className="font-medium hover:text-primary hover:underline truncate block"
                            >
                              {property.title}
                            </Link>
                            <div className="text-sm text-gray-500 truncate">
                              {property.location_suburb},{' '}
                              {property.location_city}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>E{property.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            property.status === 'active' ? 'default' : 'outline'
                          }
                          className={
                            property.status === 'active' ? 'bg-green-600' : ''
                          }
                        >
                          {property.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{property.views || 0}</TableCell>
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

                            {/* View on site - public view */}
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/properties/${property.id}`}
                                target="_blank"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View on Site
                              </Link>
                            </DropdownMenuItem>

                            {/* Manage property */}
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/landlord/properties/${property.id}`}
                              >
                                <Home className="mr-2 h-4 w-4" />
                                Manage Property
                              </Link>
                            </DropdownMenuItem>

                            {/* Edit property */}
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/landlord/edit-property/${property.id}`}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Details
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {/* Status change options */}
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

                            {/* Delete property */}
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
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this property? This action cannot
              be undone.
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
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
