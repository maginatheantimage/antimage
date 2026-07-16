import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/HeroList.css';

function HeroList() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHeroes();
  }, []);

  const fetchHeroes = async () => {
    try {
      const response = await axios.get('/api/heroes');
      setHeroes(response.data.heroes || []);
    } catch (error) {
      console.error('Error fetching heroes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHeroes = heroes.filter(hero =>
    hero.localized_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">⏳ Loading heroes...</div>;

  return (
    <div className="hero-list">
      <h2>All Heroes ({heroes.length})</h2>
      <input
        type="text"
        placeholder="Search heroes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="heroes-grid">
        {filteredHeroes.map(hero => (
          <div key={hero.id} className="hero-card">
            <img 
              src={`https://api.opendota.com${hero.img}`} 
              alt={hero.localized_name}
              className="hero-img"
            />
            <h3>{hero.localized_name}</h3>
            <p className="hero-role">Primary: {hero.primary_attr}</p>
            <p className="hero-id">ID: {hero.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroList;
