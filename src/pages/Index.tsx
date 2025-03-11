
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import CategoryCarousel from '../components/home/CategoryCarousel';
import ProductGrid from '../components/products/ProductGrid';
import PromotionBanner from '../components/home/PromotionBanner';
import FeaturedCategories from '../components/home/FeaturedCategories';
import { useCart } from '@/components/cart/CartProvider';
import CartSidebar from '@/components/cart/CartSidebar';

const Index = () => {
  const { items, updateQuantity, removeFromCart, isCartOpen, closeCart } = useCart();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-24">
        <Hero />
        
        {/* Categories Carousel */}
        <CategoryCarousel />
        
        {/* Promotion Banner */}
        <PromotionBanner />
        
        {/* Featured Categories */}
        <FeaturedCategories />
        
        {/* Featured Products Section */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <a href="/products" className="text-pharma-600 hover:underline text-sm font-medium">View All</a>
            </div>
            <ProductGrid 
              title="" 
              subtitle="" 
              compact={true}
            />
          </div>
        </section>
        
        {/* Daily Deals Section */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold">Daily Deals</h2>
              <a href="/products?deals=true" className="text-pharma-600 hover:underline text-sm font-medium">View All</a>
            </div>
            <ProductGrid 
              title="" 
              subtitle="" 
              compact={true}
              filter="deals"
            />
          </div>
        </section>
      </main>
      
      {/* Add CartSidebar component to the homepage */}
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

export default Index;
