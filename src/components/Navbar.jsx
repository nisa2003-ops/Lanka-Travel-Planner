import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import './Navbar.css';

export default function Navbar() {
  const { t } = useLang();
  const location = useLocation();

  const links = [
    { to: '/', label: t('nav_home') },
    { to: '/planner', label: t('nav_planner') },
  ];

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">✦</span>
          Lanka<span className="navbar__logo-accent">Travel</span>
        </Link>

        <div className="navbar__links">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`navbar__link ${location.pathname === l.to ? 'navbar__link--active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <LanguageToggle />
      </div>
    </nav>
  );
}
