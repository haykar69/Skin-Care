export interface SkinAnalysisResponse {
  analysis: string;
  potentialIssues: {
    name: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High';
  }[];
  recommendations: {
    title: string;
    details: string;
    category: 'Product' | 'Lifestyle' | 'Routine';
  }[];
  disclaimer: string;
}

export interface OnboardingAnalysisResponse {
  skinType: 'Oily' | 'Dry' | 'Combination' | 'Normal';
  topConcerns: {
    name: string;
    description: string;
  }[];
  summary: string;
}

export interface UserProfile {
  age: string;
  goals: string[];
  sunExposure: string;
  stressLevel: string;
}

export interface DailyTip {
    id: number;
    title: string;
    description: string;
    category: string;
}