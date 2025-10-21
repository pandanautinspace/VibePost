const API_KEY = "YOUR_API_KEY";
const API_URL = "https://api.blackbox.ai/chat/completions";

const data = {
    model: "blackboxai/google/veo-2",
    messages: [
        {
            role: "user",
            content: "tesla car moving on a high way",
        },
    ],
};

const response = await fetch(API_URL, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
});

const responseData = await response.json();
console.log(responseData);# Features & Capabilities

## 🎨 Core Features

### AI-Powered Image Generation
- **5 Unique Images**: Generate 5 distinct campaign images per request
- **High Resolution**: 1024x1024 pixel images
- **Brand Consistency**: Images follow your brand guidelines
- **Nano Banana Model**: Uses BlackBox AI's nano-banana model for fast, quality generation
- **Variation System**: Each image is a unique variation of your concept

### AI-Powered Video Generation
- **Promotional Video**: Generate 1 video per campaign
- **Veo 3 Fast**: Uses Google's Veo 3 Fast model (when configured)
- **5-Second Duration**: Perfect for social media stories and ads
- **1080p Quality**: High-definition video output
- **Fallback Support**: Placeholder video when API not configured

### Campaign Description Generation
- **AI-Generated Copy**: Automatic campaign description creation
- **Usage Guidelines**: Recommendations for different platforms
- **Asset Breakdown**: Detailed description of each generated asset
- **Marketing Strategy**: Suggested use cases and metrics to track
- **Brand Alignment**: Description follows your brand guidelines

## 📤 Input Options

### Brand Guidelines
- **Text Input**: Describe brand style, colors, tone, target audience
- **File Upload**: Support for PDF, DOC, DOCX documents
- **Multiple Files**: Upload up to 5 brand guideline files
- **Flexible Format**: Works with various document types

### Reference Images
- **Image Upload**: Upload reference images for style guidance
- **Multiple Images**: Support for up to 10 reference images
- **Format Support**: JPG, PNG, GIF formats accepted
- **Size Limit**: 10MB per file

### Campaign Concept
- **Detailed Prompts**: Rich text area for campaign description
- **Creative Freedom**: Describe any campaign concept
- **Context Aware**: AI understands marketing terminology
- **Flexible Length**: No strict character limits

## 💾 Output & Download

### Asset Download
- **ZIP Package**: All assets in one convenient file
- **Organized Structure**: Images, video, and description in folders
- **README Included**: Usage instructions in the ZIP
- **Quick Download**: One-click download button
- **Timestamp**: Files named with generation timestamp

### Asset Preview
- **Image Gallery**: View all 5 images in grid layout
- **Video Player**: Built-in video preview with controls
- **Description Preview**: Read campaign description before download
- **Hover Effects**: Interactive image previews
- **Responsive Layout**: Works on all screen sizes

## 🎯 User Interface

### Modern Design
- **shadcn/ui Components**: Professional, accessible components
- **Tailwind CSS**: Modern, responsive styling
- **Dark Mode Ready**: Theme support built-in
- **Gradient Accents**: Beautiful purple-pink gradients
- **Clean Layout**: Intuitive two-column design

### User Experience
- **Real-time Feedback**: Loading states and progress indicators
- **Error Handling**: Clear error messages
- **Form Validation**: Required field validation
- **File Preview**: See uploaded file counts
- **Reset Function**: Clear form and start over

### Responsive Design
- **Mobile Friendly**: Works on phones and tablets
- **Desktop Optimized**: Full features on larger screens
- **Flexible Grid**: Adapts to screen size
- **Touch Support**: Mobile-friendly interactions

## 🔧 Technical Features

### Backend Capabilities
- **RESTful API**: Clean, documented endpoints
- **File Upload**: Multer-based file handling
- **Error Handling**: Comprehensive error management
- **CORS Support**: Cross-origin requests enabled
- **Environment Config**: Secure API key management

### Frontend Capabilities
- **React 18**: Modern React with hooks
- **Vite**: Fast development and building
- **Axios**: Reliable HTTP client
- **Component Library**: Reusable UI components
- **State Management**: React hooks for state

### Performance
- **Fast Generation**: Optimized API calls
- **Parallel Processing**: Multiple images generated simultaneously
- **Efficient Upload**: Multipart form data handling
- **Lazy Loading**: Components load as needed
- **Build Optimization**: Production-ready builds

## 🔐 Security Features

### API Security
- **Environment Variables**: Secure key storage
- **CORS Configuration**: Controlled access
- **File Validation**: Type and size checking
- **Input Sanitization**: Safe data handling

### File Handling
- **Type Validation**: Only allowed file types
- **Size Limits**: 10MB per file maximum
- **Temporary Storage**: Files cleaned after processing
- **Secure Paths**: No directory traversal

## 🚀 Deployment Ready

### Production Features
- **Environment Modes**: Development and production configs
- **Build Scripts**: Optimized production builds
- **Static Assets**: Efficient asset serving
- **Error Logging**: Console logging for debugging

### Scalability
- **Stateless Design**: Easy to scale horizontally
- **API-First**: Backend can serve multiple frontends
- **Modular Code**: Easy to extend and maintain
- **Service Pattern**: Clean separation of concerns

## 📊 Use Cases

### Marketing Teams
- Create campaign assets quickly
- Test multiple visual concepts
- Generate social media content
- Produce ad variations

### Agencies
- Rapid prototyping for clients
- Campaign concept visualization
- Multi-channel asset creation
- Brand-consistent outputs

### Small Businesses
- Professional ad creation
- Cost-effective marketing
- Quick turnaround
- No design skills required

### Content Creators
- Social media content
- Video thumbnails
- Brand materials
- Promotional assets

## 🎓 Learning & Documentation

### Comprehensive Docs
- README.md - Project overview
- QUICKSTART.md - Getting started guide
- SETUP_INSTRUCTIONS.md - Detailed setup
- PROJECT_STRUCTURE.md - Code organization
- FEATURES.md - This document

### Code Quality
- Clean Code: Well-organized and commented
- Best Practices: Industry-standard patterns
- Modular Design: Easy to understand
- Type Safety: Proper error handling

## 🔄 Future Enhancement Possibilities

### Potential Features
- Multiple AI model options
- Custom image dimensions
- Batch campaign generation
- Campaign history/library
- User authentication
- Team collaboration
- Analytics dashboard
- A/B testing tools
- Export to various formats
- Social media scheduling
- Brand kit management
- Template library

## 📈 Performance Metrics

### Generation Speed
- Images: ~30-60 seconds for 5 images
- Video: ~60-120 seconds
- Total: ~2-5 minutes per campaign

### Quality
- Image Resolution: 1024x1024
- Video Resolution: 1080p
- Video FPS: 30
- Video Duration: 5 seconds

## 🎉 Summary

This Ad Campaign Builder provides a complete solution for AI-powered marketing asset generation, combining:
- Professional UI/UX
- Powerful AI integration
- Flexible input options
- Comprehensive output
- Production-ready code
- Extensive documentation

Perfect for marketers, agencies, and businesses looking to leverage AI for campaign creation!
