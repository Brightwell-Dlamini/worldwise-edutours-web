// mock/properties.ts

import { Property, PropertyPhoto } from '@/types/property';

// Define types for related data
interface MockLandlord {
    full_name: string;
    phone: string;
    is_verified: boolean;
}

// Extended type for properties with relations
interface PropertyWithRelations extends Property {
    landlord: MockLandlord;
    photos: PropertyPhoto[];
}

export const MOCK_PROPERTIES: Property[] = [
    {
        id: '1',
        landlord_id: 'landlord_1',
        title: 'Spacious 3-Bedroom House with Garden',
        description: 'Beautiful family home with large garden, modern kitchen, and close to schools and shops. Features include solar panels, backup water, and 24hr security.',
        price: 2500,
        bedrooms: 3,
        bathrooms: 2,
        property_type: 'house',
        location_city: 'Cape Town',
        location_suburb: 'Southern Suburbs',
        location_address: '15 Oak Avenue',
        latitude: -33.9249,
        longitude: 18.4241,
        is_furnished: false,
        amenities: ['Parking', 'Backup Water', 'Security', 'Garden', 'Built-in Wardrobes', 'Pet Friendly', 'Electric Fence', '24hr Security'],
        status: 'active',
        is_featured: true,
        views: 145,
        created_at: '2024-03-15T10:30:00Z',
        updated_at: '2024-03-15T10:30:00Z'
    },
    {
        id: '2',
        landlord_id: 'landlord_2',
        title: 'Modern 2-Bedroom Apartment with City Views',
        description: 'Stunning apartment on the 15th floor with panoramic city views. Fully furnished with high-end finishes, secure parking, and access to rooftop pool.',
        price: 3500,
        bedrooms: 2,
        bathrooms: 2,
        property_type: 'apartment',
        location_city: 'Cape Town',
        location_suburb: 'City Bowl',
        location_address: '45 Century Boulevard',
        latitude: -33.9189,
        longitude: 18.4233,
        is_furnished: true,
        amenities: ['Parking', 'Security', 'Furnished', 'Built-in Wardrobes', '24hr Security'],
        status: 'active',
        is_featured: true,
        views: 89,
        created_at: '2024-03-14T14:20:00Z',
        updated_at: '2024-03-14T14:20:00Z'
    },
    {
        id: '3',
        landlord_id: 'landlord_3',
        title: 'Cozy 1-Bedroom Backrooms in Quiet Neighborhood',
        description: 'Private and secure backrooms with separate entrance. Perfect for single professional or student. Includes parking and prepaid electricity.',
        price: 1200,
        bedrooms: 1,
        bathrooms: 1,
        property_type: 'backrooms',
        location_city: 'Cape Town',
        location_suburb: 'Northern Suburbs',
        location_address: '22 Pine Street',
        latitude: -33.8671,
        longitude: 18.5111,
        is_furnished: false,
        amenities: ['Parking', 'Pet Friendly', 'Electric Fence'],
        status: 'active',
        is_featured: false,
        views: 56,
        created_at: '2024-03-13T09:15:00Z',
        updated_at: '2024-03-13T09:15:00Z'
    },
    {
        id: '4',
        landlord_id: 'landlord_1',
        title: 'Luxury 4-Bedroom Townhouse in Secure Estate',
        description: 'Elegant townhouse in sought-after security estate. Open plan living, modern kitchen, private garden, and double garage.',
        price: 4500,
        bedrooms: 4,
        bathrooms: 3,
        property_type: 'townhouse',
        location_city: 'Cape Town',
        location_suburb: 'Atlantic Seaboard',
        location_address: '8 Seaside Close',
        latitude: -33.9089,
        longitude: 18.4177,
        is_furnished: true,
        amenities: ['Parking', 'Backup Water', 'Security', 'Garden', 'Furnished', 'Built-in Wardrobes', 'Electric Fence', '24hr Security'],
        status: 'active',
        is_featured: true,
        views: 234,
        created_at: '2024-03-12T16:45:00Z',
        updated_at: '2024-03-12T16:45:00Z'
    },
    {
        id: '5',
        landlord_id: 'landlord_2',
        title: 'Student-Friendly 2-Bedroom Apartment near University',
        description: 'Conveniently located near major universities. Modern finishes, secure building with laundry facilities and study areas.',
        price: 1800,
        bedrooms: 2,
        bathrooms: 1,
        property_type: 'apartment',
        location_city: 'Cape Town',
        location_suburb: 'Observatory',
        location_address: '56 Main Road',
        latitude: -33.9378,
        longitude: 18.4764,
        is_furnished: true,
        amenities: ['Security', 'Furnished', 'Built-in Wardrobes', '24hr Security'],
        status: 'active',
        is_featured: false,
        views: 67,
        created_at: '2024-03-11T11:30:00Z',
        updated_at: '2024-03-11T11:30:00Z'
    },
    {
        id: '6',
        landlord_id: 'landlord_3',
        title: 'Spacious 3-Bedroom House with Pool',
        description: 'Beautiful family home with swimming pool, large garden, and entertainment area. Solar powered with battery backup.',
        price: 3800,
        bedrooms: 3,
        bathrooms: 2,
        property_type: 'house',
        location_city: 'Cape Town',
        location_suburb: 'Constantia',
        location_address: '12 Vineyard Road',
        latitude: -34.0215,
        longitude: 18.4188,
        is_furnished: false,
        amenities: ['Parking', 'Backup Water', 'Security', 'Garden', 'Built-in Wardrobes', 'Pet Friendly', 'Electric Fence'],
        status: 'active',
        is_featured: true,
        views: 178,
        created_at: '2024-03-10T13:20:00Z',
        updated_at: '2024-03-10T13:20:00Z'
    }
];

