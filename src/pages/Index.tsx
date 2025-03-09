
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import CategorySection from '../components/home/CategorySection';
import ProductGrid from '../components/products/ProductGrid';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16">
        <Hero />
        <Features />
        <CategorySection />
        
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
            <ProductGrid 
              title="" 
              subtitle="" 
            />
            
            <div className="mt-10 flex justify-center">
              <a 
                href="/products" 
                className="px-6 py-3 bg-pharma-600 text-white rounded-full hover:bg-pharma-700 transition-colors font-medium"
              >
                View All Products
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
