import React from 'react'

export default function SplashScreen() {
  return (
    <div id="splash-screen">
      <div className="splash-inner">
        <div className="splash-logo">⛩</div>
        <div className="splash-title">Animé<span>Forge</span></div>
        <div className="splash-sub">2D Anime Creation Engine</div>
        <div className="splash-bar"><div className="splash-fill"></div></div>
        <div className="splash-status">Initializing WebGL engine...</div>
      </div>
    </div>
  )
}
