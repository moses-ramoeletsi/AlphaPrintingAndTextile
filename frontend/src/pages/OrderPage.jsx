
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package, Upload, Check, Info, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    product: '',
    quantity: 1,
    printType: '',
    customText: '',
    colors: '',
    design: null,
    designPreview: null,
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    notes: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOrderDetails(prev => ({ 
        ...prev, 
        design: file,
        designPreview: URL.createObjectURL(file)
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Order placed successfully");
    // In a real app, this would submit to a backend
  };
  
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const products = [
    { id: 't-shirt', name: 'T-Shirt', price: 24.99 },
    { id: 'hoodie', name: 'Hoodie', price: 39.99 },
    { id: 'polo', name: 'Polo Shirt', price: 29.99 },
    { id: 'cap', name: 'Cap', price: 19.99 },
  ];
  
  const printTypes = [
    { id: 'embroidery', name: 'Embroidery', description: 'High-quality embroidery for logos and designs' },
    { id: 'vinyl', name: 'Vinyl Printing', description: 'Durable vinyl printing for vivid graphics' },
    { id: 'velvet', name: 'Velvet Printing', description: 'Luxurious velvet printing for a premium look' },
  ];
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Select Product</h3>
              <p className="text-slate-600 text-sm">Choose the product you want to customize.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className={`
                    border rounded-xl p-4 cursor-pointer transition-all duration-300
                    ${orderDetails.product === product.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}
                  `}
                  onClick={() => setOrderDetails(prev => ({ ...prev, product: product.id }))}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-slate-900">{product.name}</h4>
                      <p className="text-slate-600 text-sm mt-1">${product.price.toFixed(2)}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      orderDetails.product === product.id 
                        ? 'border-blue-500 bg-blue-500 text-white' 
                        : 'border-slate-300'
                    }`}>
                      {orderDetails.product === product.id && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mb-6 mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Select Printing Type</h3>
              <p className="text-slate-600 text-sm">Choose how you want your design to be printed.</p>
            </div>
            
            <div className="space-y-4">
              {printTypes.map((type) => (
                <div 
                  key={type.id}
                  className={`
                    border rounded-xl p-4 cursor-pointer transition-all duration-300
                    ${orderDetails.printType === type.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}
                  `}
                  onClick={() => setOrderDetails(prev => ({ ...prev, printType: type.id }))}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-slate-900">{type.name}</h4>
                      <p className="text-slate-600 text-sm mt-1">{type.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      orderDetails.printType === type.id 
                        ? 'border-blue-500 bg-blue-500 text-white' 
                        : 'border-slate-300'
                    }`}>
                      {orderDetails.printType === type.id && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between pt-8">
              <Link to="/products" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                Cancel
              </Link>
              <button 
                onClick={nextStep} 
                disabled={!orderDetails.product || !orderDetails.printType}
                className={`
                  btn-primary flex items-center
                  ${(!orderDetails.product || !orderDetails.printType) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''}
                `}
              >
                Next Step
                <ChevronRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Design Details</h3>
              <p className="text-slate-600 text-sm">Provide the design specifications for your order.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-1">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={orderDetails.quantity}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              
              <div>
                <label htmlFor="customText" className="block text-sm font-medium text-slate-700 mb-1">
                  Custom Text (if applicable)
                </label>
                <input
                  id="customText"
                  name="customText"
                  type="text"
                  value={orderDetails.customText}
                  onChange={handleChange}
                  placeholder="Enter text to be printed"
                  className="input-field"
                />
              </div>
              
              <div>
                <label htmlFor="colors" className="block text-sm font-medium text-slate-700 mb-1">
                  Colors
                </label>
                <input
                  id="colors"
                  name="colors"
                  type="text"
                  value={orderDetails.colors}
                  onChange={handleChange}
                  placeholder="Specify colors (e.g., Red, Blue, Black)"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Upload Design (if applicable)
                </label>
                <div className={`
                  border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300
                  ${orderDetails.design ? 'border-blue-300 bg-blue-50' : 'border-slate-300 hover:border-blue-300'}
                `}>
                  {orderDetails.designPreview ? (
                    <div className="space-y-3">
                      <img 
                        src={orderDetails.designPreview} 
                        alt="Design Preview" 
                        className="max-h-40 mx-auto"
                      />
                      <p className="text-sm text-slate-600">{orderDetails.design.name}</p>
                      <button 
                        onClick={() => setOrderDetails(prev => ({ ...prev, design: null, designPreview: null }))}
                        className="text-red-500 text-sm hover:text-red-600 transition-colors duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="w-10 h-10 text-slate-400 mx-auto" />
                      <p className="text-slate-600">
                        Drag & drop your design file or <label htmlFor="design" className="text-blue-500 cursor-pointer hover:text-blue-600 transition-colors duration-300">browse</label>
                      </p>
                      <p className="text-xs text-slate-500">Supports: PNG, JPG, AI, PSD (Max 10MB)</p>
                      <input 
                        id="design" 
                        name="design" 
                        type="file" 
                        accept=".png,.jpg,.jpeg,.ai,.psd" 
                        onChange={handleFileChange} 
                        className="hidden" 
                      />
                    </div>
                  )}
                </div>
                <p className="mt-2 text-xs flex items-start text-slate-500">
                  <Info className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                  For best results, upload high-resolution images (300 DPI or higher).
                </p>
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  value={orderDetails.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions or details about your order"
                  className="input-field"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-between pt-6">
              <button 
                onClick={prevStep}
                className="text-slate-600 hover:text-slate-900 transition-colors duration-300"
              >
                Back
              </button>
              <button 
                onClick={nextStep} 
                disabled={orderDetails.quantity < 1}
                className={`
                  btn-primary flex items-center
                  ${orderDetails.quantity < 1 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''}
                `}
              >
                Next Step
                <ChevronRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Shipping Information</h3>
              <p className="text-slate-600 text-sm">Provide your shipping details for this order.</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={orderDetails.name}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={orderDetails.email}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={orderDetails.phone}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">
                  Street Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={orderDetails.address}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={orderDetails.city}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-1">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={orderDetails.state}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-slate-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    value={orderDetails.zip}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-6">
              <button 
                onClick={prevStep}
                className="text-slate-600 hover:text-slate-900 transition-colors duration-300"
              >
                Back
              </button>
              <button 
                onClick={nextStep} 
                disabled={!orderDetails.name || !orderDetails.email || !orderDetails.address}
                className={`
                  btn-primary flex items-center
                  ${(!orderDetails.name || !orderDetails.email || !orderDetails.address) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''}
                `}
              >
                Review Order
                <ChevronRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        );
      
      case 4:
        // Calculate total price based on product and quantity
        const selectedProduct = products.find(p => p.id === orderDetails.product);
        const productPrice = selectedProduct ? selectedProduct.price : 0;
        const subtotal = productPrice * orderDetails.quantity;
        const shipping = 5.99;
        const total = subtotal + shipping;
        
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Order Review</h3>
              <p className="text-slate-600 text-sm">Review your order details before proceeding to payment.</p>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-6 space-y-4">
              <h4 className="font-medium text-slate-900">Order Summary</h4>
              
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900">
                      {selectedProduct ? selectedProduct.name : 'Product'} x {orderDetails.quantity}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Printing: {printTypes.find(t => t.id === orderDetails.printType)?.name || 'Not specified'}
                    </p>
                    {orderDetails.customText && (
                      <p className="text-sm text-slate-600 mt-1">
                        Text: "{orderDetails.customText}"
                      </p>
                    )}
                    {orderDetails.colors && (
                      <p className="text-sm text-slate-600 mt-1">
                        Colors: {orderDetails.colors}
                      </p>
                    )}
                  </div>
                  <p className="font-medium text-slate-900">${subtotal.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="border-b border-slate-200 pb-4 pt-2">
                <div className="flex justify-between">
                  <p className="text-slate-600">Subtotal</p>
                  <p className="text-slate-900">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-slate-600">Shipping</p>
                  <p className="text-slate-900">${shipping.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between font-medium">
                  <p className="text-slate-900">Total</p>
                  <p className="text-blue-600">${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-6 space-y-4">
              <h4 className="font-medium text-slate-900">Shipping Information</h4>
              
              <div className="text-sm text-slate-600 space-y-2">
                <p><span className="font-medium text-slate-700">Name:</span> {orderDetails.name}</p>
                <p><span className="font-medium text-slate-700">Email:</span> {orderDetails.email}</p>
                <p><span className="font-medium text-slate-700">Phone:</span> {orderDetails.phone}</p>
                <p><span className="font-medium text-slate-700">Address:</span> {orderDetails.address}, {orderDetails.city}, {orderDetails.state} {orderDetails.zip}</p>
              </div>
            </div>
            
            <div className="pt-6">
              <form onSubmit={handleSubmit}>
                <div className="bg-slate-50 rounded-lg p-6">
                  <h4 className="font-medium text-slate-900 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </h4>
                  
                  <p className="text-sm text-slate-600 mb-4">
                    This is a demo. No actual payment will be processed.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-slate-700 mb-1">
                        Name on Card
                      </label>
                      <input
                        id="cardName"
                        type="text"
                        className="input-field"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-slate-700 mb-1">
                        Card Number
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        className="input-field"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiration" className="block text-sm font-medium text-slate-700 mb-1">
                          Expiration Date
                        </label>
                        <input
                          id="expiration"
                          type="text"
                          className="input-field"
                          placeholder="MM/YY"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-slate-700 mb-1">
                          CVV
                        </label>
                        <input
                          id="cvv"
                          type="text"
                          className="input-field"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-6">
                  <button 
                    type="button"
                    onClick={prevStep}
                    className="text-slate-600 hover:text-slate-900 transition-colors duration-300"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary flex items-center bg-blue-500 hover:bg-blue-600"
                  >
                    Place Order
                    <Package className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="container-pad mx-auto max-w-4xl">
        <div className="mb-10 slide-in-left animate-[slideInFromLeft_0.7s_ease-out]">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Your Order</h1>
          <p className="text-slate-600">
            Follow the steps below to customize and place your printing order.
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-10 slide-up animate-[slideUp_0.7s_ease-out]">
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="relative flex flex-col items-center">
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center z-10
                    ${currentStep >= step 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-200 text-slate-500'}
                    transition-colors duration-300
                  `}
                >
                  {currentStep > step ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                <span className={`
                  text-xs font-medium mt-2 
                  ${currentStep >= step ? 'text-blue-500' : 'text-slate-500'}
                `}>
                  {step === 1 ? 'Product' : 
                   step === 2 ? 'Design' : 
                   step === 3 ? 'Shipping' : 'Review'}
                </span>
                
                {/* Connector line */}
                {step < 4 && (
                  <div className={`
                    absolute top-5 w-full h-0.5 left-1/2 
                    ${currentStep > step ? 'bg-blue-500' : 'bg-slate-200'}
                  `}></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 slide-up animate-[slideUp_0.8s_ease-out]">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
