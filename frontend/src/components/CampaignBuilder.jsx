import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Upload, Sparkles, Download, Image as ImageIcon, Video, 
  Loader2, ChevronLeft, ChevronRight, Globe, Wand2, Shuffle
} from 'lucide-react';
import apiService from '../services/api';

const TOTAL_STEPS = 6;

export default function CampaignBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [campaignData, setCampaignData] = useState(null);

  // Form data for all steps
  const [formData, setFormData] = useState({
    // Step 1: Company Information
    companyName: '',
    companyDescription: '',
    companyWebsite: '',
    
    // Step 2: Brand Guidelines
    brandGuidelines: '',
    brandColors: '',
    brandVoice: '',
    
    // Step 3: Social Media & Audience
    platform: 'Instagram',
    targetAudience: '',
    ageRange: '',
    interests: '',
    
    // Step 4: Product Information
    productName: '',
    productDescription: '',
    productFeatures: '',
    productUrl: '',
    
    // Step 5: Campaign Concept
    campaignObjective: 'Brand Awareness',
    campaignMessage: '',
    campaignNotes: '',
  });

  const [files, setFiles] = useState({
    brandGuidelineFiles: [],
    inputImages: [],
  });

  // AI suggestions state
  const [suggestions, setSuggestions] = useState({
    platforms: [],
    audiences: [],
    concepts: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => ({
      ...prev,
      [fieldName]: selectedFiles
    }));
  };

  // Generate random data for all fields
  const handleGenerateRandomData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.generateRandomData();
      if (response.success) {
        const data = response.data;
        setFormData({
          companyName: data.company.name,
          companyDescription: data.company.description,
          companyWebsite: data.company.website,
          brandGuidelines: data.brand.guidelines,
          brandColors: data.brand.colors,
          brandVoice: data.brand.voice,
          platform: data.social.platform,
          targetAudience: data.social.targetAudience,
          ageRange: data.social.ageRange,
          interests: data.social.interests,
          productName: data.product.name,
          productDescription: data.product.description,
          productFeatures: data.product.features,
          productUrl: data.product.productUrl,
          campaignObjective: data.campaign.objective,
          campaignMessage: data.campaign.message,
          campaignNotes: data.campaign.notes,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // State for scraped product images
  const [scrapedImages, setScrapedImages] = useState([]);

  // Scrape website for company info
  const handleScrapeWebsite = async (url, type = 'company') => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.scrapeWebsite(url);
      if (response.success && response.data) {
        if (type === 'company') {
          setFormData(prev => ({
            ...prev,
            companyName: response.data.companyName || prev.companyName,
            companyDescription: response.data.description || prev.companyDescription,
            // Also populate brand guidelines fields
            brandGuidelines: response.data.brandGuidelines || prev.brandGuidelines,
            brandColors: response.data.brandColors || prev.brandColors,
            brandVoice: response.data.brandVoice || prev.brandVoice,
          }));
        } else if (type === 'product') {
          setFormData(prev => ({
            ...prev,
            productName: response.data.title || prev.productName,
            productDescription: response.data.description || prev.productDescription,
          }));
          // Store scraped product images
          if (response.data.productImages && response.data.productImages.length > 0) {
            setScrapedImages(response.data.productImages);
          }
        }
      } else {
        setError(response.error || 'Failed to scrape website');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Suggest platforms
  const handleSuggestPlatforms = async () => {
    setLoading(true);
    try {
      const response = await apiService.suggestPlatforms({
        name: formData.companyName,
        description: formData.companyDescription
      });
      if (response.success) {
        setSuggestions(prev => ({ ...prev, platforms: response.data }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Suggest audiences
  const handleSuggestAudiences = async () => {
    setLoading(true);
    try {
      const response = await apiService.suggestAudiences(formData.platform, {
        name: formData.companyName,
        description: formData.companyDescription
      });
      if (response.success) {
        setSuggestions(prev => ({ ...prev, audiences: response.data }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Improve text with AI
  const handleImproveText = async (fieldName, context = '') => {
    const text = formData[fieldName];
    if (!text) return;
    
    setLoading(true);
    try {
      const response = await apiService.improveText(text, context);
      if (response.success) {
        setFormData(prev => ({
          ...prev,
          [fieldName]: response.data.improvedText
        }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Suggest campaign concepts
  const handleSuggestConcepts = async () => {
    setLoading(true);
    try {
      const response = await apiService.suggestConcepts(
        {
          name: formData.productName,
          description: formData.productDescription,
          features: formData.productFeatures
        },
        {
          guidelines: formData.brandGuidelines,
          voice: formData.brandVoice
        },
        formData.platform
      );
      if (response.success) {
        setSuggestions(prev => ({ ...prev, concepts: response.data }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Navigation
  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      setError(null);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  // Generate campaign
  const handleGenerateCampaign = async () => {
    setLoading(true);
    setError(null);
    setCampaignData(null);

    try {
      const formDataToSend = new FormData();
      
      // Combine all data into the format expected by backend
      const brandGuidelinesText = `${formData.brandGuidelines}\n\nBrand Voice: ${formData.brandVoice}\nColors: ${formData.brandColors}`;
      const campaignPrompt = `Platform: ${formData.platform}\nTarget Audience: ${formData.targetAudience}\n\nProduct: ${formData.productName}\n${formData.productDescription}\n\nCampaign Objective: ${formData.campaignObjective}\nMessage: ${formData.campaignMessage}\n\nAdditional Notes: ${formData.campaignNotes}`;
      
      formDataToSend.append('brandGuidelinesText', brandGuidelinesText);
      formDataToSend.append('campaignPrompt', campaignPrompt);

      // Append files
      files.brandGuidelineFiles.forEach(file => {
        formDataToSend.append('brandGuidelineFiles', file);
      });
      files.inputImages.forEach(file => {
        formDataToSend.append('inputImages', file);
      });

      const response = await apiService.generateCampaign(formDataToSend);
      
      if (response.success) {
        setCampaignData(response.data);
        setCurrentStep(TOTAL_STEPS); // Move to results step
      } else {
        setError(response.error || 'Failed to generate campaign');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while generating the campaign');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!campaignData) return;

    try {
      const blob = await apiService.downloadCampaign(campaignData);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `campaign-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to download campaign assets');
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setFormData({
      companyName: '',
      companyDescription: '',
      companyWebsite: '',
      brandGuidelines: '',
      brandColors: '',
      brandVoice: '',
      platform: 'Instagram',
      targetAudience: '',
      ageRange: '',
      interests: '',
      productName: '',
      productDescription: '',
      productFeatures: '',
      productUrl: '',
      campaignObjective: 'Brand Awareness',
      campaignMessage: '',
      campaignNotes: '',
    });
    setFiles({
      brandGuidelineFiles: [],
      inputImages: [],
    });
    setCampaignData(null);
    setError(null);
    setSuggestions({
      platforms: [],
      audiences: [],
      concepts: [],
    });
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderCompanyInfo();
      case 2:
        return renderBrandGuidelines();
      case 3:
        return renderSocialMedia();
      case 4:
        return renderProductInfo();
      case 5:
        return renderCampaignConcept();
      case 6:
        return renderResults();
      default:
        return null;
    }
  };

  // Step 1: Company Information
  const renderCompanyInfo = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
        <Input
          id="companyName"
          name="companyName"
          placeholder="Enter your company name"
          value={formData.companyName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyDescription">Company Description <span className="text-red-500">*</span></Label>
        <div className="flex gap-2">
          <Textarea
            id="companyDescription"
            name="companyDescription"
            placeholder="Describe your company, products, and services..."
            value={formData.companyDescription}
            onChange={handleInputChange}
            rows={4}
            className="resize-none flex-1"
            required
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => handleImproveText('companyDescription', 'professional')}
            disabled={loading || !formData.companyDescription}
            title="Improve with AI"
          >
            <Wand2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyWebsite">Company Website (Optional)</Label>
        <div className="flex gap-2">
          <Input
            id="companyWebsite"
            name="companyWebsite"
            type="url"
            placeholder="https://www.example.com"
            value={formData.companyWebsite}
            onChange={handleInputChange}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => handleScrapeWebsite(formData.companyWebsite, 'company')}
            disabled={loading || !formData.companyWebsite}
          >
            <Globe className="mr-2 h-4 w-4" />
            Scrape
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          We can automatically extract company info and brand guidelines from your website
        </p>
      </div>
    </div>
  );

  // Step 2: Brand Guidelines
  const renderBrandGuidelines = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="brandGuidelines">Brand Guidelines <span className="text-red-500">*</span></Label>
        <div className="flex gap-2">
          <Textarea
            id="brandGuidelines"
            name="brandGuidelines"
            placeholder="Describe your brand's visual style, messaging, and values..."
            value={formData.brandGuidelines}
            onChange={handleInputChange}
            rows={4}
            className="resize-none flex-1"
            required
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => handleImproveText('brandGuidelines', 'professional brand guidelines')}
            disabled={loading || !formData.brandGuidelines}
            title="Improve with AI"
          >
            <Wand2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="brandColors">Brand Colors (Optional)</Label>
        <Input
          id="brandColors"
          name="brandColors"
          placeholder="e.g., #FF6B35, #004E89, #F7F7F7"
          value={formData.brandColors}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="brandVoice">Brand Voice & Tone (Optional)</Label>
        <Textarea
          id="brandVoice"
          name="brandVoice"
          placeholder="e.g., Professional yet approachable, confident and inspiring..."
          value={formData.brandVoice}
          onChange={handleInputChange}
          rows={3}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="brandGuidelineFiles">Brand Guideline Files (Optional)</Label>
        <div className="flex items-center gap-2">
          <Input
            id="brandGuidelineFiles"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,image/*"
            onChange={(e) => handleFileChange(e, 'brandGuidelineFiles')}
            className="cursor-pointer"
          />
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
        {files.brandGuidelineFiles.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {files.brandGuidelineFiles.length} file(s) selected
          </p>
        )}
      </div>
    </div>
  );

  // Step 3: Social Media & Audience
  const renderSocialMedia = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="platform">Target Platform <span className="text-red-500">*</span></Label>
        <div className="flex gap-2">
          <Select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleInputChange}
            className="flex-1"
          >
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Twitter">Twitter</option>
            <option value="TikTok">TikTok</option>
            <option value="YouTube">YouTube</option>
          </Select>
          <Button
            type="button"
            variant="outline"
            onClick={handleSuggestPlatforms}
            disabled={loading}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Suggest
          </Button>
        </div>
        {suggestions.platforms.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestions.platforms.map((item, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => setFormData(prev => ({ ...prev, platform: item.platform }))}
              >
                {item.platform} - {item.reason}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetAudience">Target Audience <span className="text-red-500">*</span></Label>
        <div className="flex gap-2">
          <Textarea
            id="targetAudience"
            name="targetAudience"
            placeholder="Describe your target audience..."
            value={formData.targetAudience}
            onChange={handleInputChange}
            rows={3}
            className="resize-none flex-1"
            required
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => handleImproveText('targetAudience', 'target audience')}
            disabled={loading || !formData.targetAudience}
            title="Improve with AI"
          >
            <Wand2 className="h-4 w-4" />
          </Button>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleSuggestAudiences}
          disabled={loading}
          className="mt-2"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Suggest Audiences
        </Button>
        {suggestions.audiences.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestions.audiences.map((audience, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80"
                onClick={() => setFormData(prev => ({ ...prev, targetAudience: audience }))}
              >
                {audience}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ageRange">Age Range (Optional)</Label>
          <Input
            id="ageRange"
            name="ageRange"
            placeholder="e.g., 25-40"
            value={formData.ageRange}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interests">Interests (Optional)</Label>
          <Input
            id="interests"
            name="interests"
            placeholder="e.g., Technology, Fitness"
            value={formData.interests}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  // Step 4: Product Information
  const renderProductInfo = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="productName">Product Name <span className="text-red-500">*</span></Label>
        <Input
          id="productName"
          name="productName"
          placeholder="Enter your product name"
          value={formData.productName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="productDescription">Product Description <span className="text-red-500">*</span></Label>
        <div className="flex gap-2">
          <Textarea
            id="productDescription"
            name="productDescription"
            placeholder="Describe your product, its benefits, and unique features..."
            value={formData.productDescription}
            onChange={handleInputChange}
            rows={4}
            className="resize-none flex-1"
            required
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => handleImproveText('productDescription', 'product description')}
            disabled={loading || !formData.productDescription}
            title="Improve with AI"
          >
            <Wand2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="productFeatures">Key Features (Optional)</Label>
        <Textarea
          id="productFeatures"
          name="productFeatures"
          placeholder="List key features, one per line..."
          value={formData.productFeatures}
          onChange={handleInputChange}
          rows={3}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="productUrl">Product Page URL (Optional)</Label>
        <div className="flex gap-2">
          <Input
            id="productUrl"
            name="productUrl"
            type="url"
            placeholder="https://www.example.com/product"
            value={formData.productUrl}
            onChange={handleInputChange}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => handleScrapeWebsite(formData.productUrl, 'product')}
            disabled={loading || !formData.productUrl}
          >
            <Globe className="mr-2 h-4 w-4" />
            Scrape
          </Button>
        </div>
      </div>

      {/* Scraped Product Images */}
      {scrapedImages.length > 0 && (
        <div className="space-y-2">
          <Label>Scraped Product Images ({scrapedImages.length})</Label>
          <div className="grid grid-cols-2 gap-3">
            {scrapedImages.map((image, idx) => (
              <div key={idx} className="space-y-1">
                <div className="relative group">
                  <img
                    src={typeof image === 'string' ? image : image.url}
                    alt={typeof image === 'string' ? `Product image ${idx + 1}` : image.caption}
                    className="w-full h-32 object-cover rounded-md border"
                    onError={(e) => {
                      e.target.parentElement.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                    <span className="text-white text-xs text-center px-2">
                      {typeof image === 'string' ? `Image ${idx + 1}` : image.caption}
                    </span>
                  </div>
                </div>
                {typeof image === 'object' && image.caption && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {image.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            These images were extracted from the product page and will be used as reference
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="inputImages">Reference Images (Optional)</Label>
        <div className="flex items-center gap-2">
          <Input
            id="inputImages"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'inputImages')}
            className="cursor-pointer"
          />
          <ImageIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        {files.inputImages.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {files.inputImages.length} image(s) selected
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Upload additional product images or use scraped images above
        </p>
      </div>
    </div>
  );

  // Step 5: Campaign Concept
  const renderCampaignConcept = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="campaignObjective">Campaign Objective <span className="text-red-500">*</span></Label>
        <Select
          id="campaignObjective"
          name="campaignObjective"
          value={formData.campaignObjective}
          onChange={handleInputChange}
        >
          <option value="Brand Awareness">Brand Awareness</option>
          <option value="Lead Generation">Lead Generation</option>
          <option value="Product Launch">Product Launch</option>
          <option value="Engagement">Engagement</option>
          <option value="Conversion">Conversion</option>
          <option value="Customer Retention">Customer Retention</option>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="campaignMessage">Campaign Message <span className="text-red-500">*</span></Label>
        <div className="flex gap-2">
          <Textarea
            id="campaignMessage"
            name="campaignMessage"
            placeholder="Describe your campaign message and key points..."
            value={formData.campaignMessage}
            onChange={handleInputChange}
            rows={4}
            className="resize-none flex-1"
            required
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => handleImproveText('campaignMessage', 'campaign message')}
            disabled={loading || !formData.campaignMessage}
            title="Improve with AI"
          >
            <Wand2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleSuggestConcepts}
          disabled={loading}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Suggest Campaign Concepts
        </Button>
        {suggestions.concepts.length > 0 && (
          <div className="space-y-2 mt-3">
            {suggestions.concepts.map((concept, idx) => (
              <Card key={idx} className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  campaignMessage: concept.description,
                  campaignObjective: concept.objective 
                }))}>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">{concept.title}</CardTitle>
                  <CardDescription className="text-xs">{concept.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="campaignNotes">Additional Notes (Optional)</Label>
        <Textarea
          id="campaignNotes"
          name="campaignNotes"
          placeholder="Any additional information or specific requirements..."
          value={formData.campaignNotes}
          onChange={handleInputChange}
          rows={3}
          className="resize-none"
        />
      </div>
    </div>
  );

  // Step 6: Results
  const renderResults = () => (
    <div className="space-y-6">
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Generating your campaign... This may take a few minutes.
          </p>
        </div>
      )}

      {!loading && !campaignData && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
          <Sparkles className="h-12 w-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Review your information and click "Generate Campaign" to create your ad assets
          </p>
        </div>
      )}

      {campaignData && (
        <div className="space-y-6">
          {/* Images */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Generated Images ({campaignData.images.length})
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {campaignData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={`Campaign image ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      Image {index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video */}
          {campaignData.video && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Video className="h-5 w-5" />
                Generated Video
              </h3>
              <video
                src={campaignData.video.url}
                controls
                className="w-full rounded-lg border"
              />
              {campaignData.video.placeholder && (
                <p className="text-xs text-muted-foreground mt-2">
                  Note: This is a placeholder video. Configure VEO3_API_KEY for custom videos.
                </p>
              )}
            </div>
          )}

          {/* Download Button */}
          <div className="flex gap-3 animate-bounce-in">
            <Button
              onClick={handleDownload}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <Download className="mr-2 h-4 w-4 animate-bounce" />
              🏖️ Download Your Vibes (ZIP)
            </Button>
            <Button
              onClick={handleReset}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="lg"
            >
              🌊 Catch Another Wave
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Beach-themed animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-float-slow">🌴</div>
        <div className="absolute top-40 right-20 text-5xl animate-float-delayed">🌊</div>
        <div className="absolute bottom-40 left-20 text-4xl animate-bounce-slow">🏄</div>
        <div className="absolute top-60 right-40 text-5xl animate-spin-slow">☀️</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-float">🐚</div>
        <div className="absolute top-80 left-40 text-3xl animate-float-delayed">🦀</div>
        <div className="absolute bottom-60 right-60 text-4xl animate-bounce-slow">🍹</div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-wave">
            🌊 VibePost 🏖️
          </h1>
          <p className="text-lg text-cyan-600 dark:text-cyan-400 font-medium animate-float">
            Ride the wave of creativity • AI-powered beach vibes for your brand
          </p>
        </div>

        {/* Generate Random Data Button */}
        {currentStep === 1 && (
          <div className="flex justify-center mb-6 animate-bounce-in">
            <Button
              onClick={handleGenerateRandomData}
              disabled={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <Shuffle className="mr-2 h-4 w-4 animate-spin-slow" />
              🎲 Generate Random Vibes
            </Button>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
              🌊 Wave {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {currentStep === 1 && '🏢 Company Vibes'}
              {currentStep === 2 && '🎨 Brand Essence'}
              {currentStep === 3 && '📱 Social Waves'}
              {currentStep === 4 && '🎁 Product Story'}
              {currentStep === 5 && '💡 Campaign Magic'}
              {currentStep === 6 && '✨ Your Masterpiece'}
            </span>
          </div>
          <Progress value={(currentStep / TOTAL_STEPS) * 100} max={100} className="h-3 bg-cyan-100 dark:bg-cyan-900" />
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto relative z-10">
          <Card className="border-2 border-cyan-200 dark:border-cyan-800 shadow-2xl shadow-cyan-500/20 animate-slide-up">
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && 'Company Information'}
                {currentStep === 2 && 'Brand Guidelines'}
                {currentStep === 3 && 'Social Media & Audience'}
                {currentStep === 4 && 'Product Information'}
                {currentStep === 5 && 'Campaign Concept'}
                {currentStep === 6 && 'Campaign Results'}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && 'Tell us about your company'}
                {currentStep === 2 && 'Define your brand identity'}
                {currentStep === 3 && 'Choose your platform and target audience'}
                {currentStep === 4 && 'Describe your product or service'}
                {currentStep === 5 && 'Define your campaign goals and message'}
                {currentStep === 6 && 'Your AI-generated campaign assets'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Step Content */}
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1 || loading}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                {currentStep < 5 && (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={loading}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Ride the Next Wave 🏄
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}

                {currentStep === 5 && (
                  <Button
                    type="button"
                    onClick={handleGenerateCampaign}
                    disabled={loading || !formData.campaignMessage}
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse-slow"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Magic... ✨
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-bounce" />
                        🌊 Generate Campaign 🎨
                      </>
                    )}
                  </Button>
                )}

                {currentStep === 6 && campaignData && (
                  <Button
                    type="button"
                    onClick={handleReset}
                    variant="outline"
                  >
                    Start New Campaign
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
