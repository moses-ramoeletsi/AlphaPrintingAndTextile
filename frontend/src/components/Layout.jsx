
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, activeAdminTab, setActiveAdminTab }) => {
  const location = useLocation();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  // Page transition effect
  useEffect(() => {
    setIsPageLoaded(false);
    
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar  activeAdminTab={activeAdminTab} setActiveAdminTab={setActiveAdminTab} />
      <main className={`flex-grow transition-opacity duration-500 ease-out-expo ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
