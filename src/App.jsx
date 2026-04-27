import { useState, useRef, useEffect, useCallback } from 'react'
import TopBar from './components/TopBar'
import SidebarLeft from './components/SidebarLeft'
import Viewport from './components/Viewport'
import Timeline from './components/Timeline'
import SidebarRight from './components/SidebarRight'
import SplashScreen from './components/SplashScreen'
import CharacterCreatorModal from './components/CharacterCreatorModal'
import './styles/app.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [activeTool, setActiveTool] = useState('select')
  const [activeTab, setActiveTab] = useState('scene')
  const [activeRightTab, setActiveRightTab] = useState('properties')
  const [showCreator, setShowCreator] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [totalFrames] = useState(240)
  const [fps, setFps] = useState(12)
  const [zoom, setZoom] = useState(100)
  const [bgColor, setBgColor] = useState('#0d0d1a')
  const [vfxEnabled, setVfxEnabled] = useState({})
  const [vfxParams, setVfxParams] = useState({ intensity: 70, color: '#7c3aed', speed: 50 })
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [characters, setCharacters] = useState([])
  const [layers, setLayers] = useState([
    { id: 'bg', name: 'Background', visible: true, locked: false },
    { id: 'char1', name: 'Character', visible: true, locked: false },
    { id: 'vfx', name: 'VFX', visible: true, locked: false },
  ])

  const canvasRef = useRef(null)
  const overlayRef = useRef(null)
  const animFrameRef = useRef(null)
  const frameTimerRef = useRef(null)

  // Splash
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2200)
    return () => clearTimeout(t)
  }, [])

  // Playback
  useEffect(() => {
    if (isPlaying) {
      frameTimerRef.current = setInterval(() => {
        setCurrentFrame(f => (f + 1) % totalFrames)
      }, 1000 / fps)
    } else {
      clearInterval(frameTimerRef.current)
    }
    return () => clearInterval(frameTimerRef.current)
  }, [isPlaying, fps, totalFrames])

  const handleAddCharacter = useCallback((charData) => {
    const newChar = { ...charData, id: Date.now(), x: 0, y: 0, scale: 100 }
    setCharacters(prev => [...prev, newChar])
    setSelectedCharacter(newChar.id)
    setShowCreator(false)
    setActiveRightTab('properties')
  }, [])

  const handleVfxToggle = useCallback((key, val) => {
    setVfxEnabled(prev => ({ ...prev, [key]: val }))
  }, [])

  return (
    <div id="app-root">
      {!loaded && <SplashScreen />}
      <TopBar
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentFrame={currentFrame}
        setCurrentFrame={setCurrentFrame}
        totalFrames={totalFrames}
        fps={fps}
        setFps={setFps}
      />
      <div id="main-layout">
        <SidebarLeft
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          layers={layers}
          setLayers={setLayers}
          onAddCharacter={() => setShowCreator(true)}
        />
        <div id="center-col">
          <Viewport
            canvasRef={canvasRef}
            overlayRef={overlayRef}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            zoom={zoom}
            setZoom={setZoom}
            bgColor={bgColor}
            characters={characters}
            selectedCharacter={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
            vfxEnabled={vfxEnabled}
            vfxParams={vfxParams}
            currentFrame={currentFrame}
            isPlaying={isPlaying}
            layers={layers}
          />
          <Timeline
            currentFrame={currentFrame}
            setCurrentFrame={setCurrentFrame}
            totalFrames={totalFrames}
            fps={fps}
            layers={layers}
            isPlaying={isPlaying}
          />
        </div>
        <SidebarRight
          activeTab={activeRightTab}
          setActiveTab={setActiveRightTab}
          bgColor={bgColor}
          setBgColor={setBgColor}
          vfxEnabled={vfxEnabled}
          onVfxToggle={handleVfxToggle}
          vfxParams={vfxParams}
          setVfxParams={setVfxParams}
          selectedCharacter={selectedCharacter}
          characters={characters}
          setCharacters={setCharacters}
        />
      </div>
      {showCreator && (
        <CharacterCreatorModal
          onConfirm={handleAddCharacter}
          onClose={() => setShowCreator(false)}
        />
      )}
    </div>
  )
}
