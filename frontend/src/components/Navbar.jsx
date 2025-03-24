import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Package, BarChart3, Users, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Create navigation links conditionally based on user status and role
  const getNavLinks = () => {
    const allLinks = [
      { title: 'Home', path: '/' },
      { title: 'Services', path: '/services' },
      { title: 'Products', path: '/products' },
      { title: 'About', path: '/about' },
      { title: 'Contact', path: '/contact' },
    ];
    
    if (!user) {
      // Not logged in - show all links
      return allLinks;
    } else if (isAdmin) {
      // Admin user - hide Home, About, and Contact
      return allLinks.filter(link => 
        link.title !== 'Services' && 
        link.title !== 'Products' && 
        link.title !== 'Home' && 
        link.title !== 'About' && 
        link.title !== 'Contact'
      );
    } else {
      // Regular user - just hide Home
      return allLinks.filter(link => link.title !== 'Home');
    }
  };
  
  const navLinks = getNavLinks();
  
  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-325 ease-out-expo
    ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}
  `;
  
  const adminTabs = [
    { title: 'Overview', id: 'overview', icon: BarChart3 },
    { title: 'Products', id: 'products', icon: Package },
    { title: 'Orders', id: 'orders', icon: ShoppingBag },
    { title: 'Users', id: 'users', icon: Users },
    { title: 'Analytics', id: 'analytics', icon: BarChart3 },
    { title: 'Settings', id: 'settings', icon: Settings }
  ];

  return (
    <header className={navbarClasses}>
      <div className="container-pad mx-auto">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-tight text-slate-900 transition-all duration-300 hover:text-red-500"
          >
            <img className="h-20 w-20" src="/AlphaLogo.png" alt="AlphaPrinting" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path 
                    ? 'text-red-500' 
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>
          
          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-5">
            {user ? (
              <>
                <Link 
                  to={isAdmin ? "/admin" : "/dashboard"} 
                  className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-900 transition-all duration-300"
                >
                  <User className="w-4 h-4 mr-1" />
                  <span>{isAdmin ? 'Admin' : 'Account'}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-all duration-300"
              >
                Sign In
              </Link>
            )}
            <Link 
              to="/cart" 
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`
          md:hidden absolute top-full left-0 right-0 bg-white shadow-lg 
          transition-all duration-325 ease-out-expo transform origin-top
          ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}
        `}
      >
        <div className="container-pad mx-auto py-5 space-y-5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block text-base font-medium transition-all duration-300 ${
                location.pathname === link.path 
                  ? 'text-red-500' 
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              {link.title}
            </Link>
          ))}
          
          <div className="pt-5 border-t border-slate-100">
            {user ? (
              <>
                <Link 
                  to={isAdmin ? "/admin" : "/dashboard"} 
                  className="block mb-4 text-base font-medium text-slate-700 hover:text-slate-900 transition-all duration-300"
                >
                  {isAdmin ? 'Admin Dashboard' : 'My Account'}
                </Link>
                <button 
                  onClick={logout}
                  className="block text-base font-medium text-slate-700 hover:text-slate-900 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="block text-base font-medium text-slate-700 hover:text-slate-900 transition-all duration-300"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;