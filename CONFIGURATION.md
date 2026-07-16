# Environment Configuration

## Backend (.env)

Create a `.env` file in the `backend/` directory:

```
PORT=5000
NODE_ENV=development
OPENDOTA_API=https://api.opendota.com/api
```

### Variables

- **PORT**: Server port (default: 5000)
- **NODE_ENV**: Environment mode (development/production)
- **OPENDOTA_API**: OpenDota API base URL

## Frontend Configuration

The frontend connects to the backend via the proxy setting in `frontend/package.json`:

```json
"proxy": "http://localhost:5000"
```

For production, update this to your deployed backend URL.

## Docker Environment

When using Docker Compose, environment variables are defined in `docker-compose.yml`.

## Data Storage

Stats are stored in:
```
data/stats/
├── heroes.json
├── hero_stats.json
├── matchups.json
├── bans.json
└── hero_[id].json (individual heroes)
```
