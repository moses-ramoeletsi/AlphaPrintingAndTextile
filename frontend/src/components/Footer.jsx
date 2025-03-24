
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container-pad mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          <div className="space-y-5">
            <h2 className="text-xl font-bold">PrintShop</h2>
            <p className="text-slate-300 text-sm">
              Premium quality printing services for all your needs. Specializing in embroidery, vinyl, and custom designs.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-slate-300 hover:text-white transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="text-slate-300 hover:text-white transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-slate-300 hover:text-white transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/embroidery" className="text-sm text-slate-300 hover:text-white transition-colors duration-300">
                  Embroidery
                </Link>
              </li>
              <li>
                <Link to="/services/vinyl" className="text-sm text-slate-300 hover:text-white transition-colors duration-300">
                  Vinyl Printing
                </Link>
              </li>
              <li>
                <Link to="/services/velvet" className="text-sm text-slate-300 hover:text-white transition-colors duration-300">
                  Velvet Printing
                </Link>
              </li>
              <li>
                <Link to="/services/custom" className="text-sm text-slate-300 hover:text-white transition-colors duration-300">
                  Custom Designs
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider">Information</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-slate-300 hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-slate-300 hover:text-white transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-slate-300 hover:text-white transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-slate-300 hover:text-white transition-colors duration-300">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="text-sm text-slate-300">
                Nonyana Ea Mpitsa, Qacha's Nek
              </li>
              <li className="text-sm text-slate-300">
                alphaprinting@printshop.com
              </li>
              <li className="text-sm text-slate-300">
                +266 5046-7300
              </li>
              <li>
                <Link to="/contact" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  Get in Touch →
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} AlphaPrinting and Textile (By Reanetse Ramoeletsi). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
