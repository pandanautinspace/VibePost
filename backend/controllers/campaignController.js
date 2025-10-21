import imageService from '../services/imageService.js';
import videoService from '../services/videoService.js';
import aiService from '../services/aiService.js';
import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class CampaignController {
  /**
   * Generate random campaign data
   */
  async generateRandomData(req, res) {
    try {
      const randomData = await aiService.generateRandomCampaignData();
      res.json({
        success: true,
        data: randomData
      });
    } catch (error) {
      console.error('Error generating random data:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to generate random data'
      });
    }
  }

  /**
   * Suggest target audiences
   */
  async suggestAudiences(req, res) {
    try {
      const { platform, companyInfo } = req.body;
      const audiences = await aiService.suggestTargetAudiences(platform, companyInfo);
      res.json({
        success: true,
        data: audiences
      });
    } catch (error) {
      console.error('Error suggesting audiences:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to suggest audiences'
      });
    }
  }

  /**
   * Suggest social media platforms
   */
  async suggestPlatforms(req, res) {
    try {
      const { companyInfo } = req.body;
      const platforms = await aiService.suggestPlatforms(companyInfo);
      res.json({
        success: true,
        data: platforms
      });
    } catch (error) {
      console.error('Error suggesting platforms:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to suggest platforms'
      });
    }
  }

  /**
   * Improve text with AI
   */
  async improveText(req, res) {
    try {
      const { text, context } = req.body;
      const improvedText = await aiService.improveCampaignText(text, context);
      res.json({
        success: true,
        data: { improvedText }
      });
    } catch (error) {
      console.error('Error improving text:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to improve text'
      });
    }
  }

  /**
   * Suggest campaign concepts
   */
  async suggestConcepts(req, res) {
    try {
      const { productInfo, brandGuidelines, platform } = req.body;
      const concepts = await aiService.suggestCampaignConcepts(productInfo, brandGuidelines, platform);
      res.json({
        success: true,
        data: concepts
      });
    } catch (error) {
      console.error('Error suggesting concepts:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to suggest concepts'
      });
    }
  }

  /**
   * Scrape website for information
   */
  async scrapeWebsite(req, res) {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({
          success: false,
          error: 'URL is required'
        });
      }
      const result = await aiService.scrapeWebsite(url);
      res.json(result);
    } catch (error) {
      console.error('Error scraping website:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to scrape website'
      });
    }
  }

  /**
   * Generate a complete ad campaign
   */
  async generateCampaign(req, res) {
    try {
      const { brandGuidelinesText, campaignPrompt } = req.body;

      // Validate required fields
      if (!campaignPrompt) {
        return res.status(400).json({
          success: false,
          error: 'Campaign prompt is required'
        });
      }

      console.log('Starting campaign generation...');
      console.log('Campaign Prompt:', campaignPrompt);
      console.log('Brand Guidelines:', brandGuidelinesText);

      // Process uploaded files
      const brandGuidelineFiles = req.files?.brandGuidelineFiles || [];
      const inputImages = req.files?.inputImages || [];

      console.log(`Uploaded ${brandGuidelineFiles.length} brand guideline files`);
      console.log(`Uploaded ${inputImages.length} input images`);

      // Enhance prompt with brand guidelines
      const enhancedPrompt = imageService.enhancePromptWithBrandGuidelines(
        campaignPrompt,
        brandGuidelinesText || 'Professional, high-quality advertising'
      );

      // Generate 5 images
      console.log('Generating 5 images...');
      const images = await imageService.generateImages(enhancedPrompt, 5);
      console.log(`Generated ${images.length} images`);

      // Generate 1 video
      console.log('Generating video...');
      const video = await videoService.generateVideo(
        campaignPrompt,
        brandGuidelinesText || 'Professional advertising'
      );
      console.log('Video generated');

      // Generate campaign description
      console.log('Generating campaign description...');
      const description = await aiService.generateCampaignDescription(
        campaignPrompt,
        brandGuidelinesText || 'Professional advertising',
        images
      );

      // Clean up uploaded files
      this.cleanupUploadedFiles([...brandGuidelineFiles, ...inputImages]);

      // Return response
      res.json({
        success: true,
        data: {
          images: images.map(img => ({
            url: img.url,
            index: img.index
          })),
          video: {
            url: video.url,
            duration: video.duration,
            placeholder: video.placeholder || false
          },
          description: description,
          metadata: {
            generatedAt: new Date().toISOString(),
            imageCount: images.length,
            campaignPrompt: campaignPrompt,
            brandGuidelines: brandGuidelinesText
          }
        }
      });

    } catch (error) {
      console.error('Error in generateCampaign:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to generate campaign'
      });
    }
  }

  /**
   * Download campaign assets as ZIP
   */
  async downloadCampaign(req, res) {
    try {
      const { images, video, description } = req.body;

      if (!images || !Array.isArray(images)) {
        return res.status(400).json({
          success: false,
          error: 'Images array is required'
        });
      }

      console.log('Creating campaign ZIP file...');

      // Set response headers
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename=campaign-${Date.now()}.zip`);

      // Create archive
      const archive = archiver('zip', {
        zlib: { level: 9 }
      });

      // Handle archive errors
      archive.on('error', (err) => {
        console.error('Archive error:', err);
        throw err;
      });

      // Pipe archive to response
      archive.pipe(res);

      // Download and add images to archive
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        try {
          const response = await axios.get(image.url, {
            responseType: 'arraybuffer',
            timeout: 30000
          });
          archive.append(Buffer.from(response.data), {
            name: `images/image-${i + 1}.png`
          });
          console.log(`Added image ${i + 1} to archive`);
        } catch (error) {
          console.error(`Failed to download image ${i + 1}:`, error.message);
        }
      }

      // Download and add video to archive if available
      if (video && video.url && !video.placeholder) {
        try {
          const response = await axios.get(video.url, {
            responseType: 'arraybuffer',
            timeout: 60000
          });
          archive.append(Buffer.from(response.data), {
            name: 'video/campaign-video.mp4'
          });
          console.log('Added video to archive');
        } catch (error) {
          console.error('Failed to download video:', error.message);
        }
      }

      // Add campaign description
      if (description) {
        archive.append(description, {
          name: 'campaign-description.txt'
        });
        console.log('Added campaign description to archive');
      }

      // Add README
      const readme = `
Ad Campaign Assets
==================

This ZIP file contains all the generated assets for your ad campaign.

Contents:
- images/ - 5 AI-generated campaign images
- video/ - 1 promotional video (if available)
- campaign-description.txt - Detailed campaign description and usage guidelines

Generated: ${new Date().toLocaleString()}

For best results, review the campaign description for recommended usage across different channels.
      `.trim();

      archive.append(readme, {
        name: 'README.txt'
      });

      // Finalize archive
      await archive.finalize();
      console.log('Campaign ZIP created successfully');

    } catch (error) {
      console.error('Error in downloadCampaign:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: error.message || 'Failed to create download'
        });
      }
    }
  }

  /**
   * Clean up uploaded files
   */
  cleanupUploadedFiles(files) {
    files.forEach(file => {
      try {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
          console.log(`Cleaned up file: ${file.filename}`);
        }
      } catch (error) {
        console.error(`Failed to delete file ${file.filename}:`, error.message);
      }
    });
  }
}

export default new CampaignController();
