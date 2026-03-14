import { useState } from "react";

export default function DiagramViewer({ image }) {
  const [scale, setScale] = useState(1);

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 4));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.25));
  const reset = () => setScale(1);

  return (
    <div className="viewer-panel">
      <div className="panel-header">
        <span className="panel-label">DIAGRAM VIEWER</span>
        {image && (
          <div className="zoom-controls">
            <button className="zoom-btn" onClick={zoomOut} title="Zoom Out">−</button>
            <span className="zoom-level">{Math.round(scale * 100)}%</span>
            <button className="zoom-btn" onClick={zoomIn} title="Zoom In">+</button>
            <button className="zoom-btn reset-btn" onClick={reset} title="Reset">↺</button>
          </div>
        )}
      </div>

      <div className="viewer-canvas">
        {image ? (
          <div className="viewer-image-wrap">
            <img
              src={image}
              alt="Circuit Diagram"
              style={{
                transform: `scale(${scale})`,
                transition: "transform 0.2s ease",
                transformOrigin: "center center",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        ) : (
          <div className="viewer-empty">
            <div className="viewer-grid"></div>
            <div className="viewer-placeholder">
              <span className="placeholder-icon">⬡</span>
              <p>No diagram loaded</p>
              <p className="placeholder-sub">Upload an image to begin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
