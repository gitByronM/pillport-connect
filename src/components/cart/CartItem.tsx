
import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Product } from '../products/ProductGrid';

interface CartItemProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: number, newQuantity: number) => void;
  onRemove: (productId: number) => void;
  compact?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ 
  product, 
  quantity, 
  onQuantityChange, 
  onRemove,
  compact = false 
}) => {
  const increaseQuantity = () => {
    onQuantityChange(product.id, quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(product.id, quantity - 1);
    } else {
      onRemove(product.id);
    }
  };

  if (compact) {
    return (
      <div className="flex items-center py-3 border-b border-gray-100">
        <img 
          src={product.imageSrc} 
          alt={product.name} 
          className="w-16 h-16 rounded-md object-cover border border-gray-200"
        />
        <div className="ml-3 flex-grow">
          <h4 className="text-sm font-medium line-clamp-1">{product.name}</h4>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-1 border border-gray-200 rounded-md">
              <button 
                onClick={decreaseQuantity}
                className="p-1 text-gray-500 hover:text-pharma-600 transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs px-2">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="p-1 text-gray-500 hover:text-pharma-600 transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <span className="text-sm font-semibold">${(product.price * quantity).toFixed(2)}</span>
          </div>
        </div>
        <button 
          onClick={() => onRemove(product.id)}
          className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-start py-6 border-b border-gray-200">
      <div className="w-24 h-24 flex-shrink-0">
        <img 
          src={product.imageSrc} 
          alt={product.name} 
          className="w-full h-full rounded-md object-cover border border-gray-200"
        />
      </div>
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <h3 className="text-base font-medium">{product.name}</h3>
          <span className="font-semibold">${(product.price * quantity).toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-gray-200 rounded-md">
            <button 
              onClick={decreaseQuantity}
              className="px-2 py-1 text-gray-500 hover:text-pharma-600 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-1 border-x border-gray-200">{quantity}</span>
            <button 
              onClick={increaseQuantity}
              className="px-2 py-1 text-gray-500 hover:text-pharma-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={() => onRemove(product.id)}
            className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            <span className="text-sm">Remove</span>
          </button>
        </div>
        {product.isOnSale && (
          <div className="mt-2">
            <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
              Sale
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
