# Quick Start Guide

## Prerequisites

- Node.js 18 or higher
- BlackBox AI API key (get it from https://www.blackbox.ai/)
- Optional: Veo 3 API key for video generation

## Installation

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

1. **Install Backend Dependencies:**
```bash
cd backend
npm install
```

2. **Install Frontend Dependencies:**
```bash
cd frontend
npm install
```

3. **Configure Environment Variables:**

Create `backend/.env` file:
```env
BLACKBOX_API_KEY=your_blackbox_api_key_here
VEO3_API_KEY=your_veo3_api_key_here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:3001`

### Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Access the Application

Open your browser and navigate to: `http://localhost:5173`

## Using the Application

### Step 1: Enter Brand Guidelines
- **Text Input**: Describe your brand's visual style, colors, tone, and target audience
- **File Upload** (Optional): Upload brand guideline documents (PDF, DOC, DOCX)

### Step 2: Upload Reference Images (Optional)
- Upload images that represent your brand or desired style
- Supports: JPG, PNG, GIF

### Step 3: Enter Campaign Concept
- Describe your campaign idea, message, and desired visual style
- Be specific about what you want to achieve

### Step 4: Generate Campaign
- Click "Generate Campaign" button
- Wait 2-5 minutes for AI to generate:
  - 5 unique images (1024x1024)
  - 1 promotional video (5 seconds)
  - Campaign description with usage guidelines

### Step 5: Download Assets
- Review generated images and video
- Click "Download All Assets (ZIP)" to get:
  - All 5 images
  - Video file
  - Campaign description
  - README with usage instructions

## API Configuration

### BlackBox AI API

The app uses the BlackBox AI API for image generation. Get your API key from:
https://www.blackbox.ai/

Add it to `backend/.env`:
```env
BLACKBOX_API_KEY=your_key_here
```

### Veo 3 API (Optional)

For custom video generation, configure the Veo 3 API key:
```env
VEO3_API_KEY=your_key_here
```

If not configured, a placeholder video will be used.

## Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Verify Node.js version: `node --version` (should be 18+)
- Check if `.env` file exists in backend directory

### Frontend won't start
- Check if port 5173 is available
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### API errors
- Verify your BLACKBOX_API_KEY is correct
- Check backend console for detailed error messages
- Ensure backend is running before using frontend

### Images not generating
- Check API key is valid
- Check backend logs for API errors
- Verify internet connection

## Development

### Backend Structure
```
backend/
├── server.js              # Express server
├── routes/                # API routes
├── controllers/           # Business logic
├── services/              # External API integrations
├── middleware/            # Custom middleware
└── uploads/               # Temporary file storage
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/        # React components
│   ├── services/          # API client
│   └── lib/               # Utilities
├── index.html             # Entry point
└── vite.config.js         # Vite configuration
```

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2
3. Set up reverse proxy (nginx/Apache)
4. Configure HTTPS

### Frontend
1. Build the frontend: `npm run build`
2. Serve the `dist` folder with a web server
3. Update API URL in production

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs
3. Check browser console for frontend errors

## License

MIT
