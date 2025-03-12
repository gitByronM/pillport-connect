
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import MobileMenu from './navbar/MobileMenu';
import DesktopNav from './navbar/DesktopNav';

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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' : 'py-3 bg-white shadow-sm'
      }`}
    >
      <DesktopNav />
      
      <div className="lg:hidden container px-4 mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-pharma-700">
            <img
              src="/lovable-uploads/90a10636-03a6-45ff-b6c5-6b9dd342bfd7.png"
              alt="Farmatodo"
              className="h-10"
            />
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
      
      <MobileMenu isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
}

export default Navbar;
