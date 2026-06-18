import React, { useState } from 'react';

const AdminLoginModal = ({ isOpen, onClose, onLogin }) => {
  const [loginEmailInput, setLoginEmailInput] = useState("");
  const [loginError, setLoginError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = loginEmailInput.trim().toLowerCase();
    const VERIFIED_EMAILS = JSON.parse(localStorage.getItem("verified_emails")) || ["shayanirshad123s@gmail.com"];
    
    if (VERIFIED_EMAILS.includes(email)) {
      onLogin(email);
      setLoginEmailInput("");
      setLoginError("");
    } else {
      setLoginError("❌ Access Denied. Use verified email");
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.96)", backdropFilter: "blur(8px)", zIndex: 2050, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-content-custom">
          <div className="modal-header border-bottom border-secondary">
            <h5 className="modal-title gold-text fw-bold"><i className="bi bi-shield-lock-fill me-2"></i>Verified Admin Access</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p className="text-secondary mb-3">Only verified email addresses can add, edit, or delete products.</p>
            <form onSubmit={handleSubmit}>
              <label className="form-label small text-secondary">Verified Email *</label>
              <input type="email" className="form-control form-control-custom mb-3" value={loginEmailInput} onChange={(e) => setLoginEmailInput(e.target.value)} required />
              {loginError && <div className="alert alert-danger py-2 small">{loginError}</div>}
              <button type="submit" className="btn w-100" style={{ background: "#d4af37", color: "#000", fontWeight: "bold" }}>Verify & Login</button>
            </form>
            <hr className="bg-secondary mt-4" />
            <p className="text-center text-secondary small mt-3">Email Verification</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;