'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Bell, Settings, MapPin, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Define types for the data
interface Property {
  id: string;
  title: string;
  price: number;
  location_city: string;
  location_suburb: string;
  bedrooms: number;
  bathrooms: number;
  status: string;
}

interface SavedProperty {
  id: string;
  property_id: string;
  properties: Property;
}

interface SearchAlert {
  id: string;
  criteria: {
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
  };
  is_active: boolean;
  created_at: string;
}

// Type for the Supabase response
interface SupabaseSavedPropertyResponse {
  id: string;
  property_id: string;
  properties: Property[];
}

export default function RenterDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [searchAlerts, setSearchAlerts] = useState<SearchAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  const fetchSavedProperties = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('saved_properties')
        .select(
          `
          id,
          property_id,
          properties (
            id,
            title,
            price,
            location_city,
            location_suburb,
            bedrooms,
            bathrooms,
            status
          )
        `,
        )
        .eq('renter_id', user.id);

      if (error) throw error;

      // Transform the data to match the SavedProperty type
      const transformedData: SavedProperty[] = (
        data as unknown as SupabaseSavedPropertyResponse[]
      ).map((item) => ({
        id: item.id,
        property_id: item.property_id,
        properties: Array.isArray(item.properties)
          ? item.properties[0]
          : item.properties,
      }));

      setSavedProperties(transformedData || []);
    } catch (error) {
      console.error('Error fetching saved properties:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchSearchAlerts = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('search_alerts')
        .select('*')
        .eq('renter_id', user.id);

      if (error) throw error;
      setSearchAlerts(data || []);
    } catch (error) {
      console.error('Error fetching search alerts:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      Promise.all([fetchSavedProperties(), fetchSearchAlerts()]);
    }
  }, [user, fetchSavedProperties, fetchSearchAlerts]);

  async function removeSavedProperty(id: string) {
    try {
      const { error } = await supabase
        .from('saved_properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSavedProperties(savedProperties.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error removing saved property:', error);
    }
  }

  async function toggleAlert(alertId: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('search_alerts')
        .update({ is_active: !currentStatus })
        .eq('id', alertId);

      if (error) throw error;
      setSearchAlerts(
        searchAlerts.map((alert) =>
          alert.id === alertId
            ? { ...alert, is_active: !currentStatus }
            : alert,
        ),
      );
    } catch (error) {
      console.error('Error toggling alert:', error);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Renter Dashboard</h1>
        <p className="text-gray-600">
          Manage your saved properties and search alerts
        </p>
      </div>

      <Tabs defaultValue="saved" className="space-y-6">
        <TabsList>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Saved Properties
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Search Alerts
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Profile Settings
          </TabsTrigger>
        </TabsList>

        {/* Saved Properties Tab */}
        <TabsContent value="saved">
          {savedProperties.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No saved properties yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Start saving properties you&apos;re interested in to compare
                  them later.
                </p>
                <Button asChild>
                  <Link href="/search">Browse Properties</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {savedProperties.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">
                          <Link
                            href={`/properties/${item.properties.id}`}
                            className="hover:text-primary"
                          >
                            {item.properties.title}
                          </Link>
                        </h3>
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {item.properties.location_suburb},{' '}
                          {item.properties.location_city}
                        </div>
                      </div>
                      <Badge
                        variant={
                          item.properties.status === 'active'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {item.properties.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <span className="text-xl font-bold text-primary">
                          E{item.properties.price}/month
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          {item.properties.bedrooms} bed •{' '}
                          {item.properties.bathrooms} bath
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/properties/${item.properties.id}`}>
                            View
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSavedProperty(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Search Alerts Tab */}
        <TabsContent value="alerts">
          {searchAlerts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No search alerts</h3>
                <p className="text-gray-500 mb-4">
                  Create alerts to get notified when new properties match your
                  criteria.
                </p>
                <Button asChild>
                  <Link href="/search">Create Alert</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {searchAlerts.map((alert) => (
                <Card key={alert.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">
                        {alert.criteria.city || 'Any City'} •
                        {alert.criteria.minPrice && alert.criteria.maxPrice
                          ? ` E${alert.criteria.minPrice} - E${alert.criteria.maxPrice}`
                          : ' Any Price'}
                        {alert.criteria.bedrooms &&
                          ` • ${alert.criteria.bedrooms}+ beds`}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Created:{' '}
                        {new Date(alert.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant={alert.is_active ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleAlert(alert.id, alert.is_active)}
                      >
                        {alert.is_active ? 'Active' : 'Paused'}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Profile Settings Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your account information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Account Type</label>
                <p className="text-gray-600 capitalize">Renter</p>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
