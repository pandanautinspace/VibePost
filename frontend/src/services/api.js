import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 300000, // 5 minutes for AI generation
    });
  }

  /**
   * Generate ad campaign
   * @param {FormData} formData - Form data with campaign details
   * @returns {Promise} Campaign data
   */
  async generateCampaign(formData) {
    try {
      const response = await this.client.post('/api/campaign/generate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Download campaign assets
   * @param {Object} campaignData - Campaign data to download
   * @returns {Promise<Blob>} ZIP file blob
   */
  async downloadCampaign(campaignData) {
    try {
      const response = await this.client.post('/api/campaign/download', campaignData, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generate random campaign data
   * @returns {Promise} Random campaign data
   */
  async generateRandomData() {
    try {
      const response = await this.client.post('/api/campaign/random-data');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Suggest target audiences
   * @param {string} platform - Social media platform
   * @param {Object} companyInfo - Company information
   * @returns {Promise} Audience suggestions
   */
  async suggestAudiences(platform, companyInfo) {
    try {
      const response = await this.client.post('/api/campaign/suggest-audiences', {
        platform,
        companyInfo
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Suggest social media platforms
   * @param {Object} companyInfo - Company information
   * @returns {Promise} Platform suggestions
   */
  async suggestPlatforms(companyInfo) {
    try {
      const response = await this.client.post('/api/campaign/suggest-platforms', {
        companyInfo
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Improve text with AI
   * @param {string} text - Text to improve
   * @param {string} context - Context for improvement
   * @returns {Promise} Improved text
   */
  async improveText(text, context = '') {
    try {
      const response = await this.client.post('/api/campaign/improve-text', {
        text,
        context
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Suggest campaign concepts
   * @param {Object} productInfo - Product information
   * @param {Object} brandGuidelines - Brand guidelines
   * @param {string} platform - Target platform
   * @returns {Promise} Campaign concept suggestions
   */
  async suggestConcepts(productInfo, brandGuidelines, platform) {
    try {
      const response = await this.client.post('/api/campaign/suggest-concepts', {
        productInfo,
        brandGuidelines,
        platform
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Scrape website for information
   * @param {string} url - Website URL
   * @returns {Promise} Scraped information
   */
  async scrapeWebsite(url) {
    try {
      const response = await this.client.post('/api/campaign/scrape-website', {
        url
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors
   * @param {Error} error - Axios error
   * @returns {Error} Formatted error
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.error || error.response.statusText;
      return new Error(message);
    } else if (error.request) {
      // Request made but no response
      return new Error('No response from server. Please check if the backend is running.');
    } else {
      // Error in request setup
      return new Error(error.message);
    }
  }
}

export default new ApiService();
