// src/app/dashboard/landlord/add-property/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
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
  Clock,
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
const PROPERTY_TYPES = [
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

export default function AddPropertyPage() {
  const { user, userType } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [verificationStatus, setVerificationStatus] = useState<
    'verified' | 'pending' | null
  >(null);
  const [checkingVerification, setCheckingVerification] = useState(true);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: '',
    description: '',
    property_type: '',
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

  // Check verification status on page load
  useEffect(() => {
    async function checkVerification() {
      if (!user || userType !== 'landlord') {
        router.push('/dashboard/landlord');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_verified')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        const isVerified = data?.is_verified || false;
        setVerificationStatus(isVerified ? 'verified' : 'pending');

        // If not verified, redirect after showing message
        if (!isVerified) {
          toast.error('Verification Required', {
            description:
              'Your landlord account must be verified before you can list properties.',
            duration: 5000,
          });
          router.push('/dashboard/landlord');
        }
      } catch (error) {
        console.error('Error checking verification:', error);
        router.push('/dashboard/landlord');
      } finally {
        setCheckingVerification(false);
      }
    }

    checkVerification();
  }, [user, userType, router]);

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

    // Validate file types and size
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      if (!isValidType || !isValidSize) {
        setError('Each photo must be an image under 5MB');
      }
      return isValidType && isValidSize;
    });

    setPhotos([...photos, ...validFiles]);

    // Create preview URLs
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Double-check verification before submission
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_verified')
        .eq('id', user?.id)
        .single();

      if (profileError) throw profileError;

      if (!profile?.is_verified) {
        throw new Error('Your account must be verified to list properties');
      }

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

      // 2. Create property
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
            location_address: formData.address,
            bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
            bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
            is_furnished: formData.is_furnished,
            amenities: formData.amenities,
            lease_terms: formData.lease_terms,
            status: 'pending', // Needs admin approval
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
          display_order: index,
        }));

        const { error: photosError } = await supabase
          .from('property_photos')
          .insert(photoRecords);

        if (photosError) throw photosError;
      }

      // Redirect to dashboard with success message
      router.push('/dashboard/landlord?success=Property submitted for review');
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

  // Show loading state while checking verification
  if (checkingVerification) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex justify-center items-center min-h-100">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // If not verified, show message (though they should have been redirected)
  if (verificationStatus !== 'verified') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="bg-yellow-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Verification Required</h2>
              <p className="text-gray-600 mb-6">
                Your landlord account must be verified before you can list
                properties. This usually takes 24-48 hours.
              </p>
              <Button asChild>
                <Link href="/dashboard/landlord">Back to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                    setFormData({ ...formData, property_type: value })
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
            <h2 className="text-xl font-semibold">Photos & Review</h2>

            {/* Photo Upload */}
            <div>
              <Label>Property Photos (Max 15)</Label>
              <div className="mt-2">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                  {photoPreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square">
                      <div className="relative w-full h-full">
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => removePhoto(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
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
                    <dd className="text-sm">E{formData.price}/month</dd>
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

            <Alert>
              <AlertDescription>
                Your listing will be reviewed by our admin team before going
                live. This usually takes 24-48 hours.
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
                  Submitting...
                </>
              ) : (
                'Submit for Review'
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
