
import React, { useState } from 'react';
import { MapPin, Search, ChevronDown } from 'lucide-react';

// Mock pharmacy data
const pharmacies = [
  { id: 1, name: 'Pharmacy Central', address: '123 Main St', city: 'New York', availability: 'available', stock: 15 },
  { id: 2, name: 'MediPlus', address: '456 Oak Ave', city: 'New York', availability: 'limited', stock: 3 },
  { id: 3, name: 'HealthCare Pharmacy', address: '789 Pine Rd', city: 'New York', availability: 'unavailable', stock: 0 },
  { id: 4, name: 'City Drugs', address: '101 Broadway', city: 'Boston', availability: 'available', stock: 8 },
  { id: 5, name: 'QuickMeds', address: '202 Washington St', city: 'Boston', availability: 'limited', stock: 2 },
  { id: 6, name: 'Family Pharmacy', address: '303 Lincoln Ave', city: 'Chicago', availability: 'available', stock: 12 },
  { id: 7, name: 'Wellness Drugs', address: '404 Jefferson Blvd', city: 'Chicago', availability: 'unavailable', stock: 0 },
  { id: 8, name: 'Corner Pharmacy', address: '505 Madison St', city: 'Los Angeles', availability: 'available', stock: 20 },
];

// Group pharmacies by city
const cities = [...new Set(pharmacies.map(pharmacy => pharmacy.city))];

interface PharmacyAvailabilityProps {
  productId: number;
  productName: string;
}

const PharmacyAvailability: React.FC<PharmacyAvailabilityProps> = ({ productId, productName }) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [expandedCity, setExpandedCity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleCityExpansion = (city: string) => {
    if (expandedCity === city) {
      setExpandedCity(null);
    } else {
      setExpandedCity(city);
    }
  };
  
  const filteredCities = selectedCity 
    ? [selectedCity] 
    : cities.filter(city => 
        city.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  const getPharmaciesByCity = (city: string) => {
    return pharmacies.filter(pharmacy => pharmacy.city === city);
  };
  
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-500';
      case 'limited': return 'bg-amber-500';
      case 'unavailable': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };
  
  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available';
      case 'limited': return 'Limited Stock';
      case 'unavailable': return 'Out of Stock';
      default: return 'Unknown';
    }
  };
  
  return (
    <div className="mt-12 bg-white border border-gray-200 rounded-lg overflow-hidden">
      <h2 className="text-xl font-bold p-4 border-b border-gray-200">Availability in Pharmacies</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Map area */}
        <div className="p-4 h-[400px] bg-blue-50 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2 text-pharma-600" />
            <p>Interactive map showing pharmacy locations</p>
            <p className="text-sm">A real map integration would be implemented here</p>
          </div>
        </div>
        
        {/* Availability information */}
        <div className="p-4 border-l border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm mr-4">Available</span>
            
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
            <span className="text-sm mr-4">Limited Stock</span>
            
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm">Out of Stock</span>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pharma-300"
            />
          </div>
          
          <div className="overflow-y-auto max-h-[280px]">
            {filteredCities.map(city => (
              <div key={city} className="mb-2 border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleCityExpansion(city)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium">{city}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedCity === city ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedCity === city && (
                  <div className="p-2 space-y-2">
                    {getPharmaciesByCity(city).map(pharmacy => (
                      <div key={pharmacy.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{pharmacy.name}</p>
                          <p className="text-sm text-muted-foreground">{pharmacy.address}</p>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${getAvailabilityColor(pharmacy.availability)} mr-2`}></div>
                          <span className="text-sm">
                            {getAvailabilityText(pharmacy.availability)}
                            {pharmacy.stock > 0 && ` (${pharmacy.stock})`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyAvailability;
