# NAL Properties API

Simple Express.js API server for the NAL India property platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID

### Translation
- `POST /api/translate` - Translate text to Kannada

## Usage

The API server runs on `http://localhost:3001` by default.

### Example: Get all properties
```bash
curl http://localhost:3001/api/properties
```

### Example: Translate text
```bash
curl -X POST http://localhost:3001/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "Properties", "targetLocale": "kn"}'
```

## Development

To run both the frontend and API server together from the main project directory:
```bash
npm run dev:full
```