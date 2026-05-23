import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import TripForm from '../components/TripForm';
import ItineraryCard from '../components/ItineraryCard';
import MapView from '../components/MapView';
import BudgetBreakdown from '../components/BudgetBreakdown';
import RecommendationsList from '../components/RecommendationsList';
import { generateItinerary } from '../utils/GenerateApi';
import './Planner.css';
import ItineraryChat from '../components/ItineraryChat';

export default function Planner() {
  const { t, lang, setLang } = useLang();
  const [step, setStep] = useState('form');
  const [itinerary, setItinerary] = useState(null);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState('');
  const [translating, setTranslating] = useState(false);
  const [itineraryCache, setItineraryCache] = useState({ en: null, si: null });

  const handleSubmit = async (data) => {
    setFormData(data);
    setStep('loading');
    setError('');
    setItineraryCache({ en: null, si: null });
    try {
      const result = await generateItinerary(data);
      setItinerary(result);
      setItineraryCache(prev => ({ ...prev, [data.language || 'en']: result }));
      setStep('result');
    } catch (e) {
      setError('Something went wrong. Please check your API key and try again.');
      setStep('form');
    }
  };

  const handleLanguageToggle = async (newLang) => {
    setLang(newLang);

    if (!formData) return;

    if (itineraryCache[newLang]) {
      setItinerary(itineraryCache[newLang]);
      return;
    }

    setTranslating(true);
    try {
      const result = await generateItinerary({ ...formData, language: newLang });
      setItineraryCache(prev => ({ ...prev, [newLang]: result }));
      setItinerary(result);
    } catch (e) {
      console.error('Translation failed:', e);
    } finally {
      setTranslating(false);
    }
  };

  const handleReset = () => {
    setStep('form');
    setItinerary(null);
    setFormData(null);
    setItineraryCache({ en: null, si: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="planner">
      <div className="planner__inner">

        {/* Page Header */}
        <div className="planner__header">
          <span className="label-xs">AI Travel Planner</span>
          <h1 className="planner__title">
            {step === 'form' && <>Plan Your <em>Sri Lankan Journey</em></>}
            {step === 'loading' && <em>{t('loading_title')}</em>}
            {step === 'result' && itinerary?.title}
          </h1>
          {step === 'form' && (
            <p className="planner__subtitle">
              Fill in your preferences and let AI craft a personalized itinerary.
            </p>
          )}

          {/* Language toggle — only on result page */}
          {step === 'result' && (
            <div className="planner__lang-toggle">
              <button
                className={lang !== 'si' ? 'active' : ''}
                onClick={() => handleLanguageToggle('en')}
                disabled={translating}
              >
                English
              </button>
              <button
                className={lang === 'si' ? 'active' : ''}
                onClick={() => handleLanguageToggle('si')}
                disabled={translating}
              >
                සිංහල
              </button>
            </div>
          )}
        </div>

        {/* Form */}
        {step === 'form' && (
          <>
            {error && <p className="planner__error">{error}</p>}
            <TripForm onSubmit={handleSubmit} loading={false} />
          </>
        )}

        {/* Loading */}
        {step === 'loading' && (
          <div className="planner__loading">
            <div className="planner__loading-spinner">🌿</div>
            <p className="planner__loading-title">{t('loading_title')}</p>
            <p className="planner__loading-sub">{t('loading_sub')}</p>
            <div className="planner__loading-dots">
              <span /><span /><span />
            </div>
          </div>
        )}

        {/* Results */}
        {step === 'result' && itinerary && (
          <div className="planner__results">

            {/* Translating overlay */}
            {translating ? (
              <div className="planner__loading">
                <div className="planner__loading-spinner">🌿</div>
                <p className="planner__loading-title">
                  {lang === 'si' ? 'සිංහලට පරිවර්තනය වෙමින්...' : 'Translating to English...'}
                </p>
                <div className="planner__loading-dots">
                  <span /><span /><span />
                </div>
              </div>
            ) : (
              <>
                <ItineraryCard
                  itinerary={itinerary}
                  days={formData.days}
                  city={formData.city}
                  currency={formData.currency}
                />
                <MapView days={itinerary.days} />
                <BudgetBreakdown
                  budget={itinerary.budgetBreakdown}
                  days={formData.days}
                  partySize={formData.partySize}
                  currency={formData.currency}
                />
                <RecommendationsList
                  hotels={itinerary.hotels}
                  mustTryFood={itinerary.mustTryFood}
                />
                <ItineraryChat itinerary={itinerary} />
              </>
            )}

            <button className="planner__reset" onClick={handleReset}>
              {t('result_back')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}