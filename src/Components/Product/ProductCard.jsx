import React from 'react';
import { formatPrice, truncateText } from '../../Utils/helpers';

const ProductCard = ({ product, isAdmin, onEdit, onDelete, onViewDetail }) => {
  return (
    <div className="card product-card card-bg-dark h-100 border-0 rounded-4 position-relative">
      {isAdmin && (
        <div className="position-absolute top-0 end-0 p-2 d-flex gap-2 z-1">
          <div className="crud-icon bg-dark rounded-circle p-1 px-2" onClick={(e) => { e.stopPropagation(); onEdit(product); }} style={{ background: "#000000aa", backdropFilter: "blur(4px)" }}>
            <i className="bi bi-pencil-square text-warning small"></i>
          </div>
          <div className="crud-icon bg-dark rounded-circle p-1 px-2" onClick={(e) => { e.stopPropagation(); onDelete(product.id, product.name); }} style={{ background: "#000000aa", backdropFilter: "blur(4px)" }}>
            <i className="bi bi-trash3 text-danger small"></i>
          </div>
        </div>
      )}
      <img src={product.image} className="card-img-top img-placeholder rounded-top-4" alt={product.name} loading="lazy" style={{ objectFit: "contain", backgroundColor: "#fff", height: "220px", cursor: "pointer" }} onClick={() => onViewDetail(product)} />
      <div className="card-body d-flex flex-column" onClick={() => onViewDetail(product)} style={{ cursor: "pointer" }}>
        <span className="badge bg-dark badge-cat gold-text border border-secondary px-2 py-1 mb-2">{product.category}</span>
        <h5 className="card-title text-white mt-1">{product.name}</h5>
        <p className="card-text text-secondary small mb-2">{truncateText(product.description, 55)}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center pt-2">
          <span className="price-tag fw-bold">{formatPrice(product.price)}</span>
          <i className="bi bi-eye gold-text fs-6"></i>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;