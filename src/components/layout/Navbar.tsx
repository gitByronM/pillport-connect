
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import MobileMenu from './navbar/MobileMenu';
import DesktopNav from './navbar/DesktopNav';
import CategoriesNavbar from './navbar/CategoriesNavbar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={`transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm' : 'py-3 bg-white shadow-sm'
      }`}>
        <DesktopNav />
        
        <div className="lg:hidden container px-4 mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-pharma-600 to-pharma-700 bg-clip-text text-transparent">
                PharmaConnect
              </span>
            </Link>
            
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Categories Navigation Bar - Only visible on desktop */}
      <div className="hidden lg:block bg-gray-50 border-b border-gray-200 shadow-sm">
        <CategoriesNavbar />
      </div>
      
      <MobileMenu isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
}

export default Navbar;
