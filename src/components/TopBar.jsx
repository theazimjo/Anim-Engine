import React from 'react'

export default function TopBar({
  isPlaying, setIsPlaying,
  currentFrame, setCurrentFrame,
  totalFrames, fps, setFps,
  animeMode, setAnimeMode
}) {
  return (
    <header id="topbar">
      <div className="topbar-left">
        <div className="logo">
          <span className="logo-icon">⛩</span>
          <span className="logo-text">Animé<span className="logo-accent">Forge</span></span>
          <span className="logo-version">v0.1 ALPHA</span>
        </div>
        <nav className="top-menu">
          <button className="top-nav-btn">File</button>
          <button className="top-nav-btn">Scene</button>
          <button className="top-nav-btn">Character</button>
          <button className="top-nav-btn">Render</button>
        </nav>
      </div>

      <div className="topbar-center">
        <div className="playback">
          <button className="pb-btn" onClick={() => setCurrentFrame(0)}>⏮</button>
          <button className="pb-btn" onClick={() => setCurrentFrame(f => Math.max(0, f - 1))}>⏪</button>
          <button 
            className={`pb-play ${isPlaying ? 'playing' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="pb-btn" onClick={() => setCurrentFrame(f => Math.min(totalFrames, f + 1))}>⏩</button>
          <button className="pb-btn" onClick={() => setCurrentFrame(totalFrames)}>⏭</button>
          
          <div className="frame-info">
            <span className="frame-cur">{currentFrame}</span>
            <span className="frame-sep">/</span>
            <span className="frame-total">{totalFrames}</span>
            <span className="frame-label">fr</span>
          </div>
          
          <div className="anime-toggle-wrap">
            <button 
              className={`anime-toggle-btn ${animeMode ? 'active' : ''}`}
              onClick={() => setAnimeMode(!animeMode)}
              title="Anime Mode (On 2s/3s)"
            >
              AS
            </button>
          </div>

          <select 
            className="fps-select" 
            value={fps} 
            onChange={e => setFps(Number(e.target.value))}
          >
            <option value="8">8 FPS</option>
            <option value="12">12 FPS</option>
            <option value="24">24 FPS</option>
          </select>
        </div>
      </div>

      <div className="topbar-right">
        <button className="export-btn">⬆ Export</button>
        <button className="pb-btn" style={{ fontSize: '16px' }}>⚙</button>
      </div>
    </header>
  )
}
