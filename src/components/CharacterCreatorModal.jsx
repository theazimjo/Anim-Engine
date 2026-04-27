import React, { useState, useEffect, useRef } from 'react'
import { Renderer } from '../engine/Renderer'
import { AssetStore, loadImage } from '../engine/AssetStore'

const COLORS = ['#e2e8f0', '#1e293b', '#7c3aed', '#ec4899', '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#facc15', '#6366f1']

export default function CharacterCreatorModal({ onConfirm, onClose }) {
  const [activePart, setActivePart] = useState('hair')
  const [config, setConfig] = useState({
    hairStyle: 1, hairColor: '#7c3aed',
    eyes: 1, eyeColor: '#06b6d4',
    mouth: 1, body: 1,
    width: 0, height: 0
  })

  const canvasRef = useRef(null)
  const [renderer, setRenderer] = useState(null)
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  const handleConfig = (key, val) => setConfig(prev => ({ ...prev, [key]: val }))

  useEffect(() => {
    if (!canvasRef.current) return;
    const r = new Renderer(canvasRef.current);
    
    Promise.all([
      loadImage(AssetStore.head).then(img => r.createTexture('head', img)),
      loadImage(AssetStore.eyes1).then(img => r.createTexture('eyes1', img)),
      loadImage(AssetStore.mouthNeutral).then(img => r.createTexture('mouth1', img)),
      loadImage(AssetStore.hair1).then(img => r.createTexture('hair1', img)),
      loadImage(AssetStore.hair2).then(img => r.createTexture('hair2', img)),
    ]).then(() => {
      setRenderer(r);
      setAssetsLoaded(true);
    });
  }, [canvasRef]);

  // Preview Render Loop
  useEffect(() => {
    if (!renderer || !assetsLoaded) return;
    
    let animationFrameId;
    const renderLoop = () => {
      renderer.clear();
      
      // Calculate scale and position based on proportions
      const baseScaleX = 1 + (config.width / 100) * 0.5;
      const baseScaleY = 1 + (config.height / 100) * 0.5;
      
      const cx = 220 / 2 - (100 * baseScaleX); // Center in 220x310 canvas
      const cy = 310 / 2 - (125 * baseScaleY);
      
      renderer.drawSprite('head', cx, cy, baseScaleX, baseScaleY);
      renderer.drawSprite('eyes1', cx, cy, baseScaleX, baseScaleY, config.eyeColor);
      renderer.drawSprite('mouth1', cx, cy, baseScaleX, baseScaleY);
      
      const hairTex = config.hairStyle === 2 ? 'hair2' : 'hair1';
      renderer.drawSprite(hairTex, cx, cy, baseScaleX, baseScaleY, config.hairColor);

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [renderer, assetsLoaded, config]);

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-header">
          <h2>Character <span>Creator</span></h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="creator-body">
          <div className="creator-preview">
            <div className="creator-canvas-wrap">
              <canvas id="creator-canvas" ref={canvasRef} width="220" height="310"></canvas>
            </div>
            <div className="creator-preview-label">REAL-TIME PREVIEW</div>
          </div>
          
          <div className="creator-controls">
            <div className="vp-tabs" style={{ marginBottom: '16px' }}>
              <button className={`vp-tab ${activePart === 'hair' ? 'active' : ''}`} onClick={() => setActivePart('hair')}>Hair</button>
              <button className={`vp-tab ${activePart === 'eyes' ? 'active' : ''}`} onClick={() => setActivePart('eyes')}>Eyes</button>
              <button className={`vp-tab ${activePart === 'mouth' ? 'active' : ''}`} onClick={() => setActivePart('mouth')}>Mouth</button>
              <button className={`vp-tab ${activePart === 'body' ? 'active' : ''}`} onClick={() => setActivePart('body')}>Body</button>
            </div>

            <div className="creator-section">
              <div className="creator-section-title">Styles</div>
              <div className="part-grid">
                {[1,2].map(i => (
                  <div 
                    key={i} 
                    className={`part-option ${config[activePart === 'hair' ? 'hairStyle' : activePart] === i ? 'selected' : ''}`}
                    onClick={() => handleConfig(activePart === 'hair' ? 'hairStyle' : activePart, i)}
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>

            {(activePart === 'hair' || activePart === 'eyes') && (
              <div className="creator-section">
                <div className="creator-section-title">Color</div>
                <div className="color-row">
                  {COLORS.map(c => (
                    <div 
                      key={c}
                      className={`color-swatch ${config[activePart === 'hair' ? 'hairColor' : 'eyeColor'] === c ? 'selected' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => handleConfig(activePart === 'hair' ? 'hairColor' : 'eyeColor', c)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="creator-section">
              <div className="creator-section-title">Proportions</div>
              <div className="creator-slider-row">
                <label>Width</label>
                <input 
                  type="range" min="-50" max="50" 
                  value={config.width}
                  onChange={e => handleConfig('width', Number(e.target.value))} 
                />
              </div>
              <div className="creator-slider-row">
                <label>Height</label>
                <input 
                  type="range" min="-50" max="50" 
                  value={config.height}
                  onChange={e => handleConfig('height', Number(e.target.value))} 
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-confirm" onClick={() => onConfirm(config)}>Add to Scene</button>
        </div>
      </div>
    </div>
  )
}
