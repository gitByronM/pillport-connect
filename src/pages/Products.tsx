
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductGrid from '../components/products/ProductGrid';

const Products = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-20 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <ProductGrid
            title="All Products"
            subtitle="Browse our complete catalog of medications and health products."
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
