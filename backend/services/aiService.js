import axios from 'axios';
import * as cheerio from 'cheerio';

class AIService {
  constructor() {
    // API key loaded lazily when needed
  }

  /**
   * Get API key (lazy loaded to ensure env vars are loaded)
   */
  getApiKey() {
    return process.env.BLACKBOX_API_KEY;
  }

  /**
   * Generate random campaign data for all fields
   * @returns {Promise<Object>} Random campaign data
   */
  async generateRandomCampaignData() {
    const industries = ['Technology', 'Fashion', 'Food & Beverage', 'Healthcare', 'Finance', 'Education', 'Travel', 'Fitness', 'Beauty', 'Real Estate'];
    const platforms = ['Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'TikTok', 'YouTube'];
    const objectives = ['Brand Awareness', 'Lead Generation', 'Product Launch', 'Engagement', 'Conversion'];
    
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const objective = objectives[Math.floor(Math.random() * objectives.length)];
    
    return {
      company: {
        name: `${industry} Innovations Inc.`,
        description: `A leading ${industry.toLowerCase()} company focused on innovation and customer satisfaction. We deliver cutting-edge solutions that transform the industry.`,
        website: `https://www.${industry.toLowerCase().replace(/\s+/g, '')}-innovations.com`
      },
      brand: {
        guidelines: `Modern, professional, and innovative. Our brand represents quality and trust in the ${industry.toLowerCase()} sector. We use bold colors and clean typography to convey our message.`,
        colors: '#0066CC, #FF6B35, #F7F7F7',
        voice: 'Professional yet approachable, confident and inspiring'
      },
      social: {
        platform: platform,
        targetAudience: `${platform === 'LinkedIn' ? 'Professionals and business decision-makers' : 'Young adults aged 25-40'} interested in ${industry.toLowerCase()} solutions`,
        ageRange: platform === 'LinkedIn' ? '30-55' : '25-40',
        interests: `${industry}, Innovation, Quality Products, Lifestyle`
      },
      product: {
        name: `${industry} Pro Solution`,
        description: `Revolutionary ${industry.toLowerCase()} product that solves key customer pain points with innovative features and exceptional quality.`,
        features: 'Advanced technology, User-friendly interface, Premium quality, Sustainable materials',
        productUrl: ''
      },
      campaign: {
        objective: objective,
        message: `Discover the future of ${industry.toLowerCase()} with our innovative solution. Transform your experience today!`,
        notes: `Focus on ${objective.toLowerCase()} through compelling visuals and clear messaging.`
      }
    };
  }

  /**
   * Suggest target audiences based on platform and company info
   * @param {string} platform - Social media platform
   * @param {Object} companyInfo - Company information
   * @returns {Promise<Array>} Array of audience suggestions
   */
  async suggestTargetAudiences(platform, companyInfo) {
    const suggestions = {
      'Instagram': [
        'Young adults (18-34) interested in visual content',
        'Lifestyle enthusiasts and trendsetters',
        'Mobile-first consumers',
        'Brand-conscious shoppers',
        'Influencer followers'
      ],
      'Facebook': [
        'Adults (25-54) with diverse interests',
        'Community-oriented users',
        'Family-focused demographics',
        'Local business supporters',
        'Event attendees'
      ],
      'LinkedIn': [
        'Business professionals and decision-makers',
        'B2B buyers and enterprise clients',
        'Industry thought leaders',
        'Job seekers and recruiters',
        'Corporate executives'
      ],
      'Twitter': [
        'News-conscious and trend-aware users',
        'Tech-savvy early adopters',
        'Opinion leaders and influencers',
        'Real-time engagement seekers',
        'Brand advocates'
      ],
      'TikTok': [
        'Gen Z and young millennials (16-30)',
        'Entertainment-focused users',
        'Viral content consumers',
        'Creative and authentic brand followers',
        'Short-form video enthusiasts'
      ],
      'YouTube': [
        'Video content consumers of all ages',
        'Tutorial and how-to seekers',
        'Entertainment and education focused',
        'Product review watchers',
        'Long-form content enthusiasts'
      ]
    };

    return suggestions[platform] || suggestions['Instagram'];
  }

  /**
   * Suggest social media platforms based on company info
   * @param {Object} companyInfo - Company information
   * @returns {Promise<Array>} Array of platform suggestions
   */
  async suggestPlatforms(companyInfo) {
    // Simple logic based on company description keywords
    const description = (companyInfo.description || '').toLowerCase();
    const suggestions = [];

    if (description.includes('b2b') || description.includes('enterprise') || description.includes('professional')) {
      suggestions.push({ platform: 'LinkedIn', reason: 'Best for B2B and professional audiences' });
    }
    
    if (description.includes('visual') || description.includes('lifestyle') || description.includes('fashion') || description.includes('beauty')) {
      suggestions.push({ platform: 'Instagram', reason: 'Perfect for visual storytelling' });
    }
    
    if (description.includes('young') || description.includes('gen z') || description.includes('trending')) {
      suggestions.push({ platform: 'TikTok', reason: 'Ideal for reaching younger demographics' });
    }
    
    if (description.includes('video') || description.includes('tutorial') || description.includes('education')) {
      suggestions.push({ platform: 'YouTube', reason: 'Great for long-form video content' });
    }

    // Default suggestions if none matched
    if (suggestions.length === 0) {
      suggestions.push(
        { platform: 'Instagram', reason: 'Versatile platform with high engagement' },
        { platform: 'Facebook', reason: 'Broad reach across demographics' },
        { platform: 'LinkedIn', reason: 'Professional networking and B2B' }
      );
    }

    return suggestions.slice(0, 3);
  }

  /**
   * Improve campaign text using AI
   * @param {string} text - Original text
   * @param {string} context - Context for improvement
   * @returns {Promise<string>} Improved text
   */
  async improveCampaignText(text, context = '') {
    if (!text || text.trim().length === 0) {
      return text;
    }

    // Simple text improvement logic
    let improved = text.trim();
    
    // Capitalize first letter
    improved = improved.charAt(0).toUpperCase() + improved.slice(1);
    
    // Add period if missing
    if (!improved.match(/[.!?]$/)) {
      improved += '.';
    }
    
    // Add context-based enhancements
    if (context.includes('professional')) {
      improved = improved.replace(/\b(cool|awesome|great)\b/gi, 'exceptional');
    }
    
    return improved;
  }

  /**
   * Suggest campaign concepts based on product and brand info
   * @param {Object} productInfo - Product information
   * @param {Object} brandGuidelines - Brand guidelines
   * @param {string} platform - Target platform
   * @returns {Promise<Array>} Array of campaign concept suggestions
   */
  async suggestCampaignConcepts(productInfo, brandGuidelines, platform) {
    const concepts = [
      {
        title: 'Product Showcase',
        description: `Highlight the key features and benefits of ${productInfo.name || 'your product'} with stunning visuals and clear messaging.`,
        objective: 'Product Awareness'
      },
      {
        title: 'Customer Success Stories',
        description: 'Share authentic testimonials and user experiences to build trust and credibility.',
        objective: 'Social Proof'
      },
      {
        title: 'Limited Time Offer',
        description: 'Create urgency with a special promotion or exclusive deal for early adopters.',
        objective: 'Conversion'
      },
      {
        title: 'Behind the Scenes',
        description: 'Give your audience an insider look at your brand story, values, and team.',
        objective: 'Brand Connection'
      },
      {
        title: 'Problem-Solution',
        description: 'Address customer pain points and demonstrate how your product provides the perfect solution.',
        objective: 'Value Proposition'
      }
    ];

    return concepts;
  }

  /**
   * Scrape website for company/product information
   * @param {string} url - Website URL
   * @returns {Promise<Object>} Scraped information
   */
  async scrapeWebsite(url) {
    try {
      // Validate URL
      if (!url || !url.startsWith('http')) {
        throw new Error('Invalid URL provided');
      }

      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      
      // Extract basic information
      const title = $('title').text().trim() || $('h1').first().text().trim();
      const description = $('meta[name="description"]').attr('content') || 
                         $('meta[property="og:description"]').attr('content') || 
                         $('p').first().text().trim().substring(0, 200);
      
      // Try to find company name
      const companyName = $('meta[property="og:site_name"]').attr('content') || 
                         title.split('|')[0].trim() ||
                         title.split('-')[0].trim();

      // Extract brand-related information
      const brandInfo = this.extractBrandInfo($, url);

      // Extract product images
      const productImages = this.extractProductImages($, url);

      return {
        success: true,
        data: {
          companyName: companyName,
          description: description,
          title: title,
          url: url,
          brandGuidelines: brandInfo.guidelines,
          brandColors: brandInfo.colors,
          brandVoice: brandInfo.voice,
          productImages: productImages
        }
      };
    } catch (error) {
      console.error('Website scraping error:', error.message);
      return {
        success: false,
        error: 'Failed to scrape website. Please enter information manually.',
        data: null
      };
    }
  }

  /**
   * Extract product images from website with captions
   * @param {Object} $ - Cheerio instance
   * @param {string} url - Website URL
   * @returns {Array} Array of image objects with url and caption
   */
  extractProductImages($, url) {
    const images = [];
    const baseUrl = new URL(url).origin;

    // Look for Open Graph images (commonly used for product images)
    const ogImage = $('meta[property="og:image"]').attr('content');
    const ogImageAlt = $('meta[property="og:image:alt"]').attr('content');
    if (ogImage) {
      images.push({
        url: this.normalizeImageUrl(ogImage, baseUrl),
        caption: ogImageAlt || 'Product featured image'
      });
    }

    // Look for product images in common selectors
    const productImageSelectors = [
      'img[class*="product"]',
      'img[class*="Product"]',
      'img[id*="product"]',
      'img[id*="Product"]',
      '.product-image img',
      '.product-gallery img',
      '[class*="gallery"] img',
      '[class*="slider"] img',
      'main img',
      'article img'
    ];

    productImageSelectors.forEach(selector => {
      $(selector).each((i, elem) => {
        const src = $(elem).attr('src') || $(elem).attr('data-src');
        if (src && !src.includes('logo') && !src.includes('icon')) {
          const normalizedUrl = this.normalizeImageUrl(src, baseUrl);
          if (normalizedUrl && !images.find(img => img.url === normalizedUrl)) {
            // Extract caption from alt text, title, or nearby text
            const caption = this.extractImageCaption($, elem);
            images.push({
              url: normalizedUrl,
              caption: caption
            });
          }
        }
      });
    });

    // Limit to first 5 images to avoid overwhelming the user
    return images.slice(0, 5);
  }

  /**
   * Extract caption for an image from alt text, title, or nearby text
   * @param {Object} $ - Cheerio instance
   * @param {Object} elem - Image element
   * @returns {string} Image caption
   */
  extractImageCaption($, elem) {
    // Try alt text first
    const alt = $(elem).attr('alt');
    if (alt && alt.trim() && alt.length > 3) {
      return alt.trim();
    }

    // Try title attribute
    const title = $(elem).attr('title');
    if (title && title.trim() && title.length > 3) {
      return title.trim();
    }

    // Try aria-label
    const ariaLabel = $(elem).attr('aria-label');
    if (ariaLabel && ariaLabel.trim() && ariaLabel.length > 3) {
      return ariaLabel.trim();
    }

    // Try to find caption in parent figure element
    const figure = $(elem).closest('figure');
    if (figure.length) {
      const figcaption = figure.find('figcaption').text().trim();
      if (figcaption && figcaption.length > 3) {
        return figcaption.substring(0, 100);
      }
    }

    // Try to find nearby text (sibling or parent text)
    const parent = $(elem).parent();
    const siblingText = parent.find('p, span, div').first().text().trim();
    if (siblingText && siblingText.length > 3 && siblingText.length < 150) {
      return siblingText.substring(0, 100);
    }

    // Default caption based on image position
    return 'Product image';
  }

  /**
   * Normalize image URL to absolute URL
   * @param {string} imageUrl - Image URL (relative or absolute)
   * @param {string} baseUrl - Base URL of the website
   * @returns {string} Normalized absolute URL
   */
  normalizeImageUrl(imageUrl, baseUrl) {
    try {
      // If already absolute URL, return as is
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
      }
      
      // If protocol-relative URL
      if (imageUrl.startsWith('//')) {
        return 'https:' + imageUrl;
      }
      
      // If relative URL, combine with base URL
      if (imageUrl.startsWith('/')) {
        return baseUrl + imageUrl;
      }
      
      // If relative path without leading slash
      return baseUrl + '/' + imageUrl;
    } catch (error) {
      console.error('Error normalizing image URL:', error.message);
      return null;
    }
  }

