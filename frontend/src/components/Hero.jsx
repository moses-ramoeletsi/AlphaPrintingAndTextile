import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="container-pad mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-2xl">
            <span className="inline-block py-1.5 px-3 text-xs font-medium text-blue-700 bg-blue-50 rounded-full animate-[slideInFromLeft_0.7s_ease-out_forwards]">
              Professional Clothing Printing Services
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900 animate-[slideInFromLeft_0.8s_ease-out_forwards]">
              Bring Your <span className="text-blue-500">Designs</span> to Life
            </h1>
            
            <p className="text-lg text-slate-700 max-w-xl animate-[slideInFromLeft_0.9s_ease-out_forwards]">
              Premium quality printing for your clothing. From embroidery to velvet printing, we create custom designs that stand out.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-[slideInFromLeft_1s_ease-out_forwards]">
              <Link to="/products" className="btn-primary flex items-center justify-center">
                Explore Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link to="/services" className="btn-secondary flex items-center justify-center">
                Our Services
              </Link>
            </div>
          </div>
          
          <div className="relative animate-[slideInFromRight_1s_ease-out_forwards] order-first lg:order-last">
            <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden bg-slate-200 shadow-lg">
              {/* Placeholder for hero image */}
              <div className="bg-gradient-to-tr from-slate-200 to-slate-300 h-full w-full flex items-center justify-center p-8">
                <div className="text-center space-y-2">
                  <span className="block text-slate-500 text-lg">Hero Image</span>
                  <span className="block text-slate-400 text-sm">T-shirts with custom designs</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 backdrop-blur-sm rounded-xl -z-10"></div>
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-white shadow-md rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;