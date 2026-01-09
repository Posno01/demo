
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const refineCaption = async (draft: string): Promise<string> => {
  if (!draft || draft.length < 5) return draft;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Transform this note into a minimal, poetic, and editorial caption (max 150 chars). Maintain a calm and aesthetic tone: "${draft}"`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    return response.text?.trim() || draft;
  } catch (error) {
    console.error("Error refining caption:", error);
    return draft;
  }
};
