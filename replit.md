# React Video Editor

## Overview
A React-based video editor using Next.js 15, Remotion for video rendering, and the @designcombo ecosystem for timeline and state management.

## Project Structure
- `src/app/` - Next.js app router pages and API routes
- `src/features/editor/` - Main editor components, timeline, player, and store
- `src/components/` - Reusable UI components (shadcn/ui based)
- `src/utils/` - Utility functions including upload service

## Key Features
- Video timeline editing with tracks
- Text, image, video, and audio support
- Local file uploads (no external API needed)
- Transitions and animations
- AI voice generation (requires API key)

## Local Upload System
The upload system now works locally without external APIs:
- Files are stored using browser object URLs (blob:)
- Supports video, image, and audio files
- Thumbnails generated for images and videos
- Files persist in browser storage during session

## Running the Project
```bash
npm run dev -- -p 5000 -H 0.0.0.0
```

## Environment Variables (Optional)
- `PEXELS_API_KEY` - For Pexels stock media integration
- `COMBO_SK` - For render/transcribe API (not needed for basic editing)

## Deployment
Configured for autoscale deployment with Next.js production build.
