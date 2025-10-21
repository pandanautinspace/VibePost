import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import campaignRoutes from './routes/campaign.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file in the backend directory
dotenv.config({ path: join(__dirname, '.env') });

// Validate critical environment variables
if (!process.env.BLACKBOX_API_KEY) {
  console.error('❌ ERROR: BLACKBOX_API_KEY is not configured in .env file');
  console.error('📝 Please ensure backend/.env contains: BLACKBOX_API_KEY=your-api-key');
  console.error('🔍 Current working directory:', process.cwd());
  console.error('🔍 Looking for .env at:', join(__dirname, '.env'));
} else {
  console.log('✅ BLACKBOX_API_KEY is configured');
  console.log('🔑 API Key (first 10 chars):', process.env.BLACKBOX_API_KEY.substring(0, 10) + '...');
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/campaign', campaignRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Ad Campaign Builder API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});
