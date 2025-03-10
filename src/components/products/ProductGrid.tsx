
import React, { useState, useEffect } from 'react';
import ProductCard from '../ui/ProductCard';
import { Grid, List, SlidersHorizontal, ChevronDown } from 'lucide-react';

// Sample products data for demo purposes
const products = [
  {
    id: 1,
    name: "Pain Relief Extra Strength",
    description: "Fast-acting pain relief for headaches, muscle aches, and minor arthritis pain. Contains 500mg acetaminophen per caplet.",
    price: 12.99,
    imageSrc: "/placeholder.svg",
    category: "Pain Relief",
    categoryId: 1,
    inStock: true,
    isOnSale: true,
    brand: "PharmaCare"
  },
  {
    id: 2,
    name: "Allergy Relief 24-Hour",
    description: "Non-drowsy allergy relief that provides 24-hour relief from indoor and outdoor allergies.",
    price: 18.49,
    imageSrc: "/placeholder.svg",
    category: "Allergy",
    categoryId: 2,
    inStock: true,
    isOnSale: false,
    brand: "AllerEase"
  },
  {
    id: 3,
    name: "Digital Thermometer",
    description: "Fast and accurate digital thermometer with flexible tip for comfort.",
    price: 15.99,
    imageSrc: "/placeholder.svg",
    category: "First Aid",
    categoryId: 3,
    inStock: false,
    isOnSale: false,
    brand: "MediTech"
  },
  {
    id: 4,
    name: "Vitamin D3 5000 IU",
    description: "High-potency vitamin D3 supplement to support bone health and immune function.",
    price: 14.95,
    imageSrc: "/placeholder.svg",
    category: "Vitamins",
    categoryId: 4,
    inStock: true,
    isOnSale: true,
    brand: "VitaWell"
  },
  {
    id: 5,
    name: "First Aid Kit - Family Size",
    description: "Comprehensive first aid kit with 150 items for treating minor injuries at home or on the go.",
    price: 29.99,
    imageSrc: "/placeholder.svg",
    category: "First Aid",
    categoryId: 3,
    inStock: true,
    isOnSale: false,
    brand: "SafeGuard"
  },
  {
    id: 6,
    name: "Probiotic Digestive Support",
    description: "10 billion CFU probiotic supplement to support gut health and digestive balance.",
    price: 21.99,
    imageSrc: "/placeholder.svg",
    category: "Digestive",
    categoryId: 5,
    inStock: true,
    isOnSale: false,
    brand: "GutHealth"
  },
  {
    id: 7,
    name: "Children's Cough Syrup",
    description: "Berry-flavored cough syrup safe for children ages 4 and up.",
    price: 8.99,
    imageSrc: "/placeholder.svg",
    category: "Cold & Flu",
    categoryId: 6,
    inStock: true,
    isOnSale: true,
    brand: "KidCare"
  },
  {
    id: 8,
    name: "Omega-3 Fish Oil",
    description: "Purified fish oil supplement with 1000mg Omega-3s for heart and brain health.",
    price: 16.99,
    imageSrc: "/placeholder.svg",
    category: "Supplements",
    categoryId: 7,
    inStock: true,
    isOnSale: false,
    brand: "VitaWell"
  },
  {
    id: 9,
    name: "Digital Blood Pressure Monitor",
    description: "Easy-to-use blood pressure monitor with large digital display and memory function.",
    price: 49.99,
    imageSrc: "/placeholder.svg",
    category: "Medical Devices",
    categoryId: 8,
    inStock: true,
    isOnSale: true,
    brand: "MediTech"
  },
  {
    id: 10,
    name: "Zinc Lozenges",
    description: "Cherry-flavored zinc lozenges to support immune health during cold season.",
    price: 7.49,
    imageSrc: "/placeholder.svg",
    category: "Cold & Flu",
    categoryId: 6,
    inStock: true,
    isOnSale: false,
    brand: "PharmaCare"
  },
  {
    id: 11,
    name: "Gentle Sleep Aid",
    description: "Non-habit forming sleep aid with melatonin and herbal extracts.",
    price: 11.99,
    imageSrc: "/placeholder.svg",
    category: "Sleep & Stress",
    categoryId: 9,
    inStock: true,
    isOnSale: false,
    brand: "SleepWell"
  },
  {
    id: 12,
    name: "Daily Multivitamin",
    description: "Complete multivitamin with essential nutrients for overall health maintenance.",
    price: 19.99,
    imageSrc: "/placeholder.svg",
    category: "Vitamins",
    categoryId: 4,
    inStock: true,
    isOnSale: true,
    brand: "VitaWell"
  }
];

// Sample product interface for typing
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  category: string;
  categoryId: number;
  inStock: boolean;
  isOnSale: boolean;
  brand: string;
}

// Export products for use in other files
export { products };

export interface ProductGridProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  categoryId?: number | null;
  searchQuery?: string;
  filter?: string;
  filterValue?: string;
  compact?: boolean;
  productIds?: number[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  title = "All Products", 
  subtitle = "Browse our complete catalog of medications and health products.",
  categoryId = null,
  searchQuery = "",
  filter = "",
  filterValue = "",
  compact = false,
  productIds = []
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  useEffect(() => {
    let result = [...products];
    
    if (productIds && productIds.length > 0) {
      result = result.filter(product => productIds.includes(product.id));
    } else if (categoryId !== null) {
      result = result.filter(product => product.categoryId === categoryId);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
      );
    }
    
    if (filter === 'deals') {
      result = result.filter(product => product.isOnSale);
    } else if (filter === 'brand' && filterValue) {
      result = result.filter(product => product.brand === filterValue);
    } else if (filter === 'related' && productIds) {
      result = result.filter(product => productIds.includes(product.id));
    }
    
    setFilteredProducts(result);
  }, [categoryId, searchQuery, filter, filterValue, productIds]);
  
  if (compact) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.slice(0, 5).map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageSrc={product.imageSrc}
            category={product.category}
            inStock={product.inStock}
            compact={true}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-pharma-100 text-pharma-600' : 'text-muted-foreground hover:bg-gray-100'} transition-colors`}
              aria-label="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-pharma-100 text-pharma-600' : 'text-muted-foreground hover:bg-gray-100'} transition-colors`}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          
          <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pharma-300 appearance-none bg-no-repeat bg-right">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-pharma-600 focus:ring-pharma-300" />
                  <span className="ml-2">Pain Relief</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-pharma-600 focus:ring-pharma-300" />
                  <span className="ml-2">Vitamins & Supplements</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-pharma-600 focus:ring-pharma-300" />
                  <span className="ml-2">Cold & Flu</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-pharma-600 focus:ring-pharma-300" />
                  <span className="ml-2">Medical Devices</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-2">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pharma-600" 
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$0</span>
                  <span>$100</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Availability</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-pharma-600 focus:ring-pharma-300" />
                  <span className="ml-2">In Stock</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-pharma-600 focus:ring-pharma-300" />
                  <span className="ml-2">Out of Stock</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end space-x-3">
            <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
              Reset
            </button>
            <button className="px-4 py-2 bg-pharma-600 text-white rounded-lg hover:bg-pharma-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {filteredProducts.length === 0 && (
        <div className="py-16 text-center">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
          <a href="/products" className="text-pharma-600 hover:underline">View all products</a>
        </div>
      )}
      
      {filteredProducts.length > 0 && (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageSrc={product.imageSrc}
              category={product.category}
              inStock={product.inStock}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
