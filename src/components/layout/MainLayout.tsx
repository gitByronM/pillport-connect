
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import CartSidebar from '../cart/CartSidebar';
import { useCart } from '../cart/CartProvider';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { items, isCartOpen, closeCart, updateQuantity, removeFromCart } = useCart();
  
  return (
    <>
      <Navbar />
      <main className="pt-32">
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