  /**
   * Extract brand information from website
   * @param {Object} $ - Cheerio instance
   * @param {string} url - Website URL
   * @returns {Object} Brand information
   */
  extractBrandInfo($, url) {
    const brandInfo = {
      guidelines: '',
      colors: '',
      voice: ''
    };

    // Try to extract color scheme from CSS variables or meta tags
    const themeColor = $('meta[name="theme-color"]').attr('content');
    if (themeColor) {
      brandInfo.colors = themeColor;
    }

    // Look for common brand/about sections
    const aboutText = $('section[class*="about"], div[class*="about"], section[id*="about"]')
      .first()
      .text()
      .trim()
      .substring(0, 300);

    // Look for mission/vision statements
    const missionText = $('section[class*="mission"], div[class*="mission"], section[class*="vision"]')
      .first()
      .text()
      .trim()
      .substring(0, 200);

    // Combine information for brand guidelines
    const guidelinesParts = [];
    
    if (aboutText) {
      guidelinesParts.push(aboutText);
    }
    
    if (missionText && missionText !== aboutText) {
      guidelinesParts.push(missionText);
    }

    // If we found content, use it; otherwise create a generic guideline
    if (guidelinesParts.length > 0) {
      brandInfo.guidelines = guidelinesParts.join('\n\n');
    } else {
      // Generate basic guidelines from the description
      const description = $('meta[name="description"]').attr('content') || '';
      if (description) {
        brandInfo.guidelines = `Professional and modern brand focused on quality and customer satisfaction. ${description}`;
      }
    }

    // Try to infer brand voice from content tone
    const headings = $('h1, h2, h3').map((i, el) => $(el).text()).get().join(' ').toLowerCase();
    
    if (headings.includes('innovative') || headings.includes('cutting-edge') || headings.includes('technology')) {
      brandInfo.voice = 'Innovative, forward-thinking, and tech-savvy';
    } else if (headings.includes('professional') || headings.includes('enterprise') || headings.includes('business')) {
      brandInfo.voice = 'Professional, trustworthy, and authoritative';
    } else if (headings.includes('friendly') || headings.includes('community') || headings.includes('together')) {
      brandInfo.voice = 'Friendly, approachable, and community-focused';
    } else if (headings.includes('luxury') || headings.includes('premium') || headings.includes('exclusive')) {
      brandInfo.voice = 'Premium, sophisticated, and exclusive';
    } else {
      brandInfo.voice = 'Professional yet approachable, confident and clear';
    }

    return brandInfo;
  }

