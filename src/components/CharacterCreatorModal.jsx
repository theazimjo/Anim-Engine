import React, { useState, useEffect, useRef } from 'react'
import { Renderer } from '../engine/Renderer'
import { AssetStore, loadImage, getAssetsToLoad } from '../engine/AssetStore'

const COLORS = ['#e2e8f0', '#1e293b', '#7c3aed', '#ec4899', '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#facc15', '#6366f1']

export default function CharacterCreatorModal({ onConfirm, onClose }) {
  const [activePart, setActivePart] = useState('hair')
  const [config, setConfig] = useState({
    name: 'New Character',
    head: 1,
    body: 1,
    nose: 1,
    hairStyle: 1, hairColor: '#7c3aed',
    eyes: 1, eyeColor: '#06b6d4',
    mouth: 1, 
    acc: 1,
    width: 0, height: 0,
    eyeY: 0,
    mouthY: 0,
    noseY: 0,
    hairY: 0
  })

  const canvasRef = useRef(null)
  const [renderer, setRenderer] = useState(null)
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  const handleConfig = (key, val) => setConfig(prev => ({ ...prev, [key]: val }))

  useEffect(() => {
    if (!canvasRef.current) return;
    const r = new Renderer(canvasRef.current);
    const assets = getAssetsToLoad();
    Promise.all(assets.map(asset => loadImage(asset.uri).then(img => r.createTexture(asset.id, img))))
      .then(() => {
        setRenderer(r);
        setAssetsLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!renderer || !assetsLoaded) return;
    let frameId;
    const loop = () => {
      renderer.clear();
      const sX = 1 + (config.width / 100) * 0.5;
      const sY = 1 + (config.height / 100) * 0.5;
      const cx = 400/2 - 100*sX;
      const cy = 550/2 - 125*sY;
      
      // 1. Back Hair (Behind everything)
      renderer.drawSprite(`hair_back_${config.hairStyle}`, cx, cy + config.hairY, sX, sY, config.hairColor);
      
      // 2. Body
      renderer.drawSprite(`body_${config.body}`, cx, cy, sX, sY);
      
      // 3. Head
      renderer.drawSprite(`head_${config.head}`, cx, cy, sX, sY);
      
      // 4. Face parts
      renderer.drawSprite(`eyes_${config.eyes}`, cx, cy + config.eyeY, sX, sY, config.eyeColor);
      renderer.drawSprite(`nose_${config.nose}`, cx, cy + config.noseY, sX, sY);
      renderer.drawSprite(`mouth_${config.mouth}`, cx, cy + config.mouthY, sX, sY);
      
      // 5. Accessories
      renderer.drawSprite(`acc_${config.acc}`, cx, cy, sX, sY);
      
      // 6. Front Hair (Bangs)
      renderer.drawSprite(`hair_front_${config.hairStyle}`, cx, cy + config.hairY, sX, sY, config.hairColor);
      
      frameId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(frameId);
  }, [renderer, assetsLoaded, config]);

  const getOptions = () => {
    const cat = activePart === 'hair' ? 'hairFront' : activePart === 'acc' ? 'accessories' : activePart;
    return Object.keys(AssetStore[cat] || {});
  }

  return (
    <div className="studio-view simple">
      <header className="simple-header">
        <div className="header-left">
          <button className="simple-back" onClick={onClose}>← Exit Studio</button>
          <h2>Character Creator</h2>
        </div>
        <div className="header-right">
          <button className="simple-save" onClick={() => onConfirm(config, config.name)}>Save Character</button>
        </div>
      </header>
      
      <main className="simple-main">
        <div className="simple-preview">
          <div className="preview-box">
            <canvas ref={canvasRef} width="400" height="550"></canvas>
          </div>
        </div>
        
        <div className="simple-editor">
          <div className="simple-tabs">
            {['head', 'body', 'hair', 'eyes', 'nose', 'mouth', 'acc'].map(p => (
              <button 
                key={p} 
                className={activePart === p ? 'active' : ''} 
                onClick={() => setActivePart(p)}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="simple-scroll">
            <div className="simple-section">
              <label>Character Name</label>
              <input 
                type="text" 
                value={config.name} 
                onChange={e => handleConfig('name', e.target.value)}
                className="simple-input"
              />
            </div>

            <div className="simple-section">
              <label>Styles</label>
              <div className="simple-grid">
                {getOptions().map(i => (
                  <div 
                    key={i} 
                    className={`simple-card ${config[activePart === 'hair' ? 'hairStyle' : activePart] === parseInt(i) ? 'active' : ''}`}
                    onClick={() => handleConfig(activePart === 'hair' ? 'hairStyle' : activePart, parseInt(i))}
                  >
                    <img src={AssetStore[activePart === 'hair' ? 'hairFront' : activePart === 'acc' ? 'accessories' : activePart][i]} alt="" />
                  </div>
                ))}
              </div>
            </div>

            {(activePart === 'hair' || activePart === 'eyes') && (
              <div className="simple-section">
                <label>Color</label>
                <div className="simple-colors">
                  {COLORS.map(c => (
                    <button 
                      key={c}
                      className={config[activePart === 'hair' ? 'hairColor' : 'eyeColor'] === c ? 'active' : ''}
                      style={{ backgroundColor: c }}
                      onClick={() => handleConfig(activePart === 'hair' ? 'hairColor' : 'eyeColor', c)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="simple-section">
              <label>Adjustments</label>
              {[
                { label: 'Width', key: 'width', min: -50, max: 50 },
                { label: 'Height', key: 'height', min: -50, max: 50 },
                { label: 'Eye Y', key: 'eyeY', min: -30, max: 30 },
                { label: 'Hair Y', key: 'hairY', min: -50, max: 50 },
                { label: 'Nose Y', key: 'noseY', min: -20, max: 20 },
                { label: 'Mouth Y', key: 'mouthY', min: -20, max: 40 },
              ].map(t => (
                <div key={t.key} className="simple-slider">
                  <div className="slider-info"><span>{t.label}</span><span>{config[t.key]}</span></div>
                  <input type="range" min={t.min} max={t.max} value={config[t.key]} onChange={e => handleConfig(t.key, Number(e.target.value))} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
