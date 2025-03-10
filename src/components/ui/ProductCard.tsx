
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  category: string;
  inStock: boolean;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  imageSrc,
  category,
  inStock,
  compact = false
}) => {
  const { addToCart } = useCart();
  const product = { id, name, description, price, imageSrc, category, inStock, categoryId: 0, isOnSale: false, brand: "" };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inStock) {
      addToCart(product);
    }
  };

  if (compact) {
    return (
      <div className="bg-white rounded-lg overflow-hidden hover-card border border-gray-100">
        <div className="relative">
          <Link to={`/product/${id}`}>
            <img 
              src={imageSrc} 
              alt={name}
              className="w-full h-32 object-cover transition-transform duration-500 hover:scale-105"
            />
          </Link>
          {!inStock && (
            <div className="absolute top-0 left-0 right-0 bg-amber-500/80 text-white text-xs font-medium text-center py-1">
              Out of Stock
            </div>
          )}
        </div>
        
        <div className="p-3">
          <Link to={`/product/${id}`}>
            <h3 className="font-medium text-sm tracking-tight mb-1 hover:text-pharma-600 transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-sm">${price.toFixed(2)}</span>
            
            <button 
              disabled={!inStock}
              onClick={handleAddToCart}
              className={`p-1.5 rounded-full ${
                inStock 
                  ? 'bg-pharma-600 text-white hover:bg-pharma-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              } transition-colors`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden hover-card border border-gray-100">
      <div className="relative">
        <Link to={`/product/${id}`}>
          <img 
            src={imageSrc} 
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
        <div className="absolute top-3 right-3 z-10">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="inline-block py-1 px-2 bg-pharma-100 text-pharma-700 text-xs font-medium rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-lg tracking-tight mb-1 hover:text-pharma-600 transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-lg">${price.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {inStock ? (
              <span className="text-xs text-green-600 bg-green-50 py-0.5 px-2 rounded-full">In Stock</span>
            ) : (
              <span className="text-xs text-amber-600 bg-amber-50 py-0.5 px-2 rounded-full">Out of Stock</span>
            )}
            
            <button 
              disabled={!inStock}
              onClick={handleAddToCart}
              className={`p-2 rounded-full ${
                inStock 
                  ? 'bg-pharma-600 text-white hover:bg-pharma-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              } transition-colors`}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
