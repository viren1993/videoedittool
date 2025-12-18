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
- Aspect ratio selector (16:9, 9:16, 1:1, 4:5)
- JSON export for template saving
- Customer Data menu for dynamic template fields
- Categories menu for template organization

## Customer Data Template System
The editor supports dynamic customer data insertion for bulk template rendering:
- **Field Metadata**: Each track item can have metadata: `isCustomerField`, `isLocked`, `fieldPath`, `fieldLabel`, `defaultValue`
- **CustomerFieldSettings**: Inline dropdown in editor controls to configure customer field properties
- **Supported Fields**: customer_company_name, full_name, logo_url, city, phone_number, address, user.email, company.company_name, company.logo_url, etc.
- **Field Logic**:
  - `isCustomerField=true`: Always editable by customers
  - `isCustomerField=false, isLocked=false`: Editable but not customer-defined
  - `isCustomerField=false, isLocked=true`: Uses template default, not editable
- **Store**: `src/features/editor/store/use-customer-data-store.ts` manages customer data state
- **Usage**: Templates with metadata are saved and fields are extracted at runtime

## Template Gallery System
- **Save Template**: Click "Save" button in navbar to save template with metadata
- **Template Gallery**: Visit `/templates` to view all saved templates with Edit buttons
- **Edit Template**: `/template/[id]/edit` - Reopen saved templates in the editor
- **Public Template Page**: `/template/[id]/public` shows:
  - Left side: Video preview with Remotion Player
  - Right side: Form with customer fields (extracted from metadata)
  - Support for text, image, video, audio uploads
  - Locked fields are disabled and cannot be edited by customers
  - Download buttons for images and videos in preview mode
  - Download customized template JSON

## Key Files for Template System
- `src/utils/template-storage.ts` - Template CRUD operations and metadata-based field extraction
- `src/app/templates/page.tsx` - Template gallery page with Edit buttons
- `src/app/template/[id]/public/page.tsx` - Public template customization page with downloads
- `src/app/template/[id]/edit/page.tsx` - Template edit mode page
- `src/app/template/[id]/public/preview-composition.tsx` - Remotion preview component
- `src/features/editor/control-item/common/customer-field-settings.tsx` - Inline field configuration

## Categories System
Template categories for organization:
- Alphabet, Anniversary, Diwali, Friendship
- Located in `src/features/editor/menu-item/categories.tsx`

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
