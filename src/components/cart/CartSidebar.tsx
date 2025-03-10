
import React from 'react';
import { X } from 'lucide-react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { Product } from '../products/ProductGrid';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: { product: Product; quantity: number }[];
  onQuantityChange: (productId: number, newQuantity: number) => void;
  onRemove: (productId: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onQuantityChange, 
  onRemove 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-xl flex flex-col animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Your Cart ({items.length})</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                  />
                </svg>
              </div>
              <h3 className="font-medium mb-1">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-4">Start shopping to add items to your cart</p>
              <button 
                onClick={onClose}
                className="text-pharma-600 font-medium hover:text-pharma-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map(item => (
                <CartItem
                  key={item.product.id}
                  product={item.product}
                  quantity={item.quantity}
                  onQuantityChange={onQuantityChange}
                  onRemove={onRemove}
                  compact={true}
                />
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <CartSummary items={items} compact={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
