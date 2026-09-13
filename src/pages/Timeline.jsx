import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';
import SEO from '../components/SEO';
import DigitalRain from '../components/DigitalRain';
import BuildTimeline from '../components/BuildTimeline';
import './Timeline.css';
import '../styles/Matrix.css';

export default function Timeline() {
  return (
    <div className="build-page matrix-page">
      <DigitalRain />
      <SEO title="What I've built — techfren" description="AJ’s project timeline, with screenshots and video demos." url="/timeline" image="/timeline-assets/build-timeline-reference.png" tags={['techfren', 'build in public', 'AI projects', 'timeline']} />
      <a className="build-skip" href="#builds">Skip to the timeline</a>
      <div className="build-shell">
        <header className="build-nav">
          <Link to="/" className="build-logo">techfren<span>_</span></Link>
          <nav aria-label="Main navigation"><Link to="/">Home</Link><Link to="/timeline" aria-current="page">Timeline</Link><a href="https://www.youtube.com/@techfren" target="_blank" rel="noopener noreferrer">YouTube <FiArrowUpRight /></a></nav>
        </header>
        <main id="builds">
          <section className="build-intro" aria-labelledby="build-title"><h1 id="build-title">Build timeline</h1></section>
          <BuildTimeline />
        </main>
        <footer className="build-footer"><Link to="/"><FiArrowLeft /> All projects & contributions</Link></footer>
      </div>
    </div>
  );
}
