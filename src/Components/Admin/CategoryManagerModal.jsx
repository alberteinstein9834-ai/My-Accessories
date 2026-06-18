import React, { useState } from 'react';

const CategoryManagerModal = ({ isOpen, categories, onAddCategory, onDeleteCategory, onClose }) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");

  if (!isOpen) return null;

  const handleAdd = () => {
    const newCat = newCategoryName.trim().toUpperCase();
    if (!newCat) { setCategoryError("Category name required"); return; }
    if (categories.includes(newCat)) { setCategoryError("Category already exists!"); return; }
    
    onAddCategory(newCat);
    setNewCategoryName("");
    setCategoryError("");
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.96)", backdropFilter: "blur(8px)", zIndex: 2100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-content-custom">
          <div className="modal-header border-bottom border-secondary">
            <h5 className="modal-title gold-text fw-bold"><i className="bi bi-tags me-2"></i>Manage Categories</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-4">
              <label className="form-label small text-secondary fw-semibold">Add New Category</label>
              <div className="d-flex gap-2">
                <input type="text" className="form-control form-control-custom" placeholder="e.g., NECKLACE, WATCH" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
                <button className="btn" style={{ background: "#d4af37", color: "#000", fontWeight: "bold" }} onClick={handleAdd}>Add</button>
              </div>
              {categoryError && <div className="text-danger small mt-1">{categoryError}</div>}
            </div>
            <label className="form-label small text-secondary fw-semibold">Current Categories</label>
            <div className="d-flex flex-wrap gap-2 mt-2">
              {categories.map((cat) => (
                <div key={cat} className="category-item-badge">
                  <span>{cat}</span>
                  <i className="bi bi-trash3 delete-cat-icon ms-2" onClick={() => onDeleteCategory(cat)}></i>
                </div>
              ))}
            </div>
            <p className="text-secondary small mt-3"><i className="bi bi-info-circle"></i> Deleting a category will reassign its products to first available category.</p>
          </div>
          <div className="modal-footer border-top border-secondary">
            <button className="btn btn-outline-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagerModal;