import { useEffect, useState } from 'react';
import { getWeather, getWeatherEmoji } from '../utils/weatherApi';
import './WeatherWidget.css';

export default function WeatherWidget({ location }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!location) return;
    setLoading(true);
    setError(false);
    getWeather(location)
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Weather error:', err.message);
        setError(true);
        setLoading(false);
      });
  }, [location]);

  if (loading) {
    return (
      <div className="weather weather--loading">
        <span className="weather__spinner">⏳</span>
        <span>Loading weather...</span>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="weather weather--error">
        <span>🌐 Weather unavailable</span>
      </div>
    );
  }

  const emoji = getWeatherEmoji(weather.condition);

  return (
    <div className="weather">
      <div className="weather__main">
        <span className="weather__emoji">{emoji}</span>
        <div className="weather__temp-block">
          <span className="weather__temp">{weather.temp}°C</span>
          <span className="weather__desc">{weather.description}</span>
        </div>
      </div>
      <div className="weather__details">
        <span>💧 {weather.humidity}%</span>
        <span>🌬️ {weather.wind} m/s</span>
        <span>🌡️ Feels {weather.feels}°C</span>
      </div>
    </div>
  );
}