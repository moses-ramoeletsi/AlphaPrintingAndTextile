
import React from 'react';
import { ArrowRight, Printer, Palette, Scissors, Clock } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  const services = [
    {
      id: 'embroidery',
      title: 'Embroidery',
      description: 'High-quality embroidery services for all types of fabrics. Perfect for logos, names, and custom designs.',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1584661156681-540e80a161d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'vinyl',
      title: 'Vinyl Printing',
      description: 'Durable vinyl prints for t-shirts, hoodies, and other garments. Available in various colors and finishes.',
      icon: Printer,
      image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'velvet',
      title: 'Velvet Printing',
      description: 'Soft and textured velvet prints that add a premium feel to your garments. Ideal for special occasions.',
      icon: Scissors,
      image: 'https://images.unsplash.com/photo-1513346940221-6f673d962e97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'custom',
      title: 'Custom Designs',
      description: 'Work with our design team to create unique, personalized prints for your clothing items.',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'rush',
      title: 'Rush Orders',
      description: 'Need it fast? We offer expedited printing services to meet your tight deadlines.',
      icon: Clock,
      image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
  ];

  return (
    <div className="py-24">
      <div className="container-pad mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Printing Services</h1>
          <p className="text-lg text-slate-600">
            We offer a wide range of high-quality printing services for all your clothing needs.
            From embroidery to vinyl and velvet printing, we have you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-slate-600 mb-6">
            Don't see what you're looking for? Contact us for custom solutions.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-300"
          >
            Get in Touch
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;
