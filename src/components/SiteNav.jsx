import { Link } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa';
import './SiteNav.css';

export const DISCORD_URL = 'https://discord.gg/cK9WeQ7jPq';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog', secondary: true },
  { to: '/mediakit', label: 'Media kit', secondary: true },
];

// Shared top bar. The Discord button stays visible at every width.
export default function SiteNav({ current }) {
  return (
    <header className="site-nav">
      <Link to="/" className="site-nav-logo">techfren<span>_</span></Link>
      <nav aria-label="Main navigation">
        {links.map(({ to, label, secondary }) => {
          const className = secondary ? 'site-nav-secondary' : undefined;
          return to === current
            ? <span key={to} className={className} aria-current="page">{label}</span>
            : <Link key={to} to={to} className={className}>{label}</Link>;
        })}
        <a className="site-nav-discord" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
          <FaDiscord aria-hidden="true" /> Discord
        </a>
      </nav>
    </header>
  );
}
