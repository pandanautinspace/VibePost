# Project Structure

```
ad-campaign-builder/
│
├── README.md                          # Main project documentation
├── QUICKSTART.md                      # Quick start guide
├── PROJECT_STRUCTURE.md               # This file
├── .gitignore                         # Git ignore rules
├── setup.sh                           # Linux/Mac setup script
├── setup.bat                          # Windows setup script
├── start.sh                           # Linux/Mac start script
├── start.bat                          # Windows start script
│
├── backend/                           # Node.js/Express backend
│   ├── package.json                   # Backend dependencies
│   ├── server.js                      # Main Express server
│   ├── .env.example                   # Environment variables template
│   ├── .env                           # Environment variables (create this)
│   │
│   ├── routes/                        # API route definitions
│   │   └── campaign.js                # Campaign generation routes
│   │
│   ├── controllers/                   # Business logic controllers
│   │   └── campaignController.js      # Campaign generation logic
│   │
│   ├── services/                      # External service integrations
│   │   ├── imageService.js            # BlackBox AI image generation
│   │   ├── videoService.js            # Veo 3 video generation
│   │   └── aiService.js               # Campaign description generation
│   │
│   ├── middleware/                    # Custom middleware
│   │   └── upload.js                  # File upload handling (multer)
│   │
│   └── uploads/                       # Temporary file storage
│       └── .gitkeep                   # Keep directory in git
│
└── frontend/                          # React frontend with Vite
    ├── package.json                   # Frontend dependencies
    ├── vite.config.js                 # Vite configuration
    ├── tailwind.config.js             # Tailwind CSS configuration
    ├── postcss.config.js              # PostCSS configuration
    ├── components.json                # shadcn/ui configuration
    ├── index.html                     # HTML entry point
    │
    └── src/                           # Source code
        ├── main.jsx                   # React entry point
        ├── App.jsx                    # Main App component
        ├── index.css                  # Global styles with Tailwind
        │
        ├── components/                # React components
        │   ├── CampaignBuilder.jsx    # Main campaign builder UI
        │   │
        │   └── ui/                    # shadcn/ui components
        │       ├── button.jsx         # Button component
        │       ├── card.jsx           # Card component
        │       ├── input.jsx          # Input component
        │       ├── textarea.jsx       # Textarea component
        │       └── label.jsx          # Label component
        │
        ├── services/                  # Frontend services
        │   └── api.js                 # API client for backend
        │
        └── lib/                       # Utility functions
            └── utils.js               # Helper functions (cn, etc.)
```

## Key Files Description

### Backend

- **server.js**: Main Express server setup with middleware and routes
- **routes/campaign.js**: API endpoints for campaign generation and download
- **controllers/campaignController.js**: Business logic for campaign operations
- **services/imageService.js**: Integration with BlackBox AI for image generation
- **services/videoService.js**: Integration with Veo 3 for video generation
- **services/aiService.js**: Campaign description generation
- **middleware/upload.js**: Multer configuration for file uploads

### Frontend

- **main.jsx**: React application entry point
- **App.jsx**: Root component
- **components/CampaignBuilder.jsx**: Main UI component with form and results
- **components/ui/**: shadcn/ui components for consistent design
- **services/api.js**: Axios-based API client for backend communication
- **lib/utils.js**: Utility functions for styling (Tailwind merge)

## Data Flow

1. **User Input** → Frontend form (CampaignBuilder.jsx)
2. **Form Submission** → API service (api.js)
3. **HTTP Request** → Backend routes (campaign.js)
4. **Business Logic** → Controller (campaignController.js)
5. **AI Generation** → Services (imageService.js, videoService.js)
6. **Response** → Frontend display
7. **Download** → ZIP file generation and download

## API Endpoints

### POST /api/campaign/generate
- Generates 5 images and 1 video
- Returns campaign data with URLs and description

### POST /api/campaign/download
- Creates ZIP file with all assets
- Returns downloadable ZIP blob

## Environment Variables

### Backend (.env)
```
BLACKBOX_API_KEY=your_key
VEO3_API_KEY=your_key
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Tech Stack

### Backend
- Node.js
- Express.js
- Multer (file uploads)
- Axios (HTTP client)
- Archiver (ZIP creation)

### Frontend
- React 18
- Vite (build tool)
- Tailwind CSS
- shadcn/ui components
- Lucide React (icons)
- Axios (HTTP client)

## Development Workflow

1. Start backend: `cd backend && npm start`
2. Start frontend: `cd frontend && npm run dev`
3. Access app: http://localhost:5173
4. Make changes (hot reload enabled)
5. Test API endpoints
6. Build for production: `npm run build`
