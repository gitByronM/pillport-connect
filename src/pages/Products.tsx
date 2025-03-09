
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductGrid from '../components/products/ProductGrid';
import { ChevronRight } from 'lucide-react';

const Products = () => {
  const location = useLocation();
  const params = useParams();
  const [title, setTitle] = useState('All Products');
  const [subtitle, setSubtitle] = useState('Browse our complete catalog of medications and health products.');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Parse query params for search view
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const q = query.get('q');
    
    if (q) {
      setSearchQuery(q);
      setTitle(`Search Results: ${q}`);
      setSubtitle(`Showing products matching "${q}"`);
    } else if (location.pathname === '/products') {
      setTitle('All Products');
      setSubtitle('Browse our complete catalog of medications and health products.');
      setCategoryId(null);
      setSearchQuery('');
    }
  }, [location]);
  
  // Parse params for category view
  useEffect(() => {
    const categoryIdParam = params.id;
    const categoryPath = location.pathname;
    
    // Check if we're on a category page
    if (categoryPath.includes('/products/category/') && categoryIdParam) {
      const id = parseInt(categoryIdParam);
      setCategoryId(id);
      
      // Get category name based on ID
      const categories = [
        { id: 1, name: "Medications" },
        { id: 2, name: "Personal Care" },
        { id: 3, name: "Baby Care" },
        { id: 4, name: "Health Foods" },
        { id: 5, name: "Vitamins" },
        { id: 6, name: "Beauty Products" },
        { id: 7, name: "Medical Devices" },
        { id: 8, name: "Herbal Remedies" }
      ];
      
      const category = categories.find(cat => cat.id === id);
      if (category) {
        setTitle(category.name);
        setSubtitle(`Browse our ${category.name.toLowerCase()} products`);
      } else {
        setTitle('Category');
        setSubtitle('Browse products in this category');
      }
    }
  }, [params, location]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-20 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumbs */}
          <div className="mb-4 flex items-center text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors">Home</a>
            <ChevronRight className="w-4 h-4 mx-1" />
            {categoryId ? (
              <>
                <a href="/products" className="hover:text-foreground transition-colors">Products</a>
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-foreground">{title}</span>
              </>
            ) : searchQuery ? (
              <>
                <a href="/products" className="hover:text-foreground transition-colors">Products</a>
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-foreground">Search</span>
              </>
            ) : (
              <span className="text-foreground">Products</span>
            )}
          </div>
          
          <ProductGrid
            title={title}
            subtitle={subtitle}
            categoryId={categoryId}
            searchQuery={searchQuery}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
