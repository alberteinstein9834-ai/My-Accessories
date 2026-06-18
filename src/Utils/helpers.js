import imageCompression from 'browser-image-compression';

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "accessories_upload");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dckrrvlye/image/upload",
    { method: "POST", body: formData }
  );

  const data = await response.json();
  if (!data.secure_url) {
    throw new Error("Cloudinary upload failed");
  }
  return data.secure_url;
};

export const compressImage = async (file) => {
  return await imageCompression(file, {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  });
};

export const formatPrice = (price) => {
  return `₨ ${price?.toLocaleString()}`;
};

export const truncateText = (text, length = 55) => {
  return text?.substring(0, length) + '...';
};