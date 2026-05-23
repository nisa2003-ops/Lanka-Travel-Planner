const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

export async function chatWithItinerary(itinerary, history, userMessage) {
    const systemPrompt = `You are a friendly and knowledgeable Sri Lanka travel assistant.
The user has generated the following travel itinerary. Answer their questions about it clearly and helpfully.

ITINERARY CONTEXT:
Title: ${itinerary.title}
Tagline: ${itinerary.tagline}
Days: ${itinerary.days?.map(d => `Day ${d.day} - ${d.location}: ${d.theme}`).join(', ')}
Estimated Cost: $${itinerary.estimatedDailyCostUSD}/day
Highlights: ${itinerary.highlights?.join(', ')}

FULL ITINERARY:
${itinerary.days?.map(d =>
        `Day ${d.day} (${d.location} - ${d.theme}):
  Morning: ${d.morning}
  Afternoon: ${d.afternoon}
  Evening: ${d.evening}
  Food: ${d.foodTip}
  Stay: ${d.accommodation}`
    ).join('\n\n')}

Guidelines:
- Be friendly, concise and helpful
- Give practical Sri Lanka travel advice
- Suggest specific alternatives if asked
- Keep responses under 150 words unless detail is needed
- Always complete your sentences, never cut off mid-response`;

    const contents = [
        {
            role: 'user',
            parts: [{ text: systemPrompt + '\n\nConfirm you are ready to help.' }]
        },
        {
            role: 'model',
            parts: [{ text: "Hello! I've reviewed your itinerary. How can I help?" }]
        },
        ...history
            .filter(msg => msg.assistant !== null) // Skip the "loading" message
            .flatMap(msg => [
                { role: 'user', parts: [{ text: msg.user }] },
                { role: 'model', parts: [{ text: msg.assistant }] },
            ]),
        // Current message
        { role: 'user', parts: [{ text: userMessage }] },
    ];

    const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 8000,
            }
        }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('Gemini error:', err);
        throw new Error(err?.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log('Gemini response:', data); // helpful for debugging

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Empty response from Gemini');
    return text;
}