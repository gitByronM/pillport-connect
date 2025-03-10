
import React, { useState } from 'react';
import { Clock, Truck, Package } from 'lucide-react';

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
  icon: React.ReactNode;
}

const ShippingOptions: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('standard');
  
  const shippingOptions: ShippingOption[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Delivery in 3-5 business days',
      price: 4.99,
      estimatedDelivery: '3-5 business days',
      icon: <Truck className="w-5 h-5 text-pharma-600" />
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Delivery in 1-2 business days',
      price: 9.99,
      estimatedDelivery: '1-2 business days',
      icon: <Clock className="w-5 h-5 text-amber-500" />
    },
    {
      id: 'store',
      name: 'Store Pickup',
      description: 'Pick up at your local pharmacy',
      price: 0,
      estimatedDelivery: 'Available in 1 hour',
      icon: <Package className="w-5 h-5 text-green-600" />
    }
  ];
  
  const handleOptionChange = (id: string) => {
    setSelectedOption(id);
  };
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-medium">Shipping Options</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {shippingOptions.map((option) => (
          <label 
            key={option.id}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedOption === option.id ? 'bg-blue-50' : ''
            }`}
          >
            <input
              type="radio"
              name="shippingOption"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => handleOptionChange(option.id)}
              className="h-4 w-4 text-pharma-600 focus:ring-pharma-500"
            />
            
            <div className="ml-4 flex-grow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {option.icon}
                  <span className="font-medium">{option.name}</span>
                </div>
                <span className="font-medium">
                  {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{option.description}</p>
              <p className="text-xs text-gray-400 mt-1">Estimated delivery: {option.estimatedDelivery}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShippingOptions;
