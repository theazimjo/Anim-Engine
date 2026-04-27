import React from 'react'

export default function SidebarLeft({ activeTool, setActiveTool, layers, setLayers, onAddCharacter, onOpenLibrary }) {
  const toggleVisibility = (id) => {
    setLayers(layers.map(l => l.id === id ? { ...l, visible: !l.visible } : l))
  }

  return (
    <aside id="sidebar-left">
      <div className="tool-group">
        <div className="tool-group-label">SCENE</div>
        <button className={`tool-btn ${activeTool === 'select' ? 'active' : ''}`} onClick={() => setActiveTool('select')}>
          <span className="tool-icon">↖</span>
          <span className="tool-label">Select</span>
        </button>
        <button className={`tool-btn ${activeTool === 'camera' ? 'active' : ''}`} onClick={() => setActiveTool('camera')}>
          <span className="tool-icon">📷</span>
          <span className="tool-label">Camera</span>
        </button>
        <button className="tool-btn" onClick={onAddCharacter}>
          <span className="tool-icon">人</span>
          <span className="tool-label">Character</span>
        </button>
        <button className="tool-btn" onClick={onOpenLibrary}>
          <span className="tool-icon">👥</span>
          <span className="tool-label">Library</span>
        </button>
      </div>

      <div className="layers-section">
        <div className="tool-group-label">LAYERS</div>
        <div id="layers-list">
          {layers.map(layer => (
            <div key={layer.id} className="layer-item">
              <button 
                className="layer-vis-btn"
                onClick={() => toggleVisibility(layer.id)}
              >
                {layer.visible ? '👁' : '－'}
              </button>
              <div className="layer-name">{layer.name}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="add-layer-btn">+ Add Layer</button>
    </aside>
  )
}
