import React from 'react';
import { formatPrice } from '../../Utils/helpers';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const WHATSAPP_NUMBER = "923704931949";

  if (!isOpen || !product) return null;

  const getWhatsAppLink = () => {
    const message = `Hello MY Accessories! I would like to purchase *${product.name}* (${formatPrice(product.price)}). Product: ${product.description}. Please share availability.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.95)", backdropFilter: "blur(5px)", zIndex: 1050, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content modal-content-custom">
          <div className="modal-header border-bottom border-secondary">
            <h5 className="modal-title fw-bold gold-text"><i className="bi bi-gem me-2"></i> {product.name}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row g-4">
              <div className="col-md-6 text-center">
                <img src={product.image} alt={product.name} className="img-fluid rounded-3" style={{ maxHeight: "260px", objectFit: "contain", width: "100%", borderRadius: "20px" }} />
              </div>
              <div className="col-md-6">
                <p className="text-secondary mb-2"><i className="bi bi-tag-fill gold-text me-1"></i> <strong>Category:</strong> {product.category}</p>
                <p className="text-white-50 mb-3"><strong>Description:</strong> {product.description}</p>
                <div className="d-flex justify-content-between align-items-center bg-dark p-3 rounded-3 mb-3" style={{ background: "#1a1a1a" }}>
                  <span className="text-secondary">Price:</span>
                  <span className="price-tag fs-2">{formatPrice(product.price)}</span>
                </div>
                <hr className="bg-secondary" />
                <div className="text-center mt-3">
                  <p className="small text-secondary mb-3">📦 Ready to order? Click below to chat on WhatsApp.</p>
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-100 d-flex align-items-center justify-content-center gap-2 py-3">
                    <i className="bi bi-whatsapp fs-4"></i> Order via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer border-top border-secondary">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;