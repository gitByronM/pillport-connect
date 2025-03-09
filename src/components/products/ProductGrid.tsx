
import React, { useState, useEffect } from 'react';
import ProductCard from '../ui/ProductCard';
import { Grid, List, SlidersHorizontal, ChevronDown } from 'lucide-react';

// Mock data
const products = [
  {
    id: 1,
    name: "Aspirin 100mg",
    description: "Pain reliever and fever reducer. Used to treat mild to moderate pain, and also to reduce fever or inflammation.",
    price: 12.99,
    imageSrc: "https://images.unsplash.com/photo-1626285829162-35f3f40c3352?auto=format&fit=crop&q=80&w=1000",
    category: "Pain Relief",
    categoryId: 1,
    inStock: true,
    isOnSale: false
  },
  {
    id: 2,
    name: "Vitamin C 1000mg",
    description: "Supports immune health and antioxidant support. Essential for the growth and repair of tissues.",
    price: 15.49,
    imageSrc: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000",
    category: "Vitamins",
    categoryId: 5,
    inStock: true,
    isOnSale: true
  },
  {
    id: 3,
    name: "Cetirizine 10mg",
    description: "Antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, and sneezing.",
    price: 18.99,
    imageSrc: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=1000",
    category: "Allergy Relief",
    categoryId: 1,
    inStock: false,
    isOnSale: false
  },
  {
    id: 4,
    name: "Ibuprofen 400mg",
    description: "Nonsteroidal anti-inflammatory drug used to reduce fever and treat pain or inflammation.",
    price: 10.99,
    imageSrc: "https://images.unsplash.com/photo-1550572017-37b18a813b0f?auto=format&fit=crop&q=80&w=1000",
    category: "Pain Relief",
    categoryId: 1,
    inStock: true,
    isOnSale: true
  },
  {
    id: 5,
    name: "Omega-3 Fish Oil",
    description: "Supports heart, brain, joint, and eye health. Rich in EPA and DHA fatty acids.",
    price: 22.99,
    imageSrc: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&q=80&w=1000",
    category: "Supplements",
    categoryId: 5,
    inStock: true,
    isOnSale: false
  },
  {
    id: 6,
    name: "Multivitamin Complex",
    description: "Complete daily vitamin with minerals. Supports overall health and wellbeing.",
    price: 19.99,
    imageSrc: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=1000",
    category: "Vitamins",
    categoryId: 5,
    inStock: true,
    isOnSale: false
  },
  {
    id: 7,
    name: "Nasal Spray Solution",
    description: "Fast relief from nasal congestion due to colds, allergies, and sinus problems.",
    price: 14.49,
    imageSrc: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=1000",
    category: "Cold & Flu",
    categoryId: 1,
    inStock: false,
    isOnSale: true
  },
  {
    id: 8,
    name: "Digital Thermometer",
    description: "Fast and accurate temperature readings. Easy to use with clear digital display.",
    price: 29.99,
    imageSrc: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&q=80&w=1000",
    category: "Medical Devices",
    categoryId: 7,
    inStock: true,
    isOnSale: false
  },
  {
    id: 9,
    name: "Baby Shampoo",
    description: "Gentle, tear-free formula for babies. Hypoallergenic and dermatologist tested.",
    price: 8.99,
    imageSrc: "https://images.unsplash.com/photo-1607782994386-f8ed7f2df25e?auto=format&fit=crop&q=80&w=1000",
    category: "Baby Care",
    categoryId: 3,
    inStock: true,
    isOnSale: false
  },
  {
    id: 10,
    name: "Baby Wipes",
    description: "Gentle and moisturizing wipes for sensitive skin. Alcohol-free and fragrance-free.",
    price: 5.99,
    imageSrc: "https://images.unsplash.com/photo-1591377677982-3f0e23687df2?auto=format&fit=crop&q=80&w=1000",
    category: "Baby Care",
    categoryId: 3,
    inStock: true,
    isOnSale: true
  }
];

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  categoryId?: number | null;
  searchQuery?: string;
  filter?: string;
  compact?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  title = "All Products", 
  subtitle = "Browse our complete catalog of medications and health products.",
  categoryId = null,
  searchQuery = "",
  filter = "",
  compact = false
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Filter products based on category, search query, or filter
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (categoryId !== null) {
      result = result.filter(product => product.categoryId === categoryId);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by special filters
    if (filter === 'deals') {
      result = result.filter(product => product.isOnSale);
    }
    
    setFilteredProducts(result);
  }, [categoryId, searchQuery, filter]);
  
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
        {/* Filters button */}
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        
        {/* Right side controls */}
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
      
      {/* Expandable filters */}
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
      
      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <div className="py-16 text-center">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
          <a href="/products" className="text-pharma-600 hover:underline">View all products</a>
        </div>
      )}
      
      {/* Products grid */}
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
