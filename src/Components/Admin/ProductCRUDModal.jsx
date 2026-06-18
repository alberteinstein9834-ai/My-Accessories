import React, { useRef } from 'react';
import { compressImage, uploadToCloudinary } from '../../Utils/helpers';

const ProductCRUDModal = ({ 
  isOpen, 
  isAdding, 
  formData, 
  setFormData, 
  categories, 
  onSave, 
  onClose, 
  uploadingImage, 
  setUploadingImage,
  selectedImageFile,
  setSelectedImageFile
}) => {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      alert("❌ Please select an image file");
      return;
    }

    setUploadingImage(true);
    try {
      const compressedFile = await compressImage(file);
      const imageUrl = await uploadToCloudinary(compressedFile);
      setFormData(prev => ({ ...prev, image: imageUrl }));
      setSelectedImageFile(compressedFile);
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.95)", backdropFilter: "blur(5px)", zIndex: 1060, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content modal-content-custom">
          <div className="modal-header border-bottom border-secondary">
            <h5 className="modal-title gold-text fw-bold">
              <i className={`bi ${isAdding ? "bi-plus-circle-fill" : "bi-pencil-square"} me-2`}></i>
              {isAdding ? "Add New Product" : "Edit Product"}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small text-secondary fw-semibold">Product Name *</label>
                <input type="text" className="form-control form-control-custom" name="name" value={formData.name} onChange={handleFormChange} placeholder="e.g., Titanium Ring" />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-secondary fw-semibold">Category *</label>
                <select className="form-select form-control-custom" name="category" value={formData.category} onChange={handleFormChange}>
                  {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small text-secondary fw-semibold">Price (PKR) *</label>
                <input type="number" className="form-control form-control-custom" name="price" value={formData.price} onChange={handleFormChange} placeholder="e.g., 2500" />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-secondary fw-semibold">Product Image *</label>
                <div className="upload-area d-flex flex-column align-items-center justify-content-center gap-2" onClick={() => fileInputRef.current?.click()} style={{ cursor: "pointer" }}>
                  <i className="bi bi-images fs-1 gold-text"></i>
                  <span className="text-secondary small">Click to browse from gallery</span>
                  <img src={formData.image} alt="Preview" className="image-preview-circle mt-1" style={{ width: "100px", height: "100px", objectFit: "contain", borderRadius: "12px", border: "1px solid #d4af37" }} onError={(e) => e.target.src = "https://picsum.photos/id/1/100/100"} />
                  {uploadingImage && <div className="spinner-border spinner-border-sm text-warning mt-2" role="status"></div>}
                </div>
                <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleImageUpload} />
                <small className="text-secondary d-block mt-1">✓ Image stored in Cloudinary</small>
              </div>
              <div className="col-12">
                <label className="form-label small text-secondary fw-semibold">Description *</label>
                <textarea className="form-control form-control-custom" rows="3" name="description" value={formData.description} onChange={handleFormChange} placeholder="Detailed product description..."></textarea>
              </div>
            </div>
          </div>
          <div className="modal-footer border-top border-secondary">
            <button className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
            <button className="btn" style={{ background: "#d4af37", color: "#000", fontWeight: "bold" }} onClick={onSave}>
              {isAdding ? <><i className="bi bi-check-lg me-1"></i> Create Product</> : <><i className="bi bi-save me-1"></i> Save Changes</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCRUDModal;