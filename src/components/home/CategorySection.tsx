
import React, { useEffect, useRef, useState } from 'react';
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
  ChevronRight
} from 'lucide-react';

interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
  color: string;
  products: number;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Medications",
    icon: <Pill className="w-6 h-6" />,
    color: "bg-blue-500",
    products: 1240
  },
  {
    id: 2,
    name: "Personal Care",
    icon: <Droplets className="w-6 h-6" />,
    color: "bg-emerald-500",
    products: 846
  },
  {
    id: 3,
    name: "Baby Care",
    icon: <Baby className="w-6 h-6" />,
    color: "bg-pink-500",
    products: 532
  },
  {
    id: 4,
    name: "Health Foods",
    icon: <Apple className="w-6 h-6" />,
    color: "bg-amber-500",
    products: 358
  },
  {
    id: 5,
    name: "Vitamins & Supplements",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-red-500",
    products: 703
  },
  {
    id: 6,
    name: "Beauty Products",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-purple-500",
    products: 491
  },
  {
    id: 7,
    name: "Medical Devices",
    icon: <Thermometer className="w-6 h-6" />,
    color: "bg-indigo-500",
    products: 274
  },
  {
    id: 8,
    name: "Herbal Remedies",
    icon: <Leaf className="w-6 h-6" />,
    color: "bg-green-500",
    products: 326
  }
];

const CategorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore our extensive catalog of health products organized by category to find exactly what you need.
            </p>
          </div>
          <Link 
            to="/products" 
            className="mt-4 md:mt-0 flex items-center text-pharma-600 hover:text-pharma-700 transition-colors"
          >
            View all categories
            <ChevronRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.id}
              to={`/products/category/${category.id}`}
              className={`bg-white rounded-xl p-6 border border-gray-100 hover:shadow-premium transition-all duration-500 hover:-translate-y-1 transform ${
                visible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className={`${category.color} p-3 rounded-lg text-white mr-4`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{category.name}</h3>
                  <span className="text-sm text-muted-foreground">{category.products} products</span>
                </div>
              </div>
              <div className="flex justify-end">
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
