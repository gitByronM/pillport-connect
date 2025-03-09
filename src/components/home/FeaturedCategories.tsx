
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Pain Relief",
    image: "https://images.unsplash.com/photo-1626285829162-35f3f40c3352?auto=format&fit=crop&q=80&w=300",
    count: 124
  },
  {
    id: 2,
    name: "Skin Care",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=300",
    count: 98
  },
  {
    id: 3,
    name: "Baby Products",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=300",
    count: 86
  },
  {
    id: 4,
    name: "Vitamins & Supplements",
    image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&q=80&w=300",
    count: 152
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold">Featured Categories</h2>
          <a href="/products" className="text-pharma-600 hover:underline text-sm font-medium">View All</a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/products/category/${category.id}`}
              className="relative rounded-lg overflow-hidden group"
            >
              <div className="aspect-[4/3] bg-gray-100">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white font-medium">{category.name}</h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-white/80 text-sm">{category.count} items</span>
                  <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
