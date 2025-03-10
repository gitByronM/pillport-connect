
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductDetail from '../components/products/ProductDetail';
import { useCart } from '@/components/cart/CartProvider';
import CartSidebar from '@/components/cart/CartSidebar';

const ProductDetails = () => {
  const { id } = useParams();
  const productId = id ? parseInt(id) : undefined;
  const { items, updateQuantity, removeFromCart, isCartOpen, closeCart } = useCart();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-28 py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <ProductDetail id={productId} />
        </div>
      </main>
      
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={closeCart}
        items={items}
        onQuantityChange={updateQuantity}
        onRemove={removeFromCart}
      />
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
