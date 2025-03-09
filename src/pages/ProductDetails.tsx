
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductDetail from '../components/products/ProductDetail';

const ProductDetails = () => {
  const { id } = useParams();
  const productId = id ? parseInt(id) : undefined;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-20 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <ProductDetail id={productId} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
