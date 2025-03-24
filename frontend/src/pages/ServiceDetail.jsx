
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const ServiceDetail = () => {
  const { id } = useParams();
  
  // Service details content mapping
  const serviceDetails = {
    embroidery: {
      title: "Embroidery Services",
      description: "High-quality embroidery solutions for all your clothing needs.",
      image: "https://images.unsplash.com/photo-1584661156681-540e80a161d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      longDescription: "Our embroidery service creates durable, high-quality designs that won't fade or wash out. Perfect for corporate apparel, team uniforms, and promotional items.",
      features: [
        "Premium thread quality for vibrant, long-lasting results",
        "Precise stitch patterns for detailed logos and text",
        "Available on various fabrics and garment types",
        "Custom digitization of your artwork or logos",
        "Multiple size options for your embroidery needs"
      ],
      turnaround: "3-5 business days",
      priceRange: "M15-M50 depending on size and complexity"
    },
    vinyl: {
      title: "Vinyl Printing Services",
      description: "Durable vinyl prints for t-shirts, hoodies, and other garments.",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      longDescription: "Our vinyl printing service offers vibrant, long-lasting designs perfect for custom t-shirts, sports jerseys, and promotional wear. Choose from a variety of colors and finishes.",
      features: [
        "Heat-pressed vinyl for maximum durability",
        "Available in matte, glossy, or metallic finishes",
        "Suitable for cotton, polyester, and blended fabrics",
        "Precise cutting for intricate designs",
        "Wash-resistant and long-lasting results"
      ],
      turnaround: "2-4 business days",
      priceRange: "M10-M40 depending on size and color options"
    },
    velvet: {
      title: "Velvet Printing Services",
      description: "Soft and textured velvet prints for a premium feel.",
      image: "https://images.unsplash.com/photo-1513346940221-6f673d962e97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      longDescription: "Our velvet printing service adds a luxurious, soft-touch texture to your garments. This premium finish is perfect for fashion items, special events, and high-end merchandise.",
      features: [
        "Rich, textured finish with a soft-touch feel",
        "Raised design elements for a 3D appearance",
        "Excellent durability and wash resistance",
        "Perfect for fashion apparel and luxury items",
        "Available in multiple colors and dimensions"
      ],
      turnaround: "4-6 business days",
      priceRange: "M20-M60 depending on size and complexity"
    },
    custom: {
      title: "Custom Design Services",
      description: "Work with our designers to create unique, personalized prints.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      longDescription: "Our custom design service pairs you with professional designers who will bring your vision to life. Whether you have a rough sketch or just an idea, we'll create print-ready artwork tailored to your needs.",
      features: [
        "One-on-one consultation with professional designers",
        "Multiple revision rounds to perfect your design",
        "Full color artwork suitable for any printing method",
        "File formats optimized for print quality",
        "Design ownership transferred to you upon completion"
      ],
      turnaround: "5-7 business days for design process",
      priceRange: "M75-M200 depending on complexity and revisions"
    }
  };
  
  // Get service details or fallback to a default
  const service = serviceDetails[id] || {
    title: "Service Not Found",
    description: "The requested service could not be found."
  };
  
  // Get next and previous service IDs for navigation
  const serviceIds = Object.keys(serviceDetails);
  const currentIndex = serviceIds.indexOf(id);
  const prevService = currentIndex > 0 ? serviceIds[currentIndex - 1] : null;
  const nextService = currentIndex < serviceIds.length - 1 ? serviceIds[currentIndex + 1] : null;
  
  return (
    <div className="py-24">
      <div className="container-pad mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex text-sm">
            <Link to="/" className="text-slate-500 hover:text-slate-700">Home</Link>
            <span className="mx-2 text-slate-400">/</span>
            <Link to="/services" className="text-slate-500 hover:text-slate-700">Services</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900 font-medium">{service.title}</span>
          </nav>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden bg-slate-100 shadow-lg">
            {service.image ? (
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-slate-400">Image not available</span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{service.title}</h1>
            <p className="text-xl text-slate-600 mb-6">{service.description}</p>
            <div className="border-t border-b border-slate-200 py-6 mb-6">
              <p className="text-slate-700">{service.longDescription}</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-slate-900">Service Features:</h3>
              <ul className="space-y-3">
                {service.features?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-lg bg-slate-50 p-4">
                <h4 className="text-sm font-medium text-slate-500 mb-1">Turnaround Time:</h4>
                <p className="text-lg font-semibold text-slate-900">{service.turnaround}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <h4 className="text-sm font-medium text-slate-500 mb-1">Price Range:</h4>
                <p className="text-lg font-semibold text-slate-900">{service.priceRange}</p>
              </div>
            </div>
            
            <div className="space-x-4">
              <Link 
                to="/contact" 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-300"
              >
                Request a Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/services" 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors duration-300"
              >
                All Services
              </Link>
            </div>
          </div>
        </div>
        
        {/* Navigation between services */}
        <div className="border-t border-slate-200 pt-8 flex justify-between">
          {prevService ? (
            <Link 
              to={`/services/${prevService}`} 
              className="inline-flex items-center text-slate-700 hover:text-slate-900 font-medium"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Previous Service
            </Link>
          ) : (
            <div></div>
          )}
          
          {nextService ? (
            <Link 
              to={`/services/${nextService}`} 
              className="inline-flex items-center text-slate-700 hover:text-slate-900 font-medium"
            >
              Next Service
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
