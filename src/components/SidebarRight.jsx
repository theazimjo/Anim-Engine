import React from 'react'

const VFX_LIST = [
  { id: 'speedlines', icon: '💨', name: 'Speed Lines', desc: 'Radial action lines' },
  { id: 'aura', icon: '⚡', name: 'Energy Aura', desc: 'Character power aura' },
  { id: 'glow', icon: '✨', name: 'Eye Glow', desc: 'Luminous eye effect' },
  { id: 'impact', icon: '💥', name: 'Impact Frame', desc: 'Flash on action hit' },
  { id: 'rimlight', icon: '🌟', name: 'Rim Light', desc: 'Back-lit edge glow' },
  { id: 'sakura', icon: '🌸', name: 'Sakura Petals', desc: 'Falling petal particles' }
]

export default function SidebarRight({
  activeTab, setActiveTab,
  bgColor, setBgColor,
  vfxEnabled, onVfxToggle,
  vfxParams, setVfxParams,
  selectedCharacter, characters, setCharacters
}) {
  return (
    <aside id="sidebar-right">
      <div className="right-tabs">
        <button 
          className={`right-tab ${activeTab === 'properties' ? 'active' : ''}`}
          onClick={() => setActiveTab('properties')}
        >PROPERTIES</button>
        <button 
          className={`right-tab ${activeTab === 'vfx' ? 'active' : ''}`}
          onClick={() => setActiveTab('vfx')}
        >VFX</button>
        <button 
          className={`right-tab ${activeTab === 'audio' ? 'active' : ''}`}
          onClick={() => setActiveTab('audio')}
        >AUDIO</button>
      </div>

      <div className={`right-panel ${activeTab === 'properties' ? 'active' : ''}`}>
        <div className="prop-section">
          <div className="prop-section-title">Scene Settings</div>
          <div className="prop-row">
            <label>BG Color</label>
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
          </div>
        </div>

        {selectedCharacter && (
          <div className="prop-section">
            <div className="prop-section-title">Character Rig</div>
            <div className="prop-row">
              <label>Expression</label>
            </div>
            <div className="expr-grid">
              {['neutral', 'happy', 'sad', 'angry', 'surprised', 'blush'].map(e => (
                <button key={e} className={`expr-btn ${e === 'neutral' ? 'active' : ''}`}>
                  {e === 'neutral' ? '😐' : e === 'happy' ? '😊' : e === 'sad' ? '😢' : e === 'angry' ? '😠' : e === 'surprised' ? '😲' : '😳'}
                </button>
              ))}
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <div className="prop-row">
                <label>Head Turn</label>
                <input type="range" min="-45" max="45" defaultValue="0" />
              </div>
              <div className="prop-row">
                <label>Eye Open</label>
                <input type="range" min="0" max="100" defaultValue="100" />
              </div>
              <div className="prop-row">
                <label>Mouth Open</label>
                <input type="range" min="0" max="100" defaultValue="0" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`right-panel ${activeTab === 'vfx' ? 'active' : ''}`}>
        <div className="prop-section-title" style={{ padding: '12px 12px 0' }}>Effects Library</div>
        <div>
          {VFX_LIST.map(vfx => (
            <div key={vfx.id} className="vfx-item">
              <div className="vfx-icon">{vfx.icon}</div>
              <div className="vfx-info">
                <div className="vfx-name">{vfx.name}</div>
                <div className="vfx-desc">{vfx.desc}</div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={vfxEnabled[vfx.id] || false}
                  onChange={(e) => onVfxToggle(vfx.id, e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          ))}
        </div>

        <div className="prop-section" style={{ marginTop: '12px' }}>
          <div className="prop-section-title">Global Parameters</div>
          <div className="prop-row">
            <label>Intensity</label>
            <input 
              type="range" min="0" max="100" 
              value={vfxParams.intensity}
              onChange={e => setVfxParams({...vfxParams, intensity: Number(e.target.value)})}
            />
          </div>
          <div className="prop-row">
            <label>Color</label>
            <input 
              type="color" 
              value={vfxParams.color}
              onChange={e => setVfxParams({...vfxParams, color: e.target.value})}
            />
          </div>
          <div className="prop-row">
            <label>Speed</label>
            <input 
              type="range" min="0" max="100" 
              value={vfxParams.speed}
              onChange={e => setVfxParams({...vfxParams, speed: Number(e.target.value)})}
            />
          </div>
        </div>
      </div>

      <div className={`right-panel ${activeTab === 'audio' ? 'active' : ''}`}>
        <div className="audio-drop">
          <div className="audio-drop-icon">🎵</div>
          <div className="audio-drop-text">Drop audio file here<br/><span>MP3, WAV, OGG supported</span></div>
          <button className="upload-btn">Browse Files</button>
        </div>
        
        <div className="waveform-wrap"></div>
        
        <div className="prop-section">
          <div className="prop-section-title">Auto Lip-Sync</div>
          <div className="prop-row" style={{ justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Enable AI Lip-Sync</span>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="prop-row">
            <label>Sensitivity</label>
            <input type="range" min="0" max="100" defaultValue="60" />
          </div>
        </div>
      </div>
    </aside>
  )
}
