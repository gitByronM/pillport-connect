
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { categories } from './categories';

export default function CategoriesMenu() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 text-base font-medium text-gray-700 hover:text-pharma-600 transition-colors"
        onMouseEnter={() => setShowMenu(true)}
        onClick={() => setShowMenu(!showMenu)}
      >
        <span>Categorías</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {showMenu && (
        <div 
          className="absolute left-0 mt-2 w-screen max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden z-50 grid grid-cols-5 gap-4 p-6"
          onMouseLeave={() => setShowMenu(false)}
        >
          {categories.map((category, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="font-medium text-pharma-700">{category.name}</h3>
              <ul className="space-y-2">
                {category.subcategories.map((sub, subIdx) => (
                  <li key={subIdx}>
                    <Link 
                      to={`/products/category/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-gray-600 hover:text-pharma-600 transition-colors"
                    >
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
