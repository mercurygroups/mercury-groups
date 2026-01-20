// Client-side proxy to server-side AI endpoint.
export const generateTravelResponse = async (userPrompt: string, history: { role: string; text: string }[]): Promise<string> => {
  try {
    // If a browser-safe Gemini API key is provided (restricted by origin), prefer direct REST call.
    const BROWSER_KEY = (window as any).__GEMINI_KEY__;
    if (BROWSER_KEY) {
      try {
        const model = 'gemini-3.1'; // adjust if you want another model
        const url = `https://generativelanguage.googleapis.com/v1beta2/models/${model}:generateText?key=${BROWSER_KEY}`;
        const systemInstruction = 'You are Mercury AI, a helpful assistant for Mercury Groups. Keep answers concise.';

        const body = {
          prompt: { text: systemInstruction + '\n\n' + userPrompt }
        };

        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        const txt = await resp.text();
        if (!txt) return 'AI service currently unavailable. Please try again later.';

        // Parse various possible response shapes from GenAI
        let parsed: any = null;
        try { parsed = JSON.parse(txt); } catch (e) { parsed = null; }

        if (parsed) {
          // common shapes: { candidates:[{output:'...'}] } or { text: '...' } or { output: '...' }
          const candidateText = parsed.candidates?.[0]?.output || parsed.text || parsed.output || parsed.result?.content?.[0]?.text;
          if (candidateText) return candidateText;
        }

        // fallback to raw text
        return txt;
      } catch (err) {
        console.error('Browser Gemini request failed', err);
        // fallthrough to try server endpoint if configured
      }
    }

    const endpoint = (window as any).__AI_ENDPOINT__ || '/api/generate';
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userPrompt, history })
    });

    // Always read the response text first to avoid 'Unexpected end of JSON input'
    const text = await resp.text();

    if (!text) {
      console.error('AI endpoint returned empty body', { status: resp.status });
      return `AI service currently unavailable (status ${resp.status}). Please check server logs.`;
    }

    // Try to parse JSON, fallback to using the text directly
    let parsed: any = null;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      // Not JSON — some servers may return plain text; use it as the reply
      if (resp.ok) return text;
      console.error('AI server error (non-JSON):', text);
      return 'AI service currently unavailable. Please try again later.';
    }

    if (!resp.ok) {
      console.error('AI server error', { status: resp.status, body: parsed || text });
      const serverErr = parsed?.error || parsed?.message || text || `status ${resp.status}`;
      return `AI service currently unavailable (${serverErr})`;
    }

    return parsed.text || 'No response from AI.';
  } catch (error) {
    console.error('Failed to call AI endpoint', error);
    return 'AI service currently unavailable. Please try again later.';
  }
};