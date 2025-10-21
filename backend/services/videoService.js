class VideoService {
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
   * Generate video using BlackBox AI with Veo 2 model
   * @param {string} prompt - The video generation prompt
   * @param {string} brandGuidelines - Brand guidelines
   * @returns {Promise<Object>} Generated video data
   */
  async generateVideo(prompt, brandGuidelines) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      console.warn('⚠️ BLACKBOX_API_KEY is not configured. Returning placeholder video.');
      return this.getPlaceholderVideo(prompt);
    }

    try {
      console.log('🎥 [Video] Starting generation...');
      console.log('🎥 [Video] API URL:', this.apiUrl);
      console.log('🎥 [Video] API Key present:', !!apiKey);
      console.log('🎥 [Video] Prompt:', prompt);
      
      const enhancedPrompt = this.enhancePromptForVideo(prompt, brandGuidelines);
      console.log('🎥 [Video] Enhanced prompt:', enhancedPrompt);

      const data = {
        model: 'blackboxai/google/veo-3-fast',
        messages: [
          {
            role: 'user',
            content: enhancedPrompt
          }
        ]
      };

      console.log('🎥 [Video] Request data:', JSON.stringify(data, null, 2));

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      console.log('🎥 [Video] Response status:', response.status);
      console.log('🎥 [Video] Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🎥 [Video] Error response:', errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const responseData = await response.json();
      console.log('🎥 [Video] Response data:', JSON.stringify(responseData, null, 2));
      
      // Extract video URL from response
      let videoUrl = null;
      
      if (responseData.choices && responseData.choices[0]) {
        const content = responseData.choices[0].message?.content;
        if (content) {
          // Try to extract URL from markdown video format or direct URL
          const urlMatch = content.match(/!\[.*?\]\((https?:\/\/[^\)]+)\)/) || 
                          content.match(/(https?:\/\/[^\s]+\.mp4)/);
          if (urlMatch) {
            videoUrl = urlMatch[1];
          } else if (content.startsWith('http')) {
            videoUrl = content.trim();
          }
        }
      }

      if (videoUrl) {
        console.log('🎥 [Video] ✅ Successfully extracted video URL');
        return {
          url: videoUrl,
          duration: 5,
          prompt: enhancedPrompt
        };
      } else {
        console.error('🎥 [Video] ❌ No video URL found in response');
        console.error('🎥 [Video] Full response:', JSON.stringify(responseData, null, 2));
        throw new Error('No video URL found in response');
      }
    } catch (error) {
      console.error('🎥 [Video] ❌ Error:', error.message);
      console.error('🎥 [Video] Stack:', error.stack);
      
      // Return placeholder video if generation fails
      return this.getPlaceholderVideo(prompt);
    }
  }

  /**
   * Enhance prompt for video generation
   * @param {string} basePrompt - Base campaign prompt
   * @param {string} brandGuidelines - Brand guidelines
   * @returns {string} Enhanced video prompt
   */
  enhancePromptForVideo(basePrompt, brandGuidelines) {
    return `Create a professional advertising video: ${basePrompt}. Brand guidelines: ${brandGuidelines}. Cinematic, smooth camera movement, professional lighting, commercial quality, 5 seconds duration.`;
  }

  /**
   * Get placeholder video when API is not available
   * @param {string} prompt - Original prompt
   * @returns {Object} Placeholder video data
   */
  getPlaceholderVideo(prompt) {
    return {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: 5,
      prompt: prompt,
      placeholder: true,
      message: 'This is a placeholder video. Video generation in progress or API unavailable.'
    };
  }
}

export default new VideoService();
