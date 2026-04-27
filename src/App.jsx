import { useState, useRef, useEffect, useCallback } from 'react'
import TopBar from './components/TopBar'
import SidebarLeft from './components/SidebarLeft'
import Viewport from './components/Viewport'
import Timeline from './components/Timeline'
import SidebarRight from './components/SidebarRight'
import SplashScreen from './components/SplashScreen'
import CharacterCreatorModal from './components/CharacterCreatorModal'
import CharacterLibrary from './components/CharacterLibrary'
import './styles/app.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [viewMode, setViewMode] = useState('editor') // 'editor' | 'creator' | 'library'
  const [activeTool, setActiveTool] = useState('select')
  const [activeTab, setActiveTab] = useState('scene')
  const [activeRightTab, setActiveRightTab] = useState('properties')
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [totalFrames] = useState(240)
  const [fps, setFps] = useState(24)
  const [zoom, setZoom] = useState(100)
  const [bgColor, setBgColor] = useState('#0d0d1a')
  const [animeMode, setAnimeMode] = useState(false)
  
  const [vfxEnabled, setVfxEnabled] = useState({})
  const [vfxParams, setVfxParams] = useState({ intensity: 70, color: '#7c3aed', speed: 50 })
  
  const [characters, setCharacters] = useState([
    { 
      id: 'char1', 
      name: 'Agent Zero', 
      config: { 
        head: 1, body: 1, hairStyle: 1, hairColor: '#7c3aed', 
        eyes: 1, eyeColor: '#06b6d4', mouth: 1, nose: 1, acc: 1,
        width: 0, height: 0, eyeY: 0, mouthY: 0, noseY: 0, hairY: 0
      },
      transform: { x: 0, y: 0, scale: 1, rotation: 0, headTurn: 0 },
      keyframes: {
        rotation: [{ frame: 0, value: 0 }, { frame: 120, value: 30 }, { frame: 240, value: 0 }],
        headTurn: [{ frame: 0, value: 0 }, { frame: 60, value: 25 }, { frame: 180, value: -25 }, { frame: 240, value: 0 }]
      }
    }
  ])
  
  const [savedCharacters, setSavedCharacters] = useState(() => {
    const saved = localStorage.getItem('animeforge_library');
    return saved ? JSON.parse(saved) : [];
  })
  const [selectedCharacter, setSelectedCharacter] = useState('char1')
  const [layers, setLayers] = useState([
    { id: 'char1', name: 'Agent Zero', visible: true, locked: false }
  ])

  // Splash
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2200)
    return () => clearTimeout(t)
  }, [])

  // Playback Loop
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame(f => (f + 1) % totalFrames)
      }, 1000 / fps)
    }
    return () => clearInterval(interval)
  }, [isPlaying, fps, totalFrames])

  useEffect(() => {
    localStorage.setItem('animeforge_library', JSON.stringify(savedCharacters));
  }, [savedCharacters]);

  const saveCharacterToLibrary = (config, name) => {
    const newChar = { ...config, name, id: Date.now().toString() }
    setSavedCharacters([...savedCharacters, newChar])
    setViewMode('library')
  }

  const spawnFromLibrary = (char) => {
    const spawned = { 
      id: Date.now().toString(),
      name: char.name,
      config: { ...char },
      transform: { x: 0, y: 0, scale: 1, rotation: 0, headTurn: 0 },
      keyframes: {
        x: [{ frame: 0, value: 0 }],
        y: [{ frame: 0, value: 0 }],
        rotation: [{ frame: 0, value: 0 }]
      }
    }; 
    setCharacters([...characters, spawned]);
    setLayers([...layers, { id: spawned.id, name: spawned.name, visible: true, locked: false }]);
    setSelectedCharacter(spawned.id);
    setViewMode('editor');
  }

  const addKeyframe = (property, value) => {
    if (!selectedCharacter) return;
    setCharacters(prev => prev.map(char => {
      if (char.id === selectedCharacter) {
        const newKeyframes = { ...char.keyframes };
        if (!newKeyframes[property]) newKeyframes[property] = [];
        // Remove existing keyframe at this frame
        newKeyframes[property] = newKeyframes[property].filter(kf => kf.frame !== currentFrame);
        // Add new keyframe
        newKeyframes[property].push({ frame: currentFrame, value });
        return { ...char, keyframes: newKeyframes };
      }
      return char;
    }));
  }

  const handleVfxToggle = useCallback((key, val) => {
    setVfxEnabled(prev => ({ ...prev, [key]: val }))
  }, [])

  return (
    <div id="app-root">
      {!loaded && <SplashScreen />}
      
      {viewMode === 'editor' && (
        <>
          <TopBar
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentFrame={currentFrame}
            setCurrentFrame={setCurrentFrame}
            totalFrames={totalFrames}
            fps={fps}
            setFps={setFps}
            animeMode={animeMode}
            setAnimeMode={setAnimeMode}
          />
          <div id="main-layout">
            <SidebarLeft
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              layers={layers}
              setLayers={setLayers}
              onAddCharacter={() => setViewMode('creator')}
              onOpenLibrary={() => setViewMode('library')}
            />
            <div id="center-col">
              <Viewport
                bgColor={bgColor}
                zoom={zoom}
                characters={characters}
                selectedCharacter={selectedCharacter}
                currentFrame={currentFrame}
                isPlaying={isPlaying}
                animeMode={animeMode}
              />
              <Timeline
                currentFrame={currentFrame}
                setCurrentFrame={setCurrentFrame}
                totalFrames={totalFrames}
                fps={fps}
                layers={layers}
                characters={characters}
                isPlaying={isPlaying}
                onAddKey={() => {
                  // For now, let's add a rotation key as a demo
                  const char = characters.find(c => c.id === selectedCharacter);
                  if (char) addKeyframe('rotation', char.transform.rotation);
                }}
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
              currentFrame={currentFrame}
              addKeyframe={addKeyframe}
            />
          </div>
        </>
      )}

      {viewMode === 'creator' && (
        <CharacterCreatorModal 
          onConfirm={saveCharacterToLibrary} 
          onClose={() => setViewMode('editor')} 
        />
      )}

      {viewMode === 'library' && (
        <CharacterLibrary 
          savedCharacters={savedCharacters}
          setSavedCharacters={setSavedCharacters}
          onSpawn={spawnFromLibrary}
          onClose={() => setViewMode('editor')}
          onAddNew={() => setViewMode('creator')}
        />
      )}
    </div>
  )
}
