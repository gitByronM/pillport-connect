
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const q = query.get('q');
    
    if (q) {
      setSearchQuery(q);
      console.log('Searching for:', q);
    }
  }, [location]);
  
  return (
    <div className="container mx-auto max-w-6xl py-8">
      <div className="flex items-center mb-8">
        <SearchIcon className="w-6 h-6 mr-3 text-pharma-600" />
        <h1 className="text-2xl font-bold">Search Results: "{searchQuery}"</h1>
      </div>
      
      <ProductGrid
        title=""
        subtitle=""
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default Search;
