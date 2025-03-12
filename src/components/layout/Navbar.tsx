
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import { useCart } from '@/components/cart/CartProvider';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import MobileMenu from './navbar/MobileMenu';
import DesktopNav from './navbar/DesktopNav';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { openCart, itemCount } = useCart();
  const { openAuth } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' : 'py-3 bg-white shadow-sm'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-2">
          <Link to="/" className="text-2xl font-bold text-pharma-700">
            PharmaConnect
          </Link>
          
          {!isHomePage && (
            <div className="hidden md:block flex-grow mx-8 max-w-xl">
              <SearchBar compact={true} />
            </div>
          )}
          
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
            <Button 
              variant="ghost" 
              onClick={() => openAuth('login')}
              className="flex items-center gap-2"
            >
              <User className="w-5 h-5" />
              <span className="hidden lg:inline">Iniciar sesión</span>
            </Button>
            <Button 
              variant="default"
              onClick={() => openAuth('register')}
              className="hidden lg:flex"
            >
              Registrarse
            </Button>
          </div>
          
          <button 
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        <DesktopNav />
      </div>
      
      {isHomePage && isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 animate-slide-down">
          <SearchBar onClose={() => setIsSearchOpen(false)} />
        </div>
      )}
      
      <MobileMenu isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
};

export default Navbar;
