
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-20 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
