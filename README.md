# 🌴 Lanka Travel Planner

<p align="center">
  <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini_2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Leaflet.js-199900?style=for-the-badge&logo=leaflet&logoColor=white" />
  <img src="https://img.shields.io/badge/OpenWeatherMap-FF6B35?style=for-the-badge&logo=openweathermap&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router_v6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
</p>

<p align="center">
  An AI-powered travel planning web app for exploring Sri Lanka — featuring smart itinerary generation, interactive route maps, live weather, budget breakdowns, hotel & food recommendations, and full Sinhala / English bilingual support.
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Itinerary Generator** | Powered by **Gemini 2.5 Flash**; crafts a personalized day-by-day Sri Lanka itinerary based on your city, interests, budget, travel month, and party size |
| 💬 **ItineraryChat** | Conversational AI assistant that knows your entire itinerary — ask for alternatives, packing tips, safety advice, cost breakdowns, and more |
| 🗺️ **Interactive Route Map** | **Leaflet.js** renders a live dark-themed map with numbered day markers, a dashed route polyline, and clickable popups for each stop |
| 💰 **Budget Breakdown** | Itemised daily cost estimate (food, transport, accommodation, activities) with currency conversion for **USD, LKR, EUR, GBP** |
| 🏨 **Recommendations** | Curated hotel and must-try food suggestions filtered to your chosen budget tier (Budget / Mid-range / Luxury) |
| ☁️ **Live Weather Widget** | **OpenWeatherMap** integration with hardcoded coordinates for 15+ Sri Lankan cities — shows temp, feels-like, humidity, wind, and condition |
| 🌐 **Sinhala / English Toggle** | Full bilingual UI via React Context — switch language on the fly; itinerary is regenerated in Sinhala on demand with smart caching |
| 📅 **Season-Aware Planning** | Travel month is passed to Gemini, which factors in monsoon seasons and regional weather patterns |

---

## 🗂️ Project Structure

```
lanka-travel-planner/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── BudgetBreakdown.jsx   # Cost breakdown with currency conversion
│   │   ├── ItineraryCard.jsx     # Day-by-day itinerary display
│   │   ├── ItineraryChat.jsx     # Gemini-powered chat assistant
│   │   ├── LanguageToggle.jsx    # EN / සිං switcher
│   │   ├── MapView.jsx           # Leaflet.js interactive route map
│   │   ├── Navbar.jsx            # Top navigation bar
│   │   ├── RecommendationsList.jsx # Hotels & food picks
│   │   ├── TripForm.jsx          # Trip preferences form
│   │   └── WeatherWidget.jsx     # Live weather display
│   ├── context/
│   │   └── LanguageContext.jsx   # EN/SI translations + lang state
│   ├── pages/
│   │   ├── Home.jsx              # Landing page with features & highlights
│   │   └── Planner.jsx           # Main planner flow (form → loading → results)
│   ├── utils/
│   │   ├── GeminiApi.js          # chatWithItinerary() — ItineraryChat API calls
│   │   ├── GenerateApi.js        # generateItinerary() — itinerary generation
│   │   └── weatherApi.js         # getWeather() — OpenWeatherMap calls
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── .env
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 8 |
| Routing | React Router v6 |
| AI — Itinerary | Google Gemini 2.5 Flash (`generateContent` API) |
| AI — Chat | Google Gemini 2.5 Flash (multi-turn conversation) |
| Maps | Leaflet.js + react-leaflet + CartoDB dark tiles |
| Weather | OpenWeatherMap `data/2.5/weather` (metric) |
| Fonts | Playfair Display + DM Sans (Google Fonts) |
| Language | JavaScript (ES Modules) |
| Styling | Plain CSS Modules (per-component) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18+`
- API keys for **Google Gemini** and **OpenWeatherMap**

### 1. Clone the repository

```bash
git clone https://github.com/your-username/lanka-travel-planner.git
cd lanka-travel-planner
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
```

> **Get your keys:**
> - Gemini API Key → [Google AI Studio](https://aistudio.google.com/app/apikey)
> - Weather API Key → [OpenWeatherMap](https://openweathermap.org/api)

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for production

```bash
npm run build
npm run preview
```

---

## 🗺️ Supported Starting Cities

The app supports itinerary generation and live weather for these Sri Lankan cities:

Colombo · Kandy · Galle · Nuwara Eliya · Ella · Trincomalee · Jaffna · Anuradhapura · Sigiriya · Mirissa · Bentota · Dambulla · Polonnaruwa · Hikkaduwa · Matara · Haputhale

---

## 🧭 How It Works

1. **Fill the form** — pick a starting city, trip duration (1–14 days), interests, budget tier, travel month, party size, and preferred currency.
2. **Generate** — the app sends a structured prompt to Gemini 2.5 Flash, which returns a full JSON itinerary (days, locations with lat/lng, food tips, accommodation, budget breakdown, hotel picks, cultural notes, and packing tips).
3. **Explore results** — view your day-by-day plan, trace your route on the interactive map, check the budget breakdown, and browse hotel & food recommendations.
4. **Chat** — the ItineraryChat widget is pre-loaded with your full itinerary context; ask follow-up questions in natural language.
5. **Switch language** — toggle to Sinhala and the app regenerates the itinerary in සිංහල (cached so you only call the API once per language).

---

## 📦 Dependencies

```json
"dependencies": {
  "leaflet": "^1.9.4",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-leaflet": "^4.2.1",
  "react-router-dom": "^6.26.1"
}
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">Made with ❤️ for Sri Lanka 🇱🇰</p>
