import { GoogleGenAI, Type } from "@google/genai";
import { SkinAnalysisResponse, OnboardingAnalysisResponse } from '../types';

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove "data:image/jpeg;base64," prefix
      resolve(result.split(',')[1]);
    };
    reader.onerror = error => reject(error);
  });
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const detailedSchema = {
  type: Type.OBJECT,
  properties: {
    analysis: {
      type: Type.STRING,
      description: "A general overview of the skin's condition as seen in the image."
    },
    potentialIssues: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { 
            type: Type.STRING,
            description: "The name of the potential issue (e.g., Acne, Rosacea, Dryness, Sun Damage)."
          },
          description: {
            type: Type.STRING,
            description: "A brief description of why you identified this potential issue."
          },
          severity: {
            type: Type.STRING,
            description: "Estimate the severity as 'Low', 'Medium', or 'High'."
          }
        },
        required: ["name", "description", "severity"]
      }
    },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "A short, actionable title for the recommendation."
          },
          details: {
            type: Type.STRING,
            description: "Detailed explanation of the recommendation."
          },
          category: {
            type: Type.STRING,
            description: "Categorize as 'Product', 'Lifestyle', or 'Routine'."
          }
        },
        required: ["title", "details", "category"]
      }
    },
    disclaimer: {
      type: Type.STRING,
      description: "This is an AI-powered analysis and not a substitute for professional medical advice. Consult a dermatologist for any health concerns."
    }
  },
  required: ["analysis", "potentialIssues", "recommendations", "disclaimer"]
};

const onboardingSchema = {
    type: Type.OBJECT,
    properties: {
      skinType: {
        type: Type.STRING,
        description: "Determine the user's basic skin type from the image. Options: 'Oily', 'Dry', 'Combination', 'Normal'."
      },
      topConcerns: {
        type: Type.ARRAY,
        description: "Identify the top 1 or 2 most visible skin concerns.",
        items: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "The name of the concern (e.g., 'Acne', 'Uneven Texture', 'Redness', 'Fine Lines')."
            },
            description: {
              type: Type.STRING,
              description: "A very brief, one-sentence description of the concern visible in the image."
            }
          },
          required: ["name", "description"]
        }
      },
      summary: {
        type: Type.STRING,
        description: "A concise, encouraging, one-sentence summary for the user. Example: 'It looks like you might have some mild acne and uneven texture, which we can definitely work on!'"
      }
    },
    required: ["skinType", "topConcerns", "summary"]
};

export const analyzeOnboardingSelfie = async (base64Image: string, mimeType: string): Promise<OnboardingAnalysisResponse> => {
    const prompt = `Perform a quick, initial analysis of this selfie for a new user onboarding. Focus on identifying the basic skin type and the top 1-2 most prominent concerns. Provide a brief, encouraging summary statement. You must return a valid JSON object adhering to the provided schema.`;

    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: {
            parts: [
              {
                inlineData: {
                  data: base64Image,
                  mimeType: mimeType,
                },
              },
              { text: prompt },
            ],
          },
          config: {
            responseMimeType: "application/json",
            responseSchema: onboardingSchema,
          },
        });
    
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as OnboardingAnalysisResponse;
      } catch (error) {
        console.error("Error analyzing onboarding selfie:", error);
        throw new Error("Failed to get initial analysis from AI. Please try again.");
      }
};

export const analyzeSkinImage = async (base64Image: string, mimeType: string): Promise<SkinAnalysisResponse> => {
  const prompt = `Analyze the attached image of a man's skin. Based on the visual information, provide a detailed analysis. You must return a valid JSON object adhering to the provided schema. Do not include any text, markdown, or formatting outside of the JSON object.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: detailedSchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as SkinAnalysisResponse;
  } catch (error) {
    console.error("Error analyzing skin image:", error);
    throw new Error("Failed to get analysis from AI. Please try again.");
  }
};
