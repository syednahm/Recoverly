# Discharge Upload Feature

## Overview

The discharge upload feature allows users to upload their hospital discharge instructions (PDF format) and have AI extract structured recovery data to populate their dashboard.

## User Flow

1. **Upload Page** (`/upload`)
   - User drags & drops or selects a PDF file
   - File validation (PDF only, max 10MB)
   - Beautiful upload zone with clear instructions

2. **Processing State**
   - Animated AI processing indicators
   - Step-by-step progress showing:
     - Reading PDF document
     - Extracting medical text
     - Identifying medications
     - Analyzing restrictions
     - Generating recovery plan
     - Building dashboard
   - Progress bar with percentage

3. **Extraction Preview**
   - Success banner with stats
   - Preview cards for:
     - Medications (with dosage & frequency)
     - Warning signs
     - Activity restrictions
     - Follow-up instructions
   - Confirm button to view populated dashboard
   - Reset button to upload different file

## Technical Implementation

### Routes

- **Page**: `/app/(routes)/upload/page.tsx`
- **API**: `/app/api/discharge/extract/route.ts`

### Components

- **UploadZone**: Drag & drop file upload interface
- **ProcessingState**: Animated AI processing with steps
- **ExtractionPreview**: Preview of extracted data before confirming
- **UploadPrompt**: Dashboard banner encouraging uploads (optional)

### API Route

**Endpoint**: `POST /api/discharge/extract`

**Request**: 
- FormData with PDF file

**Response**:
```typescript
{
  condition: string;
  medications: Medication[];
  restrictions: string[];
  warningSigns: string[];
  followUpInstructions: string[];
  dietaryGuidelines: string[];
  extractedAt: string;
}
```

### Mock Data

Currently using **mocked OpenAI extraction** that returns structured JSON.

In production, this would:
1. Use OCR (pdf-parse, Tesseract, or similar)
2. Send extracted text to OpenAI API
3. Use structured output with JSON schema
4. Parse and validate response

### Data Flow

```
User uploads PDF
  ↓
FormData sent to API
  ↓
[MOCK] AI extraction returns structured JSON
  ↓
Display preview with extracted data
  ↓
User confirms
  ↓
Data populates dashboard
```

## Future Enhancements

1. **Real OpenAI Integration**
   - OCR extraction from PDF
   - GPT-4 structured extraction
   - Confidence scores for each field

2. **Image Upload**
   - Wound photos
   - Vision API for wound assessment

3. **Data Persistence**
   - Save extracted data to Supabase
   - Link to user's recovery plan
   - Update existing medications/tasks

4. **Validation**
   - Medical professional review flag
   - User can edit extracted fields
   - Confidence scoring

5. **Multi-Document Support**
   - Multiple discharge PDFs
   - Medication lists
   - Lab results

## Design Philosophy

This feature should feel like **"AI transformed paperwork into a recovery system"**.

Key UX principles:
- Clear visual progression through states
- Prominent AI indicators (sparkles, gradients)
- Preview before committing
- Easy reset/retry
- Impressive processing animation
- Beautiful data presentation

## Navigation

- Added to sidebar under "Upload Discharge"
- Can add UploadPrompt banner to dashboard for first-time users
- Breadcrumb navigation for context

## Files Created

```
app/(routes)/upload/page.tsx                 - Main upload page
components/upload/UploadZone.tsx             - Upload UI
components/upload/ProcessingState.tsx        - Processing animation
components/upload/ExtractionPreview.tsx      - Preview component
components/dashboard/UploadPrompt.tsx        - Dashboard CTA banner
app/api/discharge/extract/route.ts           - API endpoint
```

## Integration Points

- Uses existing `DischargeInstructions` type from `types/recovery.ts`
- Routes to main dashboard (`/`) after confirmation
- Sidebar navigation updated
- Ready to connect to real OpenAI API
- Ready to persist to Supabase

## Demo Mode

Current implementation is **demo-ready** with:
- Polished UI
- Smooth animations
- Realistic mock data
- Full state management
- Error handling
- File validation
