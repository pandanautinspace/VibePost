class ImageService {
  constructor() {
    this.apiUrl = 'https://api.blackbox.ai/chat/completions';
  }

  /**
   * Get API key (lazy loaded to ensure env vars are loaded)
   */
  getApiKey() {
    return process.env.BLACKBOX_API_KEY;
  }

  /**
   * Generate images using BlackBox AI API
   * @param {string} prompt - The image generation prompt
   * @param {number} count - Number of images to generate (default: 5)
   * @returns {Promise<Array>} Array of generated image URLs
   */
  async generateImages(prompt, count = 5) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('BLACKBOX_API_KEY is not configured');
    }

    try {
      console.log(`Generating ${count} images with prompt: ${prompt}`);
      
      const imagePromises = [];
      
      // Generate multiple images
      for (let i = 0; i < count; i++) {
        imagePromises.push(this.generateSingleImage(prompt, i + 1));
      }

      const results = await Promise.all(imagePromises);
      return results;
    } catch (error) {
      console.error('Error generating images:', error.message);
      throw new Error(`Failed to generate images: ${error.message}`);
    }
  }

  /**
   * Generate a single image using BlackBox AI
   * @param {string} prompt - The image generation prompt
   * @param {number} index - Image index for variation
   * @returns {Promise<Object>} Generated image data
   */
  async generateSingleImage(prompt, index) {
    try {
      const apiKey = this.getApiKey();
      console.log(`[Image ${index}] Starting generation...`);
      console.log(`[Image ${index}] API URL:`, this.apiUrl);
      console.log(`[Image ${index}] API Key present:`, !!apiKey);
      
      const data = {
        model: 'blackboxai/google/nano-banana',
        messages: [
          {
            role: 'user',
            content: `${prompt} (variation ${index}). Professional advertising photography, high quality, commercial use, 1024x1024 resolution.`
          }
        ]
      };

      console.log(`[Image ${index}] Request data:`, JSON.stringify(data, null, 2));

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      console.log(`[Image ${index}] Response status:`, response.status);
      console.log(`[Image ${index}] Response headers:`, Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Image ${index}] Error response:`, errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const responseData = await response.json();
      console.log(`[Image ${index}] Response data:`, JSON.stringify(responseData, null, 2));
      
      // Extract image URL from response
      let imageUrl = null;
      
      if (responseData.choices && responseData.choices[0]) {
        const content = responseData.choices[0].message?.content;
        if (content) {
          // Try to extract URL from markdown image format ![](url)
          const urlMatch = content.match(/!\[.*?\]\((https?:\/\/[^\)]+)\)/);
          if (urlMatch) {
            imageUrl = urlMatch[1];
          } else if (content.startsWith('http')) {
            imageUrl = content.trim();
          }
        }
      }

      if (imageUrl) {
        console.log(`[Image ${index}] ✅ Successfully extracted image URL`);
        return {
          url: imageUrl,
          index: index,
          prompt: prompt
        };
      } else {
        console.error(`[Image ${index}] ❌ No image URL found in response`);
        console.error(`[Image ${index}] Full response:`, JSON.stringify(responseData, null, 2));
        throw new Error('No image URL found in response');
      }
    } catch (error) {
      console.error(`[Image ${index}] ❌ Error:`, error.message);
      console.error(`[Image ${index}] Stack:`, error.stack);
      
      // Return a placeholder if generation fails
      return {
        url: `https://via.placeholder.com/1024x1024?text=Image+${index}+Generation+Failed`,
        index: index,
        prompt: prompt,
        error: error.message
      };
    }
  }

  /**
   * Enhance prompt with brand guidelines
   * @param {string} basePrompt - Base campaign prompt
   * @param {string} brandGuidelines - Brand guidelines text
   * @returns {string} Enhanced prompt
   */
  enhancePromptWithBrandGuidelines(basePrompt, brandGuidelines) {
    return `${basePrompt}. Brand guidelines: ${brandGuidelines}. Professional advertising photography, high quality, commercial use, brand consistent.`;
  }
}

export default new ImageService();
