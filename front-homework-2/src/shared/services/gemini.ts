// gemini.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || "",
});

export const getGeminiResponse = async (message: string) => {
  try {
    // console.log("Sending message to Gemini:", message);
    
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
    });

    // console.log("AI Response:", response.text);
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};

