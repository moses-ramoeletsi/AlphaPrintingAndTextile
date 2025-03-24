
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const { id, title, description, icon: Icon, image } = service;
  
  return (
    <div 
      className="group relative rounded-xl overflow-hidden bg-white border border-slate-100 shadow-sm card-hover"
    >
      <div className="aspect-w-4 aspect-h-3 overflow-hidden bg-slate-100">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6">
            <div className="text-center space-y-2">
              <span className="block text-slate-400">Service Image</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 text-red-500">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        </div>
        
        <p className="text-slate-600 text-sm min-h-[4rem]">{description}</p>
        
        <Link 
          to={`/services/${id}`} 
          className="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-300"
        >
          Learn more
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
