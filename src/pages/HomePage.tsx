import React from 'react';
import BackToTop from '../components/BackToTop';
import MobileNav from '../components/MobileNav';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';
import type { Language } from '../translations';
import type { ProjectCardData, ReferenceContact } from '../types/portfolio';

type SectionDescriptor = {
  num: string;
  title: string;
  subtitle: string;
};

type SkillItem = {
  bg: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
};

type TimelineItem = {
  date: string;
  duration: string;
  title: string;
  company: string;
  desc: string;
  isCurrent?: boolean;
};

type FormationItem = {
  year: string;
  title: string;
  school: string;
  gradeNode: React.ReactNode;
};

type MobileDotsController = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  registerItem: (index: number, node: HTMLElement | null) => void;
  activeIndex: number;
  scrollToIndex: (index: number) => void;
};

interface HomePageProps {
  lang: Language;
  v: {
    nav: {
      about: string;
      skills: string;
      experience: string;
      education: string;
      projects: string;
      references: string;
      contact: string;
    };
    skills: {
      num: string;
      title: string;
    };
    experience: {
      num: string;
      title: string;
      sub?: string;
      subtitle?: string;
    };
  };
  activeSection: string;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  scrollToSection: (id: string) => void;
  onDiscoverProfile: () => void;
  onViewProjects: () => void;
  onViewBiography: () => void;
  skillsSectionSubtitle: string;
  educationSection: SectionDescriptor;
  referencesSection: SectionDescriptor;
  sortedSkillsData: SkillItem[];
  sortedTimelineData: TimelineItem[];
  sortedFormationData: FormationItem[];
  sortedReferencesData: ReferenceContact[];
  desktopReferencePages: ReferenceContact[][];
  desktopReferencePage: number;
  setDesktopReferencePage: React.Dispatch<React.SetStateAction<number>>;
  referenceCarouselRef: React.RefObject<HTMLDivElement | null>;
  referenceCarouselIndex: number;
  referenceCarouselOffset: number;
  handleCarouselTouchStart: (key: string) => (event: React.TouchEvent<HTMLDivElement>) => void;
  handleReferenceCarouselTouchEnd: (event: React.TouchEvent<HTMLDivElement>) => void;
  goToReferenceCard: (index: number) => void;
  featuredMainProject: ProjectCardData;
  recentMainProjects: ProjectCardData[];
  onProjectClick: (id: string) => void;
  onViewAllProjects: () => void;
  skillsCarousel: MobileDotsController;
  educationCarousel: MobileDotsController;
}

