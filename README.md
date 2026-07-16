# Dota 2 Stats Tracker

A web application that pulls the latest Dota 2 statistics and hero information.

## Features
- Fetch latest Dota 2 hero stats
- Display hero statistics and meta information
- Store stats data locally
- Clean and responsive web interface

## Project Structure

```
├── backend/              # Node.js/Express API server
├── frontend/             # React web interface
├── data/                 # Data storage
│   └── stats/           # JSON data files
├── config/              # Configuration files
└── scripts/             # Utility scripts
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Start the backend server:
   ```bash
   cd backend && npm start
   ```

4. In another terminal, start the frontend:
   ```bash
   cd frontend && npm start
   ```

## API

The backend API fetches Dota 2 stats from the OpenDota API and serves them to the frontend.

- `GET /api/heroes` - Get all hero statistics
- `GET /api/heroes/:id` - Get specific hero stats
- `POST /api/update` - Trigger stats update

## Data Storage

Stats are stored in JSON format in the `data/stats/` directory with automatic timestamps.