// Mock photos for properties
export const MOCK_PHOTOS: Record<string, PropertyPhoto[]> = {
    '1': [
        {
            id: 'photo_1_1',
            property_id: '1',
            photo_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
            caption: 'Living Room',
            display_order: 1,
            created_at: '2024-03-15T10:30:00Z'
        },
        {
            id: 'photo_1_2',
            property_id: '1',
            photo_url: 'https://images.unsplash.com/photo-1600572402589-85c4a86f36db?w=800',
            caption: 'Kitchen',
            display_order: 2,
            created_at: '2024-03-15T10:30:00Z'
        },
        {
            id: 'photo_1_3',
            property_id: '1',
            photo_url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
            caption: 'Garden',
            display_order: 3,
            created_at: '2024-03-15T10:30:00Z'
        }
    ],
    '2': [
        {
            id: 'photo_2_1',
            property_id: '2',
            photo_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
            caption: 'Living Area',
            display_order: 1,
            created_at: '2024-03-14T14:20:00Z'
        },
        {
            id: 'photo_2_2',
            property_id: '2',
            photo_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
            caption: 'Bedroom',
            display_order: 2,
            created_at: '2024-03-14T14:20:00Z'
        }
    ],
    '3': [
        {
            id: 'photo_3_1',
            property_id: '3',
            photo_url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
            caption: 'Exterior',
            display_order: 1,
            created_at: '2024-03-13T09:15:00Z'
        }
    ],
    '4': [
        {
            id: 'photo_4_1',
            property_id: '4',
            photo_url: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800',
            caption: 'Living Room',
            display_order: 1,
            created_at: '2024-03-12T16:45:00Z'
        },
        {
            id: 'photo_4_2',
            property_id: '4',
            photo_url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
            caption: 'Kitchen',
            display_order: 2,
            created_at: '2024-03-12T16:45:00Z'
        }
    ],
    '5': [
        {
            id: 'photo_5_1',
            property_id: '5',
            photo_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
            caption: 'Interior',
            display_order: 1,
            created_at: '2024-03-11T11:30:00Z'
        }
    ],
    '6': [
        {
            id: 'photo_6_1',
            property_id: '6',
            photo_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
            caption: 'Pool Area',
            display_order: 1,
            created_at: '2024-03-10T13:20:00Z'
        },
        {
            id: 'photo_6_2',
            property_id: '6',
            photo_url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
            caption: 'Garden',
            display_order: 2,
            created_at: '2024-03-10T13:20:00Z'
        }
    ]
};

// Mock landlord profiles
export const MOCK_LANDLORDS: Record<string, MockLandlord> = {
    'landlord_1': {
        full_name: 'John Smith',
        phone: '+27 82 123 4567',
        is_verified: true
    },
    'landlord_2': {
        full_name: 'Sarah Johnson',
        phone: '+27 83 987 6543',
        is_verified: true
    },
    'landlord_3': {
        full_name: 'Michael Brown',
        phone: '+27 84 456 7890',
        is_verified: false
    }
};

// Helper function to get properties with their related data
export const getMockPropertiesWithRelations = (): PropertyWithRelations[] => {
    return MOCK_PROPERTIES.map(property => ({
        ...property,
        landlord: MOCK_LANDLORDS[property.landlord_id] || {
            full_name: 'Unknown Landlord',
            phone: '',
            is_verified: false
        },
        photos: MOCK_PHOTOS[property.id] || []
    }));
};

// Define filter type
interface PropertyFilters {
    city?: string;
    keyword?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: string;
    propertyType?: string[];
    amenities?: string[];
    furnished?: boolean;
}

// Helper function to filter properties based on criteria
export const filterMockProperties = (
    properties: PropertyWithRelations[],
    filters: PropertyFilters
): PropertyWithRelations[] => {
    return properties.filter(property => {
        // City filter
        if (filters.city && !property.location_city?.toLowerCase().includes(filters.city.toLowerCase())) {
            return false;
        }

        // Keyword search in title and description
        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase();
            const matchesTitle = property.title?.toLowerCase().includes(keyword) || false;
            const matchesDescription = property.description?.toLowerCase().includes(keyword) || false;
            if (!matchesTitle && !matchesDescription) {
                return false;
            }
        }

        // Price range
        if (filters.minPrice && property.price < filters.minPrice) {
            return false;
        }
        if (filters.maxPrice && property.price > filters.maxPrice) {
            return false;
        }

        // Bedrooms - handle 'any' case
        if (filters.bedrooms && filters.bedrooms !== 'any') {
            if (!property.bedrooms || property.bedrooms < parseInt(filters.bedrooms)) {
                return false;
            }
        }

        // Property type
        if (filters.propertyType && filters.propertyType.length > 0) {
            if (!property.property_type || !filters.propertyType.includes(property.property_type)) {
                return false;
            }
        }

        // Amenities - must have ALL selected amenities
        if (filters.amenities && filters.amenities.length > 0) {
            if (!property.amenities) return false;
            const hasAllAmenities = filters.amenities.every(amenity =>
                property.amenities?.includes(amenity)
            );
            if (!hasAllAmenities) {
                return false;
            }
        }

        // Furnished
        if (filters.furnished && !property.is_furnished) {
            return false;
        }

        return true;
    });
};