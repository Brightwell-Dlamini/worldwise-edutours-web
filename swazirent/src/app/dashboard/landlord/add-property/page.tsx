// src/app/dashboard/landlord/add-property/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { PropertyType } from '@/types/property';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Upload,
  X,
  TrendingUp,
  TrendingDown,
  Minus,
  Badge,
} from 'lucide-react';
import Link from 'next/link';

const CITIES = [
  'Manzini',
  'Mbabane',
  'Matsapha',
  'Nhlangano',
  'Siteki',
  'Big Bend',
];

const PROPERTY_TYPES: PropertyType[] = [
  'house',
  'apartment',
  'townhouse',
  'backrooms',
  'other',
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

interface PriceInsight {
  average: number;
  min: number;
  max: number;
  count: number;
  suggestion: 'low' | 'good' | 'high' | null;
  message: string;
}

export default function AddPropertyPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [priceInsight, setPriceInsight] = useState<PriceInsight | null>(null);
  const [checkingPrice, setCheckingPrice] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: '',
    description: '',
    property_type: '' as PropertyType | '',
    price: '',

    // Step 2: Location
    city: '',
    suburb: '',
    address: '',

    // Step 3: Details
    bedrooms: '',
    bathrooms: '',
    is_furnished: false,
    amenities: [] as string[],
    lease_terms: '',

    // Step 4: Contact
    contact_whatsapp: user?.user_metadata?.phone || '',
    contact_phone: user?.user_metadata?.phone || '',
  });

  const totalSteps = 4;

  // Price comparison effect
  useEffect(() => {
    async function checkPrice() {
      const price = parseFloat(formData.price);
      if (
        !formData.price ||
        isNaN(price) ||
        !formData.city ||
        !formData.property_type ||
        !formData.bedrooms
      ) {
        setPriceInsight(null);
        return;
      }

      setCheckingPrice(true);
      try {
        // Get comparable properties
        const { data, error } = await supabase
          .from('properties')
          .select('price')
          .eq('location_city', formData.city)
          .eq('property_type', formData.property_type)
          .eq('bedrooms', parseInt(formData.bedrooms))
          .eq('status', 'active')
          .not('price', 'is', null);

        if (error) throw error;

        if (!data || data.length === 0) {
          setPriceInsight({
            average: 0,
            min: 0,
            max: 0,
            count: 0,
            suggestion: null,
            message: 'Not enough similar properties to compare pricing.',
          });
          return;
        }

        const prices = data.map((p) => p.price);
        const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
        const min = Math.min(...prices);
        const max = Math.max(...prices);

        // Determine if price is low, good, or high
        let suggestion: 'low' | 'good' | 'high' | null = null;
        let message = '';

        if (price < min * 0.9) {
          suggestion = 'low';
          message = `Your price is below market average (E${avg.toLocaleString()}). You might get interest quickly but could be leaving money on the table.`;
        } else if (price > max * 1.1) {
          suggestion = 'high';
          message = `Your price is above market average (E${avg.toLocaleString()}). This might take longer to rent. Consider E${min.toLocaleString()}-E${max.toLocaleString()}`;
        } else {
          suggestion = 'good';
          message = `Your price is within market range (E${min.toLocaleString()} - E${max.toLocaleString()}). Good job!`;
        }

        setPriceInsight({
          average: avg,
          min,
          max,
          count: data.length,
          suggestion,
          message,
        });
      } catch (error) {
        console.error('Error checking price:', error);
      } finally {
        setCheckingPrice(false);
      }
    }

    const timer = setTimeout(checkPrice, 800); // Debounce
    return () => clearTimeout(timer);
  }, [
    formData.price,
    formData.city,
    formData.property_type,
    formData.bedrooms,
  ]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length > 15) {
      setError('Maximum 15 photos allowed');
      return;
    }

    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      if (!isValidType || !isValidSize) {
        setError('Each photo must be an image under 5MB');
      }
      return isValidType && isValidSize;
    });

    setPhotos([...photos, ...validFiles]);

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
  };

  const applySuggestedPrice = () => {
    if (priceInsight && priceInsight.count > 0) {
      // Suggest a price in the middle of the range
      const suggestedPrice = Math.round(
        (priceInsight.min + priceInsight.max) / 2,
      );
      setFormData({ ...formData, price: suggestedPrice.toString() });
      toast.success('Suggested price applied');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Upload photos
      const photoUrls: string[] = [];

      for (const photo of photos) {
        const fileExt = photo.name.split('.').pop();
        const fileName = `${user?.id}/${Date.now()}-${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('property-photos')
          .upload(fileName, photo);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from('property-photos').getPublicUrl(fileName);

        photoUrls.push(publicUrl);
      }

      // 2. Create property - status is immediately 'active' (no admin approval)
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert([
          {
            landlord_id: user?.id,
            title: formData.title,
            description: formData.description,
            property_type: formData.property_type,
            price: parseFloat(formData.price),
            location_city: formData.city,
            location_suburb: formData.suburb,
            location_address: formData.address || null,
            bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
            bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
            is_furnished: formData.is_furnished,
            amenities: formData.amenities,
            lease_terms: formData.lease_terms || null,
            contact_whatsapp: formData.contact_whatsapp || null,
            contact_phone: formData.contact_phone,
            status: 'active', // Immediately active, no admin approval
            views: 0,
            is_featured: false,
          },
        ])
        .select()
        .single();

      if (propertyError) throw propertyError;

      // 3. Add photos to property_photos table
      if (photoUrls.length > 0 && property) {
        const photoRecords = photoUrls.map((url, index) => ({
          property_id: property.id,
          photo_url: url,
          display_order: index, // Use display_order instead of is_primary
          caption: null,
        }));

        const { error: photosError } = await supabase
          .from('property_photos')
          .insert(photoRecords);

        if (photosError) throw photosError;
      }

      toast.success('Property listed successfully!');
      router.push('/dashboard/landlord');
    } catch (error: unknown) {
      console.error('Submission error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Listing Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Spacious 2-Bedroom in Ngwane Park"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="property_type">Property Type</Label>
                <Select
                  value={formData.property_type}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      property_type: value as PropertyType,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPES.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="capitalize"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Monthly Rent (E)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="3500"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              {/* Price Insight Display */}
              {checkingPrice && (
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Loader2 className="h-3 w-3 animate-spin mr-2" />
                  Analyzing market prices...
                </div>
              )}

              {priceInsight && !checkingPrice && priceInsight.count > 0 && (
                <div
                  className={`mt-3 p-3 rounded-lg border ${
                    priceInsight.suggestion === 'good'
                      ? 'bg-green-50 border-green-200'
                      : priceInsight.suggestion === 'high'
                        ? 'bg-yellow-50 border-yellow-200'
                        : priceInsight.suggestion === 'low'
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {priceInsight.suggestion === 'good' && (
                      <Minus className="h-5 w-5 text-green-600 mt-0.5" />
                    )}
                    {priceInsight.suggestion === 'high' && (
                      <TrendingUp className="h-5 w-5 text-yellow-600 mt-0.5" />
                    )}
                    {priceInsight.suggestion === 'low' && (
                      <TrendingDown className="h-5 w-5 text-blue-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Based on {priceInsight.count} similar properties in{' '}
                        {formData.city}
                      </p>
                      <p className="text-sm mt-1">{priceInsight.message}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                        <span>
                          Range: E{priceInsight.min.toLocaleString()} - E
                          {priceInsight.max.toLocaleString()}
                        </span>
                        <span>
                          Avg: E
                          {Math.round(priceInsight.average).toLocaleString()}
                        </span>
                      </div>

                      {priceInsight.suggestion !== 'good' && (
                        <Button
                          type="button"
                          variant="link"
                          size="sm"
                          className="mt-2 h-auto p-0 text-primary"
                          onClick={applySuggestedPrice}
                        >
                          Apply suggested price
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {priceInsight && priceInsight.count === 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  No similar properties found in {formData.city} to compare
                  pricing.
                </p>
              )}

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your property in detail..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Location</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="city">City/Town</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) =>
                    setFormData({ ...formData, city: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="suburb">Suburb/Area</Label>
                <Input
                  id="suburb"
                  placeholder="e.g., Ngwane Park"
                  value={formData.suburb}
                  onChange={(e) =>
                    setFormData({ ...formData, suburb: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Street Address (Optional)</Label>
                <Input
                  id="address"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
                <p className="text-sm text-gray-500 mt-1">
                  You can choose to show exact address only after contact
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">
              Property Details & Amenities
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select
                  value={formData.bedrooms}
                  onValueChange={(value) =>
                    setFormData({ ...formData, bedrooms: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Select
                  value={formData.bathrooms}
                  onValueChange={(value) =>
                    setFormData({ ...formData, bathrooms: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="furnished"
                checked={formData.is_furnished}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_furnished: checked as boolean })
                }
              />
              <Label htmlFor="furnished">Furnished</Label>
            </div>

            <div>
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {AMENITIES.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                    />
                    <Label htmlFor={amenity} className="text-sm">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="lease_terms">Lease Terms</Label>
              <Textarea
                id="lease_terms"
                placeholder="e.g., 12-month lease, 1 month deposit, immediate move-in..."
                rows={3}
                value={formData.lease_terms}
                onChange={(e) =>
                  setFormData({ ...formData, lease_terms: e.target.value })
                }
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Photos & Contact</h2>

            {/* Photo Upload */}
            <div>
              <Label>Property Photos (Max 15)</Label>
              <div className="mt-2">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                  {photoPreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => removePhoto(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-primary">
                          Cover
                        </Badge>
                      )}
                    </div>
                  ))}

                  {photos.length < 15 && (
                    <label className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                      <Upload className="h-6 w-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Upload clear photos of the property. First photo will be the
                  cover.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Contact Information</h3>

              <div>
                <Label htmlFor="contact_phone">Phone Number</Label>
                <Input
                  id="contact_phone"
                  placeholder="+268 7600 0000"
                  value={formData.contact_phone}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_phone: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact_whatsapp">WhatsApp (Optional)</Label>
                <Input
                  id="contact_whatsapp"
                  placeholder="+268 7600 0000"
                  value={formData.contact_whatsapp}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact_whatsapp: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Preview Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Listing Summary</h3>
                <dl className="space-y-2">
                  <div className="flex">
                    <dt className="w-24 text-sm text-gray-500">Title:</dt>
                    <dd className="text-sm">{formData.title}</dd>
                  </div>
                  <div className="flex">
                    <dt className="w-24 text-sm text-gray-500">Price:</dt>
                    <dd className="text-sm font-semibold">
                      E{parseFloat(formData.price || '0').toLocaleString()}
                      /month
                      {priceInsight?.suggestion === 'good' && (
                        <span className="ml-2 text-xs text-green-600">
                          ✓ Good price
                        </span>
                      )}
                    </dd>
                  </div>
                  <div className="flex">
                    <dt className="w-24 text-sm text-gray-500">Location:</dt>
                    <dd className="text-sm">
                      {formData.suburb}, {formData.city}
                    </dd>
                  </div>
                  <div className="flex">
                    <dt className="w-24 text-sm text-gray-500">Type:</dt>
                    <dd className="text-sm capitalize">
                      {formData.property_type}
                    </dd>
                  </div>
                  <div className="flex">
                    <dt className="w-24 text-sm text-gray-500">Bed/Bath:</dt>
                    <dd className="text-sm">
                      {formData.bedrooms} bed • {formData.bathrooms} bath
                    </dd>
                  </div>
                  <div className="flex">
                    <dt className="w-24 text-sm text-gray-500">Amenities:</dt>
                    <dd className="text-sm">
                      {formData.amenities.length} selected
                    </dd>
                  </div>
                  <div className="flex">
                    <dt className="w-24 text-sm text-gray-500">Photos:</dt>
                    <dd className="text-sm">{photos.length} uploaded</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                ✓ Your property will be listed immediately after submission - no
                admin approval needed!
              </AlertDescription>
            </Alert>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/dashboard/landlord">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Add New Property</h1>
        <p className="text-gray-600">List your property on SwaziRent</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex-1 text-center ${
                step < currentStep
                  ? 'text-primary'
                  : step === currentStep
                    ? 'text-primary font-semibold'
                    : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  step < currentStep
                    ? 'bg-primary text-white'
                    : step === currentStep
                      ? 'border-2 border-primary text-primary'
                      : 'border-2 border-gray-300 text-gray-300'
                }`}
              >
                {step}
              </div>
              <span className="text-sm hidden md:block">
                {step === 1 && 'Basic Info'}
                {step === 2 && 'Location'}
                {step === 3 && 'Details'}
                {step === 4 && 'Photos'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardContent className="p-6">{renderStep()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button type="button" onClick={handleNext}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Listing Property...
                </>
              ) : (
                'List Property Now'
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