const renderReferenceCard = (reference: ReferenceContact) => (
  <div className="ref-card mobile-peek-item" key={reference.name}>
    <div className="ref-card-head">
      <div className="ref-av">{reference.initials}</div>
      <div className="ref-card-meta">
        <p className="ref-name">{reference.name}</p>
        <p className="ref-org">{reference.organization}</p>
      </div>
    </div>
    <div className="ref-card-body">
      <p className="ref-role">{reference.role}</p>
      <div className="ref-contact ref-contact-links">
        {reference.phones.map((phone) => (
          <a key={phone.href} className="ref-contact-link" href={phone.href}>
            {phone.display}
          </a>
        ))}
      </div>
    </div>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({
  lang,
  v,
  activeSection,
  isMobileMenuOpen,
  toggleMobileMenu,
  scrollToSection,
  onDiscoverProfile,
  onViewProjects,
  onViewBiography,
  skillsSectionSubtitle,
  educationSection,
  referencesSection,
  sortedSkillsData,
  sortedTimelineData,
  sortedFormationData,
  sortedReferencesData,
  desktopReferencePages,
  desktopReferencePage,
  setDesktopReferencePage,
  referenceCarouselRef,
  referenceCarouselIndex,
  referenceCarouselOffset,
  handleCarouselTouchStart,
  handleReferenceCarouselTouchEnd,
  goToReferenceCard,
  featuredMainProject,
  recentMainProjects,
  onProjectClick,
  onViewAllProjects,
  skillsCarousel,
  educationCarousel,
}) => {
  return (
    <main className="page active" id="page-main">
      <nav className="nav">
        <button type="button" className="nav-logo nav-control-btn" onClick={() => scrollToSection('hero')}>
          K · E
        </button>
        <button
          type="button"
          className="hamburger nav-control-btn"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={lang === 'FR' ? 'Ouvrir le menu' : 'Open menu'}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className="nav-links">
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} aria-current={activeSection === 'about' ? 'page' : undefined} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>{v.nav.about}</a></li>
          <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''} aria-current={activeSection === 'skills' ? 'page' : undefined} onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>{v.nav.skills}</a></li>
          <li><a href="#parcours" className={activeSection === 'parcours' ? 'active' : ''} aria-current={activeSection === 'parcours' ? 'page' : undefined} onClick={(e) => { e.preventDefault(); scrollToSection('parcours'); }}>{v.nav.experience}</a></li>
          <li><a href="#formation" className={activeSection === 'formation' ? 'active' : ''} aria-current={activeSection === 'formation' ? 'page' : undefined} onClick={(e) => { e.preventDefault(); scrollToSection('formation'); }}>{v.nav.education}</a></li>
          <li><a href="#projets" className={activeSection === 'projets' ? 'active' : ''} aria-current={activeSection === 'projets' ? 'page' : undefined} onClick={(e) => { e.preventDefault(); scrollToSection('projets'); }}>{v.nav.projects}</a></li>
          <li><a href="#refs" className={activeSection === 'refs' ? 'active' : ''} aria-current={activeSection === 'refs' ? 'page' : undefined} onClick={(e) => { e.preventDefault(); scrollToSection('refs'); }}>{v.nav.references}</a></li>
          <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} aria-current={activeSection === 'contact' ? 'page' : undefined} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>{v.nav.contact}</a></li>
        </ul>
        <div className="nav-tag">{lang === 'FR' ? 'LomÃ©, Togo' : 'Lome, Togo'}</div>
      </nav>

      <MobileNav
        lang={lang}
        isMobileMenuOpen={isMobileMenuOpen}
        activeSection={activeSection}
        toggleMobileMenu={toggleMobileMenu}
        scrollToSection={scrollToSection}
      />

      <Hero
        lang={lang}
        onDiscoverProfile={onDiscoverProfile}
        onViewProjects={onViewProjects}
        onViewBiography={onViewBiography}
      />

      <About lang={lang} onReadMore={onViewBiography} />

      <section className="sec" id="skills" style={{ background: '#EEEAE3' }}>
        <div className="sec-hdr">
          <span className="sec-num">{v.skills.num}</span>
          <h2 className="sec-ttl">{v.skills.title}.</h2>
          <span className="sec-sub">{skillsSectionSubtitle}</span>
        </div>
        <div className="skills-grid" ref={skillsCarousel.containerRef}>
          {sortedSkillsData.map((skill, index) => (
            <div
              className="skill-card"
              key={index}
              ref={(node) => skillsCarousel.registerItem(index, node)}
              data-carousel-index={index}
            >
              <div className="skill-icon" style={{ background: skill.bg }}>
                {skill.icon}
              </div>
              <h4>{skill.title}</h4>
              <p>{skill.desc}</p>
            </div>
          ))}
        </div>
        {sortedSkillsData.length > 1 ? (
          <div className="carousel-dots mobile-scroll-dots" aria-label={lang === 'FR' ? 'Position dans les compétences' : 'Skills position'}>
            {sortedSkillsData.map((skill, index) => (
              <button
                key={`skill-dot-${skill.title}`}
                type="button"
                className={`carousel-dot ${skillsCarousel.activeIndex === index ? 'active' : ''}`}
                onClick={() => skillsCarousel.scrollToIndex(index)}
                aria-label={lang === 'FR' ? `Voir la compétence ${index + 1}` : `View skill ${index + 1}`}
                aria-current={skillsCarousel.activeIndex === index ? 'true' : undefined}
              />
            ))}
          </div>
        ) : null}
      </section>

      <section className="sec" id="parcours">
        <div className="sec-hdr">
          <span className="sec-num">{v.experience.num}</span>
          <h2 className="sec-ttl">{v.experience.title}.</h2>
          <span className="sec-sub">{v.experience.subtitle ?? v.experience.sub}</span>
        </div>
        <div className="timeline">
          {sortedTimelineData.map((item, index) => (
            <div className={`tl-item ${item.isCurrent ? 'current' : ''}`} key={index}>
              <div className="tl-date-row">
                <p className="tl-date">{item.date}</p>
                <span className="tl-duration">{item.duration}</span>
              </div>
              <h3 className="tl-title">{item.title}</h3>
              <p className="tl-co">{item.company}</p>
              <p className="tl-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec" id="formation" style={{ background: '#EEEAE3' }}>
        <div className="sec-hdr">
          <span className="sec-num">{educationSection.num}</span>
          <h2 className="sec-ttl">{educationSection.title}.</h2>
          <span className="sec-sub">{educationSection.subtitle}</span>
        </div>
        <div className="edu-grid" ref={educationCarousel.containerRef}>
          {sortedFormationData.map((item, index) => (
            <div
              className="edu-card"
              key={index}
              ref={(node) => educationCarousel.registerItem(index, node)}
              data-carousel-index={index}
            >
              <p className="edu-year">{item.year}</p>
              <h3 className="edu-title">{item.title}</h3>
              <p className="edu-school" dangerouslySetInnerHTML={{ __html: item.school }} />
              {item.gradeNode}
            </div>
          ))}
        </div>
        {sortedFormationData.length > 1 ? (
          <div className="carousel-dots mobile-scroll-dots" aria-label={lang === 'FR' ? 'Position dans la formation' : 'Education position'}>
            {sortedFormationData.map((item, index) => (
              <button
                key={`education-dot-${item.title}`}
                type="button"
                className={`carousel-dot ${educationCarousel.activeIndex === index ? 'active' : ''}`}
                onClick={() => educationCarousel.scrollToIndex(index)}
                aria-label={lang === 'FR' ? `Voir la formation ${index + 1}` : `View education entry ${index + 1}`}
                aria-current={educationCarousel.activeIndex === index ? 'true' : undefined}
              />
            ))}
          </div>
        ) : null}
      </section>

      <Projects
        lang={lang}
        featuredProject={featuredMainProject}
        recentProjects={recentMainProjects}
        onProjectClick={onProjectClick}
        onViewAll={onViewAllProjects}
      />

      <section className="sec" id="refs" style={{ background: '#EEEAE3' }}>
        <div className="sec-hdr">
          <span className="sec-num">{referencesSection.num}</span>
          <h2 className="sec-ttl">{referencesSection.title}.</h2>
          <span className="sec-sub">{referencesSection.subtitle}</span>
        </div>
        <div className="ref-desktop-carousel">
          <div className="ref-desktop-track" style={{ transform: `translateX(-${desktopReferencePage * 100}%)` }}>
            {desktopReferencePages.map((page, pageIndex) => (
              <div className="ref-desktop-page" key={`ref-page-${pageIndex}`}>
                <div className="ref-grid ref-desktop-grid">
                  {page.map((reference) => renderReferenceCard(reference))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {desktopReferencePages.length > 1 ? (
          <div className="carousel-dots ref-desktop-dots" aria-label={lang === 'FR' ? 'Pages des references' : 'Reference pages'}>
            {desktopReferencePages.map((_, index) => (
              <button
                key={`ref-page-dot-${index}`}
                type="button"
                className={`carousel-dot ${desktopReferencePage === index ? 'active' : ''}`}
                onClick={() => setDesktopReferencePage(index)}
                aria-label={lang === 'FR' ? `Voir la page ${index + 1} des references` : `View reference page ${index + 1}`}
                aria-current={desktopReferencePage === index ? 'true' : undefined}
              />
            ))}
          </div>
        ) : null}
        <div className="ref-carousel-shell ref-mobile-carousel" ref={referenceCarouselRef} onTouchStart={handleCarouselTouchStart('references')} onTouchEnd={handleReferenceCarouselTouchEnd}>
          <div className="ref-grid mobile-peek-track" style={{ transform: `translateX(-${referenceCarouselOffset}px)` }}>
            {sortedReferencesData.map((reference) => renderReferenceCard(reference))}
          </div>
        </div>
        <div className="carousel-dots ref-carousel-dots" aria-label={lang === 'FR' ? 'Position dans les references' : 'Reference position'}>
          {sortedReferencesData.map((reference, index) => (
            <button
              key={`ref-dot-${reference.name}`}
              type="button"
              className={`carousel-dot ${referenceCarouselIndex === index ? 'active' : ''}`}
              onClick={() => goToReferenceCard(index)}
              aria-label={lang === 'FR' ? `Voir la reference ${index + 1}` : `View reference ${index + 1}`}
              aria-current={referenceCarouselIndex === index ? 'true' : undefined}
            />
          ))}
        </div>
      </section>

      <Contact lang={lang} />
      <BackToTop />
      <Footer lang={lang} onNavigate={scrollToSection} />
    </main>
  );
};

export default HomePage;
