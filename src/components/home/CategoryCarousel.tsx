
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Pill, 
  Droplets, 
  Baby, 
  Apple, 
  Heart, 
  Sparkles, 
  Thermometer, 
  Leaf,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Medications",
    icon: <Pill className="w-6 h-6" />,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Personal Care",
    icon: <Droplets className="w-6 h-6" />,
    color: "bg-emerald-500",
  },
  {
    id: 3,
    name: "Baby Care",
    icon: <Baby className="w-6 h-6" />,
    color: "bg-pink-500",
  },
  {
    id: 4,
    name: "Health Foods",
    icon: <Apple className="w-6 h-6" />,
    color: "bg-amber-500",
  },
  {
    id: 5,
    name: "Vitamins",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-red-500",
  },
  {
    id: 6,
    name: "Beauty",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-purple-500",
  },
  {
    id: 7,
    name: "Devices",
    icon: <Thermometer className="w-6 h-6" />,
    color: "bg-indigo-500",
  },
  {
    id: 8,
    name: "Herbal",
    icon: <Leaf className="w-6 h-6" />,
    color: "bg-green-500",
  }
];

const CategoryCarousel = () => {
  return (
    <section className="pt-6 pb-4 px-4 bg-white border-b border-gray-100">
      <div className="container mx-auto max-w-6xl">
        <div className="relative">
          {/* Navigation buttons */}
          <button 
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-sm hover:bg-gray-50 transition-colors md:flex hidden items-center justify-center"
            aria-label="Previous categories"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button 
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-sm hover:bg-gray-50 transition-colors md:flex hidden items-center justify-center"
            aria-label="Next categories"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Categories */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products/category/${category.id}`}
                className="flex flex-col items-center text-center group"
              >
                <div className={`${category.color} p-3 rounded-full text-white mb-2 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-pharma-600 transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
