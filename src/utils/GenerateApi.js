const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateItinerary({ city, days, interests, budget, month, partySize, language }) {
    const langInstruction = language === 'si'
        ? 'Respond entirely in Sinhala language (සිංහල).'
        : 'Respond in English.';

    const budgetGuide = {
        'Budget': 'Budget traveler in Sri Lanka: food LKR 500-800/meal (local restaurants), transport LKR 200-500/day (bus/tuk-tuk), accommodation LKR 1500-3000/night (guesthouses). Keep estimatedDailyCostUSD under 15.',
        'Mid-range': 'Mid-range traveler in Sri Lanka: food LKR 800-2000/meal (decent restaurants), transport LKR 1000-2500/day (private van/train), accommodation LKR 4000-8000/night (3-star hotels). Keep estimatedDailyCostUSD between 20-40.',
        'Luxury': 'Luxury traveler in Sri Lanka: food LKR 3000-8000/meal (fine dining), transport LKR 5000-15000/day (private AC car), accommodation LKR 15000-50000/night (boutique/5-star). Keep estimatedDailyCostUSD between 80-150.',
    }[budget] || '';

    const prompt = `You are an expert Sri Lanka travel guide. Create a detailed ${days}-day travel itinerary starting from ${city}, Sri Lanka.

Traveler preferences:
- Interests: ${interests.join(', ')}
- Budget: ${budget}
- Travel Month: ${month}
- Party Size: ${partySize}
- Duration: ${days} days

IMPORTANT BUDGET RULE: ${budgetGuide}
The budgetBreakdown values must be realistic daily costs per person in USD for Sri Lanka — NOT Western prices. Sri Lanka is very affordable. Double-check your numbers are appropriate for a ${budget} traveler.

IMPORTANT LOCATION RULE: All places to visit must be within 10-15km of ${city}.
For multi-day trips, each day MUST explore a completely different direction or zone around ${city}:
- Day 1: explore one direction (e.g. north of ${city})
- Day 2: explore a different direction (e.g. south of ${city})
- Day 3: explore another direction (e.g. east of ${city})
- Day 4+: continue rotating to new directions or zones
Never repeat the same area, town, or attraction across different days. Each day should feel like a fresh side of the same region.

IMPORTANT HOTELS RULE: Since the traveler selected "${budget}" budget, provide 6 hotel recommendations ONLY from the "${budget}" tier. Do not include hotels from other tiers. Include name, city, tier, and a short note with approximate LKR price for each.

IMPORTANT THEME RULE: For the "theme" field, use REAL specific attraction names separated by & like "Ella Rock & Ravana Falls" or "Sigiriya Rock & Pidurangala". NEVER use poetic or descriptive phrases like "Ancient Serenity" or "Spiritual Rejuvenation". The theme must be real searchable place names that exist on a map and are relevant to that day's activities.

IMPORTANT LOCATION FIELD RULE: For the "location" field use ONLY the simple city name like "Kandy" or "Ella" or "Galle". Do NOT add distances, directions, or descriptions.

${langInstruction}

Respond ONLY with a valid JSON object (no markdown, no backticks, no explanation) in this exact structure:
{
  "title": "Creative itinerary title",
  "tagline": "One evocative sentence about this trip",
  "highlights": ["highlight1", "highlight2", "highlight3"],
  "estimatedDailyCostUSD": 20,
  "budgetBreakdown": {
    "food": 6,
    "transport": 4,
    "accommodation": 8,
    "activities": 2
  },
  "days": [
    {
      "day": 1,
      "location": "Ella",
      "lat": 6.8667,
      "lng": 81.0466,
      "theme": "Ella Rock & Ravana Falls",
      "morning": "Detailed morning activity with tips",
      "afternoon": "Detailed afternoon activity with tips",
      "evening": "Detailed evening activity with tips",
      "foodTip": "Local food recommendation with price in LKR",
      "accommodation": "Specific accommodation suggestion with approximate price in LKR"
    }
  ],
  "hotels": [
    { "name": "Hotel Name", "city": "City", "tier": "Budget", "note": "short note with approx LKR price per night" },
    { "name": "Hotel Name", "city": "City", "tier": "Budget", "note": "short note with approx LKR price per night" },
    { "name": "Hotel Name", "city": "City", "tier": "Budget", "note": "short note with approx LKR price per night" },
    { "name": "Hotel Name", "city": "City", "tier": "Budget", "note": "short note with approx LKR price per night" },
    { "name": "Hotel Name", "city": "City", "tier": "Budget", "note": "short note with approx LKR price per night" },
    { "name": "Hotel Name", "city": "City", "tier": "Budget", "note": "short note with approx LKR price per night" }
  ],
  "mustTryFood": [
    { "name": "Dish name", "description": "short description with price in LKR", "vegetarian": true }
  ],
  "packingTips": ["tip1", "tip2", "tip3"],
  "culturalNotes": ["note1", "note2"]
}`;

    try {
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 1,
                        maxOutputTokens: 8000,
                        responseMimeType: 'application/json'
                    }
                })
            }
        );

        if (!res.ok) {
            const err = await res.json();
            console.error('Gemini Error:', err);
            throw new Error('API request failed');
        }

        const data = await res.json();
        const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        return JSON.parse(raw.trim());

    } catch (error) {
        console.error('Itinerary Error:', error);
        throw error;
    }
}