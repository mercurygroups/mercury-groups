addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Cloudflare Worker that proxies prompts to Google Generative AI (Gemini).
 * - Store your API key as a Worker secret named GEMINI_API_KEY (do NOT hardcode it).
 * - If the secret is not present, the worker returns a small rule-based reply so the site still functions.
 *
 * Deploy with `wrangler publish` or via the Cloudflare dashboard (Workers > Create service).
 */
async function handleRequest(request) {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  try {
    const { prompt, history } = await request.json().catch(() => ({}))
    if (!prompt) return new Response(JSON.stringify({ error: 'Missing prompt' }), { status: 400 })

    const API_KEY = (typeof GENV !== 'undefined' && GENV.GEMINI_API_KEY) || (globalThis.GEMINI_API_KEY) || ''

    // Cloudflare Wrangler exposes secrets via bindings; when using dashboard set a secret and bind it to "GEMINI_API_KEY"
    // If you haven't configured the secret, return a rule-based reply to keep the frontend functional.
    if (!API_KEY) {
      const p = (prompt || '').toLowerCase()
      let reply = ''
      if (p.includes('flight')) reply = 'We handle domestic and international flight processing. Provide dates and destinations for rates.'
      else if (p.includes('visa')) reply = 'We assist with visa applications. Tell us destination and purpose.'
      else if (p.includes('car') || p.includes('rental')) reply = 'Our fleet includes SUVs, sedans and supercars. Use the Fleet page to choose a vehicle.'
      else reply = 'Thanks — please provide more details or use the contact form for bookings.'

      return new Response(JSON.stringify({ text: reply }), { headers: { 'Content-Type': 'application/json' } })
    }

    // NOTE: The REST endpoint/shape below may need adjustment based on the Google GenAI REST API version.
    // Replace `model` and request body to match the current API if necessary.
    const model = 'gemini-3.1' // adjust as needed
    const url = `https://generativelanguage.googleapis.com/v1beta2/models/${model}:generateText?key=${API_KEY}`

    const systemInstruction = `You are Mercury AI, a helpful assistant for Mercury Groups. Keep answers concise.`

    const body = {
      prompt: {
        text: systemInstruction + '\n\n' + prompt
      },
      // optional: include other fields per API spec
    }

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const text = await resp.text()
    // If response is JSON, return it. Otherwise wrap plain text.
    try {
      const parsed = JSON.parse(text)
      return new Response(JSON.stringify(parsed), { headers: { 'Content-Type': 'application/json' } })
    } catch (e) {
      // not JSON — forward as text
      return new Response(JSON.stringify({ text }), { headers: { 'Content-Type': 'application/json' } })
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
