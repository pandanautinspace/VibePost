# BlackBox AI API Reference

This document explains how the Ad Campaign Builder integrates with BlackBox AI's API.

## API Endpoint

```
POST https://api.blackbox.ai/chat/completions
```

## Authentication

All requests require a Bearer token in the Authorization header:

```javascript
headers: {
  'Authorization': `Bearer ${BLACKBOX_API_KEY}`,
  'Content-Type': 'application/json'
}
```

## Image Generation

### Model: `blackboxai/flux-1.1-pro`

This model generates high-quality images suitable for advertising and marketing.

### Request Format

```javascript
{
  "model": "blackboxai/flux-1.1-pro",
  "messages": [
    {
      "role": "user",
      "content": "Your image generation prompt here"
    }
  ]
}
```

### Response Format

```javascript
{
  "choices": [
    {
      "message": {
        "content": "![Generated Image](https://image-url.com/image.png)"
      }
    }
  ]
}
```

### Example Implementation

```javascript
const data = {
  model: 'blackboxai/flux-1.1-pro',
  messages: [
    {
      role: 'user',
      content: 'Professional advertising photo of a luxury car, high quality, 1024x1024'
    }
  ]
};

const response = await fetch('https://api.blackbox.ai/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});

const result = await response.json();
// Extract image URL from markdown format in result.choices[0].message.content
```

## Video Generation

### Model: `blackboxai/google/veo-2`

This model generates short video clips suitable for advertising campaigns.

### Request Format

```javascript
{
  "model": "blackboxai/google/veo-2",
  "messages": [
    {
      "role": "user",
      "content": "Your video generation prompt here"
    }
  ]
}
```

### Response Format

```javascript
{
  "choices": [
    {
      "message": {
        "content": "https://video-url.com/video.mp4"
      }
    }
  ]
}
```

### Example Implementation

```javascript
const data = {
  model: 'blackboxai/google/veo-2',
  messages: [
    {
      role: 'user',
      content: 'Professional advertising video of a product launch, cinematic, 5 seconds'
    }
  ]
};

const response = await fetch('https://api.blackbox.ai/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});

const result = await response.json();
// Extract video URL from result.choices[0].message.content
```

## How Our App Uses the API

### Image Generation Flow

1. **Prompt Enhancement**: User's campaign prompt is enhanced with brand guidelines
2. **Parallel Generation**: 5 images are generated simultaneously using Promise.all()
3. **URL Extraction**: Image URLs are extracted from markdown format `![](url)`
4. **Fallback Handling**: If generation fails, placeholder images are shown

### Video Generation Flow

1. **Prompt Enhancement**: Campaign prompt is enhanced for video context
2. **Single Generation**: One video is generated per campaign
3. **URL Extraction**: Video URL is extracted from response content
4. **Fallback Handling**: If generation fails, a placeholder video is shown

## Error Handling

The app handles various error scenarios:

- **Missing API Key**: Returns error message to configure key
- **API Request Failure**: Logs error and returns placeholder
- **Invalid Response**: Catches parsing errors and returns placeholder
- **Network Timeout**: Handles timeout with graceful fallback

## Rate Limiting

Be aware of BlackBox AI's rate limits:
- Check your account's API quota
- The app generates 6 assets per campaign (5 images + 1 video)
- Consider implementing request queuing for high-volume usage

## Best Practices

### Prompt Engineering

**For Images:**
```
"[Campaign concept]. Brand guidelines: [guidelines]. 
Professional advertising photography, high quality, 
commercial use, 1024x1024 resolution."
```

**For Videos:**
```
"Create a professional advertising video: [concept]. 
Brand guidelines: [guidelines]. Cinematic, smooth 
camera movement, professional lighting, commercial 
quality, 5 seconds duration."
```

### Performance Optimization

1. **Parallel Processing**: Generate multiple images simultaneously
2. **Timeout Handling**: Set appropriate timeouts (60s for images, 120s for videos)
3. **Error Recovery**: Always provide fallback content
4. **Caching**: Consider caching generated assets to reduce API calls

## Cost Considerations

- Each API call consumes credits from your BlackBox AI account
- Monitor your usage through the BlackBox AI dashboard
- Consider implementing usage limits in production
- Cache results when possible to minimize redundant calls

## Security

- **Never expose API keys**: Always use environment variables
- **Server-side only**: Keep API calls on the backend
- **Validate inputs**: Sanitize user inputs before sending to API
- **Rate limiting**: Implement rate limiting to prevent abuse

## Testing

### Test with Sample Prompts

**Image Test:**
```bash
curl -X POST https://api.blackbox.ai/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "blackboxai/flux-1.1-pro",
    "messages": [{"role": "user", "content": "test image"}]
  }'
```

**Video Test:**
```bash
curl -X POST https://api.blackbox.ai/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "blackboxai/google/veo-2",
    "messages": [{"role": "user", "content": "test video"}]
  }'
```

## Support

For API-related issues:
- Check BlackBox AI documentation: https://docs.blackbox.ai/
- Review your API quota and limits
- Contact BlackBox AI support for API-specific questions

For app-related issues:
- Check backend logs for detailed error messages
- Verify environment variables are set correctly
- Review the troubleshooting section in SETUP_INSTRUCTIONS.md
