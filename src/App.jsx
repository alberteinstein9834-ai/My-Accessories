import React, { useState, useMemo } from 'react';

import './App.css';

// Components - Fixed import paths to match your structure
import Navbar from './Components/Common/Navbar';
import SearchBar from './Components/Common/SearchBar';
import HeroSection from './Components/Layout/HeroSection';
import Footer from './Components/Common/Footer';
import ProductGrid from './Components/Product/ProductGrid';
import ProductDetailModal from './Components/Product/ProductDetailModal';
import AdminLoginModal from './Components/Admin/AdminLoginModal';
import ProductCRUDModal from './Components/Admin/ProductCRUDModal';
import CategoryManagerModal from './Components/Admin/CategoryManagerModal';

// Hooks and Utils
import { useFirebase } from './Hooks/useFirebase';

function App() {
  // State
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [crudModalOpen, setCrudModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "", 
    category: "", 
    price: "", 
    image: "", 
    description: ""
  });

  // Firebase hooks - with default empty arrays
  const { 
    products = [], 
    categories = [], 
    loading, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    addCategory, 
    deleteCategory 
  } = useFirebase();

  // Computed values
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return products.filter((product) => {
      const categoryMatch = selectedCategory === "ALL" ||product.category?.trim() === selectedCategory?.trim();
      const searchMatch = 
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, products, searchTerm]);

  // Handlers
  const handleAdminLogin = (email) => {
    setIsAdminLoggedIn(true);
    setAdminEmail(email);
    setShowAdminLoginModal(false);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminEmail("");
    setCrudModalOpen(false);
    setShowCategoryModal(false);
  };

  const openAddProductModal = () => {
    if (!isAdminLoggedIn) { 
      setShowAdminLoginModal(true); 
      return; 
    }
    if (!categories || categories.length === 0) { 
      alert("⚠️ Please add at least one category first via Manage Categories."); 
      return; 
    }
    setIsAdding(true);
    setEditingProduct(null);
    setSelectedImageFile(null);
    setFormData({
      name: "",
      category: categories[0] || "MEN BRACELET",
      price: "",
      image: "https://picsum.photos/id/1/400/300",
      description: "",
    });
    setCrudModalOpen(true);
  };

  const openEditProductModal = (product) => {
    if (!isAdminLoggedIn) { 
      setShowAdminLoginModal(true); 
      return; 
    }
    setIsAdding(false);
    setEditingProduct(product);
    setSelectedImageFile(null);
    setFormData({ 
      name: product.name, 
      category: product.category, 
      price: product.price.toString(), 
      image: product.image, 
      description: product.description 
    });
    setCrudModalOpen(true);
  };

  const handleSaveProduct = async () => {
    if (!isAdminLoggedIn) { 
      setShowAdminLoginModal(true); 
      return; 
    }
    
    if (!formData.name.trim()) { 
      alert("Product name required"); 
      return; 
    }
    if (!formData.price || parseFloat(formData.price) <= 0) { 
      alert("Valid price required"); 
      return; 
    }
    if (!formData.image.trim()) { 
      alert("Image required"); 
      return; 
    }
    if (!formData.description.trim()) { 
      alert("Description required"); 
      return; 
    }
    
    const priceNum = parseFloat(formData.price);
    const productData = {
      name: formData.name.trim(),
      category: formData.category,
      price: priceNum,
      image: formData.image,
      description: formData.description.trim(),
    };

    try {
      if (isAdding) {
        await addProduct(productData);
        alert(`✅ "${formData.name.trim()}" added successfully!`);
      } else {
        await updateProduct(editingProduct.id, productData);
        alert(`✏️ "${formData.name.trim()}" updated successfully!`);
      }
      setCrudModalOpen(false);
      setSelectedImageFile(null);
    } catch (err) {
      alert("Error saving product: " + err.message);
    }
  };

  const handleDeleteProduct = async (productId, productName) => {
    if (!isAdminLoggedIn) { 
      setShowAdminLoginModal(true); 
      return; 
    }
    if (window.confirm(`⚠️ Permanently delete "${productName}"?`)) {
      try {
        await deleteProduct(productId);
        alert(`🗑️ "${productName}" permanently removed.`);
      } catch (err) { 
        alert("Delete failed: " + err.message); 
      }
    }
  };

  const handleAddCategory = async (categoryName) => {
    try {
      await addCategory(categoryName);
      alert(`✅ Category "${categoryName}" added.`);
    } catch (err) { 
      alert("Failed to add category: " + err.message); 
    }
  };

  const handleDeleteCategory = async (catToDelete) => {
    if (catToDelete === "ALL") return;
    const productsUsing = products.filter(p => p.category === catToDelete);
    let confirmMsg = `⚠️ Delete category "${catToDelete}"?`;
    if (productsUsing.length > 0) {
      confirmMsg = `⚠️ ${productsUsing.length} product(s) use this category. Products will be moved to first available category. Continue?`;
    }
    if (!window.confirm(confirmMsg)) return;
    
    try {
      await deleteCategory(catToDelete);
      
      if (productsUsing.length > 0) {
        const fallbackCat = categories.find(c => c !== catToDelete) || categories[0];
        for (let prod of productsUsing) {
          await updateProduct(prod.id, { category: fallbackCat });
        }
      }
      if (selectedCategory === catToDelete) setSelectedCategory("ALL");
      alert(`🗑️ Category "${catToDelete}" deleted.`);
    } catch (err) { 
      alert("Error deleting category: " + err.message); 
    }
  };

  const openProductDetailModal = (product) => {
    setSelectedProduct(product);
    setDetailModalVisible(true);
  };

  const closeDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedProduct(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", background: "#000" }}>
        <div className="text-center">
          <div className="spinner-border text-warning mb-3" role="status"></div>
          <p className="text-secondary">Loading real-time collection...</p>
        </div>
      </div>
    );
  }

  // Main render
  return (
    
      <div style={{ backgroundColor: "#000000", minHeight: "100vh" }}>
        <Navbar 
          isAdminLoggedIn={isAdminLoggedIn}
          adminEmail={adminEmail}
          onAdminLogin={() => setShowAdminLoginModal(true)}
          onLogout={handleLogout}
          onAddProduct={openAddProductModal}
          onToggleSearch={() => setShowSearch(!showSearch)}
          showSearch={showSearch}
          categories={categories || []}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onManageCategories={() => setShowCategoryModal(true)}
        />

        {showSearch && (
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClear={() => setSearchTerm("")}
          />
        )}

        <HeroSection 
          productCount={filteredProducts.length} 
          isAdmin={isAdminLoggedIn} 
        />

        <div className="container pb-5">
          <ProductGrid 
            products={filteredProducts || []}
            isAdmin={isAdminLoggedIn}
            onEdit={openEditProductModal}
            onDelete={handleDeleteProduct}
            onViewDetail={openProductDetailModal}
            onAddProduct={openAddProductModal}
          />
        </div>

        {isAdminLoggedIn && (
          <button 
            onClick={openAddProductModal} 
            className="floating-add-btn"
          >
            <i className="bi bi-plus-circle-fill me-2"></i> Add New Product
          </button>
        )}

        <ProductDetailModal 
          product={selectedProduct}
          isOpen={detailModalVisible}
          onClose={closeDetailModal}
        />

        <AdminLoginModal 
          isOpen={showAdminLoginModal}
          onClose={() => setShowAdminLoginModal(false)}
          onLogin={handleAdminLogin}
        />

        <ProductCRUDModal 
          isOpen={crudModalOpen}
          isAdding={isAdding}
          formData={formData}
          setFormData={setFormData}
          categories={categories || []}
          onSave={handleSaveProduct}
          onClose={() => setCrudModalOpen(false)}
          uploadingImage={uploadingImage}
          setUploadingImage={setUploadingImage}
          selectedImageFile={selectedImageFile}
          setSelectedImageFile={setSelectedImageFile}
        />

        <CategoryManagerModal 
          isOpen={showCategoryModal}
          categories={categories || []}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onClose={() => setShowCategoryModal(false)}
        />

        <Footer />
      </div>
    
  );
}

export default App;