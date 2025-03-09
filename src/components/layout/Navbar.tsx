
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import SearchBar from '../ui/SearchBar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  
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
  }, [location]);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-pharma-700">
          PharmaConnect
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/products" className={`nav-link ${isActive('/products')}`}>Products</Link>
          <Link to="/services" className={`nav-link ${isActive('/services')}`}>Services</Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
        </nav>
        
        {/* Desktop actions */}
        <div className="hidden md:flex items-center space-x-5">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link to="/cart" className="text-muted-foreground hover:text-foreground transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-pharma-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
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
      
      {/* Search bar - Shown when search is clicked */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 animate-slide-down">
          <SearchBar onClose={() => setIsSearchOpen(false)} />
        </div>
      )}
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-6 animate-slide-down flex flex-col space-y-4">
          <Link to="/" className={`text-lg font-medium ${isActive('/') ? 'text-pharma-600' : 'text-foreground'}`}>Home</Link>
          <Link to="/products" className={`text-lg font-medium ${isActive('/products') ? 'text-pharma-600' : 'text-foreground'}`}>Products</Link>
          <Link to="/services" className={`text-lg font-medium ${isActive('/services') ? 'text-pharma-600' : 'text-foreground'}`}>Services</Link>
          <Link to="/about" className={`text-lg font-medium ${isActive('/about') ? 'text-pharma-600' : 'text-foreground'}`}>About</Link>
          <Link to="/contact" className={`text-lg font-medium ${isActive('/contact') ? 'text-pharma-600' : 'text-foreground'}`}>Contact</Link>
          <div className="flex items-center space-x-6 pt-2 border-t">
            <Link to="/cart" className="text-muted-foreground hover:text-foreground transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-pharma-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/account" className="text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsMenuOpen(false);
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
