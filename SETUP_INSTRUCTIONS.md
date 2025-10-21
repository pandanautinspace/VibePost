# Setup Instructions - Ad Campaign Builder

## ✅ Installation Complete!

Your Ad Campaign Builder has been successfully set up with all dependencies installed.

## 🔑 Next Step: Configure API Key

Before running the application, you need to add your BlackBox AI API key.

### 1. Edit the .env file

Open `backend/.env` and add your API key:

```env
BLACKBOX_API_KEY=your_actual_api_key_here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Note**: The app uses BlackBox AI's unified API for both image generation (flux-1.1-pro model) and video generation (veo-2 model). You only need one API key from BlackBox AI.

### 2. Get Your BlackBox AI API Key

If you don't have a BlackBox AI API key yet:

1. Visit: https://www.blackbox.ai/
2. Sign up or log in
3. Navigate to API settings
4. Generate or copy your API key
5. Paste it in `backend/.env`

## 🚀 Running the Application

### Option 1: Use Start Scripts (Easiest)

**Windows:**
```bash
start.bat
```

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

This will start both backend and frontend servers automatically.

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 🌐 Access the Application

Once both servers are running:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

Open your browser and go to http://localhost:5173

## 📝 Using the Application

1. **Enter Brand Guidelines**: Describe your brand's style, colors, and tone
2. **Upload Files** (Optional): Add brand guideline documents or reference images
3. **Enter Campaign Concept**: Describe your campaign idea
4. **Generate**: Click "Generate Campaign" and wait 2-5 minutes
5. **Download**: Get all assets as a ZIP file

## 🎨 Features

- ✅ Generate 5 unique AI images (1024x1024)
- ✅ Generate 1 promotional video (5 seconds)
- ✅ AI-generated campaign description
- ✅ Download all assets as ZIP
- ✅ Modern UI with shadcn components
- ✅ File upload support
- ✅ Real-time generation status

## 🔧 Troubleshooting

### "BLACKBOX_API_KEY is not configured"
- Make sure you've added your API key to `backend/.env`
- Restart the backend server after adding the key
- Get your API key from https://www.blackbox.ai/

### Images or video not generating
- Verify your API key is correct
- Check backend console for detailed error messages
- Ensure you have sufficient API credits
- The app will show placeholders if generation fails

### Port already in use
- Backend (3001): Change PORT in `backend/.env`
- Frontend (5173): Change port in `frontend/vite.config.js`

### Cannot connect to backend
- Ensure backend is running on http://localhost:3001
- Check backend console for errors
- Verify CORS settings if needed

## 📦 Project Structure

```
ad-campaign-builder/
├── backend/          # Node.js/Express API
│   ├── routes/       # API endpoints
│   ├── controllers/  # Business logic
│   ├── services/     # AI integrations
│   └── middleware/   # File uploads
└── frontend/         # React + Vite
    └── src/
        ├── components/  # UI components
        └── services/    # API client
```

## 🎯 API Integration

The app uses BlackBox AI's unified API endpoint:
- **Image Generation**: flux-1.1-pro model (5 images per campaign)
- **Video Generation**: veo-2 model (1 video per campaign)
- **API Endpoint**: https://api.blackbox.ai/chat/completions
- **Authentication**: Bearer token with your API key

## 📚 Documentation

- `README.md` - Main project overview
- `QUICKSTART.md` - Quick start guide
- `PROJECT_STRUCTURE.md` - Detailed structure
- `SETUP_INSTRUCTIONS.md` - This file

## 🆘 Need Help?

1. Check the troubleshooting section above
2. Review backend logs in the terminal
3. Check browser console for frontend errors
4. Ensure all dependencies are installed
5. Verify API key is correct

## 🎉 You're Ready!

Your Ad Campaign Builder is ready to use. Add your API key and start creating amazing ad campaigns!

---

**Happy Campaigning! 🚀**
