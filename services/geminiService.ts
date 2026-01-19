import { GoogleGenAI } from "@google/genai";

// Initialize AI with the key directly.
// process.env.API_KEY is replaced by Vite's define plugin at build time.
// We handle empty keys gracefully to prevent the entire app from crashing on load.
const apiKey = process.env.API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI", error);
  }
}

export const generateTravelResponse = async (userPrompt: string, history: { role: string; text: string }[]): Promise<string> => {
  if (!ai) {
    console.error("GoogleGenAI not initialized. Missing API Key.");
    return "Configuration Error: API Key is missing. Please contact support.";
  }

  try {
    const model = 'gemini-3-flash-preview';
    
    // Construct a context-aware prompt
    const systemInstruction = `
      You are Mercury AI, the intelligent virtual assistant for Mercury Groups.
      Mercury Groups is a premium travel and logistics agency.
      
      Our Services:
      1. Flight Processing: Domestic and International bookings.
      2. Documentation: Passport processing, Travel Insurance, Visa Assistance (Tour & Conference).
      3. Luxury Travel: Private Jet renting, Luxury Cars and Buses for interstate travel in Nigeria.
      4. Logistics: Delivery bikes for goods in Lagos, Port Harcourt (PH), and Abuja.
      
      Your Tone: Professional, helpful, concise, and polite.
      Your Goal: Answer user queries about our services, suggest booking options, and provide general travel advice.
      If a user wants to book, guide them to use the contact form or email mercurygroups247@gmail.com.
      
      Limit responses to 150 words.
    `;

    const contents = [
      ...history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      })),
      { role: 'user', parts: [{ text: userPrompt }] }
    ];

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    
    // Check for specific error indications
    if (error.message) {
        if (error.message.includes('API key') || error.message.includes('403')) {
            return "Connection Error: The provided API key is invalid or has expired. Please check your console for details.";
        }
        if (error.message.includes('404')) {
             return "Service Error: The AI model is currently unavailable. Please try again later.";
        }
    }
    
    return "I am currently experiencing high traffic. Please try again later or contact support directly.";
  }
};