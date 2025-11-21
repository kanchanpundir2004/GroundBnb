import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { PropertyGrid } from './components/PropertyGrid';

export interface Filters {
  priceRange: [number, number];
  roomType: string[];
  rating: number;
  verifiedHost: boolean;
  amenities: string[];
}

export default function App() {
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 1000],
    roomType: [],
    rating: 0,
    verifiedHost: false,
    amenities: []
  });

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent mb-2">
            Discover Your Perfect Stay
          </h1>
          <p className="text-slate-600">
            {searchQuery ? `Showing results for "${searchQuery}"` : 'Explore unique places to stay around the world'}
          </p>
        </div>

        <FilterBar filters={filters} setFilters={setFilters} />
        <PropertyGrid filters={filters} searchQuery={searchQuery} />
      </div>
    </div>
  );
}