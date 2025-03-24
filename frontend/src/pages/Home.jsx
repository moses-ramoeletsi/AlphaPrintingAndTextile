import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shirt, Scissors, Palette, CheckCircle, Star } from 'lucide-react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [isVisible, setIsVisible] = useState({
    services: true,
    products: true,
    features: true,
    testimonials: true,
    cta: true
  });
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = ['services', 'products', 'features', 'testimonials', 'cta'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Sample data
  const services = [
    {
      id: 'embroidery',
      title: 'Embroidery',
      description: 'High-quality embroidery for logos, names, and designs on various fabric types.',
      icon: Shirt
    },
    {
      id: 'vinyl',
      title: 'Vinyl Printing',
      description: 'Durable vinyl printing perfect for sports jerseys, team uniforms, and more.',
      icon: Scissors
    },
    {
      id: 'velvet',
      title: 'Velvet Printing',
      description: 'Luxurious velvet printing for a premium look and soft touch feel.',
      icon: Palette
    }
  ];
  
  const featuredProducts = [
    {
      id: 1,
      name: 'Custom T-Shirt',
      price: 29.99,
      category: 'Apparel'
    },
    {
      id: 2,
      name: 'Embroidered Polo',
      price: 39.99,
      category: 'Apparel'
    },
    {
      id: 3,
      name: 'Sports Jersey',
      price: 49.99,
      category: 'Sportswear'
    },
    {
      id: 4,
      name: 'Business Card',
      price: 19.99,
      category: 'Stationery'
    }
  ];
  
  const features = [
    {
      title: 'Premium Quality',
      description: 'We use only the highest quality materials and printing techniques.',
      icon: Star
    },
    {
      title: 'Custom Designs',
      description: 'Work with our designers to create the perfect custom look.',
      icon: Palette
    },
    {
      title: 'Quick Turnaround',
      description: 'Fast processing and delivery for your time-sensitive orders.',
      icon: CheckCircle
    }
  ];
  
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <Hero />
      
      {/* Services Section */}
      <section id="services" className="section bg-white">
        <div className="container-pad mx-auto max-w-7xl">
          <div 
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="inline-block py-1 px-3 text-xs font-medium text-blue-700 bg-blue-50 rounded-full mb-3">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Printing Solutions for All Your Needs
            </h2>
            <p className="text-slate-600">
              We offer a variety of printing services to help bring your designs to life. From embroidery to vinyl and velvet printing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.id}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/services" 
              className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium transition-colors duration-300"
            >
              View All Services
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section id="products" className="section bg-slate-50">
        <div className="container-pad mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block py-1 px-3 text-xs font-medium text-blue-700 bg-blue-50 rounded-full mb-3">
              Featured Products
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Our Popular Items
            </h2>
            <p className="text-slate-600">
              Discover our most popular products that our customers love. Each item is customizable to fit your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="btn-primary inline-flex items-center"
            >
              Shop All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section id="features" className="section bg-white">
        <div className="container-pad mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block py-1 px-3 text-xs font-medium text-blue-700 bg-blue-50 rounded-full mb-3">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                Quality Printing Services, Every Time
              </h2>
              <p className="text-slate-600 mb-8">
                We pride ourselves on delivering exceptional quality and service for every project. Our team of experts ensures that your vision comes to life exactly as you imagined.
              </p>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-500">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">{feature.title}</h3>
                      <p className="text-slate-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative order-first lg:order-last">
              <div className="aspect-w-4 aspect-h-5 rounded-xl overflow-hidden bg-slate-200 shadow-lg">
                {/* Placeholder for features image */}
                <div className="bg-gradient-to-tr from-slate-200 to-slate-300 h-full w-full flex items-center justify-center p-8">
                  <div className="text-center space-y-2">
                    <span className="block text-slate-500 text-lg">Features Image</span>
                    <span className="block text-slate-400 text-sm">Quality printing process</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 backdrop-blur-sm rounded-xl -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white shadow-md rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section id="cta" className="section bg-slate-900 text-white">
        <div className="container-pad mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Printing Project?
            </h2>
            <p className="text-slate-300 mb-8">
              Contact us today to discuss your needs and get a free quote. Our team is ready to help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/products" 
                className="btn-primary bg-blue-500 hover:bg-blue-600"
              >
                Browse Products
              </Link>
              <Link 
                to="/contact" 
                className="btn-secondary bg-white text-slate-900 hover:bg-slate-100"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;