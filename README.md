# LumiFace - AI-Powered Beauty & Skin Analyzer

A single-page web app that uses Google Gemini Vision API to analyze face images and provide cosmetic insights, skin metrics, and styling tips.

## Features

- Upload face image (drag & drop or file picker)
- AI-powered skin analysis (wrinkles, acne, pigmentation, overall score)
- Facial feature detection (face shape, jawline, nose, eyes, lips)
- Visual charts (radar chart + bar chart)
- Personalized styling tips
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Chart.js + react-chartjs-2

### Backend
- Node.js + Express + TypeScript
- Google Generative AI SDK (Gemini)
- Multer for file uploads

## Getting Started

### Prerequisites
- Node.js 18+
- Google Gemini API key

### Setup

1. **Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   npm run dev
   ```

2. **Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## API Endpoints

### POST /analyze
Upload a face image for analysis.

**Request:** `multipart/form-data` with `image` file field

**Response:**
```json
{
  "skin": {
    "wrinkles": { "grade": 0-4, "reason": "..." },
    "acne": { "grade": 0-4, "reason": "..." },
    "pigmentation": { "grade": 0-4, "reason": "..." },
    "overall_score": 0-100
  },
  "features": {
    "face_shape": "oval|round|square|heart|long",
    "jawline": { "shape": "...", "definition": 0-4 },
    "nose": { "length": "...", "width": "..." },
    "eyes": { "size": "...", "spacing": "...", "shape": "..." },
    "lips": { "fullness": "..." }
  },
  "text": {
    "description": "...",
    "style_tips": ["...", "...", "..."],
    "disclaimer": "..."
  }
}
```

## Disclaimer

This is a cosmetic analysis tool only. It does not provide medical advice or diagnosis.
