export default function CharacterLibrary({ savedCharacters, setSavedCharacters, onSpawn, onClose, onAddNew }) {
  const deleteCharacter = (id) => {
    setSavedCharacters(prev => prev.filter(c => c.id !== id));
  }

  return (
    <div className="library-view">
      <div className="creator-header">
        <div className="header-left">
          <button className="back-btn" onClick={onClose}>← Back to Editor</button>
          <h1>Agent <span>Archive</span></h1>
        </div>
        <div className="header-right">
          <button className="btn-confirm" onClick={onAddNew}>+ Create New Agent</button>
        </div>
      </div>

      <div className="library-grid-container">
        <div className="library-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px', padding: '40px', overflowY: 'auto' }}>
          {savedCharacters.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '150px', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📁</div>
              <p>No agents found in the archive. Initialize your first character.</p>
              <button className="btn-confirm" style={{ marginTop: '20px' }} onClick={onAddNew}>Start Creation</button>
            </div>
          )}
          
          {savedCharacters.map(char => (
            <div key={char.id} className="char-card">
              <div className="char-card-preview">
                <div style={{ fontSize: '50px' }}>🎭</div>
              </div>
              <div className="char-card-info">
                <div className="char-card-name">{char.name || 'Unnamed Agent'}</div>
                <div className="char-card-meta">Type: {char.head}, Hair: {char.hairStyle}</div>
              </div>
              <div className="char-card-actions">
                <button className="card-btn spawn" onClick={() => onSpawn(char)}>Deploy to Scene</button>
                <button className="card-btn delete" onClick={() => deleteCharacter(char.id)}>Decommission</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
