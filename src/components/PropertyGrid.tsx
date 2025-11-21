import { useState, useEffect, useRef } from 'react';
import { PropertyCard } from './PropertyCard';
import { Filters } from '../App';
import { Loader2 } from 'lucide-react';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  verifiedHost: boolean;
  roomType: string;
  amenities: string[];
}

interface PropertyGridProps {
  filters: Filters;
  searchQuery: string;
}

// Mock property data generator
const generateProperties = (startId: number, count: number): Property[] => {
  const locations = [
    'Bali, Indonesia',
    'Tokyo, Japan',
    'Paris, France',
    'New York, USA',
    'Barcelona, Spain',
    'London, UK',
    'Dubai, UAE',
    'Sydney, Australia',
    'Rome, Italy',
    'Bangkok, Thailand',
    'Amsterdam, Netherlands',
    'Singapore'
  ];

  const titles = [
    'Modern Luxury Villa',
    'Cozy Downtown Apartment',
    'Beachfront Paradise',
    'Mountain Retreat Cabin',
    'Historic City Center Loft',
    'Stylish Studio',
    'Spacious Family Home',
    'Penthouse with View',
    'Charming Cottage',
    'Contemporary Residence',
    'Garden Suite',
    'Designer Apartment'
  ];

  const images = [
    'https://images.unsplash.com/photo-1679364297777-1db77b6199be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzU3Njg5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjM1OTk1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1763382737780-ab522f68dca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwb2NlYW58ZW58MXx8fHwxNzYzNTY2MDU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1502885380958-f9f2289af1a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhYmluJTIwbG9kZ2V8ZW58MXx8fHwxNzYzNTI2ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1672082497059-1e6c0209eeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbG9mdCUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NjM1MTQzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1652882861109-570be85c2b92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwc3R1ZGlvJTIwYXBhcnRtZW50fGVufDF8fHx8MTc2MzUxMTI2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1560170412-0f7df0eb0fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob21lJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzYzNTQ5MjAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1568115286680-d203e08a8be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50aG91c2UlMjBjaXR5JTIwdmlld3xlbnwxfHx8fDE3NjM2MDA5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1567002260834-61d030a974d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudHJ5c2lkZSUyMGNvdHRhZ2UlMjBnYXJkZW58ZW58MXx8fHwxNzYzNTUwNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1659720879153-24703db812c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjM1MDczMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1725962479542-1be0a6b0d444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjM1MjMxODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1635286729762-d3e53c422b43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWNhdGlvbiUyMHJlbnRhbCUyMHByb3BlcnR5fGVufDF8fHx8MTc2MzU0MTExOHww&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  const roomTypes = ['Entire place', 'Private room', 'Shared room', 'Hotel room'];
  const amenitiesList = ['WiFi', 'Kitchen', 'Parking', 'Pool', 'Pet-friendly', 'Air conditioning'];

  return Array.from({ length: count }, (_, i) => {
    const id = startId + i;
    return {
      id: `property-${id}`,
      title: titles[id % titles.length],
      location: locations[id % locations.length],
      price: Math.floor(Math.random() * 500) + 50,
      rating: (Math.random() * 1.5 + 3.5).toFixed(1) as any,
      reviews: Math.floor(Math.random() * 500) + 10,
      image: images[id % images.length],
      verifiedHost: Math.random() > 0.3,
      roomType: roomTypes[id % roomTypes.length],
      amenities: amenitiesList.filter(() => Math.random() > 0.5)
    };
  });
};

export function PropertyGrid({ filters, searchQuery }: PropertyGridProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Filter properties
  const filteredProperties = properties.filter(property => {
    // Price filter
    if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
      return false;
    }

    // Room type filter
    if (filters.roomType.length > 0 && !filters.roomType.includes(property.roomType)) {
      return false;
    }

    // Rating filter
    if (filters.rating > 0 && property.rating < filters.rating) {
      return false;
    }

    // Verified host filter
    if (filters.verifiedHost && !property.verifiedHost) {
      return false;
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity => 
        property.amenities.includes(amenity)
      );
      if (!hasAllAmenities) {
        return false;
      }
    }

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Load initial properties
  useEffect(() => {
    setProperties(generateProperties(0, 12));
    setPage(1);
  }, []);

  // Load more properties
  const loadMore = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newProperties = generateProperties(page * 12, 12);
      setProperties(prev => [...prev, ...newProperties]);
      setPage(prev => prev + 1);
      setLoading(false);
      
      // Stop after 5 pages
      if (page >= 4) {
        setHasMore(false);
      }
    }, 1000);
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore, page]);

  return (
    <div>
      {filteredProperties.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
            <span className="text-3xl">🏠</span>
          </div>
          <h3 className="text-slate-900 mb-2">No properties found</h3>
          <p className="text-slate-600">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Infinite scroll loader */}
          <div ref={loaderRef} className="flex justify-center py-12">
            {loading && (
              <div className="flex items-center gap-2 text-purple-600">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Loading more properties...</span>
              </div>
            )}
            {!hasMore && filteredProperties.length > 0 && (
              <p className="text-slate-500">You've reached the end</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}