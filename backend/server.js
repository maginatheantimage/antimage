const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, '../data/stats');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Constants
const OPENDOTA_API = 'https://api.opendota.com/api';

// Helper function to get timestamp
const getTimestamp = () => new Date().toISOString();

// Helper function to save stats to file
const saveStats = (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Stats saved to ${filePath}`);
};

// Helper function to read stats from file
const readStats = (filename) => {
  const filePath = path.join(DATA_DIR, filename);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return null;
};

// Route: Get all heroes
app.get('/api/heroes', async (req, res) => {
  try {
    const cachedData = readStats('heroes.json');
    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`${OPENDOTA_API}/heroes`);
    const heroData = {
      timestamp: getTimestamp(),
      heroes: response.data
    };
    saveStats('heroes.json', heroData);
    res.json(heroData);
  } catch (error) {
    console.error('Error fetching heroes:', error.message);
    res.status(500).json({ error: 'Failed to fetch heroes' });
  }
});

// Route: Get specific hero stats
app.get('/api/heroes/:id', async (req, res) => {
  try {
    const heroId = req.params.id;
    const response = await axios.get(`${OPENDOTA_API}/heroes/${heroId}`);
    const heroStats = {
      timestamp: getTimestamp(),
      heroId: heroId,
      stats: response.data
    };
    saveStats(`hero_${heroId}.json`, heroStats);
    res.json(heroStats);
  } catch (error) {
    console.error(`Error fetching hero ${req.params.id}:`, error.message);
    res.status(500).json({ error: 'Failed to fetch hero stats' });
  }
});

// Route: Get current meta stats
app.get('/api/meta/stats', async (req, res) => {
  try {
    const response = await axios.get(`${OPENDOTA_API}/heroStats`);
    const metaStats = {
      timestamp: getTimestamp(),
      stats: response.data
    };
    saveStats('meta_stats.json', metaStats);
    res.json(metaStats);
  } catch (error) {
    console.error('Error fetching meta stats:', error.message);
    res.status(500).json({ error: 'Failed to fetch meta stats' });
  }
});

// Route: Get hero matchups
app.get('/api/matchups', async (req, res) => {
  try {
    const response = await axios.get(`${OPENDOTA_API}/matchups`);
    const matchups = {
      timestamp: getTimestamp(),
      data: response.data
    };
    saveStats('matchups.json', matchups);
    res.json(matchups);
  } catch (error) {
    console.error('Error fetching matchups:', error.message);
    res.status(500).json({ error: 'Failed to fetch matchups' });
  }
});

// Route: Trigger manual update of all stats
app.post('/api/update', async (req, res) => {
  try {
    console.log('Starting stats update...');
    
    // Fetch and save heroes
    const heroesRes = await axios.get(`${OPENDOTA_API}/heroes`);
    saveStats('heroes.json', {
      timestamp: getTimestamp(),
      heroes: heroesRes.data
    });
    
    // Fetch and save meta stats
    const metaRes = await axios.get(`${OPENDOTA_API}/heroStats`);
    saveStats('meta_stats.json', {
      timestamp: getTimestamp(),
      stats: metaRes.data
    });
    
    // Fetch and save matchups
    const matchupsRes = await axios.get(`${OPENDOTA_API}/matchups`);
    saveStats('matchups.json', {
      timestamp: getTimestamp(),
      data: matchupsRes.data
    });
    
    res.json({
      success: true,
      message: 'Stats updated successfully',
      timestamp: getTimestamp()
    });
  } catch (error) {
    console.error('Error updating stats:', error.message);
    res.status(500).json({ error: 'Failed to update stats' });
  }
});

// Route: Get all saved data files
app.get('/api/data/files', (req, res) => {
  try {
    const files = fs.readdirSync(DATA_DIR);
    const fileInfo = files.map(file => {
      const filePath = path.join(DATA_DIR, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        modified: stats.mtime
      };
    });
    res.json(fileInfo);
  } catch (error) {
    console.error('Error reading data files:', error.message);
    res.status(500).json({ error: 'Failed to read data files' });
  }
});

// Route: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: getTimestamp() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Dota Stats Backend running on port ${PORT}`);
  console.log(`Data directory: ${DATA_DIR}`);
});
