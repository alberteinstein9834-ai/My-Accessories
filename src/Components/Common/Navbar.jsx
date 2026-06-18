import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ 
  isAdminLoggedIn, 
  adminEmail, 
  onAdminLogin, 
  onLogout, 
  onAddProduct,
  onToggleSearch,
  showSearch,
  categories = [],
  selectedCategory,
  onCategorySelect,
  onManageCategories
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{ background: "#010101", borderBottom: "1px solid #222", padding: "0.5rem 0" }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/" style={{ textDecoration: "none" }}>
          <span className="navbar-brand-custom display-6 fw-bold" style={{ fontSize: "1.9rem" }}>MY</span>
          <span style={{ height: "30px", width: "1px", background: "#333", margin: "0 5px" }}></span>
          <span className="text-white-50 fw-light" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>ACCESSORIES STORE</span>
        </Link>
        <button className="navbar-toggler navbar-toggler-custom" type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "#111", border: "1px solid #b8860b", borderRadius: "12px", padding: "8px 12px" }}>
          <i className={`bi ${mobileMenuOpen ? "bi-x-lg" : "bi-grid-3x3-gap-fill"} gold-text`}></i>
        </button>
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? "show" : ""}`}>
          <div className="nav-categories-wrapper ms-lg-4 flex-grow-1">
            <CategoryFilters 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={onCategorySelect}
              isAdminLoggedIn={isAdminLoggedIn}
              onManageCategories={onManageCategories}
            />
          </div>
          <div className="d-flex gap-3 mt-3 mt-lg-0 ms-lg-3 align-items-center flex-wrap">
            {isAdminLoggedIn ? (
              <>
                <span className="verified-badge"><i className="bi bi-check-circle-fill me-1"></i> {adminEmail}</span>
                <button onClick={onAddProduct} className="admin-btn"><i className="bi bi-plus-circle me-1"></i> Add Product</button>
                <button onClick={onLogout} className="admin-btn" style={{ borderColor: "#aaa", color: "#ccc" }}><i className="bi bi-box-arrow-right"></i> Logout</button>
              </>
            ) : (
              <button onClick={onAdminLogin} className="admin-btn"><i className="bi bi-shield-lock me-1"></i> Admin Login</button>
            )}
            <button className="btn p-0 border-0 bg-transparent nav-link-custom" onClick={onToggleSearch} style={{ fontSize: "1.2rem" }}><i className="bi bi-search"></i></button>
            <a href="https://wa.me/923704931949" target="_blank" rel="noopener noreferrer" className="nav-link-custom" style={{ fontSize: "1.2rem", color: "#25D366" }}><i className="bi bi-whatsapp"></i></a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// CategoryFilters sub-component
const CategoryFilters = ({ categories = [], selectedCategory, onCategorySelect, isAdminLoggedIn, onManageCategories }) => {
  const categoryList = ["ALL", ...new Set(categories)];

  return (
    <div className="category-scroll">
      {categoryList.map((cat) => (
        <button 
          key={cat} 
          className={`category-btn ${selectedCategory === cat ? "active" : ""}`} 
          onClick={() => onCategorySelect(cat)}
        >
          {cat}
        </button>
      ))}
      {isAdminLoggedIn && (
        <button onClick={onManageCategories} className="category-manager-btn" style={{ marginTop: "8px" }}>
          <i className="bi bi-gear-fill me-1"></i> Manage Cats
        </button>
      )}
    </div>
  );
};

export default Navbar;