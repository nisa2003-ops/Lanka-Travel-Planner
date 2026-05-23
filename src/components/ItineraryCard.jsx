import { useLang } from '../context/LanguageContext';
import './ItineraryCard.css';
import WeatherWidget from './WeatherWidget';

export default function ItineraryCard({ itinerary, days, city, currency }) {
  const { t } = useLang();

  const rate = currency === 'LKR' ? 320 : currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.79 : 1;
  const symbol = currency === 'LKR' ? 'Rs.' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';

  const fmt = (usd) => `${symbol}${Math.round(usd * rate)}`;

  return (
    <div className="itinerary fade-up">

      {/* Trip Header */}
      <div className="itinerary__header card">
        <span className="label-xs">{t('result_tag')}</span>
        <h2 className="itinerary__title italic">{itinerary.title}</h2>
        <p className="itinerary__tagline">{itinerary.tagline}</p>
        <div className="itinerary__stats">
          <Stat label={t('result_cost')} value={`${fmt(itinerary.estimatedDailyCostUSD)}/day`} color="var(--gold)" />
          <Stat label={t('result_duration')} value={`${days} days`} color="var(--green-primary)" />
          <Stat label={t('result_starting')} value={city} color="var(--lavender)" />
        </div>
      </div>

      {/* Highlights */}
      {itinerary.highlights?.length > 0 && (
        <div className="itinerary__section card">
          <span className="label-xs">{t('result_highlights')}</span>
          <ul className="itinerary__highlights">
            {itinerary.highlights.map((h, i) => (
              <li key={i}>
                <span className="itinerary__arrow">→</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Day Cards */}
      {itinerary.days?.map(day => (
        <div key={day.day} className="itinerary__day card">
          <div className="itinerary__day-header">
            <div>
              <span className="label-xs">Day {day.day}</span>
              <h3 className="itinerary__day-theme italic">{day.theme}</h3>
            </div>
            <span className="itinerary__location-tag">📍 {day.location}</span>
          </div>

          <WeatherWidget location={day.location} />

          <div className="itinerary__times">
            <TimeBlock icon="🌅" label={t('result_morning')} text={day.morning} />
            <TimeBlock icon="☀️" label={t('result_afternoon')} text={day.afternoon} />
            <TimeBlock icon="🌙" label={t('result_evening')} text={day.evening} />
          </div>

          <div className="itinerary__day-footer">
            <InfoPill icon="🍛" label={t('result_food')} value={day.foodTip} />
            <InfoPill icon="🏨" label={t('result_stay')} value={day.accommodation} />
          </div>
        </div>
      ))}

      {/* Packing & Cultural */}
      <div className="itinerary__two-col">
        <div className="card">
          <span className="label-xs">{t('result_packing')}</span>
          <ul className="itinerary__list">
            {itinerary.packingTips?.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </div>
        <div className="card">
          <span className="label-xs">{t('result_cultural')}</span>
          <ul className="itinerary__list">
            {itinerary.culturalNotes?.map((note, i) => <li key={i}>{note}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="itinerary__stat">
      <span className="itinerary__stat-label">{label}</span>
      <span className="itinerary__stat-value" style={{ color }}>{value}</span>
    </div>
  );
}

function TimeBlock({ icon, label, text }) {
  return (
    <div className="itinerary__time-block">
      <span className="itinerary__time-icon">{icon}</span>
      <div>
        <span className="label-xs">{label}</span>
        <p>{text}</p>
      </div>
    </div>
  );
}

function InfoPill({ icon, label, value }) {
  return (
    <div className="itinerary__pill">
      <span className="itinerary__pill-label">{icon} {label}</span>
      <span className="itinerary__pill-value">{value}</span>
    </div>
  );
}
