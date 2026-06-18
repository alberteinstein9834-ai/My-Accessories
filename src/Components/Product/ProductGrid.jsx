import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products = [], isAdmin, onEdit, onDelete, onViewDetail, onAddProduct }) => {
  if (!products || products.length === 0) {
    return (
      <div className="col-12 text-center py-5">
        <i className="bi bi-emoji-frown fs-1 text-secondary"></i>
        <p className="mt-3 text-secondary">No items in this category.</p>
        {isAdmin && <button onClick={onAddProduct} className="admin-btn mt-2" style={{ background: "#d4af37", color: "#000" }}><i className="bi bi-plus-lg"></i> Add Your First Product</button>}
      </div>
    );
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <ProductCard 
            product={product}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewDetail={onViewDetail}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;