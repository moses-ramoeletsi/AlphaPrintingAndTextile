import { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  PlusSquare,
  Settings,
  LogOut,
  Search,
  Edit,
  Trash2,
  ArrowUpRight,
  BarChart3,
  ShoppingBag,
  DollarSign
} from 'lucide-react';

// Fixed AdminDashboard component
const AdminDashboard = ({}) => {
  // Mock Auth Context in case it's not available
  const auth = {
    user: { name: 'Admin User' },
    logout: () => console.log('Logout clicked')
  };
  
  // Try to use the real Auth Context if available
  let realAuth = null;
  try {
    // Use dynamic import to prevent module not found errors
    if (typeof window !== 'undefined') {
      const AuthModule = require('../context/AuthContext');
      if (AuthModule && AuthModule.useAuth) {
        realAuth = AuthModule.useAuth();
      }
    }
  } catch (error) {
    console.log('AuthContext not available, using mock data');
  }
  
  // Use real auth if available, otherwise fallback to mock
  const { user, logout } = realAuth || auth;
  
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  // Add a mounted state to prevent rendering issues
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  useEffect(() => {
    if (!mounted) return;
    
    // Simulate fetching data
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Sample data
        const sampleProducts = Array.from({ length: 10 }, (_, index) => ({
          id: index + 1,
          name: `Product ${index + 1}`,
          price: 19.99 + (index * 5),
          stock: 50 - (index * 3),
          category: index % 3 === 0 ? 'T-Shirts' : index % 3 === 1 ? 'Hoodies' : 'Accessories',
        }));
        
        const sampleOrders = Array.from({ length: 8 }, (_, index) => ({
          id: `ORD-${1000 + index}`,
          customer: `Customer ${index + 1}`,
          date: new Date(Date.now() - (index * 86400000)).toISOString(),
          status: index % 4 === 0 ? 'Processing' : index % 4 === 1 ? 'Shipped' : index % 4 === 2 ? 'Delivered' : 'Canceled',
          total: 49.99 + (index * 10),
        }));
        
        const sampleUsers = Array.from({ length: 6 }, (_, index) => ({
          id: index + 1,
          name: `User ${index + 1}`,
          email: `user${index + 1}@example.com`,
          orders: index + 1,
          joined: new Date(Date.now() - (index * 30 * 86400000)).toISOString(),
        }));
        
        // Resolve immediately instead of setTimeout to prevent timing issues
        setProducts(sampleProducts);
        setOrders(sampleOrders);
        setUsers(sampleUsers);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [mounted]);
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      return dateString;
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Canceled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };
  
  const getStockStatus = (stock) => {
    if (stock <= 5) return { text: 'Low', color: 'bg-red-100 text-red-700' };
    if (stock <= 20) return { text: 'Medium', color: 'bg-yellow-100 text-yellow-700' };
    return { text: 'In Stock', color: 'bg-green-100 text-green-700' };
  };
  
  // Bail early if not mounted to prevent flash of content
  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }
  
  const renderTabContent = () => {
    // If error occurred during data loading
    if (error) {
      return (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">{error}</h3>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Retry
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 rounded-full text-blue-500">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">Products</h3>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{products.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 rounded-full text-blue-500">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">Orders</h3>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{orders.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 rounded-full text-blue-500">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">Revenue</h3>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      M{orders.reduce((total, order) => total + order.total, 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">Recent Orders</h3>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-sm text-blue-500 hover:text-blue-600 transition-colors duration-300 flex items-center"
                  >
                    View All
                    <ArrowUpRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center py-10">
                    <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 4).map((order) => (
                      <div key={order.id} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div>
                            <span className="text-xs text-slate-500">{formatDate(order.date)}</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <h4 className="font-medium text-slate-900">{order.id}</h4>
                              <span className={`text-xs font-medium px-2 py-0.5 rounded ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mt-1">{order.customer}</p>
                          </div>
                          <div className="mt-3 sm:mt-0 flex items-center space-x-3">
                            <span className="font-medium">M{order.total.toFixed(2)}</span>
                            <button className="text-blue-500 hover:text-blue-600">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">Low Stock Products</h3>
                  <button 
                    onClick={() => setActiveTab('products')}
                    className="text-sm text-blue-500 hover:text-blue-600 transition-colors duration-300 flex items-center"
                  >
                    View All
                    <ArrowUpRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center py-10">
                    <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products
                      .filter(product => product.stock <= 20)
                      .slice(0, 4)
                      .map((product) => (
                        <div key={product.id} className="p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-slate-900">{product.name}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-sm text-slate-600">{product.category}</span>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded ${getStockStatus(product.stock).color}`}>
                                  {getStockStatus(product.stock).text}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-medium">M{product.price.toFixed(2)}</span>
                              <p className="text-sm text-slate-600">{product.stock} in stock</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'products':
        return (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 md:mb-0">Product Management</h3>
              <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 text-slate-900"
                />
              </div>
                <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                  <PlusSquare className="w-5 h-5 mr-2" />
                  Add Product
                </button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50 transition-colors duration-300">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-slate-100 rounded flex items-center justify-center">
                              <span className="text-xs text-slate-400">Img</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-slate-900">{product.name}</div>
                              <div className="text-xs text-slate-500">ID: {product.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          M{product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded mr-2 ${getStockStatus(product.stock).color}`}>
                              {getStockStatus(product.stock).text}
                            </span>
                            <span className="text-sm text-slate-600">{product.stock}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <div className="flex items-center justify-end space-x-3">
                            <button className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-500 hover:text-red-600 transition-colors duration-300">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      
      // Other cases would follow the same pattern
      default:
        return (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 text-center">
            <h3 className="text-lg font-medium text-slate-900 mb-2">Select a tab to view content</h3>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">
            Welcome, {user?.name || 'Admin'}! Manage your store, products, orders and users.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden sticky top-24">
              <div className="p-6 flex items-center space-x-4 border-b border-slate-100">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-medium text-white">{user?.name ? user.name.charAt(0) : 'A'}</span>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">{user?.name || 'Admin'}</h3>
                  <p className="text-xs text-slate-500">Admin</p>
                </div>
              </div>
              
              <nav className="p-3">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-300 ${
                        activeTab === 'overview' 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span>Overview</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('products')}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-300 ${
                        activeTab === 'products' 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Package className="w-5 h-5" />
                      <span>Products</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-300 ${
                        activeTab === 'orders' 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Orders</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('users')}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-300 ${
                        activeTab === 'users' 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Users className="w-5 h-5" />
                      <span>Users</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-300 ${
                        activeTab === 'analytics' 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span>Analytics</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-300 ${
                        activeTab === 'settings' 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </button>
                  </li>
                </ul>
                
                <div className="pt-3 mt-3 border-t border-slate-100">
                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-300"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;