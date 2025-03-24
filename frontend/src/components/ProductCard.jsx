
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { id, name, price, image, category } = product;
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      className={`
        relative rounded-xl overflow-hidden transition-all duration-500 ease-out-expo
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="group relative aspect-w-1 aspect-h-1 bg-slate-100 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6">
            <div className="text-center space-y-2">
              <span className="block text-slate-400">Product Image</span>
            </div>
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 transition-all duration-500 ease-out-expo group-hover:bg-opacity-30 group-hover:opacity-100">
          <div className="flex space-x-3">
            <Link
              to={`/products/${id}`}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-slate-900 shadow-md transform translate-y-3 transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
            >
              <Eye className="w-4 h-4" />
            </Link>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white shadow-md transform translate-y-3 transition-transform duration-500 ease-out-expo group-hover:translate-y-0 hover:bg-blue-600"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white border border-slate-100">
        {category && (
          <span className="inline-block text-xs font-medium text-slate-500 mb-1">
            {category}
          </span>
        )}
        <h3 className="text-base font-medium text-slate-900 mb-1">
          {name}
        </h3>
        <p className="text-blue-500 font-semibold">M{price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
