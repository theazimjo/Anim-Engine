import React, { useEffect, useRef, useState } from 'react'
import { Renderer } from '../engine/Renderer'
import { loadImage, getAssetsToLoad } from '../engine/AssetStore'

export default function Viewport({ characters, currentFrame, isPlaying, bgColor, zoom, animeMode = false }) {
  const canvasRef = useRef(null)
  const rendererRef = useRef(null)
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  // Interpolation function
  const interpolate = (keyframes, frame) => {
    if (!keyframes || keyframes.length === 0) return 0;
    const sorted = [...keyframes].sort((a, b) => a.frame - b.frame);
    if (frame <= sorted[0].frame) return sorted[0].value;
    if (frame >= sorted[sorted.length - 1].frame) return sorted[sorted.length - 1].value;
    for (let i = 0; i < sorted.length - 1; i++) {
      const start = sorted[i];
      const end = sorted[i + 1];
      if (frame >= start.frame && frame <= end.frame) {
        const t = (frame - start.frame) / (end.frame - start.frame);
        return start.value + (end.value - start.value) * t;
      }
    }
    return 0;
  }

  // Procedural Blinking Logic
  const getBlinkScale = (frame) => {
    const cycle = 120; 
    const phase = frame % cycle;
    const blinkDuration = 6;
    if (phase >= cycle - blinkDuration && phase <= cycle) {
        const mid = cycle - (blinkDuration/2);
        if (phase < mid) return 1 - (phase - (cycle - blinkDuration)) / (blinkDuration/2);
        return (phase - mid) / (blinkDuration/2);
    }
    return 1;
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    const r = new Renderer(canvasRef.current);
    rendererRef.current = r;
    const assets = getAssetsToLoad();
    Promise.all(assets.map(a => loadImage(a.uri).then(img => r.createTexture(a.id, img))))
      .then(() => setAssetsLoaded(true));
  }, []);

  useEffect(() => {
    if (!rendererRef.current || !assetsLoaded) return;
    const r = rendererRef.current;
    let animId;

    const render = () => {
      r.clear();
      
      // Anime Mode: Snap frame to simulate 8fps or 12fps (2s or 3s)
      let effectiveFrame = currentFrame;
      if (animeMode) {
        effectiveFrame = Math.floor(currentFrame / 3) * 3; // "On 3s" approx
      }

      characters.forEach(char => {
        const conf = char.config;
        const rotation = (char.keyframes?.rotation ? interpolate(char.keyframes.rotation, effectiveFrame) : (char.transform?.rotation || 0)) * (Math.PI / 180);
        const headTurn = char.keyframes?.headTurn ? interpolate(char.keyframes.headTurn, effectiveFrame) : (char.transform?.headTurn || 0);
        const posX = char.keyframes?.x ? interpolate(char.keyframes.x, effectiveFrame) : (char.transform?.x || 0);
        const posY = char.keyframes?.y ? interpolate(char.keyframes.y, effectiveFrame) : (char.transform?.y || 0);
        const scale = char.keyframes?.scale ? interpolate(char.keyframes.scale, effectiveFrame) : (char.transform?.scale || 1);

        const sX = (1 + (conf.width / 100) * 0.5) * scale;
        const sY = (1 + (conf.height / 100) * 0.5) * scale;
        
        const baseCX = 800 / 2 - 100 * sX + posX;
        const baseCY = 600 / 2 - 125 * sY + posY;

        r.drawSprite(`hair_back_${conf.hairStyle}`, baseCX, baseCY + conf.hairY, sX, sY, conf.hairColor, rotation);
        r.drawSprite(`body_${conf.body}`, baseCX, baseCY, sX, sY, null, rotation);
        r.drawSprite(`head_${conf.head}`, baseCX, baseCY, sX, sY, null, rotation);
        
        const tx = headTurn * 0.5;
        const blinkScale = getBlinkScale(effectiveFrame);
        r.drawSprite(`eyes_${conf.eyes}`, baseCX + tx, baseCY + conf.eyeY + (1 - blinkScale) * 10, sX, sY * blinkScale, conf.eyeColor, rotation);
        
        r.drawSprite(`nose_${conf.nose}`, baseCX + tx * 0.5, baseCY + conf.noseY, sX, sY, null, rotation);
        r.drawSprite(`mouth_${conf.mouth}`, baseCX + tx * 0.3, baseCY + conf.mouthY, sX, sY, null, rotation);
        r.drawSprite(`acc_${conf.acc}`, baseCX + tx, baseCY, sX, sY, null, rotation);
        r.drawSprite(`hair_front_${conf.hairStyle}`, baseCX, baseCY + conf.hairY, sX, sY, conf.hairColor, rotation);
      });

      if (isPlaying) animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [characters, currentFrame, isPlaying, assetsLoaded, animeMode]);

  return (
    <div id="viewport-container" style={{ backgroundColor: bgColor }}>
      <div className="vp-header">
        <span className="vp-title">MAIN VIEWPORT</span>
        <div className="vp-tabs">
          <button className="vp-tab active">SCENE</button>
          <button className="vp-tab">CAMERA</button>
        </div>
        <div className="vp-spacer"></div>
        <span className="zoom-display">{zoom}%</span>
      </div>
      <div className="vp-wrap">
        <canvas ref={canvasRef} width="800" height="600" id="main-canvas"></canvas>
      </div>
    </div>
  )
}
