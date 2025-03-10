
import React, { useState } from 'react';
import { useCart } from '@/components/cart/CartProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Check, Edit, CreditCard, PaypalLogo, Truck, Clock, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentMethod = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple_pay',
} as const;

type PaymentMethodType = typeof PaymentMethod[keyof typeof PaymentMethod];

const ShippingMethod = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  STORE_PICKUP: 'store_pickup',
} as const;

type ShippingMethodType = typeof ShippingMethod[keyof typeof ShippingMethod];

const Checkout = () => {
  const { items } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(PaymentMethod.CREDIT_CARD);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodType>(ShippingMethod.STANDARD);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  // Example address data (in a real app, this would come from the user's account)
  const [shippingAddress] = useState({
    name: 'John Smith',
    street: '123 Main Street',
    apt: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    phone: '(555) 123-4567'
  });

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const originalPrice = subtotal * 1.15; // Just for demo to show "savings"
  const savings = originalPrice - subtotal;
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount with promo
  const shippingCost = shippingMethod === ShippingMethod.STANDARD ? 4.99 : 
                       shippingMethod === ShippingMethod.EXPRESS ? 9.99 : 0;
  const tax = (subtotal - discount) * 0.08; // 8% tax
  const total = subtotal - discount + shippingCost + tax;

  // Get estimated delivery date based on shipping method
  const getEstimatedDelivery = () => {
    const today = new Date();
    let days;
    
    switch(shippingMethod) {
      case ShippingMethod.EXPRESS:
        days = 2;
        break;
      case ShippingMethod.STORE_PICKUP:
        return 'Available today for pickup';
      default:
        days = 5;
    }
    
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + days);
    return `Est. delivery by ${deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}`;
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'discount10') {
      setPromoApplied(true);
    }
  };

  const handlePlaceOrder = () => {
    // In a real app, would submit order to backend
    alert('Order placed! Thank you for your purchase.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-28 py-10 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center mb-8">
            <Link to="/cart" className="flex items-center text-pharma-600 hover:text-pharma-700 transition-colors">
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
              <span className="text-sm font-medium">Back to Cart</span>
            </Link>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main checkout column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Delivery Address</h2>
                  <button className="text-pharma-600 hover:text-pharma-700 flex items-center text-sm font-medium">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="font-medium">{shippingAddress.name}</p>
                  <p>{shippingAddress.street}, {shippingAddress.apt}</p>
                  <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                  <p>{shippingAddress.country}</p>
                  <p className="mt-2">{shippingAddress.phone}</p>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="delivery-instructions" className="block text-sm font-medium mb-1">
                    Delivery Instructions (Optional)
                  </label>
                  <textarea
                    id="delivery-instructions"
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    placeholder="Special instructions for delivery (e.g., door code, specific location)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pharma-500 min-h-24"
                  />
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:border-pharma-200 ${
                    paymentMethod === PaymentMethod.CREDIT_CARD 
                      ? 'border-pharma-500 bg-pharma-50' 
                      : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === PaymentMethod.CREDIT_CARD}
                      onChange={() => setPaymentMethod(PaymentMethod.CREDIT_CARD)}
                      className="text-pharma-600 focus:ring-pharma-500 h-4 w-4"
                    />
                    <div className="ml-3 flex-grow">
                      <span className="font-medium flex items-center">
                        <CreditCard className="w-5 h-5 mr-2 text-gray-700" />
                        Credit / Debit Card
                      </span>
                      <p className="text-sm text-gray-500 mt-1">Pay securely with your card</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-10 h-6 bg-blue-600 rounded"></div>
                      <div className="w-10 h-6 bg-red-500 rounded"></div>
                      <div className="w-10 h-6 bg-gray-300 rounded"></div>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:border-pharma-200 ${
                    paymentMethod === PaymentMethod.PAYPAL 
                      ? 'border-pharma-500 bg-pharma-50' 
                      : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === PaymentMethod.PAYPAL}
                      onChange={() => setPaymentMethod(PaymentMethod.PAYPAL)}
                      className="text-pharma-600 focus:ring-pharma-500 h-4 w-4"
                    />
                    <div className="ml-3 flex-grow">
                      <span className="font-medium flex items-center">
                        <PaypalLogo className="w-5 h-5 mr-2 text-gray-700" />
                        PayPal
                      </span>
                      <p className="text-sm text-gray-500 mt-1">Fast, secure payment with PayPal</p>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:border-pharma-200 ${
                    paymentMethod === PaymentMethod.APPLE_PAY 
                      ? 'border-pharma-500 bg-pharma-50' 
                      : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === PaymentMethod.APPLE_PAY}
                      onChange={() => setPaymentMethod(PaymentMethod.APPLE_PAY)}
                      className="text-pharma-600 focus:ring-pharma-500 h-4 w-4"
                    />
                    <div className="ml-3 flex-grow">
                      <span className="font-medium flex items-center">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.5 5C15.585 5 16.326 5.28 17 5.75C16.81 6.5 16.333 7 15.667 7.5C15 8 14.22 7.97 13.5 7.75C13.5 6.8 14 6 14.5 5Z" fill="currentColor"/>
                          <path d="M13.5 8C14.5 8 15.5 8.5 16.5 8.5C17.793 8.5 18.622 7.866 19.45 7.232C20.103 6.753 20.757 6.273 21.5 6.5C21 8 20 9.5 19 10C19 13.655 21.5 15.37 21.5 15.37C21.5 15.37 20.5 17 19.5 17.5C18.745 17.866 18.016 18 17.286 18C16.359 18 15.432 17.77 14.5 17.5C13.573 17.235 12.651 17 11.714 17C10.1 17 8.5 18 7.5 18.5C6 15.5 6 12.5 6 11.5C6 9.5 7.5 8 9 8C10.05 8 10.934 8.25 11.817 8.5C12.7 8.75 13.584 9 14.5 9" fill="currentColor"/>
                        </svg>
                        Apple Pay
                      </span>
                      <p className="text-sm text-gray-500 mt-1">Quick and easy payments with Apple Pay</p>
                    </div>
                  </label>
                </div>
                
                {paymentMethod === PaymentMethod.CREDIT_CARD && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-3">Credit card information would be collected here in a production app</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="card-number" className="block text-sm font-medium mb-1">Card Number</label>
                        <input 
                          type="text" 
                          id="card-number" 
                          placeholder="1234 5678 9012 3456" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pharma-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="card-name" className="block text-sm font-medium mb-1">Name on Card</label>
                        <input 
                          type="text" 
                          id="card-name" 
                          placeholder="John Smith" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pharma-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="card-expiry" className="block text-sm font-medium mb-1">Expiry Date</label>
                        <input 
                          type="text" 
                          id="card-expiry" 
                          placeholder="MM/YY" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pharma-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="card-cvv" className="block text-sm font-medium mb-1">CVV</label>
                        <input 
                          type="text" 
                          id="card-cvv" 
                          placeholder="123" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pharma-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Shipping Options */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:border-pharma-200 ${
                    shippingMethod === ShippingMethod.STANDARD 
                      ? 'border-pharma-500 bg-pharma-50' 
                      : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === ShippingMethod.STANDARD}
                      onChange={() => setShippingMethod(ShippingMethod.STANDARD)}
                      className="text-pharma-600 focus:ring-pharma-500 h-4 w-4"
                    />
                    <div className="ml-3 flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-medium flex items-center">
                          <Truck className="w-5 h-5 mr-2 text-pharma-600" />
                          Standard Shipping
                        </span>
                        <span className="font-medium">$4.99</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">3-5 business days</p>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:border-pharma-200 ${
                    shippingMethod === ShippingMethod.EXPRESS 
                      ? 'border-pharma-500 bg-pharma-50' 
                      : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === ShippingMethod.EXPRESS}
                      onChange={() => setShippingMethod(ShippingMethod.EXPRESS)}
                      className="text-pharma-600 focus:ring-pharma-500 h-4 w-4"
                    />
                    <div className="ml-3 flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-medium flex items-center">
                          <Clock className="w-5 h-5 mr-2 text-amber-500" />
                          Express Shipping
                        </span>
                        <span className="font-medium">$9.99</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">1-2 business days</p>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:border-pharma-200 ${
                    shippingMethod === ShippingMethod.STORE_PICKUP 
                      ? 'border-pharma-500 bg-pharma-50' 
                      : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === ShippingMethod.STORE_PICKUP}
                      onChange={() => setShippingMethod(ShippingMethod.STORE_PICKUP)}
                      className="text-pharma-600 focus:ring-pharma-500 h-4 w-4"
                    />
                    <div className="ml-3 flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-medium flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Store Pickup
                        </span>
                        <span className="font-medium text-green-600">Free</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Available today at your selected store</p>
                    </div>
                  </label>
                </div>
                
                <div className="mt-4 flex items-center bg-pharma-50 p-3 rounded-lg">
                  <Clock className="w-5 h-5 text-pharma-600 mr-2" />
                  <p className="text-sm">{getEstimatedDelivery()}</p>
                </div>
              </div>
            </div>
            
            {/* Order Summary Column */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-32">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                {/* Order Items Preview */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</h3>
                    <Link to="/cart" className="text-sm text-pharma-600 hover:text-pharma-700">Edit</Link>
                  </div>
                  
                  <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
                    {items.map(item => (
                      <div key={item.product.id} className="flex space-x-3">
                        <div className="w-16 h-16 flex-shrink-0 border border-gray-200 rounded overflow-hidden">
                          <img src={item.product.imageSrc} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                            <span className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Promo Code */}
                {!promoApplied ? (
                  <div className="mb-6">
                    <label htmlFor="promo-code" className="block text-sm font-medium mb-1">Promo Code</label>
                    <div className="flex space-x-2">
                      <input
                        id="promo-code"
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pharma-500"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors whitespace-nowrap"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Try "DISCOUNT10"</p>
                  </div>
                ) : (
                  <div className="mb-6 flex items-center p-3 bg-green-50 text-green-700 rounded-md">
                    <Check className="w-5 h-5 mr-2" />
                    <span>Promo code applied: 10% off</span>
                  </div>
                )}
                
                {/* Price Breakdown */}
                <div className="space-y-3 border-t border-b border-gray-200 py-4 mb-4">
                  {originalPrice > subtotal && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Original Price</span>
                      <span className="line-through text-gray-400">${originalPrice.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex justify-between">
                      <span className="text-green-600">Savings</span>
                      <span className="text-green-600">-${savings.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {promoApplied && (
                    <div className="flex justify-between">
                      <span className="text-green-600">Promo Discount</span>
                      <span className="text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    {shippingMethod === ShippingMethod.STORE_PICKUP ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <span>${shippingCost.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Total */}
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-pharma-600 text-white py-3 rounded-md font-medium text-base hover:bg-pharma-700 transition-colors mb-4"
                >
                  Place Order
                </button>
                
                {/* Security Note */}
                <div className="text-center">
                  <div className="flex items-center justify-center text-gray-500 text-sm mb-2">
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    <span>Secure checkout</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Your personal data will be used to process your order, support your experience, and for other purposes described in our privacy policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
