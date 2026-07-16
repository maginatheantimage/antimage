import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MetaStats.css';

function MetaStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('win_rate');

  useEffect(() => {
    fetchMetaStats();
  }, []);

  const fetchMetaStats = async () => {
    try {
      const response = await axios.get('/api/meta/stats');
      const sortedStats = (response.data.stats || []).sort((a, b) => {
        if (sortBy === 'win_rate') {
          return (b.win / b.games) - (a.win / a.games);
        } else if (sortBy === 'pick_rate') {
          return b.games - a.games;
        }
        return 0;
      });
      setStats(sortedStats);
    } catch (error) {
      console.error('Error fetching meta stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">⏳ Loading meta stats...</div>;

  return (
    <div className="meta-stats">
      <h2>Current Meta Statistics</h2>
      <div className="sort-controls">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="win_rate">Win Rate</option>
          <option value="pick_rate">Pick Rate</option>
        </select>
      </div>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Hero</th>
            <th>Matches</th>
            <th>Wins</th>
            <th>Win Rate</th>
            <th>Pick Rate</th>
          </tr>
        </thead>
        <tbody>
          {stats.slice(0, 30).map((stat, index) => {
            const winRate = stat.games > 0 ? (stat.win / stat.games * 100).toFixed(2) : 0;
            const pickRate = stat.games > 0 ? `${(stat.games / 100).toFixed(2)}%` : '0%';
            return (
              <tr key={index} className={winRate > 50 ? 'high-wr' : 'low-wr'}>
                <td>{stat.name || `Hero ${stat.id}`}</td>
                <td>{stat.games}</td>
                <td>{stat.win}</td>
                <td><strong>{winRate}%</strong></td>
                <td>{pickRate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MetaStats;
