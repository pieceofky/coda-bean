import React, { useState, useEffect, useMemo } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { ProductDto, productService } from "../services/product.service";

const AdminProductsPage = () => {
  // State management
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductDto | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ProductDto;
    direction: "ascending" | "descending";
  }>({
    key: "id",
    direction: "ascending",
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productService.getAllProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err: any) {
        setError("Failed to fetch products: " + (err.message || ""));
        setLoading(false);
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  // Sorting functionality
  const requestSort = (key: keyof ProductDto) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = useMemo(() => {
    const sortableProducts = [...products];
    if (sortConfig !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  // Filter products based on search query
  const filteredProducts = sortedProducts.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.productName.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    products.forEach((product) => uniqueCategories.add(product.category));
    return Array.from(uniqueCategories);
  }, [products]);

  // Image handling
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Product operations
  const handleAddProduct = () => {
    setCurrentProduct({
      id: 0,
      productName: "",
      description: "",
      price: 0,
      imageUrl: "",
      category: categories[0] || "",
    });
    setSelectedImage(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: ProductDto) => {
    setCurrentProduct({ ...product });
    setImagePreview(product.imageUrl || null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (productId: number) => {
    setProductToDelete(productId);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        const response = await productService.deleteProduct(productToDelete);
        setProducts(products.filter((p) => p.id !== productToDelete));
        console.log("Delete response:", response);
      } catch (err: any) {
        setError("Failed to delete product: " + (err.message || ""));
        console.error(err);
      } finally {
        setIsDeleteConfirmOpen(false);
        setProductToDelete(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;

    try {
      let response: string;
      if (currentProduct.id === 0) {
        // Add new product
        response = await productService.createProduct(
          currentProduct,
          selectedImage,
        );
        console.log("Create response:", response);
      } else {
        // Edit existing product
        response = await productService.updateProduct(
          currentProduct,
          selectedImage,
        );
        console.log("Update response:", response);
      }

      // Refresh products after successful operation
      const fetchedProducts = await productService.getAllProducts();
      setProducts(fetchedProducts);

      setIsModalOpen(false);
      setSelectedImage(null);
      setImagePreview(null);
    } catch (err: any) {
      setError("Failed to save product: " + (err.message || ""));
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A6B57]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Product Management</h2>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6B57] focus:border-[#4A6B57]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <button
            onClick={handleAddProduct}
            className="flex items-center px-4 py-2 bg-[#4A6B57] text-white rounded-lg hover:bg-[#3a5a47] transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("id")}
                  >
                    <div className="flex items-center">
                      ID
                      {sortConfig.key === "id" &&
                        (sortConfig.direction === "ascending" ? (
                          <ArrowUpIcon className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("productName")}
                  >
                    <div className="flex items-center">
                      Name
                      {sortConfig.key === "productName" &&
                        (sortConfig.direction === "ascending" ? (
                          <ArrowUpIcon className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("category")}
                  >
                    <div className="flex items-center">
                      Category
                      {sortConfig.key === "category" &&
                        (sortConfig.direction === "ascending" ? (
                          <ArrowUpIcon className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("price")}
                  >
                    <div className="flex items-center">
                      Price
                      {sortConfig.key === "price" &&
                        (sortConfig.direction === "ascending" ? (
                          <ArrowUpIcon className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product.productName}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                          {product.imageUrl && (
                            <img
                              src={
                                "http://localhost:8080/api/images/product-image/" +
                                product.imageUrl
                              }
                              alt={product.productName}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-[#4A6B57] hover:text-[#3a5a47] mr-4"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {isModalOpen && currentProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    {currentProduct.id === 0
                      ? "Add New Product"
                      : "Edit Product"}
                  </h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="px-6 py-4 space-y-4">
                    <div>
                      <label
                        htmlFor="productName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="productName"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4A6B57] focus:border-[#4A6B57]"
                        value={currentProduct.productName}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            productName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4A6B57] focus:border-[#4A6B57]"
                        value={currentProduct.description}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4A6B57] focus:border-[#4A6B57]"
                        value={currentProduct.price}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            price: parseFloat(e.target.value),
                          })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category
                      </label>
                      <input
                        type="text"
                        id="category"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4A6B57] focus:border-[#4A6B57]"
                        value={currentProduct.category}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            category: e.target.value,
                          })
                        }
                        required
                        list="categories"
                      />
                      <datalist id="categories">
                        {categories.map((category, index) => (
                          <option key={index} value={category} />
                        ))}
                      </datalist>
                    </div>

                    <div>
                      <label
                        htmlFor="imageFile"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Product Image
                      </label>
                      <input
                        type="file"
                        id="imageFile"
                        accept="image/*"
                        className="mt-1 block w-full text-sm text-gray-500
                                                                                                    file:mr-4 file:py-2 file:px-4
                                                                                                    file:rounded-md file:border-0
                                                                                                    file:text-sm file:font-semibold
                                                                                                    file:bg-[#4A6B57] file:text-white
                                                                                                    hover:file:bg-[#3a5a47]"
                        onChange={handleImageChange}
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-32 w-32 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A6B57]"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A6B57] hover:bg-[#3a5a47] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A6B57]"
                    >
                      {currentProduct.id === 0 ? "Add Product" : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteConfirmOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsDeleteConfirmOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Confirm Deletion
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this product? This action
                  cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A6B57]"
                    onClick={() => setIsDeleteConfirmOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={confirmDelete}
                  >
                    Delete
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

export default AdminProductsPage;
