
import React from 'react';
import { Check, Users, Award, Clock } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Check,
      title: 'Quality Guaranteed',
      description: 'We use only the highest quality materials and techniques to ensure your prints look amazing and last longer.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our team of experienced designers and print specialists are dedicated to delivering exceptional results.'
    },
    {
      icon: Award,
      title: 'Award-Winning Service',
      description: 'Recognized for our outstanding customer service and attention to detail in every project.'
    },
    {
      icon: Clock,
      title: 'Quick Turnaround',
      description: 'We offer fast turnaround times without compromising on quality to meet your deadlines.'
    }
  ];

  return (
    <div className="py-24">
      <div className="container-pad mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">About PrintShop</h1>
          <p className="text-lg text-slate-600">
            Your trusted partner for high-quality clothing printing since 2010.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-slate-600">
              <p>
                Founded in 2010, PrintShop began as a small family-owned business with a passion for quality printing and exceptional customer service.
              </p>
              <p>
                Over the years, we've grown into a full-service printing company, specializing in embroidery, vinyl printing, and custom designs for clothing and accessories.
              </p>
              <p>
                Despite our growth, we've maintained our commitment to personalized service and attention to detail that sets us apart from larger printing companies.
              </p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="PrintShop team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-8 md:p-12 mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-500 mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Whether you're looking for custom t-shirts for your business or personalized gifts for a special occasion, we're here to help bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/services"
              className="px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-300"
            >
              Explore Our Services
            </a>
            <a
              href="/contact"
              className="px-6 py-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
