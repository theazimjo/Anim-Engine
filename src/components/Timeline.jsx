import React, { useRef, useEffect } from 'react'

export default function Timeline({ currentFrame, setCurrentFrame, totalFrames, fps, layers, isPlaying, characters = [], onAddKey }) {
  const scrollRef = useRef(null)
  const isDragging = useRef(false)

  const handleMouseDown = (e) => {
    isDragging.current = true
    handleScrub(e)
  }

  const handleMouseMove = (e) => {
    if (isDragging.current) handleScrub(e)
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, x / rect.width))
    setCurrentFrame(Math.floor(percent * totalFrames))
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <div id="timeline-container">
      <div className="tl-header">
        <div className="tl-controls">
          <span className="tl-title">TIMELINE</span>
          <span className="tl-time-readout">
            {Math.floor(currentFrame / fps)}:{(currentFrame % fps).toString().padStart(2, '0')} 
            <span className="tl-total"> / {Math.floor(totalFrames / fps)}:00</span>
          </span>
        </div>
        <div className="tl-actions">
          <button className="tl-btn secondary" onClick={onAddKey}>◆ Add Key</button>
          <button className="tl-btn danger">✕ Clear</button>
        </div>
      </div>
      
      <div className="tl-body">
        <div className="tl-tracks-col">
          <div className="tl-track-label header">TRACKS</div>
          {layers.map(l => (
            <div key={l.id} className="tl-track-label">
              <span className="track-icon">▤</span>
              <span className="track-name">{l.name}</span>
            </div>
          ))}
        </div>
        
        <div 
          className="tl-canvas-col" 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        >
          <div className="tl-canvas-inner" style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* Ruler */}
            <div className="tl-ruler">
              {Array.from({ length: Math.ceil(totalFrames / 10) }).map((_, i) => (
                <div key={i} className="tl-tick" style={{ left: `${(i * 10 / totalFrames) * 100}%` }}>
                  {i % 2 === 0 && <span className="tick-label">{i * 10}</span>}
                </div>
              ))}
            </div>

            {/* Playhead */}
            <div className="tl-playhead" style={{ left: `${(currentFrame / totalFrames) * 100}%` }}>
              <div className="playhead-head"></div>
              <div className="playhead-line"></div>
            </div>

            {/* Keyframe Tracks */}
            {layers.map(l => (
              <div key={l.id} className="tl-track-row">
                {/* Visualizing keyframes if the layer is a character */}
                {characters.find(c => c.id === l.id)?.keyframes && Object.values(characters.find(c => c.id === l.id).keyframes).flat().map((kf, idx) => (
                  <div 
                    key={idx} 
                    className="tl-keyframe" 
                    style={{ left: `${(kf.frame / totalFrames) * 100}%` }}
                    title={`Frame ${kf.frame}`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
