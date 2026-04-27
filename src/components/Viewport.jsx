import React, { useEffect, useState } from 'react'
import { Renderer } from '../engine/Renderer'
import { AssetStore, loadImage, getAssetsToLoad } from '../engine/AssetStore'

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
    
    const assets = getAssetsToLoad();
    Promise.all(assets.map(asset => loadImage(asset.uri).then(img => r.createTexture(asset.id, img))))
      .then(() => {
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
          // Transform calculation
          const baseScale = (char.scale || 100) / 100;
          const baseScaleX = (1 + ((char.width || 0) / 100) * 0.5) * baseScale;
          const baseScaleY = (1 + ((char.height || 0) / 100) * 0.5) * baseScale;
          
          // Screen coordinates (relative to center)
          const centerX = 1280 / 2 + (char.x || 0);
          const centerY = 720 / 2 + (char.y || 0);
          
          // Offset to draw from pivot (center of head/body which is 100,125 in 200x250)
          const cx = centerX - (100 * baseScaleX);
          const cy = centerY - (125 * baseScaleY);
          
          const rotation = (char.rotation || 0) * (Math.PI / 180);

          // Note: Renderer.drawSprite currently doesn't support rotation. 
          // For now we apply scale and position. 
          // TODO: Update drawSprite to support rotation matrix.
          
          const headTurnOffset = (char.headTurn || 0) * 0.5 * baseScaleX;
          const eyeTex = `eyes_${char.eyes || 1}`;
          const noseTex = `nose_${char.nose || 1}`;
          const mouthTex = `mouth_${char.mouth || 1}`;
          const accTex = `acc_${char.acc || 1}`;
          const hairTex = `hair_${char.hairStyle || 1}`;

          renderer.drawSprite(`body_${char.body || 1}`, cx, cy, baseScaleX, baseScaleY, char.bodyColor, rotation);
          renderer.drawSprite(`head_${char.head || 1}`, cx, cy, baseScaleX, baseScaleY, char.skinColor, rotation);
          
          // Manual Vertical Offsets from Character Creator
          const eyeY = char.eyeY || 0;
          const noseY = char.noseY || 0;
          const mouthY = char.mouthY || 0;

          // Eyes, Nose, Mouth, and Accessories move with head turn and manual offsets
          renderer.drawSprite(eyeTex, cx + headTurnOffset, cy + eyeY, baseScaleX, baseScaleY, char.eyeColor, rotation);
          renderer.drawSprite(noseTex, cx + headTurnOffset * 0.7, cy + noseY, baseScaleX, baseScaleY, null, rotation);
          renderer.drawSprite(mouthTex, cx + headTurnOffset * 0.6, cy + mouthY, baseScaleX, baseScaleY, null, rotation);
          renderer.drawSprite(accTex, cx + headTurnOffset * 0.8, cy, baseScaleX, baseScaleY, char.accColor, rotation);
          
          // Hair also moves slightly
          renderer.drawSprite(hairTex, cx + headTurnOffset * 0.3, cy, baseScaleX, baseScaleY, char.hairColor, rotation);
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
