export interface SkinMetric {
  grade: number;
  reason: string;
}

export interface Skin {
  wrinkles: SkinMetric;
  acne: SkinMetric;
  pigmentation: SkinMetric;
  overall_score: number;
}

export interface Jawline {
  shape: 'soft' | 'angular' | 'round' | 'square';
  definition: number;
}

export interface Nose {
  length: 'short' | 'average' | 'long';
  width: 'narrow' | 'average' | 'wide';
}

export interface Eyes {
  size: 'small' | 'average' | 'large';
  spacing: 'close-set' | 'average' | 'wide-set';
  shape: 'round' | 'almond' | 'upturned' | 'downturned';
}

export interface Lips {
  fullness: 'subtle' | 'medium' | 'full';
}

export interface Features {
  face_shape: 'round' | 'oval' | 'square' | 'heart' | 'long';
  jawline: Jawline;
  nose: Nose;
  eyes: Eyes;
  lips: Lips;
}

export interface TextContent {
  description: string;
  style_tips: string[];
  disclaimer: string;
}

export interface AnalysisResult {
  skin: Skin;
  features: Features;
  text: TextContent;
}

export interface ApiError {
  error: string;
  details?: string;
}
