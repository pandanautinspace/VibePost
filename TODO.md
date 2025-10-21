# UI Flow Restructure - Implementation TODO

## Phase 1: Create New UI Components
- [x] Create Select component (frontend/src/components/ui/select.jsx)
- [x] Create Badge component (frontend/src/components/ui/badge.jsx)
- [x] Create Progress component (frontend/src/components/ui/progress.jsx)

## Phase 2: Backend Enhancements
- [x] Add AI helper methods to aiService.js
  - [x] suggestTargetAudiences()
  - [x] suggestPlatforms()
  - [x] improveCampaignText()
  - [x] suggestCampaignConcepts()
  - [x] scrapeWebsite()
  - [x] generateRandomCampaignData()
- [x] Add new controller methods to campaignController.js
- [x] Add new routes to campaign.js

## Phase 3: Frontend Restructure
- [x] Restructure CampaignBuilder.jsx into multi-step wizard
  - [x] Add "Generate Random Data" button at start
  - [x] Step 1: Company Information (with scrape website)
  - [x] Step 2: Brand Guidelines
  - [x] Step 3: Social Media & Audience (with AI suggestions)
  - [x] Step 4: Product Information (with AI improve & scrape)
  - [x] Step 5: Campaign Concept (with AI suggestions)
  - [x] Step 6: Results (5 images + 1 video)
- [x] Add step navigation (Next/Back buttons)
- [x] Add progress indicator
- [x] Add form validation

## Phase 4: Update API Service
- [x] Add new API methods to api.js
  - [x] suggestAudiences()
  - [x] suggestPlatforms()
  - [x] improveText()
  - [x] suggestConcepts()
  - [x] scrapeWebsite()
  - [x] generateRandomData()

## Phase 5: Testing & Polish
- [ ] Test multi-step navigation
- [ ] Test AI suggestion features
- [ ] Test website scraping
- [ ] Test random data generation
- [ ] Test final campaign generation
- [ ] Verify responsive design
- [ ] Add loading states
- [ ] Add error handling
