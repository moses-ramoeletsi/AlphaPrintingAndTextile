import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  User, 
  Package, 
  Clock, 
  Settings, 
  LogOut, 
  ArrowRight,
  ShoppingCart,
  CreditCard
} from 'lucide-react';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching orders
    const fetchOrders = async () => {
      setIsLoading(true);
      
      // For demo purposes, generate sample orders
      const sampleOrders = Array.from({ length: 5 }, (_, index) => ({
        id: `ORD-${1000 + index}`,
        date: new Date(Date.now() - (index * 86400000)).toISOString(),
        status: index === 0 ? 'Processing' : index === 1 ? 'Shipped' : 'Delivered',
        total: 49.99 + (index * 10),
        items: [
          { name: 'Custom T-Shirt', quantity: 2, price: 24.99 },
          { name: 'Embroidered Cap', quantity: 1, price: 19.99 }
        ]
      }));
      
      setTimeout(() => {
        setOrders(sampleOrders);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchOrders();
  }, []);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow p-5 border border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <Package className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Orders</div>
                    <div className="text-xl font-semibold">{orders.length}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-5 border border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-50 p-3 rounded-full">
                    <ShoppingCart className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Cart</div>
                    <div className="text-xl font-semibold">2 Items</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-5 border border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-50 p-3 rounded-full">
                    <CreditCard className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Total Spent</div>
                    <div className="text-xl font-semibold">
                      M{orders.reduce((total, order) => total + order.total, 0).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow border border-slate-100 overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <h3 className="text-lg font-medium">Recent Orders</h3>
                <button onClick={() => setActiveTab('orders')}
                  className="text-sm text-blue-500 hover:text-blue-600 transition-colors duration-300 flex items-center"
                >
                  View All
                  <ArrowRight className="ml-1 w-4 h-4" />
                </button>
              </div>
              
              {isLoading ? (
                <div className="p-10 text-center">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              ) : orders.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="p-5 hover:bg-slate-50 transition-colors duration-300">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-2 md:mb-0">
                          <div className="flex items-center space-x-3">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <div>
                              <div className="font-medium">{order.id}</div>
                              <div className="text-sm text-slate-500">{formatDate(order.date)}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <span className="font-medium">${order.total.toFixed(2)}</span>
                          <button className="text-blue-500 hover:text-blue-600 text-sm">Details</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center text-slate-500">
                  You haven't placed any orders yet.
                </div>
              )}
              
              <div className="p-5 border-t border-slate-100">
                <Link to="/order" className="flex items-center justify-center w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-300">
                  Place New Order
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        );
      
      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-lg font-medium">Your Orders</h3>
            </div>
            
            {isLoading ? (
              <div className="p-10 text-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {formatDate(order.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          M{order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          <button className="text-blue-500 hover:text-blue-600">
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center">
                <p className="text-slate-500 mb-4">You haven't placed any orders yet.</p>
                <Link to="/products" className="text-blue-500 hover:text-blue-600">
                  Explore Products
                </Link>
              </div>
            )}
          </div>
        );
      
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-lg font-medium">Your Profile</h3>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input type="text" defaultValue={user?.name} className="w-full p-2 border border-slate-300 rounded-md" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <input type="email" defaultValue={user?.email} className="w-full p-2 border border-slate-300 rounded-md" readOnly />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input type="tel" className="w-full p-2 border border-slate-300 rounded-md" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Address
                  </label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-md" />
                </div>
              </div>
              
              <div className="pt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-lg font-medium">Account Settings</h3>
            </div>
            
            <div className="p-5 space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-slate-800">Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium text-sm">Email Notifications</div>
                      <div className="text-sm text-slate-500">Receive emails about your orders and account activity</div>
                    </div>
                    <div className="flex items-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium text-sm">SMS Notifications</div>
                      <div className="text-sm text-slate-500">Receive text messages for order updates</div>
                    </div>
                    <div className="flex items-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-slate-800">Security</h4>
                <button className="px-4 py-2 bg-slate-100 text-slate-800 rounded-md hover:bg-slate-200 transition-colors duration-300">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto pt-24 pb-16 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">My Dashboard</h1>
        <p className="text-slate-600">
          Welcome back, {user?.name}! Manage your orders and account settings.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow border border-slate-100 sticky top-6">
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-sm text-slate-500">{user?.email}</div>
                </div>
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
                    <Package className="w-5 h-5" />
                    <span>Overview</span>
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
                    <ShoppingCart className="w-5 h-5" />
                    <span>Orders</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-300 ${
                      activeTab === 'profile' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
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
              
              <div className="pt-4 mt-4 border-t border-slate-100">
                <button 
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-300 text-red-500 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;