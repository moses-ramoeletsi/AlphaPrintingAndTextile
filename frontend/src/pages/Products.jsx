import { useState, useEffect } from 'react';
import { Search, Filter, GridIcon, ListIcon } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isGridView, setIsGridView] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching products from API
    const fetchProducts = async () => {
      setIsLoading(true);
      
      // For demo purposes, generate sample products
      const sampleProducts = Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        name: `Product ${index + 1}`,
        price: 19.99 + index * 5,
        category: index % 3 === 0 ? 'T-Shirts' : index % 3 === 1 ? 'Hoodies' : 'Accessories',
        description: 'Premium quality custom printed item.',
      }));
      
      setTimeout(() => {
        setProducts(sampleProducts);
        setFilteredProducts(sampleProducts);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchProducts();
  }, []);
  
  useEffect(() => {
    // Filter products based on search term and category
    let results = products;
    
    if (searchTerm) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      results = results.filter(product => 
        product.category === selectedCategory
      );
    }
    
    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, products]);
  
  const categories = ['all', 'T-Shirts', 'Hoodies', 'Accessories'];
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-slate-50 py-10 border-b border-slate-100">
        <div className="container-pad mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <span className="inline-block py-1 px-3 text-xs font-medium text-blue-700 bg-blue-50 rounded-full mb-3">
              Our Products
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Customize Your Perfect Design
            </h1>
            <p className="text-slate-600 max-w-2xl">
              Browse our collection of high-quality products ready for your custom designs.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container-pad mx-auto max-w-7xl py-8">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="py-2 pl-10 pr-4 w-full bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-slate-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="py-2 px-4 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded-md transition-colors duration-300 ${
                  isGridView ? 'bg-blue-100 text-blue-500' : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                <GridIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded-md transition-colors duration-300 ${
                  !isGridView ? 'bg-blue-100 text-blue-500' : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Products */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">😕</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Products Found</h3>
            <p className="text-slate-600">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        ) : (
          <div className={isGridView 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
            : "space-y-6"
          }>
            {filteredProducts.map((product) => (
              <div key={product.id}>
                {isGridView ? (
                  <ProductCard product={product} />
                ) : (
                  <div className="flex bg-white border border-slate-100 rounded-xl overflow-hidden transition-all duration-500 ease-out-expo hover:shadow-md">
                    <div className="w-1/3 bg-slate-100">
                      <div className="h-full flex items-center justify-center p-6">
                        <span className="text-slate-400">Product Image</span>
                      </div>
                    </div>
                    <div className="w-2/3 p-6">
                      <span className="text-xs font-medium text-slate-500 mb-1 block">
                        {product.category}
                      </span>
                      <h3 className="text-lg font-medium text-slate-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-blue-500 font-semibold">M{product.price.toFixed(2)}</p>
                        <button className="btn-primary py-2 px-4 text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;