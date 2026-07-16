import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import HeroList from './components/HeroList';
import MetaStats from './components/MetaStats';
import DataFiles from './components/DataFiles';

function App() {
  const [activeTab, setActiveTab] = useState('heroes');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    setLoading(true);
    setMessage('Updating stats...');
    try {
      const response = await axios.post('/api/update');
      setMessage(`✓ ${response.data.message}`);
      setTimeout(() => setMessage(''), 3000);
      // Refresh the active component
      window.location.reload();
    } catch (error) {
      setMessage('✗ Failed to update stats');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🎮 Dota 2 Stats Tracker</h1>
        <p>Real-time Dota 2 hero statistics and meta information</p>
      </header>

      <div className="controls">
        <button 
          onClick={handleUpdate} 
          disabled={loading}
          className="update-btn"
        >
          {loading ? '⏳ Updating...' : '🔄 Update Stats Now'}
        </button>
        {message && <div className="message">{message}</div>}
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'heroes' ? 'active' : ''}`}
          onClick={() => setActiveTab('heroes')}
        >
          Heroes
        </button>
        <button 
          className={`tab ${activeTab === 'meta' ? 'active' : ''}`}
          onClick={() => setActiveTab('meta')}
        >
          Meta Stats
        </button>
        <button 
          className={`tab ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => setActiveTab('files')}
        >
          Data Files
        </button>
      </div>

      <main className="content">
        {activeTab === 'heroes' && <HeroList />}
        {activeTab === 'meta' && <MetaStats />}
        {activeTab === 'files' && <DataFiles />}
      </main>

      <footer className="footer">
        <p>Data provided by OpenDota API</p>
      </footer>
    </div>
  );
}

export default App;
