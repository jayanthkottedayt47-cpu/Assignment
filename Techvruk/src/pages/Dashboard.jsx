import { useState, useEffect } from "react";
import UploadBox from "../components/UploadBox";
import DiagramViewer from "../components/DiagramViewer";
import ComponentList from "../components/ComponentList";
import { fetchComponents } from "../services/api";

export default function Dashboard() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    fetchComponents().then(setComponents);
  }, []);

  const handleImageUpload = (dataUrl, name) => {
    setUploadedImage(dataUrl);
    setFileName(name);
  };

  const handleSelectComponent = (id) => {
    setSelectedComponent((prev) => (prev === id ? null : id));
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dash-header">
        <div className="header-left">
          <span className="logo-mark">⬡</span>
          <div>
            <h1 className="dash-title">Diagram Dashboard</h1>
            <p className="dash-sub">Circuit Analysis Interface</p>
          </div>
        </div>
        <div className="header-right">
          <span className={`status-dot ${uploadedImage ? "active" : ""}`}></span>
          <span className="status-text">{uploadedImage ? "DIAGRAM LOADED" : "AWAITING INPUT"}</span>
        </div>
      </header>

      {/* Main content */}
      <main className="dash-main">
        {/* Upload area */}
        <section className="upload-area">
          <UploadBox
            onImageUpload={handleImageUpload}
            uploadedImage={uploadedImage}
            fileName={fileName}
          />
        </section>

        {/* Bottom two columns */}
        <section className="content-grid">
          <DiagramViewer image={uploadedImage} />
          <ComponentList
            components={components}
            selectedId={selectedComponent}
            onSelect={handleSelectComponent}
          />
        </section>
      </main>
    </div>
  );
}
