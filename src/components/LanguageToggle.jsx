import { useLang } from '../context/LanguageContext';
import './LanguageToggle.css';

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="lang-toggle">
      <button
        className={`lang-toggle__btn ${lang === 'en' ? 'lang-toggle__btn--active' : ''}`}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <span className="lang-toggle__sep">|</span>
      <button
        className={`lang-toggle__btn ${lang === 'si' ? 'lang-toggle__btn--active' : ''}`}
        onClick={() => setLang('si')}
      >
        සිං
      </button>
    </div>
  );
}
