# Ad Campaign Builder

A full-stack web application for building ad campaigns using AI-generated images and videos.

## Features

- 📝 Brand guidelines input (text + file upload)
- 🖼️ Upload reference images
- 🎨 Generate 5 AI images using BlackBox AI
- 🎥 Generate 1 video using Veo 3 Fast
- 📥 Download all assets and campaign description
- 🎯 Modern UI with shadcn/ui components

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui
- **APIs**: BlackBox AI (Image Generation), Veo 3 Fast (Video Generation)

## Setup

### Prerequisites

- Node.js 18+ installed
- BlackBox AI API key (get it from https://www.blackbox.ai/)

### Installation

1. Clone the repository
2. Set up environment variables:

```bash
# In backend/.env
BLACKBOX_API_KEY=your_blackbox_api_key_here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Note**: The app uses BlackBox AI's API for both image generation (flux-1.1-pro model) and video generation (veo-2 model). You only need one API key.

3. Install backend dependencies:

```bash
cd backend
npm install
```

4. Install frontend dependencies:

```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend server:

```bash
cd backend
npm start
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter your brand guidelines (text description)
2. Upload brand guideline documents (optional)
3. Upload reference images
4. Enter your campaign concept prompt
5. Click "Generate Campaign"
6. Wait for AI to generate 5 images and 1 video
7. Review the generated assets and campaign description
8. Download all assets as a ZIP file

## API Documentation

### Generate Campaign

**Endpoint**: `POST /api/campaign/generate`

**Request**: Multipart form data
- `brandGuidelinesText`: string
- `brandGuidelineFiles`: files[]
- `inputImages`: files[]
- `campaignPrompt`: string

**Response**:
```json
{
  "success": true,
  "data": {
    "images": ["url1", "url2", "url3", "url4", "url5"],
    "video": "video_url",
    "description": "Campaign description text"
  }
}
```

## License

MIT
