import React from 'react'

const VFX_LIST = [
  { id: 'speedlines', icon: '💨', name: 'Speed Lines', desc: 'Radial action lines' },
  { id: 'aura', icon: '⚡', name: 'Energy Aura', desc: 'Character power aura' },
  { id: 'glow', icon: '✨', name: 'Eye Glow', desc: 'Luminous eye effect' },
  { id: 'impact', icon: '💥', name: 'Impact Frame', desc: 'Flash on action hit' },
  { id: 'sakura', icon: '🌸', name: 'Sakura Petals', desc: 'Falling petal particles' }
]

export default function SidebarRight({
  activeTab, setActiveTab,
  bgColor, setBgColor,
  vfxEnabled, onVfxToggle,
  vfxParams, setVfxParams,
  selectedCharacter, characters, setCharacters,
  currentFrame, addKeyframe
}) {
  const char = characters.find(c => c.id === selectedCharacter);

  const updateChar = (key, value) => {
    setCharacters(prev => prev.map(c => c.id === selectedCharacter ? { ...c, [key]: value } : c));
    // Also add a keyframe automatically
    if (['x', 'y', 'rotation', 'scale', 'headTurn', 'eyeOpen', 'mouthOpen'].includes(key)) {
      addKeyframe(key, value);
    }
  };

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

        {char && (
          <div className="prop-section">
            <div className="prop-section-title">Character Transform</div>
            <div className="prop-row">
              <label>Pos X</label>
              <input type="range" min="-640" max="640" value={char.x || 0} onChange={e => updateChar('x', Number(e.target.value))} />
            </div>
            <div className="prop-row">
              <label>Pos Y</label>
              <input type="range" min="-360" max="360" value={char.y || 0} onChange={e => updateChar('y', Number(e.target.value))} />
            </div>
            <div className="prop-row">
              <label>Scale</label>
              <input type="range" min="10" max="300" value={char.scale || 100} onChange={e => updateChar('scale', Number(e.target.value))} />
            </div>
            <div className="prop-row">
              <label>Rotation</label>
              <input type="range" min="-180" max="180" value={char.rotation || 0} onChange={e => updateChar('rotation', Number(e.target.value))} />
            </div>

            <div className="prop-section-title" style={{marginTop: '16px'}}>Character Colors</div>
            <div className="prop-row">
              <label>Skin</label>
              <input type="color" value={char.skinColor || '#f5ccb0'} onChange={e => updateChar('skinColor', e.target.value)} />
            </div>
            <div className="prop-row">
              <label>Hair</label>
              <input type="color" value={char.hairColor || '#7c3aed'} onChange={e => updateChar('hairColor', e.target.value)} />
            </div>
            <div className="prop-row">
              <label>Eyes</label>
              <input type="color" value={char.eyeColor || '#06b6d4'} onChange={e => updateChar('eyeColor', e.target.value)} />
            </div>
            <div className="prop-row">
              <label>Outfit</label>
              <input type="color" value={char.bodyColor || '#222233'} onChange={e => updateChar('bodyColor', e.target.value)} />
            </div>
            <div className="prop-row">
              <label>Accessory</label>
              <input type="color" value={char.accColor || '#ffffff'} onChange={e => updateChar('accColor', e.target.value)} />
            </div>

            <div className="prop-section-title" style={{marginTop: '16px'}}>Character Rig</div>
            <div className="prop-row">
              <label>Expression</label>
            </div>
            <div className="expr-grid">
              {['neutral', 'happy', 'sad', 'angry', 'surprised', 'blush'].map(e => (
                <button 
                  key={e} 
                  className={`expr-btn ${(char.expression || 'neutral') === e ? 'active' : ''}`}
                  onClick={() => updateChar('expression', e)}
                >
                  {e === 'neutral' ? '😐' : e === 'happy' ? '😊' : e === 'sad' ? '😢' : e === 'angry' ? '😠' : e === 'surprised' ? '😲' : '😳'}
                </button>
              ))}
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <div className="prop-row">
                <label>Head Turn</label>
                <input type="range" min="-45" max="45" value={char.headTurn || 0} onChange={e => updateChar('headTurn', Number(e.target.value))} />
              </div>
              <div className="prop-row">
                <label>Body Turn</label>
                <input type="range" min="-45" max="45" value={char.bodyTurn || 0} onChange={e => updateChar('bodyTurn', Number(e.target.value))} />
              </div>
              <div className="prop-row">
                <label>Eye Open</label>
                <input type="range" min="0" max="100" value={char.eyeOpen !== undefined ? char.eyeOpen : 100} onChange={e => updateChar('eyeOpen', Number(e.target.value))} />
              </div>
              <div className="prop-row">
                <label>Mouth Open</label>
                <input type="range" min="0" max="100" value={char.mouthOpen || 0} onChange={e => updateChar('mouthOpen', Number(e.target.value))} />
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
