# Dota 2 Stats Tracker

A comprehensive web application that pulls and displays real-time Dota 2 statistics, hero information, and meta data.

## 🎮 Features

- **Hero Database**: Browse all Dota 2 heroes with images and attributes
- **Meta Statistics**: View current win rates, pick rates, and hero performance
- **Real-time Updates**: Pull the latest stats with one click
- **Data Storage**: Automatically saves stats to JSON files
- **Responsive UI**: Clean, modern interface built with React
- **REST API**: Express backend for data fetching and management

## 📁 Project Structure

```
antimage/
├── backend/                    # Node.js/Express API
│   ├── server.js              # Main server file
│   ├── scripts/
│   │   └── updateStats.js     # Stats update script
│   ├── package.json
│   └── .env.example
├── frontend/                   # React web application
│   ├── src/
│   │   ├── App.js            # Main app component
│   │   ├── components/       # React components
│   │   ├── styles/           # Component styles
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   └── package.json
├── data/                       # Data storage
│   └── stats/                 # JSON data files
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
├── setup.sh                    # Setup script (Linux/Mac)
├── setup.bat                   # Setup script (Windows)
├── package.json               # Root package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Docker
- npm or yarn

### Installation

**Option 1: Automatic Setup (Linux/Mac)**
```bash
chmod +x setup.sh
./setup.sh
```

**Option 2: Automatic Setup (Windows)**
```cmd
setup.bat
```

**Option 3: Manual Setup**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Create data directory
mkdir -p ../data/stats
```

### Running the Application

**Option 1: Run Backend and Frontend Separately**

Terminal 1 - Backend:
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

**Option 2: Using Docker Compose**
```bash
docker-compose up
```

**Option 3: Development Mode with Concurrently**
```bash
npm run dev
```

## 📊 API Endpoints

### Heroes
- `GET /api/heroes` - Get all heroes
- `GET /api/heroes/:id` - Get specific hero stats

### Meta Statistics
- `GET /api/meta/stats` - Get current meta statistics
- `GET /api/matchups` - Get hero matchups

### Data Management
- `POST /api/update` - Trigger full stats update
- `GET /api/data/files` - Get list of saved data files
- `GET /api/health` - Health check

## 📝 Manual Stats Update

Run the update script to fetch and save latest stats:

```bash
cd backend
npm run update-stats
```

This will:
- Fetch all heroes from OpenDota API
- Fetch current meta statistics
- Fetch hero matchups and bans
- Save data to `data/stats/` as JSON files

## 💾 Data Storage

Stats are stored in the `data/stats/` directory:

- `heroes.json` - All hero information
- `hero_stats.json` - Hero win rates and pick rates
- `matchups.json` - Hero vs hero matchups
- `bans.json` - Hero ban statistics
- `hero_[id].json` - Individual hero stats

Each file includes a timestamp for when the data was last updated.

## 🎨 Frontend Features

### Heroes Tab
- Browse all heroes with images
- Search by hero name
- View primary attributes

### Meta Stats Tab
- Sort by win rate or pick rate
- Top 30 heroes displayed
- Color-coded performance (green for >50% win rate)

### Data Files Tab
- View all saved data files
- Check file sizes and last modified timestamps

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env`:
```
PORT=5000
NODE_ENV=development
OPENDOTA_API=https://api.opendota.com/api
```

### Frontend Proxy

The frontend is configured to proxy API requests to `http://localhost:5000`.

## 📦 Dependencies

### Backend
- Express 4.18.2
- Axios 1.4.0
- CORS 2.8.5
- Dotenv 16.0.3

### Frontend
- React 18.2.0
- React DOM 18.2.0
- Axios 1.4.0

## 🐳 Docker Support

Build and run with Docker:

```bash
# Build images
docker-compose build

# Run containers
docker-compose up

# Run in background
docker-compose up -d

# Stop containers
docker-compose down
```

Access the application at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📚 API Data Source

This project uses the **OpenDota API**, a free and open source Dota 2 API.
- Website: https://www.opendota.com/
- API Docs: https://docs.opendota.com/

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues or questions about:
- **This app**: Check the GitHub repository
- **OpenDota API**: Visit https://www.opendota.com/
- **Dota 2**: Visit https://www.dota2.com/

---

**Last Updated**: 2026-07-16
