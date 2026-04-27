import React, { useEffect, useState } from 'react'
import { Renderer } from '../engine/Renderer'
import { AssetStore, loadImage } from '../engine/AssetStore'

export default function Viewport({
  canvasRef, overlayRef, activeTab, setActiveTab,
  zoom, setZoom, bgColor, characters, selectedCharacter, vfxEnabled,
  vfxParams, currentFrame, isPlaying, layers
}) {
  const [renderer, setRenderer] = useState(null);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Initialize WebGL and Load Assets
  useEffect(() => {
    if (!canvasRef.current) return;
    const r = new Renderer(canvasRef.current);
    
    // Load default assets
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

  // Main Render Loop
  useEffect(() => {
    if (!renderer || !assetsLoaded) return;
    
    let animationFrameId;
    let startTime = performance.now();

    const renderLoop = (time) => {
      renderer.clear();
      
      const elapsedTime = (time - startTime) / 1000.0;
      
      // Draw Characters
      const charLayer = layers.find(l => l.id === 'char1');
      if (charLayer && charLayer.visible) {
        characters.forEach(char => {
          // Calculate center of screen
          const cx = 1280 / 2 - 100; // Face is 200 wide, offset by half
          const cy = 720 / 2 - 150; // Face is 250 high, offset by ~half
          
          // Draw head (base skin color)
          renderer.drawSprite('head', cx, cy);
          
          // Draw eyes (tinted)
          renderer.drawSprite('eyes1', cx, cy, 1, 1, char.eyeColor);
          
          // Draw mouth
          renderer.drawSprite('mouth1', cx, cy);
          
          // Draw hair (tinted using Color Masking Shader!)
          const hairTex = char.hairStyle === 2 ? 'hair2' : 'hair1';
          renderer.drawSprite(hairTex, cx, cy, 1, 1, char.hairColor);
        });
      }

      // Draw VFX (Foreground)
      const vfxLayer = layers.find(l => l.id === 'vfx');
      if (vfxLayer && vfxLayer.visible && vfxEnabled['speedlines']) {
        renderer.drawSpeedlines(
          1280, 720, 
          elapsedTime, 
          vfxParams.color, 
          vfxParams.intensity, 
          vfxParams.speed
        );
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop(performance.now());
    return () => cancelAnimationFrame(animationFrameId);
  }, [renderer, assetsLoaded, characters, layers, currentFrame]);

  return (
    <div id="viewport-container">
      <div className="vp-header">
        <span className="vp-title">VIEWPORT</span>
        <div className="vp-tabs">
          <button 
            className={`vp-tab ${activeTab === 'scene' ? 'active' : ''}`}
            onClick={() => setActiveTab('scene')}
          >Scene</button>
          <button 
            className={`vp-tab ${activeTab === 'vfx' ? 'active' : ''}`}
            onClick={() => setActiveTab('vfx')}
          >VFX Preview</button>
        </div>
        <div className="vp-spacer"></div>
        <button className="vp-ctrl-btn" onClick={() => setZoom(z => Math.max(10, z - 10))}>−</button>
        <div className="zoom-display">{zoom}%</div>
        <button className="vp-ctrl-btn" onClick={() => setZoom(z => Math.min(200, z + 10))}>+</button>
        <button className="vp-ctrl-btn" style={{ marginLeft: '4px' }}>⊡ Fit</button>
      </div>

      <div className="vp-wrap" style={{ backgroundColor: bgColor }}>
        <div style={{ transform: `scale(${zoom / 100})`, position: 'relative', transformOrigin: 'center' }}>
          <canvas 
            id="main-canvas" 
            ref={canvasRef}
            width="1280" 
            height="720"
            style={{ width: '854px', height: '480px' }}
          ></canvas>
        </div>
      </div>
    </div>
  )
}
