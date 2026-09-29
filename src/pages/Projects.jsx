import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowDown, FiArrowUpRight, FiCheck, FiCopy, FiGithub, FiSearch } from 'react-icons/fi';
import projects from '../projects.json';
import { projectLink, timeline } from '../timeline';
import SEO from '../components/SEO';
import './Projects.css';

const pageUrl = 'https://www.techfren.net/projects';
const milestones = timeline.flatMap(group => group.projects);
const featuredBuildIds = ['opencourt', 'hook-ledger', 'pocoj', 'transcribe'];
const featuredBuilds = featuredBuildIds.map(id => {
  const project = milestones.find(milestone => milestone.id === id);
  return {
    ...project,
    live: projectLink(project),
    linkLabel: project.linkLabel === 'Short' ? 'Watch short' : 'Watch demo',
  };
});
const ownProjects = [...featuredBuilds, ...projects.filter(project => !project.name.includes('(Contributor)'))];
// Move OpenCourt (first) down 4 places
ownProjects.splice(4, 0, ownProjects.shift());
const contributions = projects.filter(project => project.name.includes('(Contributor)'));

function ProjectPreview({ project }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="projects-card-image">
      {project.crop ? (
        <svg viewBox={project.crop.join(' ')} aria-hidden="true" focusable="false">
          <image href="/timeline-assets/build-timeline-reference.png" width="1506" height="730" />
        </svg>
      ) : project.image && !imageFailed ? (
        <img
          src={project.image}
          alt=""
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span aria-hidden="true">{project.name.replace(' (Contributor)', '').slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
}

function ProjectList({ items, kind }) {
  return (
    <div className="projects-grid">
      {items.map(project => {
        const name = project.name.replace(' (Contributor)', '');
        const hasWebsite = project.live && project.live !== project.github;

        return (
          <article className={`projects-card projects-card--${kind}`} key={project.name}>
            <ProjectPreview project={project} />
            <div className="projects-card-body">
              <span className="projects-card-kind">{kind === 'built' ? 'Built by me' : 'Contributed to'}</span>
              <h3>{name}</h3>
              <p>{project.description}</p>
              <div className="projects-card-links">
                {hasWebsite && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    {project.linkLabel || 'View project'} <FiArrowUpRight aria-hidden="true" />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    GitHub <FiGithub aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function Projects() {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const matches = project => `${project.name} ${project.description}`.toLowerCase().includes(query.trim().toLowerCase());
  const visibleOwnProjects = ownProjects.filter(matches);
  const visibleContributions = contributions.filter(matches);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="projects-page">
      <SEO
        title="Projects and contributions — techfren"
        description="Explore projects AJ built and open source projects he contributed to at TechFren."
        url="/projects"
        tags={['techfren', 'projects', 'software', 'AI agents', 'open source']}
      />
      <a className="projects-skip" href="#projects-list">Skip to projects</a>
      <div className="projects-shell">
        <header className="projects-nav">
          <Link to="/" className="projects-logo">techfren<span>_</span></Link>
          <nav aria-label="Main navigation">
            <Link to="/">Home</Link>
            <span aria-current="page">Projects</span>
            <a href="https://www.youtube.com/@techfren" target="_blank" rel="noopener noreferrer">YouTube <FiArrowUpRight aria-hidden="true" /></a>
          </nav>
        </header>

        <main>
          <section className="projects-hero" aria-labelledby="projects-title">
            <p className="projects-eyebrow">TECHFREN / WORK</p>
            <h1 id="projects-title">Projects &amp; contributions<span>.</span></h1>
            <p className="projects-intro">Explore the software I&apos;ve built and the open source projects I&apos;ve contributed to. Each entry links to a demo, website, or code where available.</p>
            <nav className="projects-role-nav" aria-label="Project groups">
              <a href="#built-projects"><span>Projects I&apos;ve built</span><small>{ownProjects.length} projects</small><FiArrowDown aria-hidden="true" /></a>
              <a href="#contributed-projects"><span>Projects I&apos;ve contributed to</span><small>{contributions.length} projects</small><FiArrowDown aria-hidden="true" /></a>
            </nav>
            <div className="projects-share">
              <button type="button" onClick={copyLink} aria-label={copied ? 'Project page link copied' : 'Copy project page link'}>
                {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
                {copied ? 'Link copied' : 'Copy page link'}
              </button>
              <span>{pageUrl}</span>
            </div>
          </section>

          <div className="projects-tools" id="projects-list">
            <div>
              <p className="projects-kicker">THE WORK</p>
              <h2>Explore projects</h2>
            </div>
            <label className="projects-search">
              <FiSearch aria-hidden="true" />
              <span className="projects-visually-hidden">Search projects</span>
              <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search projects" />
            </label>
          </div>

            <section className="projects-section" id="built-projects" aria-labelledby="own-projects-title">
              <div className="projects-section-heading">
                <div><h2 id="own-projects-title">Projects I&apos;ve built</h2><p>Products, tools, and experiments I created.</p></div>
                <span>{visibleOwnProjects.length} projects</span>
              </div>
              {visibleOwnProjects.length > 0 ? <ProjectList items={visibleOwnProjects} kind="built" /> : <p className="projects-section-empty">No built projects match this search.</p>}
            </section>

            <section className="projects-section projects-section--contributed" id="contributed-projects" aria-labelledby="contributions-title">
              <div className="projects-section-heading">
                <div><h2 id="contributions-title">Projects I&apos;ve contributed to</h2><p>Open source work alongside other builders.</p></div>
                <span>{visibleContributions.length} projects</span>
              </div>
              {visibleContributions.length > 0 ? <ProjectList items={visibleContributions} kind="contributed" /> : <p className="projects-section-empty">No contributions match this search.</p>}
            </section>

          {visibleOwnProjects.length === 0 && visibleContributions.length === 0 && <p className="projects-visually-hidden" role="status">No projects match “{query}”. Try another search.</p>}
        </main>

        <footer className="projects-footer">
          <Link to="/">← Back to TechFren</Link>
          <a href="https://github.com/aj47" target="_blank" rel="noopener noreferrer">More on GitHub <FiArrowUpRight aria-hidden="true" /></a>
        </footer>
      </div>
    </div>
  );
}
