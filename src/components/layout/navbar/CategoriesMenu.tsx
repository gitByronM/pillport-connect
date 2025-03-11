
import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  name: string;
  subcategories: string[];
}

interface CategoriesMenuProps {
  showMenu: boolean;
  onMouseLeave: () => void;
  categories: Category[];
}

const CategoriesMenu = ({ showMenu, onMouseLeave, categories }: CategoriesMenuProps) => {
  if (!showMenu) return null;

  return (
    <div 
      className="absolute left-0 mt-2 w-screen max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden z-50 grid grid-cols-5 gap-4 p-6"
      onMouseLeave={onMouseLeave}
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
  );
};

export default CategoriesMenu;

