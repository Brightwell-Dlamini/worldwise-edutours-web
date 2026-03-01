'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Property } from '@/types/property';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  getMockPropertiesWithRelations,
  filterMockProperties,
} from './mockData';

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
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    keyword: searchParams.get('q') || '',
    minPrice: 0,
    maxPrice: 10000,
    bedrooms: 'any',
    propertyType: [] as string[],
    amenities: [] as string[],
    furnished: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get all mock properties with relations
  const allProperties = getMockPropertiesWithRelations();

  const fetchProperties = useCallback(() => {
    setLoading(true);

    // Simulate network delay for realistic loading state
    setTimeout(() => {
      try {
        // Filter properties based on current filters
        const filtered = filterMockProperties(allProperties, filters);

        // Apply pagination
        const startIndex = (page - 1) * 12;
        const endIndex = startIndex + 12;
        const paginatedProperties = filtered.slice(startIndex, endIndex);

        setProperties(paginatedProperties);
        setTotalCount(filtered.length);
      } catch (error) {
        console.error('Error filtering properties:', error);
      } finally {
        setLoading(false);
      }
    }, 500); // Simulate loading state
  }, [filters, page, allProperties]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleFilterChange = (
    key: string,
    value: string | string[] | boolean | number,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      keyword: '',
      minPrice: 0,
      maxPrice: 10000,
      bedrooms: 'any',
      propertyType: [],
      amenities: [],
      furnished: false,
    });
    setPage(1);
  };

  const hasActiveFilters = () => {
    return (
      filters.city !== '' ||
      filters.keyword !== '' ||
      filters.minPrice > 0 ||
      filters.maxPrice < 10000 ||
      filters.bedrooms !== 'any' ||
      filters.propertyType.length > 0 ||
      filters.amenities.length > 0 ||
      filters.furnished
    );
  };

  // Filter Content Component (used in both desktop and mobile)
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <Label className="text-base font-semibold">Price Range (E/month)</Label>
        <div className="mt-2 px-2">
          <Slider
            defaultValue={[filters.minPrice, filters.maxPrice]}
            max={10000}
            step={500}
            onValueChange={([min, max]) => {
              handleFilterChange('minPrice', min);
              handleFilterChange('maxPrice', max);
            }}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>E{filters.minPrice}</span>
            <span>E{filters.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <Label className="text-base font-semibold">Bedrooms</Label>
        <Select
          value={filters.bedrooms}
          onValueChange={(value) => handleFilterChange('bedrooms', value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Property Type */}
      <div>
        <Label className="text-base font-semibold">Property Type</Label>
        <div className="mt-2 space-y-2">
          {PROPERTY_TYPES.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={filters.propertyType.includes(type)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleFilterChange('propertyType', [
                      ...filters.propertyType,
                      type,
                    ]);
                  } else {
                    handleFilterChange(
                      'propertyType',
                      filters.propertyType.filter((t) => t !== type),
                    );
                  }
                }}
              />
              <Label htmlFor={type} className="capitalize">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <Label className="text-base font-semibold">Amenities</Label>
        <div className="mt-2 space-y-2">
          {AMENITIES.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleFilterChange('amenities', [
                      ...filters.amenities,
                      amenity,
                    ]);
                  } else {
                    handleFilterChange(
                      'amenities',
                      filters.amenities.filter((a) => a !== amenity),
                    );
                  }
                }}
              />
              <Label htmlFor={amenity}>{amenity}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Furnished */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="furnished"
          checked={filters.furnished}
          onCheckedChange={(checked) =>
            handleFilterChange('furnished', checked === true)
          }
        />
        <Label htmlFor="furnished">Furnished Only</Label>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters() && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Find Your Perfect Home</h1>

        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by keyword, location, or property name..."
              className="pl-10"
              value={filters.keyword}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
            />
          </div>

          {/* Mobile Filter Button */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-75 sm:w-100 overflow-y-auto">
              <SheetTitle className="sr-only">Filter Properties</SheetTitle>
              <div className="py-4">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters */}
        {hasActiveFilters() && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.city && (
              <Badge variant="secondary" className="px-3 py-1">
                City: {filters.city}
                <button
                  className="ml-2 hover:text-gray-900"
                  onClick={() => handleFilterChange('city', '')}
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.keyword && (
              <Badge variant="secondary" className="px-3 py-1">
                Search: {filters.keyword}
                <button
                  className="ml-2 hover:text-gray-900"
                  onClick={() => handleFilterChange('keyword', '')}
                >
                  ×
                </button>
              </Badge>
            )}
            {(filters.minPrice > 0 || filters.maxPrice < 10000) && (
              <Badge variant="secondary" className="px-3 py-1">
                E{filters.minPrice} - E{filters.maxPrice}
                <button
                  className="ml-2 hover:text-gray-900"
                  onClick={() => {
                    handleFilterChange('minPrice', 0);
                    handleFilterChange('maxPrice', 10000);
                  }}
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.bedrooms !== 'any' && (
              <Badge variant="secondary" className="px-3 py-1">
                {filters.bedrooms}+ beds
                <button
                  className="ml-2 hover:text-gray-900"
                  onClick={() => handleFilterChange('bedrooms', 'any')}
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.propertyType.map((type) => (
              <Badge
                key={type}
                variant="secondary"
                className="px-3 py-1 capitalize"
              >
                {type}
                <button
                  className="ml-2 hover:text-gray-900"
                  onClick={() =>
                    handleFilterChange(
                      'propertyType',
                      filters.propertyType.filter((t) => t !== type),
                    )
                  }
                >
                  ×
                </button>
              </Badge>
            ))}
            {filters.amenities.map((amenity) => (
              <Badge key={amenity} variant="secondary" className="px-3 py-1">
                {amenity}
                <button
                  className="ml-2 hover:text-gray-900"
                  onClick={() =>
                    handleFilterChange(
                      'amenities',
                      filters.amenities.filter((a) => a !== amenity),
                    )
                  }
                >
                  ×
                </button>
              </Badge>
            ))}
            {filters.furnished && (
              <Badge variant="secondary" className="px-3 py-1">
                Furnished
                <button
                  className="ml-2 hover:text-gray-900"
                  onClick={() => handleFilterChange('furnished', false)}
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <FilterContent />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          {/* Results Count & Sort */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              {loading ? 'Loading...' : `${totalCount} properties found`}
            </p>
            <Select defaultValue="newest">
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">
                No properties found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search criteria
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              {totalCount > 12 && (
                <div className="mt-8 flex justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page * 12 >= totalCount}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
