import { useState } from 'react';
import { SlidersHorizontal, DollarSign, Home, Star, Shield, Sparkles, X } from 'lucide-react';
import { Filters } from '../App';

interface FilterBarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const roomTypes = ['Entire place', 'Private room', 'Shared room', 'Hotel room'];
const amenitiesList = ['WiFi', 'Kitchen', 'Parking', 'Pool', 'Pet-friendly', 'Air conditioning'];

export function FilterBar({ filters, setFilters }: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleRoomType = (type: string) => {
    const updated = filters.roomType.includes(type)
      ? filters.roomType.filter(t => t !== type)
      : [...filters.roomType, type];
    setFilters({ ...filters, roomType: updated });
  };

  const toggleAmenity = (amenity: string) => {
    const updated = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    setFilters({ ...filters, amenities: updated });
  };

  const activeFilterCount = 
    filters.roomType.length + 
    filters.amenities.length + 
    (filters.verifiedHost ? 1 : 0) + 
    (filters.rating > 0 ? 1 : 0);

  return (
    <div className="mb-8">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-orange-200 hover:border-orange-400 transition-all bg-white shadow-sm hover:shadow-md"
      >
        <SlidersHorizontal className="w-5 h-5 text-orange-600" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-600 text-white text-sm">
            {activeFilterCount}
          </span>
        )}
      </button>

      {showFilters && (
        <div className="mt-4 p-6 rounded-3xl bg-white shadow-lg border border-orange-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-slate-900">Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Price Range */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-orange-600" />
                <h4 className="text-slate-900">Price Range</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-slate-600 mb-1 block">Min: ${filters.priceRange[0]}</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [Number(e.target.value), filters.priceRange[1]] })}
                    className="w-full accent-orange-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600 mb-1 block">Max: ${filters.priceRange[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
                    className="w-full accent-orange-600"
                  />
                </div>
              </div>
            </div>

            {/* Room Type */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-orange-600" />
                <h4 className="text-slate-900">Room Type</h4>
              </div>
              <div className="space-y-2">
                {roomTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.roomType.includes(type)}
                      onChange={() => toggleRoomType(type)}
                      className="w-4 h-4 accent-orange-600 rounded"
                    />
                    <span className="text-slate-700 group-hover:text-orange-600 transition-colors">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-orange-600" />
                <h4 className="text-slate-900">Minimum Rating</h4>
              </div>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => setFilters({ ...filters, rating })}
                      className="w-4 h-4 accent-orange-600"
                    />
                    <span className="text-slate-700 group-hover:text-orange-600 transition-colors">
                      {rating}+ Stars
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Verified Host */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-orange-600" />
                <h4 className="text-slate-900">Host Verification</h4>
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.verifiedHost}
                  onChange={(e) => setFilters({ ...filters, verifiedHost: e.target.checked })}
                  className="w-4 h-4 accent-orange-600 rounded"
                />
                <span className="text-slate-700 group-hover:text-orange-600 transition-colors">
                  Show only verified hosts
                </span>
              </label>
            </div>

            {/* Amenities */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <h4 className="text-slate-900">Amenities</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {amenitiesList.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="w-4 h-4 accent-orange-600 rounded"
                    />
                    <span className="text-slate-700 group-hover:text-orange-600 transition-colors">
                      {amenity}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setFilters({
                priceRange: [0, 1000],
                roomType: [],
                rating: 0,
                verifiedHost: false,
                amenities: []
              })}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Clear all
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 text-white hover:shadow-lg transition-all"
            >
              Apply filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}