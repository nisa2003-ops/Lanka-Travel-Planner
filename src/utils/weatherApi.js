const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// Hardcoded coordinates for Sri Lankan cities
// Much more reliable than city name lookup
const CITY_COORDS = {
  'Colombo':      { lat: 6.9271,  lon: 79.8612 },
  'Kandy':        { lat: 7.2906,  lon: 80.6337 },
  'Galle':        { lat: 6.0535,  lon: 80.2210 },
  'Nuwara Eliya': { lat: 6.9497,  lon: 80.7891 },
  'Ella':         { lat: 6.8667,  lon: 81.0466 },
  'Trincomalee':  { lat: 8.5874,  lon: 81.2152 },
  'Jaffna':       { lat: 9.6615,  lon: 80.0255 },
  'Anuradhapura': { lat: 8.3114,  lon: 80.4037 },
  'Sigiriya':     { lat: 7.9570,  lon: 80.7603 },
  'Mirissa':      { lat: 5.9483,  lon: 80.4716 },
  'Bentota':      { lat: 6.4248,  lon: 79.9957 },
  'Dambulla':     { lat: 7.8742,  lon: 80.6511 },
  'Polonnaruwa':  { lat: 7.9403,  lon: 81.0188 },
  'Hikkaduwa':    { lat: 6.1395,  lon: 80.1063 },
  'Matara':       { lat: 5.9549,  lon: 80.5550 },
};

function getCoordsForCity(cityName) {
  if (CITY_COORDS[cityName]) return CITY_COORDS[cityName];
  // Try partial match e.g. "Sigiriya Rock" → "Sigiriya"
  const key = Object.keys(CITY_COORDS).find(k =>
    cityName.toLowerCase().includes(k.toLowerCase()) ||
    k.toLowerCase().includes(cityName.toLowerCase())
  );
  return key ? CITY_COORDS[key] : CITY_COORDS['Colombo'];
}

export async function getWeather(cityName) {
  if (!WEATHER_KEY) throw new Error('No weather API key found in .env');
  const { lat, lon } = getCoordsForCity(cityName);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  const data = await res.json();
  return {
    temp:        Math.round(data.main.temp),
    feels:       Math.round(data.main.feels_like),
    humidity:    data.main.humidity,
    condition:   data.weather[0].main,
    description: data.weather[0].description,
    icon:        data.weather[0].icon,
    wind:        Math.round(data.wind.speed),
  };
}

export function getWeatherEmoji(condition) {
  const map = {
    Clear:        '☀️',
    Clouds:       '⛅',
    Rain:         '🌧️',
    Drizzle:      '🌦️',
    Thunderstorm: '⛈️',
    Snow:         '❄️',
    Mist:         '🌫️',
    Fog:          '🌫️',
    Haze:         '🌁',
  };
  return map[condition] || '🌤️';
}