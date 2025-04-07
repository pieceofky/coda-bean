import React, { useState, useEffect } from "react";
import {
  ShoppingCartIcon,
  ExclamationCircleIcon,
  StarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { ProductDto, productService } from "../services/product.service";
import { useNavigate } from "react-router-dom";

interface CartItem extends ProductDto {
  quantity: number;
}

const ProductPage: React.FC = () => {
  // State management
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryDescription, setCategoryDescription] = useState(
    "Browse our premium coffee products",
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"name" | "price">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getAllProducts();
        setProducts(products);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  // Handle image load
  const handleImageLoad = (productId: number) => {
    setImageLoaded((prev) => ({ ...prev, [productId]: true }));
  };

  // Get unique categories from products
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "name") {
        return sortDirection === "asc"
          ? a.productName.localeCompare(b.productName)
          : b.productName.localeCompare(a.productName);
      } else {
        return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
      }
    });

  // Handle category selection
  const handleCategoryClick = (
    category: string | null,
    description?: string,
  ) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setCategoryDescription(description || "Browse our premium coffee products");
  };

  // Cart functions with animations
  const addToCart = (product: ProductDto) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Render star ratings (placeholder - remove if not in your backend)
  const renderStars = () => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon key={star} className={`h-4 w-4 text-gray-300`} />
        ))}
      </div>
    );
  };

  // Attractive category descriptions
  const getCategoryDescription = (category: string | null) => {
    if (!category)
      return (
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif italic text-[#4A6B57] mb-4">
            "Discover the Art of Coffee Perfection"
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            At The Coda Bean, we curate only the finest coffee products to
            elevate your daily ritual.
          </p>
        </div>
      );

    return (
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-serif italic text-[#4A6B57] mb-4">
          "{category} Crafted for Connoisseurs"
        </h2>
        <p className="text-lg text-gray-700">
          Explore our premium selection of {category.toLowerCase()} products
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A6B57]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative bg-[#f9f7f2] bg-opacity-50"
      style={{
        backgroundImage:
          "radial-gradient(#D4A96A 0.5px, transparent 0.5px), radial-gradient(#D4A96A 0.5px, #f9f7f2 0.5px)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 10px 10px",
      }}
    >
      {/* Header */}
      <div className="text-center mb-3 pt-9">
        <h1 className="text-5xl font-bold text-[#4A6B57] mb-4">
          Artisan Essentials
        </h1>
        <p className="text-xl text-[#6E7C6E]">
          Elevate your coffee experience with our premium selection
        </p>
      </div>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 relative z-10">
        {/* Enhanced Search Bar */}
        <div className="mb-8 bg-gradient-to-r from-[#f0e6d2] to-[#e8d9b5] p-4 rounded-lg shadow-sm border border-[#D4A96A]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-[#6b5a3e]" />
              </div>
              <input
                type="text"
                placeholder="Search products by name or description..."
                className="pl-10 pr-4 py-3 w-full border border-[#D4A96A] rounded-lg focus:ring-2 focus:ring-[#4A6B57] focus:border-[#4A6B57] transition-all bg-white bg-opacity-90 text-[#4A6B57] placeholder-[#6b5a3e]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <XMarkIcon className="h-5 w-5 text-[#6b5a3e] hover:text-[#4A6B57]" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-white bg-opacity-90 px-3 py-2 rounded-lg border border-[#D4A96A]">
                <FunnelIcon className="h-5 w-5 text-[#6b5a3e]" />
                <select
                  className="bg-transparent border-none focus:ring-0 text-[#4A6B57]"
                  value={sortOption}
                  onChange={(e) =>
                    setSortOption(e.target.value as "name" | "price")
                  }
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                </select>
                <button
                  onClick={() =>
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  }
                  className="p-1 rounded-md hover:bg-[#f0e6d2] transition-colors text-[#4A6B57]"
                  title={sortDirection === "asc" ? "Ascending" : "Descending"}
                >
                  {sortDirection === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`px-4 py-2 rounded-lg ${!selectedCategory ? "bg-[#4A6B57] text-white" : "bg-white text-[#4A6B57]"} border border-[#4A6B57] hover:bg-[#4A6B57] hover:text-white transition-colors`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-lg ${selectedCategory === category ? "bg-[#4A6B57] text-white" : "bg-white text-[#4A6B57]"} border border-[#4A6B57] hover:bg-[#4A6B57] hover:text-white transition-colors`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="text-lg text-gray-700">
            {getCategoryDescription(selectedCategory)}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="h-64 bg-gray-100 relative overflow-hidden">
                {!imageLoaded[product.id] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse bg-gray-200 w-full h-full"></div>
                  </div>
                )}
                <img
                  src={
                    "http://localhost:8080/api/images/product-image/" +
                    product.imageUrl || "/placeholder-product.jpg"
                  }
                  alt={product.productName}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded[product.id] ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => handleImageLoad(product.id)}
                  onError={() => handleImageLoad(product.id)}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#4A6B57] mb-2">
                  {product.productName}
                </h3>
                {renderStars()}
                <p className="text-gray-600 mb-3 mt-1 text-sm">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#D4A96A]">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-green-600">Available</span>
                </div>
                <motion.button
                  onClick={() => addToCart(product)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full py-2 rounded-lg bg-[#4A6B57] hover:bg-[#3a5a47] text-white transition-colors cursor-pointer"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ExclamationCircleIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700">
              No products found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>

      {/* Floating Cart Button */}
      <motion.button
        onClick={() => setIsCartOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 bg-[#4A6B57] text-white p-4 rounded-full shadow-lg z-40 flex items-center justify-center"
        aria-label="Shopping cart"
      >
        <ShoppingCartIcon className="h-6 w-6" />
        {cartItemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-[#D4A96A] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
          >
            {cartItemCount}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsCartOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-lg z-50"
            >
              <div className="h-full flex flex-col">
                <div className="bg-[#4A6B57] text-white p-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    Your Cart ({cartItemCount})
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-white hover:text-[#D4A96A] transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCartIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Your cart is empty</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {cart.map((item) => (
                        <li key={item.id} className="py-4">
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <div className="h-16 w-16 bg-gray-200 rounded-md overflow-hidden mr-4">
                                <img
                                  src={
                                    item.imageUrl || "/placeholder-product.jpg"
                                  }
                                  alt={item.productName}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium text-[#4A6B57]">
                                  {item.productName}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  ${item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="flex items-center border border-gray-300 rounded-md mr-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                  -
                                </button>
                                <span className="px-2">{item.quantity}</span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="border-t border-gray-200 p-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-[#D4A96A]">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <button
                    className={`w-full py-3 rounded-lg ${cart.length > 0 ? "bg-[#4A6B57] hover:bg-[#3a5a47]" : "bg-gray-400 cursor-not-allowed"} text-white transition-colors`}
                    disabled={cart.length === 0}
                    onClick={() => {
                      if (cart.length > 0) {
                        navigate('/checkout');
                      }
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;
