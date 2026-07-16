const axios = require('axios');
const fs = require('fs');
const path = require('path');

const OPENDOTA_API = 'https://api.opendota.com/api';
const DATA_DIR = path.join(__dirname, '../../data/stats');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getTimestamp = () => new Date().toISOString();

const saveStats = (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`✓ Saved ${filename}`);
};

const updateAllStats = async () => {
  try {
    console.log('🔄 Starting Dota 2 stats update...');
    console.log(`⏰ Timestamp: ${getTimestamp()}`);
    
    // Fetch heroes
    console.log('📥 Fetching heroes...');
    const heroesRes = await axios.get(`${OPENDOTA_API}/heroes`);
    saveStats('heroes.json', {
      timestamp: getTimestamp(),
      count: heroesRes.data.length,
      heroes: heroesRes.data
    });
    
    // Fetch hero stats
    console.log('📥 Fetching hero stats...');
    const statsRes = await axios.get(`${OPENDOTA_API}/heroStats`);
    saveStats('hero_stats.json', {
      timestamp: getTimestamp(),
      count: statsRes.data.length,
      stats: statsRes.data
    });
    
    // Fetch matchups
    console.log('📥 Fetching matchups...');
    const matchupsRes = await axios.get(`${OPENDOTA_API}/matchups`);
    saveStats('matchups.json', {
      timestamp: getTimestamp(),
      count: matchupsRes.data.length,
      matchups: matchupsRes.data
    });
    
    // Fetch bans
    console.log('📥 Fetching bans...');
    const bansRes = await axios.get(`${OPENDOTA_API}/bans`);
    saveStats('bans.json', {
      timestamp: getTimestamp(),
      bans: bansRes.data
    });
    
    console.log('✅ All stats updated successfully!');
  } catch (error) {
    console.error('❌ Error updating stats:', error.message);
    process.exit(1);
  }
};

updateAllStats();
