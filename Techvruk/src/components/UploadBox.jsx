import { useState, useRef } from "react";

export default function UploadBox({ onImageUpload, uploadedImage, fileName }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      alert("Only PNG or JPG files are supported.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => onImageUpload(e.target.result, file.name);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleInputChange = (e) => handleFile(e.target.files[0]);

  return (
    <div className="upload-section">
      <div className="section-label">DIAGRAM INPUT</div>
      <div
        className={`upload-box ${isDragging ? "dragging" : ""} ${uploadedImage ? "has-image" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !uploadedImage && fileInputRef.current.click()}
      >
        {uploadedImage ? (
          <div className="upload-preview">
            <img src={uploadedImage} alt="Preview" className="preview-thumb" />
            <div className="upload-meta">
              <span className="file-icon">◈</span>
              <span className="file-name">{fileName}</span>
              <button
                className="replace-btn"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}
              >
                REPLACE
              </button>
            </div>
          </div>
        ) : (
          <div className="upload-empty">
            <div className="upload-icon">⬡</div>
            <p className="upload-primary">DROP DIAGRAM HERE</p>
            <p className="upload-secondary">or click to browse</p>
            <span className="upload-formats">PNG · JPG</span>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleInputChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
