import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiMail } from 'react-icons/fi';
import { mediaKit } from '../mediakit';
import { formatCount } from '../creatorStats';
import SEO from '../components/SEO';
import './MediaKit.css';

const mailto = `mailto:${mediaKit.email}?subject=${encodeURIComponent('Sponsorship enquiry')}`;
const maxViews = Math.max(...mediaKit.tiktok.recentPosts.map(post => post.views));

function SectionHeading({ kicker, title, children }) {
  return (
    <div className="mk-heading">
      <p className="mk-kicker">{kicker}</p>
      <h2>{title}</h2>
      {children && <p className="mk-heading-note">{children}</p>}
    </div>
  );
}

function PlatformList({ items, small }) {
  return (
    <ul className={`mk-platforms${small ? ' mk-platforms--small' : ''}`}>
      {items.map(platform => (
        <li key={platform.name}>
          <a href={platform.href} target="_blank" rel="noopener noreferrer">
            <strong>{platform.followers}</strong>
            <span>{platform.name} <FiArrowUpRight aria-hidden="true" /></span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function MediaKit() {
  const { tiktok } = mediaKit;

  return (
    <div className="mk-page">
      <SEO
        title="Media kit — techfren"
        description="Audience, rates, brand partners and case studies for sponsoring techfren across YouTube, TikTok, Instagram and more."
        url="/mediakit"
        image="/mediakit/profile.jpg"
        tags={['techfren', 'media kit', 'sponsorship', 'AI', 'software', 'creator']}
      />
      <div className="mk-shell">
        <header className="mk-nav">
          <Link to="/" className="mk-logo">techfren<span>_</span></Link>
          <nav aria-label="Main navigation">
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <span aria-current="page">Media kit</span>
          </nav>
        </header>

        <main>
          <section className="mk-hero" aria-labelledby="mk-title">
            <div className="mk-hero-copy">
              <p className="mk-kicker">TECHFREN / MEDIA KIT</p>
              <h1 id="mk-title">Put your product in front of builders<span>.</span></h1>
              <p className="mk-intro">
                I make short and long-form videos about AI, software and the tools developers actually use.
              </p>
              <ul className="mk-tags" aria-label="Categories">
                {mediaKit.categories.map(category => <li key={category}>{category}</li>)}
              </ul>
              <div className="mk-actions">
                <a className="mk-button" href={mailto}><FiMail aria-hidden="true" /> Work with me</a>
                <a className="mk-email" href={mailto}>{mediaKit.email}</a>
              </div>
            </div>
            <div className="mk-profile">
              <img src="/mediakit/profile.jpg" alt="techfren profile" width="200" height="200" />
              <p className="mk-profile-handle">{mediaKit.handle}</p>
              <p className="mk-profile-total"><strong>{mediaKit.totalFollowers}</strong> total followers</p>
            </div>
          </section>

          <section className="mk-section" aria-labelledby="mk-audience">
            <SectionHeading kicker="01 / AUDIENCE" title={<span id="mk-audience">Where people follow me</span>} />
            <PlatformList items={mediaKit.platforms} />
            <p className="mk-subhead">Other platforms</p>
            <PlatformList items={mediaKit.otherPlatforms} small />
          </section>

          <section className="mk-section" aria-labelledby="mk-rates">
            <SectionHeading kicker="02 / RATES" title={<span id="mk-rates">Rate card</span>}>
              Base rates in USD. Bundles and custom packages available, just ask.
            </SectionHeading>
            <div className="mk-rates">
              {mediaKit.rates.map(rate => (
                <article key={rate.name} className={`mk-rate${rate.featured ? ' mk-rate--featured' : ''}`}>
                  {rate.featured && <span className="mk-badge">YouTube</span>}
                  <h3>{rate.name}</h3>
                  <p>{rate.description}</p>
                  <strong className="mk-price">{rate.price}</strong>
                </article>
              ))}
            </div>
          </section>

          <section className="mk-section" aria-labelledby="mk-partners">
            <SectionHeading kicker="03 / BRAND PARTNERS" title={<span id="mk-partners">Brands I&apos;ve worked with</span>} />
            <ul className="mk-partners">
              {mediaKit.brandPartners.map(partner => (
                <li key={partner.name}>
                  <a href={partner.href} target="_blank" rel="noopener noreferrer">
                    <img src={`/mediakit/logo-${partner.logo}.png`} alt="" width="36" height="36" loading="lazy" />
                    <span>{partner.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mk-section" aria-labelledby="mk-cases">
            <SectionHeading kicker="04 / CASE STUDIES" title={<span id="mk-cases">Campaign results</span>} />
            <div className="mk-cases">
              {mediaKit.caseStudies.map(study => (
                <article key={study.brand} className="mk-case">
                  <header>
                    <img src={study.logo} alt="" width="44" height="44" loading="lazy" />
                    <div>
                      <h3>{study.brand}</h3>
                      <p>{study.type} · {study.posts.length} posts · {study.posts.length} platforms</p>
                    </div>
                  </header>
                  <div className="mk-case-posts">
                    {study.posts.map(post => (
                      <figure key={post.platform}>
                        <img src={post.image} alt={`${study.brand} ${post.platform} post`} loading="lazy" />
                        <figcaption><span>{post.platform}</span><strong>{post.views}</strong></figcaption>
                      </figure>
                    ))}
                  </div>
                  <dl className="mk-case-results">
                    {study.results.map(result => (
                      <div key={result.label}><dt>{result.label}</dt><dd>{result.value}</dd></div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </section>

          <section className="mk-section" aria-labelledby="mk-tiktok">
            <SectionHeading kicker="05 / TIKTOK STATS" title={<span id="mk-tiktok">TikTok performance</span>}>
              {tiktok.synced}
            </SectionHeading>
            <dl className="mk-stats">
              {tiktok.summary.map(stat => (
                <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>
              ))}
            </dl>
            <p className="mk-subhead">Most recent posts · views</p>
            <ol className="mk-bars">
              {tiktok.recentPosts.map((post, index) => (
                <li
                  key={index}
                  title={`${post.views.toLocaleString()} views · ${post.likes} likes · ${post.comments} comments`}
                >
                  <span className="mk-bar-value">{formatCount(post.views)}</span>
                  <span className="mk-bar" style={{ height: `${Math.max(3, (post.views / maxViews) * 100)}%` }} />
                  <span className="mk-bar-meta">{post.likes} ♥</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mk-cta" aria-labelledby="mk-contact">
            <p className="mk-kicker">06 / CONTACT</p>
            <h2 id="mk-contact">Collaborate with me<span>_</span></h2>
            <p>Send me your project details and timeline and I&apos;ll get back to you.</p>
            <div className="mk-actions">
              <a className="mk-button" href={mailto}><FiMail aria-hidden="true" /> {mediaKit.email}</a>
            </div>
          </section>
        </main>

        <footer className="mk-footer">
          <Link to="/">← Back to TechFren</Link>
          <a href="https://www.youtube.com/@techfren" target="_blank" rel="noopener noreferrer">YouTube <FiArrowUpRight aria-hidden="true" /></a>
        </footer>
      </div>
    </div>
  );
}
