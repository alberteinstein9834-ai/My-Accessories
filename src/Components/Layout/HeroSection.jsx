import React from 'react';

const HeroSection = ({ productCount, isAdmin }) => {
  return (
    <div className="container mt-4 mb-2">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h2 className="section-title text-white fs-2 fw-bold mb-0">⚡ LATEST COLLECTION</h2>
        <div className="d-flex gap-2 align-items-center">
          <p className="text-secondary small mb-0">{productCount} premium items</p>
          {isAdmin && <span className="badge bg-dark border border-warning px-2 py-1 gold-text small"><i className="bi bi-pencil-square"></i> CRUD Active</span>}
        </div>
      </div>
      <hr className="mt-2 mb-4" style={{ background: "#333" }} />
    </div>
  );
};

export default HeroSection;