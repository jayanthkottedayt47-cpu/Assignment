export default function ComponentList({ components, selectedId, onSelect }) {
  return (
    <div className="component-panel">
      <div className="panel-header">
        <span className="panel-label">COMPONENTS</span>
        <span className="component-count">{components.length}</span>
      </div>

      <div className="component-list">
        {components.length === 0 ? (
          <div className="list-empty">
            <p>Loading components…</p>
          </div>
        ) : (
          components.map((comp, i) => (
            <button
              key={comp.id}
              className={`component-item ${selectedId === comp.id ? "selected" : ""}`}
              onClick={() => onSelect(comp.id)}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="comp-symbol">{comp.symbol}</span>
              <div className="comp-info">
                <span className="comp-name">{comp.name}</span>
                <span className="comp-desc">{comp.description}</span>
              </div>
              {selectedId === comp.id && <span className="comp-active-dot"></span>}
            </button>
          ))
        )}
      </div>

      {selectedId && (
        <div className="selection-bar">
          <span>◈ {components.find((c) => c.id === selectedId)?.name} selected</span>
          <button className="clear-btn" onClick={() => onSelect(null)}>✕</button>
        </div>
      )}
    </div>
  );
}
