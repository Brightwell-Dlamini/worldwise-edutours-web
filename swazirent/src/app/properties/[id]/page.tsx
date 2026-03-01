'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MapPin,
  Home,
  Bed,
  Bath,
  Square,
  Calendar,
  Phone,
  Mail,
  Share2,
  Heart,
  CheckCircle,
  MessageCircle,
  Navigation,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Wifi,
  Droplets,
  Zap,
  Car,
  Shield,
} from 'lucide-react';

// Import types and mock data
import { Property, SimilarProperty, NearbyPlace } from './types';
import { mockProperties } from './mockData';

export default function PublicPropertyPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the property based on the ID from the URL
        const propertyData = mockProperties[params.id as string];

        if (propertyData) {
          setProperty(propertyData);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        setError('Failed to load property details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const handleContact = (method: 'phone' | 'whatsapp' | 'email') => {
    if (!property) return;

    if (method === 'phone') {
      window.location.href = `tel:${property.landlord.phone}`;
    } else if (method === 'whatsapp') {
      const message = encodeURIComponent(
        `Hello, I'm interested in your property: ${property.title} (E${property.price}/month)`,
      );
      window.open(
        `https://wa.me/${property.landlord.phone.replace(/\D/g, '')}?text=${message}`,
        '_blank',
      );
    } else if (method === 'email') {
      const subject = encodeURIComponent(`Inquiry about ${property.title}`);
      const body = encodeURIComponent(
        `Hello,\n\nI'm interested in your property at ${property.location.suburb}, ${property.location.city}.\n\nCould you provide more information?\n\nThank you.`,
      );
      window.location.href = `mailto:${property.landlord.email}?subject=${subject}&body=${body}`;
    }
  };

  const handleShare = async () => {
    if (!property) return;

    const url = window.location.href;
    const title = property.title;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this property in ${property.location.city}`,
          url: url,
        });
      } catch {
        setError('Share failed');
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In production: save to user's saved properties in database
  };

  const handleReport = () => {
    // In production: open report dialog
    router.push(`/report-property/${params.id}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Property Not Found</h2>
            <p className="text-gray-600 mb-6">
              {error ||
                "The property you're looking for doesn't exist or has been removed."}
            </p>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Back Navigation - Sticky */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Link>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSave}>
                <Heart
                  className={`h-4 w-4 mr-2 ${isSaved ? 'fill-red-500 text-red-500' : ''}`}
                />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                {/* Main Image */}
                <div className="relative h-100 md:h-125 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={property.photos[selectedImage]}
                    alt={property.title}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.isVerified && (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {property.status === 'available' && (
                      <Badge variant="default">Available Now</Badge>
                    )}
                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImage + 1} / {property.photos.length}
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {property.photos.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {property.photos.map((photo: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? 'border-primary scale-105'
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={photo}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Property Details Card */}
            <Card>
              <CardContent className="p-6">
                {/* Title and Price */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-5 w-5 mr-1 shrink-0" />
                      <span>
                        {property.location.suburb}, {property.location.city}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      E{property.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">per month</div>
                  </div>
                </div>

                {/* Key Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Bed className="h-6 w-6 mx-auto mb-1 text-primary" />
                    <div className="font-semibold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-500">Bedrooms</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Bath className="h-6 w-6 mx-auto mb-1 text-primary" />
                    <div className="font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-500">Bathrooms</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Square className="h-6 w-6 mx-auto mb-1 text-primary" />
                    <div className="font-semibold">{property.size}m²</div>
                    <div className="text-sm text-gray-500">Floor Area</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto mb-1 text-primary" />
                    <div className="font-semibold">{property.yearBuilt}</div>
                    <div className="text-sm text-gray-500">Year Built</div>
                  </div>
                </div>

                {/* Tabs for Detailed Info */}
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="w-full grid grid-cols-3 mb-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="nearby">Nearby</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {property.description}
                    </p>
                  </TabsContent>

                  <TabsContent value="features">
                    <div className="grid grid-cols-2 gap-3">
                      {property.features.map(
                        (feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ),
                      )}
                    </div>

                    {/* Amenities */}
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="font-semibold mb-3">Amenities</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(property.amenities).map(
                          ([key, value]) => (
                            <div key={key} className="flex items-center gap-2">
                              {key === 'water' && (
                                <Droplets className="h-4 w-4 text-blue-500" />
                              )}
                              {key === 'electricity' && (
                                <Zap className="h-4 w-4 text-yellow-500" />
                              )}
                              {key === 'wifi' && (
                                <Wifi className="h-4 w-4 text-purple-500" />
                              )}
                              {key === 'parking' && (
                                <Car className="h-4 w-4 text-gray-500" />
                              )}
                              {key === 'security' && (
                                <Shield className="h-4 w-4 text-green-500" />
                              )}
                              <span className="capitalize text-gray-700">
                                {key}:{' '}
                                <span className="text-gray-500">
                                  {String(value)}
                                </span>
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="nearby">
                    <div className="space-y-3">
                      {property.nearby.map(
                        (place: NearbyPlace, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{place.icon}</span>
                              <div>
                                <div className="font-medium">{place.name}</div>
                                <div className="text-sm text-gray-500">
                                  {place.type}
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline">{place.distance}</Badge>
                          </div>
                        ),
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Map Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Placeholder for Google Maps - Replace with actual map */}
                  <div className="text-center">
                    <Navigation className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500 mb-2">
                      {property.location.address}
                    </p>
                    <p className="text-gray-500">
                      {property.location.suburb}, {property.location.city}
                    </p>
                    <Button
                      variant="link"
                      className="mt-2"
                      onClick={() => {
                        const query = encodeURIComponent(
                          `${property.location.address} ${property.location.suburb} ${property.location.city}`,
                        );
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${query}`,
                          '_blank',
                        );
                      }}
                    >
                      View on Google Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Contact Card */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Contact Landlord
                  </h2>

                  {/* Landlord Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                      <Home className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">
                        {property.landlord.name}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        {property.landlord.isVerified && (
                          <>
                            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                            <span>Verified Landlord</span>
                          </>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {property.landlord.properties} properties
                      </div>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <Button
                      className="w-full h-12 text-base bg-green-600 hover:bg-green-700"
                      onClick={() => handleContact('whatsapp')}
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full h-12 text-base"
                      onClick={() => handleContact('phone')}
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Call {property.landlord.phone}
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full h-12 text-base"
                      onClick={() => handleContact('email')}
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Send Email
                    </Button>
                  </div>

                  {/* Response Time */}
                  <div className="mt-4 text-sm text-gray-500 text-center">
                    {property.landlord.responseTime}
                  </div>
                </CardContent>
              </Card>

              {/* Property Stats Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Listing Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Property ID:</span>
                      <span className="font-mono">
                        SWZ{property.id.padStart(4, '0')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Views:</span>
                      <span>{property.views} this week</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Listed:</span>
                      <span>2 weeks ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last updated:</span>
                      <span>3 days ago</span>
                    </div>
                  </div>

                  <div className="border-t my-4"></div>

                  {/* Safety Notice */}
                  <div className="bg-yellow-50 p-3 rounded-lg text-sm">
                    <p className="text-yellow-800 font-medium mb-1">
                      Safety Tips
                    </p>
                    <p className="text-yellow-600 text-xs">
                      • View property in person before paying • Never send money
                      via mobile transfer • Report suspicious listings
                    </p>
                    <Button
                      variant="link"
                      className="text-xs p-0 h-auto mt-2"
                      onClick={handleReport}
                    >
                      Report this listing
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Properties */}
              {property.similarProperties &&
                property.similarProperties.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3">Similar Properties</h3>
                      <div className="space-y-3">
                        {property.similarProperties.map(
                          (similar: SimilarProperty) => (
                            <Link
                              key={similar.id}
                              href={`/properties/${similar.id}`}
                              className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden relative shrink-0">
                                <Image
                                  src={similar.image}
                                  alt={similar.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">
                                  {similar.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {similar.location}
                                </div>
                                <div className="text-sm font-semibold text-primary mt-1">
                                  E{similar.price}/mo
                                </div>
                              </div>
                            </Link>
                          ),
                        )}
                      </div>
                      <Button variant="link" className="w-full mt-2" asChild>
                        <Link href="/search">
                          View more similar properties →
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
