import { Star, MapPin, Shield } from 'lucide-react';
import { Property } from './PropertyGrid';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-orange-50">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {property.verifiedHost && (
            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-600 text-white flex items-center gap-1.5 shadow-lg">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-sm">Verified</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-slate-600 mb-3">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="text-sm">{property.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-slate-900">{property.rating}</span>
              <span className="text-slate-500 text-sm">({property.reviews})</span>
            </div>

            <div>
              <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                ${property.price}
              </span>
              <span className="text-slate-500 text-sm"> / night</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}