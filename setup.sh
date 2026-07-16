#!/bin/bash

echo "🚀 Dota 2 Stats Tracker Setup"
echo "============================="

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Create data directory
echo "📁 Creating data directory..."
mkdir -p data/stats

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo ""
echo "Option 1: Run backend and frontend separately"
echo "  Terminal 1: cd backend && npm start"
echo "  Terminal 2: cd frontend && npm start"
echo ""
echo "Option 2: Use Docker Compose"
echo "  docker-compose up"
echo ""
echo "Option 3: Update stats manually"
echo "  cd backend && npm run update-stats"
echo ""
