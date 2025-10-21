import express from 'express';
import upload from '../middleware/upload.js';
import campaignController from '../controllers/campaignController.js';

const router = express.Router();

/**
 * POST /api/campaign/generate
 * Generate a complete ad campaign with images and video
 */
router.post(
  '/generate',
  upload.fields([
    { name: 'brandGuidelineFiles', maxCount: 5 },
    { name: 'inputImages', maxCount: 10 }
  ]),
  campaignController.generateCampaign.bind(campaignController)
);

/**
 * POST /api/campaign/download
 * Download campaign assets as ZIP file
 */
router.post(
  '/download',
  campaignController.downloadCampaign.bind(campaignController)
);

/**
 * POST /api/campaign/random-data
 * Generate random campaign data for all fields
 */
router.post(
  '/random-data',
  campaignController.generateRandomData.bind(campaignController)
);

/**
 * POST /api/campaign/suggest-audiences
 * Suggest target audiences based on platform and company info
 */
router.post(
  '/suggest-audiences',
  campaignController.suggestAudiences.bind(campaignController)
);

/**
 * POST /api/campaign/suggest-platforms
 * Suggest social media platforms based on company info
 */
router.post(
  '/suggest-platforms',
  campaignController.suggestPlatforms.bind(campaignController)
);

/**
 * POST /api/campaign/improve-text
 * Improve text with AI
 */
router.post(
  '/improve-text',
  campaignController.improveText.bind(campaignController)
);

/**
 * POST /api/campaign/suggest-concepts
 * Suggest campaign concepts
 */
router.post(
  '/suggest-concepts',
  campaignController.suggestConcepts.bind(campaignController)
);

/**
 * POST /api/campaign/scrape-website
 * Scrape website for company/product information
 */
router.post(
  '/scrape-website',
  campaignController.scrapeWebsite.bind(campaignController)
);

export default router;
