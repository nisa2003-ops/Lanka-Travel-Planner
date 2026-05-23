import { useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext';
import './MapView.css';

export default function MapView({ days }) {
  const { t } = useLang();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!days || days.length === 0) return;
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    import('leaflet').then(L => {
      const validDays = days.filter(d => d.lat && d.lng);
      if (validDays.length === 0) return;

      const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false });
      mapInstance.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        maxZoom: 19,
      }).addTo(map);

      const latlngs = validDays.map(d => [d.lat, d.lng]);

      // Draw route line
      L.polyline(latlngs, {
        color: '#4ade80',
        weight: 2,
        opacity: 0.6,
        dashArray: '6 8',
      }).addTo(map);

      // Add markers
      validDays.forEach(day => {
        const icon = L.divIcon({
          className: '',
          html: `<div class="map-marker">
            <span class="map-marker__num">${day.day}</span>
          </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        L.marker([day.lat, day.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div class="map-popup">
              <strong>Day ${day.day} — ${day.location}</strong>
              <p>${day.theme}</p>
            </div>
          `);
      });

      // Fit map to bounds
      map.fitBounds(latlngs, { padding: [40, 40] });
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [days]);

  return (
    <div className="map-section card">
      <span className="label-xs">{t('map_title')}</span>
      <div className="map-container" ref={mapRef} />
      <div className="map-legend">
        {days?.filter(d => d.lat && d.lng).map(day => (
          <div key={day.day} className="map-legend__item">
            <span className="map-legend__num">{day.day}</span>
            <span className="map-legend__loc">{day.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
