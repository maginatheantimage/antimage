# Development Guide

## Getting Started

1. **Setup**: Run `./setup.sh` (Linux/Mac) or `setup.bat` (Windows)
2. **Backend**: `cd backend && npm start`
3. **Frontend**: `cd frontend && npm start`
4. **Access**: Open http://localhost:3000

## Project Structure Overview

### Backend (`/backend`)

- **server.js**: Main Express server
  - Sets up routes for `/api/heroes`, `/api/meta/stats`, `/api/update`
  - Handles CORS and JSON parsing
  - Manages data file storage

- **scripts/updateStats.js**: Data update script
  - Fetches data from OpenDota API
  - Saves to JSON files in `data/stats/`
  - Can be run manually or scheduled

### Frontend (`/frontend`)

- **src/App.js**: Main React component
  - Navigation tabs
  - Update button
  - Component switching logic

- **src/components/**:
  - **HeroList.js**: Displays all heroes with search
  - **MetaStats.js**: Shows current meta statistics
  - **DataFiles.js**: Lists saved data files

- **src/styles/**: Component-specific CSS

## Adding New Features

### Add a New Backend Endpoint

1. Open `backend/server.js`
2. Add a new route:
```javascript
app.get('/api/new-endpoint', async (req, res) => {
  try {
    // Your logic here
    res.json({ data: 'your data' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```
3. Update the update script if needed

### Add a New Frontend Component

1. Create file: `frontend/src/components/NewComponent.js`
2. Create styles: `frontend/src/styles/NewComponent.css`
3. Import in `App.js`
4. Add tab button and component render

## Testing

### Test Backend Endpoints

```bash
# Test heroes endpoint
curl http://localhost:5000/api/heroes

# Test health check
curl http://localhost:5000/api/health

# Trigger stats update
curl -X POST http://localhost:5000/api/update
```

### Test Frontend

- Run `npm start` in frontend directory
- Check browser console for errors
- Test all tabs and search functionality

## Debugging

### Backend Debugging

1. Check server logs in terminal
2. Verify `.env` file is configured
3. Test API endpoints with curl or Postman
4. Check data files in `data/stats/`

### Frontend Debugging

1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls
4. Use React Developer Tools extension

## Deployment

### Deploy with Docker

```bash
# Build and run
docker-compose up -d
```

### Deploy to Cloud

Update frontend proxy URL to your backend server:

```json
"proxy": "https://your-backend-url.com"
```

## Performance Tips

1. **Cache API Responses**: Frontend caches hero data
2. **Limit Stats Updates**: Don't update too frequently to avoid API rate limits
3. **Use Docker**: Simplified deployment and dependencies
4. **Monitor Data Size**: Clean up old stat files periodically

## Common Issues

### Port Already in Use

```bash
# Change PORT in backend/.env or use different port
PORT=5001 npm start
```

### CORS Errors

- Ensure backend is running
- Check frontend proxy configuration
- Verify API URLs match

### Missing Data Files

```bash
# Run update script
cd backend
npm run update-stats
```
