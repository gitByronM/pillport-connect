
import React, { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import CartSidebar from '../cart/CartSidebar';
import { useCart } from '../cart/CartProvider';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { items, isCartOpen, closeCart, updateQuantity, removeFromCart } = useCart();
  const location = useLocation();
  
  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {children}
      </main>
      
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={closeCart}
        items={items}
        onQuantityChange={updateQuantity}
        onRemove={removeFromCart}
      />
    </>
  );
}
