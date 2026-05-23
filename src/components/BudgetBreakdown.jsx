import { useLang } from '../context/LanguageContext';
import './BudgetBreakdown.css';

const RATES = { USD: 1, LKR: 320, EUR: 0.92, GBP: 0.79 };
const SYMBOLS = { USD: '$', LKR: 'Rs.', EUR: '€', GBP: '£' };

export default function BudgetBreakdown({ budget, days, partySize, currency }) {
  const { t } = useLang();
  const rate = RATES[currency] || 1;
  const sym = SYMBOLS[currency] || '$';
  const fmt = (usd) => `${sym}${Math.round(usd * rate).toLocaleString()}`;

  if (!budget) return null;

  const { food, transport, accommodation, activities } = budget;
  const dailyTotal = food + transport + accommodation + activities;
  const tripTotal = dailyTotal * days * partySize;

  const items = [
    { label: t('budget_food'), value: food, color: '#4ade80', icon: '🍛' },
    { label: t('budget_transport'), value: transport, color: '#fbbf24', icon: '🚌' },
    { label: t('budget_accommodation'), value: accommodation, color: '#a78bfa', icon: '🏨' },
    { label: t('budget_activities'), value: activities, color: '#fb923c', icon: '🎭' },
  ];

  return (
    <div className="budget card">
      <span className="label-xs">{t('budget_title')}</span>

      <div className="budget__bars">
        {items.map(item => (
          <div key={item.label} className="budget__bar-row">
            <div className="budget__bar-info">
              <span>{item.icon} {item.label}</span>
              <span className="budget__bar-amount" style={{ color: item.color }}>
                {fmt(item.value)} <small>{t('budget_per_day')}</small>
              </span>
            </div>
            <div className="budget__bar-track">
              <div
                className="budget__bar-fill"
                style={{
                  width: `${(item.value / dailyTotal) * 100}%`,
                  background: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="budget__total">
        <div className="budget__total-row">
          <span>{t('budget_total')} ({days} days × {partySize} people)</span>
          <span className="budget__total-value">{fmt(tripTotal)}</span>
        </div>
        <div className="budget__total-row budget__total-daily">
          <span>{t('budget_per_day')}</span>
          <span>{fmt(dailyTotal)}</span>
        </div>
      </div>
    </div>
  );
}
