import { GoogleGenAI } from "@google/genai";

// Initialize AI with the key directly.
// process.env.API_KEY is replaced by Vite's define plugin at build time.
// We handle empty keys gracefully to prevent the entire app from crashing on load.
const apiKey = process.env.API_KEY;
let ai: GoogleGenAI | null = null;

// Debug logging (will show in browser console)
console.log("R&M AI Init: API Key present?", !!apiKey);

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
    return "System Error: The AI service is not configured correctly. Please contact support.";
  }

  try {
    // Construct a context-aware prompt with conversation history
    const systemInstruction = `
      You are R&M AI, the intelligent virtual assistant for R&M Groups.
      R&M Groups is a premium travel and logistics agency.
      
      Our Services:
      1. Flight Processing: Domestic and International bookings.
      2. Documentation: Passport processing, Travel Insurance, Visa Assistance (Tour & Conference).
      3. Luxury Travel: Private Jet renting, Luxury Cars and Buses for interstate travel in Nigeria.
      4. Logistics: Delivery bikes for goods in Lagos, Port Harcourt (PH), and Abuja.
      
      Your Tone: Professional, helpful, concise, and polite.
      Your Goal: Answer user queries about our services, suggest booking options, and provide general travel advice.
      If a user wants to book, guide them to use the contact form or email rmgroups247@gmail.com.
      
      Limit responses to 150 words.
    `;

    // Build conversation history
    let conversationHistory = systemInstruction + "\n\n";
    history.forEach(msg => {
      conversationHistory += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}\n`;
    });
    conversationHistory += `User: ${userPrompt}\nAssistant:`;

    // Try different model names
    const modelNames = ['gemini-1.5-flash', 'gemini-pro', 'gemini-1.0-pro'];
    
    for (const modelName of modelNames) {
      try {
        const response = await ai.generateText({
          model: modelName,
          prompt: conversationHistory,
          temperature: 0.7,
          maxOutputTokens: 200,
        });
        
        return response.text || "I'm sorry, I couldn't generate a response at this time.";
      } catch (modelError: any) {
        console.log(`Model ${modelName} failed:`, modelError.message);
        continue;
      }
    }
    
    throw new Error("All model attempts failed");
    
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    
    // Check for specific error indications
    if (error.message || error.toString()) {
        const msg = (error.message || error.toString()).toLowerCase();
        
        if (msg.includes('leaked') || msg.includes('permission_denied')) {
             return "SYSTEM ALERT: The API Key has been disabled by Google because it was leaked. The administrator must generate a new key in Google AI Studio.";
        }
        if (msg.includes('api key') || msg.includes('403')) {
            return "Connection Error: The provided API key is invalid or has expired. Please check your console for details.";
        }
        if (msg.includes('404') || msg.includes('not found')) {
             return "Service Error: The AI model is currently unavailable. Please try again later.";
        }
    }
    
    return "I am currently experiencing high traffic. Please try again later or contact support directly.";
  }
};