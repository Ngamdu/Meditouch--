import { genkit } from "genkit";
import { googleAI, gemini20FlashExp } from "@genkit-ai/googleai";

let aiInstance: any = null;

export function getAI() {
  if (aiInstance) return aiInstance;

  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("GOOGLE_GENAI_API_KEY environment variable is not set");
  }

  aiInstance = genkit({
    plugins: [googleAI({ apiKey })],
  });

  return aiInstance;
}

export { gemini20FlashExp };
