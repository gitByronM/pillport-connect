
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import SearchBar from '../ui/SearchBar';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="pt-32 pb-16 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pharma-50 to-blue-50 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-pharma-300/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-blue-300/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content Side */}
          <div className={`lg:w-1/2 space-y-6 transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block px-3 py-1 bg-pharma-100 text-pharma-600 rounded-full text-sm font-medium">
              Digital Healthcare Solutions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Your Health, <br />
              <span className="text-pharma-600">Simplified</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Digitizing pharmacy operations and bringing healthcare closer to people. Search, order, and manage your medications from the comfort of your home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link 
                to="/products" 
                className="inline-flex items-center justify-center px-6 py-3 bg-pharma-600 text-white rounded-full hover:bg-pharma-700 transition-colors font-medium"
              >
                Browse Products
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-pharma-600 border border-pharma-200 rounded-full hover:bg-pharma-50 transition-colors font-medium"
              >
                Contact a Pharmacist
              </Link>
            </div>
          </div>
          
          {/* Image/Search Side */}
          <div className={`lg:w-1/2 transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative bg-white rounded-2xl p-6 shadow-premium">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Search for medications</h2>
                <p className="text-muted-foreground">Find medications, symptoms, or health categories</p>
              </div>
              
              <SearchBar />
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Popular searches:</h3>
                <div className="flex flex-wrap gap-2">
                  <Link to="/search?q=painkillers" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors">
                    Painkillers
                  </Link>
                  <Link to="/search?q=allergy" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors">
                    Allergy Relief
                  </Link>
                  <Link to="/search?q=vitamins" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors">
                    Vitamins
                  </Link>
                  <Link to="/search?q=prescription" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors">
                    Prescription Refill
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
