
import React, { useState } from 'react';
import { Product } from '../products/ProductGrid';

interface CartSummaryProps {
  items: { product: Product; quantity: number }[];
  compact?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ items, compact = false }) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = promoApplied ? subtotal * 0.1 : 0; // 10% discount for demo
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discountAmount + shippingCost;
  
  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'discount10') {
      setPromoApplied(true);
    }
  };
  
  if (compact) {
    return (
      <div className="pt-4 border-t border-gray-200">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          {promoApplied && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Discount</span>
              <span className="text-green-600">-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            {shippingCost === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              <span>${shippingCost.toFixed(2)}</span>
            )}
          </div>
          
          <div className="h-px bg-gray-100 my-2"></div>
          
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        {!promoApplied && (
          <div className="mt-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="flex-grow px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pharma-500"
              />
              <button
                onClick={handleApplyPromo}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors"
              >
                Apply
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Try "DISCOUNT10"</p>
          </div>
        )}
        
        <button className="w-full mt-4 bg-pharma-600 text-white py-2 rounded-md font-medium hover:bg-pharma-700 transition-colors">
          Proceed to checkout
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-32">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        {promoApplied && (
          <div className="flex justify-between">
            <span className="text-green-600">Discount</span>
            <span className="text-green-600">-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          {shippingCost === 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            <span>${shippingCost.toFixed(2)}</span>
          )}
        </div>
        
        {!promoApplied && (
          <div className="pt-3">
            <label htmlFor="promo" className="block text-sm font-medium mb-1">Promo Code</label>
            <div className="flex space-x-2">
              <input
                id="promo"
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pharma-500"
              />
              <button
                onClick={handleApplyPromo}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Apply
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Try "DISCOUNT10"</p>
          </div>
        )}
        
        <div className="h-px bg-gray-200 my-3"></div>
        
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        {subtotal > 0 && (
          <p className="text-xs text-green-600">
            {shippingCost === 0 ? "✓ You qualify for free shipping!" : `Add ${(50 - subtotal).toFixed(2)} more for free shipping`}
          </p>
        )}
      </div>
      
      <button className="w-full mt-6 bg-pharma-600 text-white py-3 rounded-md font-medium text-base hover:bg-pharma-700 transition-colors">
        Continue to checkout
      </button>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          We accept
          <span className="font-medium text-gray-700 ml-1">
            Credit Cards, PayPal, ApplePay
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
