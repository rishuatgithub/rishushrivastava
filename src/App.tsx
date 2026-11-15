import { useState } from 'react';
import { ArrowUpRight, ArrowRight, MapPin, Linkedin, Github, Download, Calendar, Database, BrainCircuit, Layers, Menu, X } from 'lucide-react';
import { INTRO_HIGHLIGHTS as profile, EXPERIENCE_HISTORY, SKILL_CATEGORIES, CERTIFICATIONS, BLOG_ARTICLES } from './data';

const specialties = [Database, BrainCircuit, Layers];
const email = 'rishu.shrivastava@gmail.com';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="portfolio" id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <nav className="navigation" aria-label="Main navigation">
        <a className="wordmark" href="#top"><span className="monogram">rs.</span><span>Rishu Shrivastava<span className="wordmark-sub">DATA & AI ARCHITECT</span></span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {['Skills', 'Experience', 'Projects', 'Writing'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Let’s connect <ArrowUpRight size={15} /></a>
        </div>
      </nav>
      <main id="main">
        <header className="hero page-width">
          <div className="hero-content">
            <div className="eyebrow"><span className="status-dot" /> DATA, AI & PRODUCT INNOVATION</div>
            <h1>Rishu Shrivastava<span>Senior Data &<br />AI Architect.</span></h1>
            <p className="hero-description">I turn complex data challenges into enterprise platforms and AI products that deliver measurable results.</p>
            <p className="hero-context">{profile.experienceYears} years across cloud architecture, real-time data and product innovation. Currently at <strong>Pentaho / Hitachi Vantara.</strong></p>
            <div className="hero-actions"><a className="button button-primary" href={`mailto:${email}`}>Get in touch <ArrowUpRight size={17} /></a><a className="button button-secondary" href={profile.linkedIn} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a><button className="text-button" onClick={() => window.print()}><Download size={16} /> Print / save PDF</button></div>
            <div className="hero-location"><MapPin size={14} /> London, United Kingdom <span>·</span> Enterprise data & AI</div>
          </div>
          <aside className="profile-panel">
            <div className="portrait-frame"><img src="https://github.com/rishuatgithub.png" alt="Rishu Shrivastava" onError={e => { e.currentTarget.style.display = 'none'; }} /><span className="portrait-initials" aria-hidden="true">RS</span><div className="portrait-caption"><span>SENIOR ARCHITECT</span><strong>From architecture<br />to real-world impact.</strong></div></div>
            <div className="profile-note"><span className="status-dot" /><p>Open to advisory, consulting<br />and speaking opportunities</p><ArrowUpRight size={20} /></div>
          </aside>
        </header>
        <section className="impact-strip page-width" aria-label="Career highlights">
          {[[profile.experienceYears, 'Years in data & technology'], ['$2M', 'GenAI initiative directed'], ['60–70%', 'Migration effort reduced'], ['CDC', 'Change data capture launched']].map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}
        </section>
        <section id="skills" className="section page-width">
          <div className="section-heading"><div><span className="eyebrow">01 / EXPERTISE</span><h2>The skills behind the solutions.</h2></div><p>Hands-on engineering depth.<br />Enterprise architecture perspective.</p></div>
          <div className="skills-grid">{SKILL_CATEGORIES.map((category, i) => { const Icon = specialties[i]; return <article className="skill-card" key={category.title}><Icon size={25} strokeWidth={1.5} /><h3>{['Data & cloud architecture', 'AI & software engineering', 'Platform & delivery'][i]}</h3><p>{['Scalable platforms, trusted data and real-time integration.', 'Enterprise AI, intelligent workflows and production software.', 'Repeatable infrastructure and reliable enterprise delivery.'][i]}</p><div className="skill-tags">{category.skills.map(skill => <span key={skill.name}>{skill.name}</span>)}</div></article>; })}</div>
          <div className="certifications"><span className="eyebrow">CERTIFICATIONS & TRAINING</span><div>{CERTIFICATIONS.slice(0, 3).map(cert => <span key={cert.name}>{cert.name}<small>{cert.issuer} · Earned {cert.year}</small></span>)}</div><details><summary>View more certifications & training</summary><div className="additional-certs">{CERTIFICATIONS.slice(3).map(cert => <span key={cert.name}>{cert.name}<small>{cert.issuer} · Earned {cert.year}</small></span>)}</div></details></div>
        </section>
        <section id="experience" className="section experience-section"><div className="page-width"><div className="section-heading"><div><span className="eyebrow">02 / EXPERIENCE</span><h2>Built over years. Proven in practice.</h2></div><button className="text-button" onClick={() => window.print()}>Print / save portfolio <Download size={16} /></button></div>
          <div className="experience-list">{EXPERIENCE_HISTORY.map((job, index) => <article className="experience-row" key={job.id}><div className="experience-meta"><span className={index === 0 ? 'current-label' : 'period'}>{job.period}</span><p>{job.location}</p></div><div className="experience-content"><h3>{job.role}</h3><div className="company">{job.company}{index === 0 && <span>Current role</span>}</div><ul>{job.bulletPoints.map(point => <li key={point}>{point}</li>)}</ul><div className="technology-line">{job.technologies.join(' · ')}</div></div></article>)}</div>
        </div></section>
        <section id="projects" className="section page-width"><div className="section-heading"><div><span className="eyebrow">03 / SELECTED WORK</span><h2>Architecture with an outcome.</h2></div><a className="text-button" href={profile.github} target="_blank" rel="noreferrer">View public code on GitHub <ArrowUpRight size={17} /></a></div>
          <div className="projects-grid">{EXPERIENCE_HISTORY.slice(0, 3).map((job, i) => <article className="project-card" key={job.id}><div className="project-index">0{i + 1}<span>{['ENTERPRISE AI · REAL-TIME DATA', 'CLOUD · ANALYTICS', 'AI · INNOVATION'][i]}</span></div><h3>{job.featuredProject.name}</h3><p>{job.featuredProject.description}</p><div className="project-footer">{job.company}</div></article>)}</div>
        </section>
        <section id="writing" className="section page-width writing-section"><div className="section-heading"><div><span className="eyebrow">04 / IDEAS & INSIGHTS</span><h2>Sharing what I learn.</h2></div><a className="text-button" href={profile.blog} target="_blank" rel="noreferrer">Visit the blog <ArrowUpRight size={17} /></a></div><div className="articles">{BLOG_ARTICLES.map(article => <a className="article-row" key={article.id} href={article.url} target="_blank" rel="noreferrer"><span className="article-category">{article.category}</span><h3>{article.title}</h3><span className="reading-time">{article.category === "AI Integration" ? "Pentaho" : "Personal blog"}</span><ArrowUpRight size={20} /></a>)}</div></section>
        <section id="contact" className="contact-section"><div className="page-width contact-layout"><div><span className="eyebrow">LET’S CONNECT</span><h2>Have a role or a challenge<br />in mind? Let’s talk.</h2><p>For recruitment conversations, architectural consulting,<br />strategic advisory and speaking engagements.</p><a className="email-link" href={`mailto:${email}`}>{email}<ArrowUpRight size={23} /></a></div><div className="contact-links"><a href="https://calendly.com/rishu-shrivastava/meet-with-rishu" target="_blank" rel="noreferrer"><Calendar size={19} /><span>Book a conversation<small>Find a time that works for you</small></span><ArrowUpRight size={19} /></a><a href={profile.linkedIn} target="_blank" rel="noreferrer"><Linkedin size={19} /><span>Connect on LinkedIn<small>Experience, updates and introductions</small></span><ArrowUpRight size={19} /></a><a href={profile.github} target="_blank" rel="noreferrer"><Github size={19} /><span>Explore my code<small>Projects and contributions on GitHub</small></span><ArrowUpRight size={19} /></a></div></div></section>
      </main>
      <footer className="page-width footer"><span>© {new Date().getFullYear()} Rishu Shrivastava</span><span>London, UK · Data, AI & Product Innovation</span><a href="#top">Back to top <ArrowRight size={14} /></a></footer>
    </div>
  );
}
