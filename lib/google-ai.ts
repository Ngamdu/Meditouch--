import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI: GoogleGenerativeAI | null = null;

export function getGoogleAI() {
  if (genAI) return genAI;

  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("GOOGLE_GENAI_API_KEY environment variable is not set");
  }

  genAI = new GoogleGenerativeAI(apiKey);
  return genAI;
}

export async function generateMenu(subject: string): Promise<string> {
  const genAI = getGoogleAI();
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate a creative 3-course ${subject} menu with appetizer, main course, and dessert. Format it nicely with clear sections.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating menu:', error);
    throw new Error('Failed to generate menu with AI');
  }
}
