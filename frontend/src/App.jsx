import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Products from './pages/Products';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OrderPage from './pages/OrderPage';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import { Toaster as Sonner} from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';


function App() {
  const [appReady, setAppReady] = useState(false);
  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 500);
   
    return () => clearTimeout(timer);
  }, []);
 
  if (!appReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">PrintShop</h1>
          <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }
 
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
    </TooltipProvider>
  )
}

// Improved protected route component with better loading state handling
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  
  // Show consistent loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 rounded-full border-3 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // Redirect if admin access required but user is not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // User is authenticated and meets admin requirements if needed
  return children;
};

// Auth page with proper redirection
const AuthRedirect = () => {
  const { user, isAdmin, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 rounded-full border-3 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  if (user) {
    // Redirect based on user role
    return <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />;
  }
  
  return <Auth />;
};

// Separate AppRoutes component with Layout
const AppRoutes = () => {
  const { loading } = useAuth();
  
  // Global loading state for auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 rounded-full border-3 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Auth page with improved role-based redirect logic */}
        <Route path="/auth" element={<AuthRedirect />} />
        
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;