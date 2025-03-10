
import React from 'react';
import { useCart } from '@/components/cart/CartProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import ShippingOptions from '@/components/cart/ShippingOptions';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '@/components/products/ProductGrid';

const Cart = () => {
  const { items, updateQuantity, removeFromCart } = useCart();
  
  // Get some recommended products (different from cart items)
  const cartProductIds = items.map(item => item.product.id);
  const recommendedProducts = products
    .filter(product => !cartProductIds.includes(product.id))
    .slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-28 py-10 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center mb-8">
            <Link to="/products" className="flex items-center text-pharma-600 hover:text-pharma-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Continue Shopping</span>
            </Link>
          </div>
          
          <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
          
          {items.length === 0 ? (
            <div className="bg-white p-10 rounded-lg border border-gray-200 text-center">
              <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Link 
                to="/products"
                className="bg-pharma-600 text-white px-6 py-3 rounded-md font-medium hover:bg-pharma-700 transition-colors inline-block"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-semibold mb-6">Cart Items ({items.length})</h2>
                  
                  <div className="divide-y divide-gray-100">
                    {items.map(item => (
                      <CartItem
                        key={item.product.id}
                        product={item.product}
                        quantity={item.quantity}
                        onQuantityChange={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>
                </div>
                
                <ShippingOptions />
                
                {recommendedProducts.length > 0 && (
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">You might also like</h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {recommendedProducts.map(product => (
                        <div key={product.id} className="space-y-2">
                          <Link to={`/product/${product.id}`}>
                            <img 
                              src={product.imageSrc} 
                              alt={product.name} 
                              className="w-full h-32 object-cover rounded-md border border-gray-200"
                            />
                          </Link>
                          <Link to={`/product/${product.id}`} className="block">
                            <h3 className="text-sm font-medium line-clamp-2 hover:text-pharma-600 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm font-bold">${product.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="lg:col-span-1">
                <CartSummary items={items} />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
