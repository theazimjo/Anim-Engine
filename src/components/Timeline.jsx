import React from 'react'

export default function Timeline({ currentFrame, totalFrames, layers }) {
  return (
    <div id="timeline-container">
      <div className="tl-header">
        <span className="tl-title">TIMELINE</span>
        <div className="tl-spacer"></div>
        <button className="tl-btn">◆ Add Key</button>
        <button className="tl-btn">✕ Delete Key</button>
      </div>
      
      <div className="tl-body">
        <div className="tl-tracks-col">
          <div className="tl-track-label" style={{ height: '24px' }}>Time</div>
          {layers.map(l => (
            <div key={l.id} className="tl-track-label">{l.name}</div>
          ))}
        </div>
        
        <div className="tl-canvas-col">
          <div style={{ position: 'relative', width: '2000px', height: '100%' }}>
            {/* Playhead */}
            <div style={{ 
              position: 'absolute', top: 0, bottom: 0, 
              width: '2px', background: 'var(--accent-pink)',
              left: `${(currentFrame / totalFrames) * 100}%`,
              zIndex: 10, pointerEvents: 'none',
              boxShadow: '0 0 8px var(--accent-pink)'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: '-4px',
                width: 0, height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '6px solid var(--accent-pink)'
              }}></div>
            </div>
            
            {/* Ruler */}
            <div style={{ height: '24px', borderBottom: '1px solid var(--border)', display: 'flex' }}>
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} style={{ 
                  flex: 1, borderLeft: '1px solid rgba(255,255,255,0.1)', 
                  fontSize: '9px', color: 'var(--text-dim)', paddingLeft: '4px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {i * 10}
                </div>
              ))}
            </div>

            {/* Tracks */}
            {layers.map(l => (
              <div key={l.id} style={{ 
                height: '32px', borderBottom: '1px solid rgba(255,255,255,0.04)',
                background: l.id === 'char1' ? 'rgba(124,58,237,0.05)' : 'transparent',
                display: 'flex', alignItems: 'center', padding: '0 4px'
              }}>
                {l.id === 'char1' && (
                  <div style={{
                    width: '60px', height: '12px', background: 'var(--accent-violet)',
                    borderRadius: '2px', marginLeft: '40px',
                    boxShadow: '0 0 8px var(--accent-violet-glow)'
                  }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
