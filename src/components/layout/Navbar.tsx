
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import { useCart } from '@/components/cart/CartProvider';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { openCart, itemCount } = useCart();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setShowCategoriesMenu(false);
  }, [location]);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  // Mock categories for the mega menu
  const categories = [
    {
      name: "Medicines",
      subcategories: ["Pain Relief", "Cold & Flu", "Allergy", "Digestive", "First Aid"]
    },
    {
      name: "Personal Care",
      subcategories: ["Skin Care", "Hair Care", "Oral Care", "Deodorants", "Hygiene"]
    },
    {
      name: "Baby Care",
      subcategories: ["Diapers", "Baby Food", "Formula", "Bath & Skincare", "Accessories"]
    },
    {
      name: "Health Foods",
      subcategories: ["Vitamins", "Supplements", "Protein", "Organic", "Sugar-free"]
    },
    {
      name: "Beauty",
      subcategories: ["Makeup", "Skincare", "Fragrances", "Hair Styling", "Tools"]
    }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' : 'py-3 bg-white shadow-sm'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-2">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-pharma-700">
            PharmaConnect
          </Link>
          
          {/* Search Bar (always visible on non-home pages) */}
          {!isHomePage && (
            <div className="hidden md:block flex-grow mx-8 max-w-xl">
              <SearchBar compact={true} />
            </div>
          )}
          
          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-5">
            {isHomePage && (
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={openCart} 
              className="text-muted-foreground hover:text-foreground transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pharma-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <Link to="/account" className="text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-5 h-5" />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Desktop Navigation - Categories Bar */}
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
            
            {/* Mega Menu */}
            {showCategoriesMenu && (
              <div 
                className="absolute left-0 mt-2 w-screen max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden z-50 grid grid-cols-5 gap-4 p-6"
                onMouseLeave={() => setShowCategoriesMenu(false)}
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
          
          <Link to="/products" className={`nav-link ${isActive('/products')}`}>All Products</Link>
          <Link to="/products/category/medicines" className="nav-link">Medicines</Link>
          <Link to="/products/category/personal-care" className="nav-link">Personal Care</Link>
          <Link to="/products/category/baby-care" className="nav-link">Baby Care</Link>
          <Link to="/services" className={`nav-link ${isActive('/services')}`}>Services</Link>
          <Link to="/offers" className="nav-link">Offers</Link>
        </nav>
      </div>
      
      {/* Search bar - Shown when search is clicked on homepage only */}
      {isHomePage && isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 animate-slide-down">
          <SearchBar onClose={() => setIsSearchOpen(false)} />
        </div>
      )}
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-6 animate-slide-down flex flex-col space-y-4">
          {/* Mobile search */}
          <div className="mb-4">
            <SearchBar />
          </div>
          
          <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Categories</h3>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-2">
            {categories.map((category, idx) => (
              <Link 
                key={idx}
                to={`/products/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-lg font-medium text-foreground hover:text-pharma-600 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
          
          <div className="h-px bg-gray-200 my-2"></div>
          
          <Link to="/" className={`text-lg font-medium ${isActive('/') ? 'text-pharma-600' : 'text-foreground'}`}>Home</Link>
          <Link to="/products" className={`text-lg font-medium ${isActive('/products') ? 'text-pharma-600' : 'text-foreground'}`}>All Products</Link>
          <Link to="/services" className={`text-lg font-medium ${isActive('/services') ? 'text-pharma-600' : 'text-foreground'}`}>Services</Link>
          <Link to="/offers" className="text-lg font-medium text-foreground">Offers</Link>
          
          <div className="h-px bg-gray-200 my-2"></div>
          
          <div className="flex items-center space-x-6 pt-2">
            <button 
              onClick={() => {
                openCart();
                setIsMenuOpen(false);
              }} 
              className="text-muted-foreground hover:text-foreground transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pharma-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <Link to="/account" className="text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
