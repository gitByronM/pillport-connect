
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PromotionBanner = () => {
  return (
    <section className="py-4 px-4 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="relative">
          {/* Navigation buttons */}
          <button 
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-sm hover:bg-white transition-colors"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-sm hover:bg-white transition-colors"
            aria-label="Next banner"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Promotion card */}
          <div className="bg-gradient-to-r from-pharma-500 to-blue-400 rounded-lg p-6 text-white overflow-hidden relative">
            <div className="w-full md:w-3/5 relative z-10">
              <h2 className="text-3xl font-bold mb-2">15% OFF Your First Order</h2>
              <p className="mb-4">Get 15% off on your first delivery order. Use code WELCOME15 at checkout.</p>
              
              <a 
                href="/products" 
                className="inline-block px-6 py-2 bg-white text-pharma-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </a>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute right-0 top-0 bottom-0 w-2/5 hidden md:flex items-center justify-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/90a10636-03a6-45ff-b6c5-6b9dd342bfd7.png" 
                  alt="Promotion products" 
                  className="w-full object-contain max-h-48"
                />
              </div>
            </div>
            
            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="w-2 h-2 rounded-full bg-white/50"></span>
              <span className="w-2 h-2 rounded-full bg-white/50"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionBanner;
