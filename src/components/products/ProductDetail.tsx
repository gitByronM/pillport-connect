
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  PlusCircle, 
  MinusCircle,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PharmacyAvailability from './PharmacyAvailability';
import { toast } from "sonner";

// Example product data
const productData = {
  id: 1,
  name: "Aspirin 100mg",
  description: "Pain reliever and fever reducer. Used to treat mild to moderate pain, and also to reduce fever or inflammation.",
  longDescription: "Aspirin is used to reduce fever and relieve mild to moderate pain from conditions such as muscle aches, toothaches, common cold, and headaches. It may also be used to reduce pain and swelling in conditions such as arthritis. Aspirin is known as a salicylate and a nonsteroidal anti-inflammatory drug (NSAID). It works by blocking a certain natural substance in your body to reduce pain and swelling.",
  price: 12.99,
  images: [
    "https://images.unsplash.com/photo-1626285829162-35f3f40c3352?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=1000"
  ],
  category: "Pain Relief",
  brand: "HealthPlus",
  rating: 4.5,
  reviews: 128,
  inStock: true,
  dosage: "Take 1-2 tablets every 4-6 hours as needed, with a full glass of water. Do not exceed 12 tablets in 24 hours.",
  sideEffects: "May cause stomach bleeding, upset stomach, heartburn, or allergic reactions. Consult your doctor if you experience severe side effects.",
  contraindications: "Do not take if you are allergic to aspirin, have a bleeding disorder, stomach ulcers, or are taking blood thinners. Consult your doctor if you have asthma, liver or kidney disease.",
  relatedProducts: [2, 4, 5, 7]
};

interface ProductDetailProps {
  id?: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ id = 1 }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart`, {
      description: `${productData.name} - $${(productData.price * quantity).toFixed(2)}`,
      duration: 3000
    });
  };
  
  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-pharma-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-pharma-600 transition-colors">Products</Link>
        <span>/</span>
        <Link to="/products/category/1" className="hover:text-pharma-600 transition-colors">{productData.category}</Link>
        <span>/</span>
        <span className="text-foreground">{productData.name}</span>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left column - Images */}
        <div className="lg:w-1/2">
          <div className="relative bg-white rounded-xl overflow-hidden mb-4 aspect-square">
            <img 
              src={productData.images[selectedImage]} 
              alt={productData.name}
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
          </div>
          
          <div className="flex space-x-4">
            {productData.images.map((image, index) => (
              <button 
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-lg overflow-hidden w-20 h-20 border-2 transition-colors ${
                  index === selectedImage ? 'border-pharma-600' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${productData.name} - view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Right column - Product info */}
        <div className="lg:w-1/2">
          <div className="flex items-center space-x-3 mb-2">
            <span className="inline-block py-1 px-2 bg-pharma-100 text-pharma-700 text-xs font-medium rounded-full">
              {productData.category}
            </span>
            <span className="inline-block py-1 px-2 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              {productData.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(productData.rating) 
                      ? 'text-yellow-500 fill-yellow-500' 
                      : i < productData.rating 
                        ? 'text-yellow-500 fill-yellow-500 half-filled' 
                        : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {productData.rating} ({productData.reviews} reviews)
            </span>
          </div>
          
          <p className="text-lg font-bold mb-6">${productData.price.toFixed(2)}</p>
          
          <p className="text-muted-foreground mb-6">{productData.description}</p>
          
          {/* Brand */}
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-sm font-medium">Brand:</span>
            <span className="text-sm text-muted-foreground">{productData.brand}</span>
          </div>
          
          {/* Quantity selector */}
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button 
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
              >
                <MinusCircle className="w-5 h-5" />
              </button>
              <span className="w-10 text-center">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
            <button 
              className="flex-1 flex items-center justify-center px-6 py-3 bg-pharma-600 text-white rounded-lg hover:bg-pharma-700 transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button className="flex items-center justify-center px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className="w-5 h-5 mr-2" />
              Save
            </button>
            <button className="flex items-center justify-center px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          
          {/* Benefits */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3 mb-3">
              <Truck className="w-5 h-5 text-pharma-600 mt-0.5" />
              <div>
                <h3 className="font-medium">Free Delivery</h3>
                <p className="text-sm text-muted-foreground">Free shipping on orders over $50</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-pharma-600 mt-0.5" />
              <div>
                <h3 className="font-medium">Quality Guarantee</h3>
                <p className="text-sm text-muted-foreground">All products are verified for authenticity</p>
              </div>
            </div>
          </div>
          
          {/* Product tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-6">
              <button 
                onClick={() => setActiveTab('description')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'description' ? 'border-pharma-600 text-pharma-600' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('dosage')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'dosage' ? 'border-pharma-600 text-pharma-600' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Dosage
              </button>
              <button 
                onClick={() => setActiveTab('sideEffects')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'sideEffects' ? 'border-pharma-600 text-pharma-600' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Side Effects
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {activeTab === 'description' && (
              <p className="text-foreground leading-relaxed">{productData.longDescription}</p>
            )}
            
            {activeTab === 'dosage' && (
              <div className="space-y-3">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-pharma-600 mr-2 mt-0.5" />
                  <p className="text-foreground leading-relaxed">{productData.dosage}</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-800">
                  <strong>Important:</strong> Always follow your doctor's instructions. The information provided is for general reference only.
                </div>
              </div>
            )}
            
            {activeTab === 'sideEffects' && (
              <div className="space-y-3">
                <p className="text-foreground leading-relaxed">{productData.sideEffects}</p>
                <h4 className="font-medium mt-4">Contraindications:</h4>
                <p className="text-foreground leading-relaxed">{productData.contraindications}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pharmacy Availability Section */}
      <PharmacyAvailability productId={id || 1} productName={productData.name} />
      
      {/* Back button */}
      <div className="mt-10">
        <Link 
          to="/products" 
          className="inline-flex items-center text-pharma-600 hover:text-pharma-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
