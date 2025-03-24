
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // For demo purposes - in a real app, this would connect to a backend
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo users
        if (email === 'user@example.com' && password === 'password') {
          const user = { id: '1', name: 'Demo User', email, role: 'user' };
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          toast.success("Logged in successfully");
          resolve(user);
        } else if (email === 'admin@example.com' && password === 'password') {
          const admin = { id: '2', name: 'Admin User', email, role: 'admin' };
          setUser(admin);
          localStorage.setItem('user', JSON.stringify(admin));
          toast.success("Logged in successfully");
          resolve(admin);
        } else {
          toast.error("Invalid credentials");
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // In a real app, this would create a new user in the database
        const newUser = { id: Date.now().toString(), name, email, role: 'user' };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success("Account created successfully");
        resolve(newUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin: user?.role === 'admin',
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
