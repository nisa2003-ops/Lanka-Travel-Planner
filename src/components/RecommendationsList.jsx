import { useLang } from '../context/LanguageContext';
import './RecommendationsList.css';

export default function RecommendationsList({ hotels, mustTryFood }) {
  const { t } = useLang();

  return (
    <div className="recs">
      <span className="label-xs">{t('rec_title')}</span>

      {/* Hotels */}
      {hotels?.length > 0 && (
        <div className="recs__section">
          <h4 className="recs__subtitle">{t('rec_hotels')}</h4>
          <div className="recs__grid">
            {hotels.map((h, i) => (
              <div key={i} className="recs__hotel-card">
                <div className="recs__hotel-top">
                  <span className="recs__hotel-name">{h.name}</span>
                  <span className={`recs__tier recs__tier--${h.tier?.toLowerCase().replace('-','')}`}>
                    {h.tier}
                  </span>
                </div>
                <span className="recs__hotel-city">📍 {h.city}</span>
                <p className="recs__hotel-note">{h.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Food */}
      {mustTryFood?.length > 0 && (
        <div className="recs__section">
          <h4 className="recs__subtitle">{t('rec_food')}</h4>
          <div className="recs__food-list">
            {mustTryFood.map((f, i) => (
              <div key={i} className="recs__food-item">
                <div className="recs__food-top">
                  <span className="recs__food-name">🍽️ {f.name}</span>
                  {f.vegetarian && <span className="recs__veg">🌿 Veg</span>}
                </div>
                <p className="recs__food-desc">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
