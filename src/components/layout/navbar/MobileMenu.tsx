
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/ui/SearchBar';
import { useCart } from '@/components/cart/CartProvider';
import { useAuth } from '@/hooks/useAuth';
import { useUserContext } from '@/components/auth/UserProvider';
import { categories } from './categories';

interface MobileMenuProps {
  isOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

const MobileMenu = ({ isOpen, setIsMenuOpen }: MobileMenuProps) => {
  const { openCart, itemCount } = useCart();
  const { openAuth } = useAuth();
  const { isLoggedIn } = useUserContext();

  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-6 animate-slide-down flex flex-col space-y-4">
      <div className="mb-4">
        <SearchBar />
      </div>
      
      {isLoggedIn ? (
        <Link to="/account" className="w-full" onClick={() => setIsMenuOpen(false)}>
          <Button 
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Mi Cuenta
          </Button>
        </Link>
      ) : (
        <div className="flex flex-col space-y-2 mb-4">
          <Button 
            onClick={() => {
              openAuth('login');
              setIsMenuOpen(false);
            }}
            className="w-full"
          >
            Iniciar sesión
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              openAuth('register');
              setIsMenuOpen(false);
            }}
            className="w-full"
          >
            Registrarse
          </Button>
        </div>
      )}
      
      <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Categories</h3>
      <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-2">
        {categories.map((category, idx) => (
          <Link 
            key={idx}
            to={`/products/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-lg font-medium text-foreground hover:text-pharma-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {category.name}
          </Link>
        ))}
      </div>
      
      <div className="h-px bg-gray-200 my-2" />
      
      <Link to="/" className="text-lg font-medium text-foreground" onClick={() => setIsMenuOpen(false)}>Home</Link>
      <Link to="/products" className="text-lg font-medium text-foreground" onClick={() => setIsMenuOpen(false)}>All Products</Link>
      <Link to="/services" className="text-lg font-medium text-foreground" onClick={() => setIsMenuOpen(false)}>Services</Link>
      <Link to="/offers" className="text-lg font-medium text-foreground" onClick={() => setIsMenuOpen(false)}>Offers</Link>
      
      <div className="h-px bg-gray-200 my-2" />
      
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
      </div>
    </div>
  );
};

export default MobileMenu;
