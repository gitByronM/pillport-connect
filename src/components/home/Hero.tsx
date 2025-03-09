
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <section className="pt-20 pb-8 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for medications, symptoms, categories..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-gray-50 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-pharma-300 focus:border-transparent outline-none"
              />
              <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
              <button
                type="submit"
                className="absolute right-2 bg-pharma-600 text-white px-4 py-1.5 rounded-full hover:bg-pharma-700 transition-colors text-sm font-medium"
              >
                Search
              </button>
            </div>
          </form>
          
          {/* Popular searches */}
          <div className="mt-3 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            <span className="text-sm text-muted-foreground mr-1">Popular:</span>
            <Link to="/search?q=painkillers" className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors">
              Painkillers
            </Link>
            <Link to="/search?q=allergy" className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors">
              Allergy Relief
            </Link>
            <Link to="/search?q=vitamins" className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors">
              Vitamins
            </Link>
            <Link to="/search?q=cold" className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors">
              Cold & Flu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
