
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import CategoriesMenu from './CategoriesMenu';

interface DesktopNavProps {
  showCategoriesMenu: boolean;
  setShowCategoriesMenu: (value: boolean) => void;
  categories: Array<{
    name: string;
    subcategories: string[];
  }>;
}

const DesktopNav = ({ showCategoriesMenu, setShowCategoriesMenu, categories }: DesktopNavProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <nav className="hidden md:flex items-center border-t border-b border-gray-100 py-2">
      <div className="relative mr-6">
        <button 
          className="flex items-center text-foreground hover:text-pharma-600 font-medium transition-colors"
          onMouseEnter={() => setShowCategoriesMenu(true)}
          onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
        >
          All Categories
          <svg 
            className={`ml-1 w-4 h-4 transition-transform ${showCategoriesMenu ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <CategoriesMenu 
          showMenu={showCategoriesMenu}
          onMouseLeave={() => setShowCategoriesMenu(false)}
          categories={categories}
        />
      </div>
      
      <Link to="/products" className={`nav-link ${isActive('/products')}`}>All Products</Link>
      <Link to="/products/category/medicines" className="nav-link">Medicines</Link>
      <Link to="/products/category/personal-care" className="nav-link">Personal Care</Link>
      <Link to="/products/category/baby-care" className="nav-link">Baby Care</Link>
      <Link to="/services" className={`nav-link ${isActive('/services')}`}>Services</Link>
      <Link to="/offers" className="nav-link">Offers</Link>
    </nav>
  );
};

export default DesktopNav;