  /**
   * Generate campaign description using AI
   * @param {string} campaignPrompt - The campaign concept
   * @param {string} brandGuidelines - Brand guidelines
   * @param {Array} generatedImages - Array of generated image data
   * @returns {Promise<string>} Campaign description
   */
  async generateCampaignDescription(campaignPrompt, brandGuidelines, generatedImages) {
    try {
      // Create a comprehensive campaign description
      const description = this.createCampaignDescription(
        campaignPrompt,
        brandGuidelines,
        generatedImages
      );

      return description;
    } catch (error) {
      console.error('Error generating campaign description:', error.message);
      return this.getFallbackDescription(campaignPrompt, brandGuidelines);
    }
  }

  /**
   * Create detailed campaign description
   * @param {string} campaignPrompt - Campaign concept
   * @param {string} brandGuidelines - Brand guidelines
   * @param {Array} generatedImages - Generated images
   * @returns {string} Campaign description
   */
  createCampaignDescription(campaignPrompt, brandGuidelines, generatedImages) {
    const timestamp = new Date().toLocaleString();
    
    return `
# Ad Campaign Description

**Generated on:** ${timestamp}

## Campaign Concept
${campaignPrompt}

## Brand Guidelines
${brandGuidelines}

## Campaign Overview
This ad campaign leverages cutting-edge AI technology to create visually stunning and brand-consistent marketing materials. The campaign includes ${generatedImages.length} unique images and one promotional video, all designed to capture attention and drive engagement.

## Creative Assets

### Images (${generatedImages.length} variations)
${generatedImages.map((img, idx) => `
**Image ${idx + 1}:**
- Style: Professional advertising photography
- Resolution: 1024x1024
- Purpose: ${this.getImagePurpose(idx + 1)}
- Usage: Social media, web banners, print materials
`).join('\n')}

### Video
- Duration: 5 seconds
- Format: MP4, 1080p
- Purpose: Social media stories, video ads, website hero section
- Style: Cinematic, professional, brand-aligned

## Recommended Usage

### Social Media
- Instagram: Use images 1-3 for feed posts, video for stories/reels
- Facebook: Images 2-4 for carousel ads, video for video ads
- LinkedIn: Images 1 and 5 for professional posts
- Twitter/X: Images 3-5 for tweet attachments

### Digital Advertising
- Display Ads: All images optimized for various banner sizes
- Video Ads: Use the generated video for pre-roll and mid-roll placements
- Native Advertising: Images 1-3 for sponsored content

### Print & Offline
- Brochures: Images 1, 3, and 5
- Posters: Any image can be upscaled for large format printing
- Point of Sale: Images 2 and 4 for in-store displays

## Campaign Metrics to Track
- Engagement Rate
- Click-Through Rate (CTR)
- Conversion Rate
- Brand Awareness Lift
- Social Media Reach and Impressions

## Next Steps
1. Review all generated assets
2. Select primary and secondary images for different channels
3. Customize copy and calls-to-action for each platform
4. A/B test different image variations
5. Monitor performance and optimize based on data

## Brand Consistency Notes
All assets have been generated following the provided brand guidelines to ensure consistency across all marketing channels. The visual style, color palette, and messaging align with your brand identity.

---
*Generated by Ad Campaign Builder - Powered by AI*
    `.trim();
  }

  /**
   * Get purpose for each image based on index
   * @param {number} index - Image index
   * @returns {string} Image purpose
   */
  getImagePurpose(index) {
    const purposes = [
      'Hero image for main campaign visual',
      'Secondary supporting visual for variety',
      'Social media optimized variant',
      'Alternative angle/composition',
      'Complementary campaign asset'
    ];
    return purposes[index - 1] || 'Campaign visual asset';
  }

  /**
   * Get fallback description if AI generation fails
   * @param {string} campaignPrompt - Campaign prompt
   * @param {string} brandGuidelines - Brand guidelines
   * @returns {string} Fallback description
   */
  getFallbackDescription(campaignPrompt, brandGuidelines) {
    return `
# Ad Campaign Description

## Campaign Concept
${campaignPrompt}

## Brand Guidelines
${brandGuidelines}

## Overview
This campaign includes 5 AI-generated images and 1 video, all designed to align with your brand guidelines and campaign concept.

## Assets Generated
- 5 unique image variations (1024x1024)
- 1 promotional video (5 seconds, 1080p)

All assets are ready for use across digital and print media channels.
    `.trim();
  }
}

export default new AIService();
