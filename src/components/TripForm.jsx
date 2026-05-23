import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import './TripForm.css';

const CITIES = [
  'Colombo', 'Kandy', 'Galle', 'Nuwara Eliya', 'Ella',
  'Trincomalee', 'Jaffna', 'Anuradhapura', 'Sigiriya', 'Mirissa',
  'Bentota', 'Dambulla', 'Polonnaruwa', 'Hikkaduwa', 'Matara', 'Haputhale'
];

const INTERESTS = [
  { label: '🏛️ Culture & History', value: 'culture' },
  { label: '🌿 Nature & Wildlife', value: 'nature' },
  { label: '🏖️ Beaches', value: 'beaches' },
  { label: '🍛 Food & Cuisine', value: 'food' },
  { label: '🧘 Wellness & Temples', value: 'wellness' },
  { label: '🎒 Adventure', value: 'adventure' },
];

const BUDGETS = ['Budget', 'Mid-range', 'Luxury'];

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

const CURRENCIES = ['USD', 'LKR', 'EUR', 'GBP'];

export default function TripForm({ onSubmit, loading }) {
  const { t, lang } = useLang();
  const [city, setCity] = useState('');
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState([]);
  const [budget, setBudget] = useState('Mid-range');
  const [month, setMonth] = useState(MONTHS[new Date().getMonth()]);
  const [partySize, setPartySize] = useState(2);
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState('');

  const toggleInterest = (val) => {
    setInterests(prev =>
      prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]
    );
  };

  const handleSubmit = () => {
    if (!city) { setError(t('form_error_city')); return; }
    if (interests.length === 0) { setError(t('form_error_interest')); return; }
    setError('');
    onSubmit({ city, days, interests, budget, month, partySize, currency, language: lang });
  };

  return (
    <div className="trip-form">

      {/* City + Days */}
      <div className="trip-form__card trip-form__row">
        <div className="trip-form__field">
          <label className="label-xs">{t('form_city')}</label>
          <select
            className="trip-form__select"
            value={city}
            onChange={e => setCity(e.target.value)}
          >
            <option value="">{t('form_city_placeholder')}</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="trip-form__field">
          <label className="label-xs">
            {t('form_days')}: <span className="trip-form__value">{days} {t('form_days_unit')}</span>
          </label>
          <input
            type="range" min={1} max={14} value={days}
            onChange={e => setDays(Number(e.target.value))}
            className="trip-form__range"
          />
          <div className="trip-form__range-labels">
            <span>1</span><span>5</span>
          </div>
        </div>
      </div>

      {/* Month + Party + Currency */}
      <div className="trip-form__card trip-form__row">
        <div className="trip-form__field">
          <label className="label-xs">{t('form_month')}</label>
          <select className="trip-form__select" value={month} onChange={e => setMonth(e.target.value)}>
            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div className="trip-form__field">
          <label className="label-xs">
            {t('form_party')}: <span className="trip-form__value">{partySize}</span>
          </label>
          <input
            type="range" min={1} max={10} value={partySize}
            onChange={e => setPartySize(Number(e.target.value))}
            className="trip-form__range"
          />
          <div className="trip-form__range-labels">
            <span>1</span><span>10</span>
          </div>
        </div>

        <div className="trip-form__field">
          <label className="label-xs">{t('form_currency')}</label>
          <div className="trip-form__chips">
            {CURRENCIES.map(c => (
              <button
                key={c}
                className={`trip-form__chip ${currency === c ? 'trip-form__chip--active-gold' : ''}`}
                onClick={() => setCurrency(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interests */}
      <div className="trip-form__card">
        <label className="label-xs">{t('form_interests')}</label>
        <div className="trip-form__interests">
          {INTERESTS.map(i => (
            <button
              key={i.value}
              className={`trip-form__interest ${interests.includes(i.value) ? 'trip-form__interest--active' : ''}`}
              onClick={() => toggleInterest(i.value)}
            >
              {i.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="trip-form__card">
        <label className="label-xs">{t('form_budget')}</label>
        <div className="trip-form__budget">
          {BUDGETS.map(b => (
            <button
              key={b}
              className={`trip-form__budget-btn ${budget === b ? 'trip-form__budget-btn--active' : ''}`}
              onClick={() => setBudget(b)}
            >
              {b === 'Budget' && '🪙 '}
              {b === 'Mid-range' && '💳 '}
              {b === 'Luxury' && '✨ '}
              {b}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="trip-form__error">{error}</p>}

      <button
        className="trip-form__submit"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? '⏳ Generating...' : t('form_generate')}
      </button>
    </div>
  );
}
