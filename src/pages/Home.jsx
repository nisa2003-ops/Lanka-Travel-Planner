import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import './Home.css';

const FEATURES = [
    { icon: '🤖', title: 'AI Itinerary', desc: 'Gemini AI crafts a personalized day-by-day plan based on your interests and budget.' },
    { icon: '🗺️', title: 'Interactive Map', desc: 'See your entire route on a live map with clickable pins for each stop.' },
    { icon: '💰', title: 'Budget Estimator', desc: 'Get a full cost breakdown in LKR, USD, EUR or GBP for your trip.' },
    { icon: '🍛', title: 'Local Picks', desc: 'Curated hotel and food recommendations for every city you visit.' },
    { icon: '🌿', title: 'Sinhala Support', desc: 'Switch the entire app and itinerary to Sinhala with one click.' },
    { icon: '📅', title: 'Season-Aware', desc: 'Picks activities and weather tips based on your travel month.' },
];

const HIGHLIGHTS = [
    { name: 'Sigiriya', tag: 'Ancient Rock Fortress', emoji: '🏰' },
    { name: 'Ella', tag: 'Misty Hill Country', emoji: '🌿' },
    { name: 'Galle', tag: 'Colonial Coastal Fort', emoji: '🌊' },
    { name: 'Kandy', tag: 'Cultural Capital', emoji: '🪷' },
];

export default function Home() {
    const navigate = useNavigate();
    const { t } = useLang();

    return (
        <div className="home">

            {/* Hero */}
            <section className="home__hero">
                <div className="home__hero-inner">
                    <span className="label-xs home__hero-tag">{t('hero_tag')}</span>
                    <h1 className="home__hero-title">

                        {(t('hero_title') || "Welcome to Sri Lanka").split('\n').map((line, i) => (
                            <span key={i}>

                                {i === 1 ? <em>{line}</em> : line}
                                {i === 0 && <br />}
                            </span>
                        ))}
                    </h1>
                    <p className="home__hero-sub">{t('hero_sub')}</p>
                    <button className="home__hero-cta" onClick={() => navigate('/planner')}>
                        {t('hero_cta')} →
                    </button>
                </div>

                {/* Destination cards */}
                <div className="home__highlights">
                    {HIGHLIGHTS.map((h, i) => (
                        <div
                            key={h.name}
                            className="home__highlight-card"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <span className="home__highlight-emoji">{h.emoji}</span>
                            <span className="home__highlight-name">{h.name}</span>
                            <span className="home__highlight-tag">{h.tag}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="home__features">
                <div className="home__features-inner">
                    <span className="label-xs" style={{ textAlign: 'center', display: 'block' }}>What's included</span>
                    <h2 className="home__features-title">Everything you need<br /><em>to plan with confidence</em></h2>
                    <div className="home__features-grid">
                        {FEATURES.map((f, i) => (
                            <div key={i} className="home__feature-card card">
                                <span className="home__feature-icon">{f.icon}</span>
                                <h3 className="home__feature-name">{f.title}</h3>
                                <p className="home__feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="home__cta-banner">
                <div className="home__cta-banner-inner">
                    <h2 className="home__cta-title italic">Ready to explore Sri Lanka?</h2>
                    <p className="home__cta-sub">Your perfect itinerary is one click away.</p>
                    <button className="home__hero-cta" onClick={() => navigate('/planner')}>
                        {t('hero_cta')} →
                    </button>
                </div>
            </section>
        </div>
    );
}
