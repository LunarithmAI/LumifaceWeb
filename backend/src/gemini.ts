import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AnalysisResult } from './types';

// Lazy initialization to ensure env vars are loaded
let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

const SYSTEM_MESSAGE = `You act as a cosmetic face analysis assistant.
You always stay positive and respectful.
You give cosmetic insights only.
You never mention diseases.
You never give medical advice or drug names.
You always respond in JSON with a fixed schema.`;

const USER_PROMPT = `Analyze the attached face image.
Provide cosmetic skin grading and facial feature description.
Use the following rules:

* Skin metrics:
  * wrinkles.grade integer from 0 to 4
  * acne.grade integer from 0 to 4
  * pigmentation.grade integer from 0 to 4
  * overall_score integer from 0 to 100

* Features:
  * face_shape: one of "round", "oval", "square", "heart", "long"
  * jawline.shape: "soft", "angular", "round", "square"
  * jawline.definition: integer from 0 to 4
  * nose.length: "short", "average", "long"
  * nose.width: "narrow", "average", "wide"
  * eyes.size: "small", "average", "large"
  * eyes.spacing: "close-set", "average", "wide-set"
  * eyes.shape: "round", "almond", "upturned", "downturned"
  * lips.fullness: "subtle", "medium", "full"

* Text fields:
  * description: 1–3 sentences with positive tone
  * style_tips: list with 3 short styling tips
  * disclaimer: single sentence that reminds the user that this is cosmetic analysis only

Respond with valid JSON that exactly matches this structure and key naming:
{
  "skin": {
    "wrinkles": { "grade": number, "reason": "string" },
    "acne": { "grade": number, "reason": "string" },
    "pigmentation": { "grade": number, "reason": "string" },
    "overall_score": number
  },
  "features": {
    "face_shape": "string",
    "jawline": { "shape": "string", "definition": number },
    "nose": { "length": "string", "width": "string" },
    "eyes": { "size": "string", "spacing": "string", "shape": "string" },
    "lips": { "fullness": "string" }
  },
  "text": {
    "description": "string",
    "style_tips": ["string", "string", "string"],
    "disclaimer": "string"
  }
}

Return ONLY the JSON object, no additional text or markdown formatting.`;

export async function analyzeImage(imageBuffer: Buffer, mimeType: string): Promise<AnalysisResult> {
  const model = getGenAI().getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    systemInstruction: SYSTEM_MESSAGE
  });

  const imagePart = {
    inlineData: {
      data: imageBuffer.toString('base64'),
      mimeType: mimeType
    }
  };

  const result = await model.generateContent([USER_PROMPT, imagePart]);
  const response = await result.response;
  const text = response.text();

  // Clean up the response - remove markdown code blocks if present
  let jsonText = text.trim();
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.slice(7);
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.slice(3);
  }
  if (jsonText.endsWith('```')) {
    jsonText = jsonText.slice(0, -3);
  }
  jsonText = jsonText.trim();

  const analysisResult: AnalysisResult = JSON.parse(jsonText);
  
  // Validate required fields
  if (!analysisResult.skin || !analysisResult.features || !analysisResult.text) {
    throw new Error('Invalid response structure from VLM');
  }

  return analysisResult;
}
