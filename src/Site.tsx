import {
  lazy,
  Suspense,
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Quotes, Star, WhatsappLogo } from '@phosphor-icons/react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { benchNotes, builds, testimonials, whatsappUrl, type Build } from './data.ts';
import './site.css';

const primaryWhatsappUrl = whatsappUrl(
  'Hi Assembly Line, I would like help planning a custom PC.',
);

const ProductMediaMotion = lazy(() => import('./ProductMediaMotion.tsx'));

const navigationItems = [
  { to: '/builds', label: 'Builds' },
  { to: '/offers', label: 'Offers' },
  { to: '/news', label: 'Bench notes' },
] as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className={diagonal ? 'arrow arrow--diagonal' : 'arrow'}>→</span>;
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? 'menu-icon--open' : ''}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute('content', description);
  }, [description, title]);

  return null;
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let frame = 0;
    let docked = false;

    const update = () => {
      frame = 0;
      if (!docked && window.scrollY > 96) docked = true;
      if (docked && window.scrollY < 36) docked = false;
      header.classList.toggle('is-docked', docked);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousFocus = document.activeElement;
    const inertTargets = document.querySelectorAll<HTMLElement>(
      '.site-frame > main, .site-frame > .floating-whatsapp, .site-frame > .site-footer',
    );
    const focusTimer = window.setTimeout(() => {
      menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    }, 80);

    document.body.classList.add('is-menu-open');
    inertTargets.forEach((target) => target.setAttribute('inert', ''));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = [
        toggleRef.current,
        ...Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []),
      ].filter((element): element is HTMLButtonElement | HTMLAnchorElement => element !== null);
      const first = focusable[0];
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('is-menu-open');
      inertTargets.forEach((target) => target.removeAttribute('inert'));
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header ref={headerRef} className="site-header" data-adaptive-header>
        <div className="site-header__inner">
          <Link className="brand" to="/" aria-label="Assembly Line home">
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__wordmark">Assembly Line</span>
          </Link>

          <nav className="site-nav" aria-label="Primary navigation">
            {navigationItems.map((item) => (
              <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
            ))}
            <Link className="site-nav__cta" to="/start">
              Plan my PC <Arrow />
            </Link>
          </nav>

          <button
            ref={toggleRef}
            className="menu-button"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-navigation"
        className={`site-mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="site-mobile-menu__links" aria-label="Mobile navigation">
          {navigationItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={closeMenu}>{item.label}</NavLink>
          ))}
          <Link className="site-mobile-menu__cta" to="/start" onClick={closeMenu}>
            Plan my PC <Arrow />
          </Link>
        </nav>
        <p>PC enthusiasts in Bhubaneswar, helping customers across India.</p>
      </div>
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__top">
        <div>
          <Link className="brand brand--footer" to="/">
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__wordmark">Assembly Line</span>
          </Link>
          <p className="site-footer__statement">
            PCs planned by enthusiasts,<br />built for the way you actually work and play.
          </p>
        </div>
        <div className="site-footer__links">
          <div>
            <p className="footer-label">Explore</p>
            <Link to="/builds">Reference builds</Link>
            <Link to="/offers">Current offers</Link>
            <Link to="/news">Bench notes</Link>
          </div>
          <div>
            <p className="footer-label">Talk to us</p>
            <a href={primaryWhatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="mailto:assemblylineindia@gmail.com">Email</a>
            <a href="https://maps.app.goo.gl/ufb5wcTHCxRwNiF18" target="_blank" rel="noreferrer">Bhubaneswar store</a>
          </div>
          <div>
            <p className="footer-label">Follow</p>
            <a href="https://www.instagram.com/assemblyline.india" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.facebook.com/assemblyline.india" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>
      </div>
      <div className="shell site-footer__bottom">
        <span>© {new Date().getFullYear()} Assembly Line</span>
        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/refund">Refunds</Link>
          <Link to="/shipping">Shipping</Link>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const frame = window.requestAnimationFrame(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView();
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.hash, location.pathname]);

  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader key={location.pathname} />
      <main id="main-content">
        <Outlet />
      </main>
      <a
        className="floating-whatsapp"
        href={primaryWhatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Assembly Line on WhatsApp"
      >
        <span>Ask an enthusiast</span>
        <span className="floating-whatsapp__icon" aria-hidden="true">
          <WhatsappLogo size={20} weight="fill" />
        </span>
      </a>
      <SiteFooter />
    </div>
  );
}

function BuildImage({
  build,
  eager = false,
  reveal = false,
}: {
  build: Build;
  eager?: boolean;
  reveal?: boolean;
}) {
  const imageProps = {
    width: 800,
    height: 601,
    alt: `${build.name} custom PC build`,
    loading: eager ? 'eager' as const : 'lazy' as const,
    fetchPriority: eager ? 'high' as const : 'auto' as const,
    decoding: 'async' as const,
  };

  if (reveal) {
    return (
      <>
        <img className="build-media__preview" src={build.image} {...imageProps} />
        {build.imageLarge && (
          <img
            className="build-media__detail"
            src={build.imageLarge}
            width="1600"
            height="1202"
            alt=""
            aria-hidden="true"
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'low'}
            decoding="async"
          />
        )}
      </>
    );
  }

  return (
    <img
      src={build.image}
      srcSet={build.imageLarge ? `${build.image} 800w, ${build.imageLarge} 1600w` : undefined}
      sizes={eager ? '(max-width: 720px) 92vw, 52vw' : '(max-width: 720px) 92vw, 42vw'}
      {...imageProps}
    />
  );
}

function BuildCard({ build }: { build: Build }) {
  const url = whatsappUrl(`Hi Assembly Line, I am interested in the ${build.name} starting at ${build.price}. Please help me customise it.`);

  return (
    <article className="build-card">
      <Link to={`/builds#${build.slug}`} className="build-card__media-shell" aria-label={`View ${build.name} details`}>
        <span className="build-card__image build-media">
          <BuildImage build={build} reveal />
        </span>
      </Link>
      <div className="build-card__body">
        <div className="build-card__heading">
          <div>
            <p className="eyebrow eyebrow--compact">{build.family} series</p>
            <h3>{build.name}</h3>
          </div>
          <p className="build-card__price"><span>Starting at</span><strong>{build.price}</strong></p>
        </div>
        <p className="build-card__intent">{build.intent}</p>
        <div className="build-card__core">
          <span>{build.cpu}</span>
          <span>{build.gpu}</span>
        </div>
        <a className="text-link" href={url} target="_blank" rel="noreferrer">
          Tune this build with us <Arrow diagonal />
        </a>
      </div>
    </article>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
  action,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-intro">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      <div className="section-intro__aside">
        {copy && <p>{copy}</p>}
        {action}
      </div>
    </div>
  );
}

export function HomePage() {
  const heroBuild = builds[0];

  return (
    <>
      <PageMeta
        title="Assembly Line - Custom PCs, planned with you"
        description="Custom gaming and workstation PCs planned by enthusiasts in Bhubaneswar. Explore builds and start a practical consultation on WhatsApp."
      />

      <section className="hero shell">
        <div className="hero__copy">
          <h1>
            Built with you.<br />
            <span>Not sold to you.</span>
          </h1>
          <p className="hero__lede">
            Assembly Line is a group of PC enthusiasts who ask what you play, create and care about, then build only what makes sense.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" to="/start">Plan my PC <Arrow /></Link>
            <Link className="text-link text-link--large" to="/builds">See the builds <Arrow diagonal /></Link>
          </div>
          <div className="hero__proof" aria-label="Assembly Line customer benefits">
            <div><strong>2,000+</strong><span>customers guided</span></div>
            <div><strong>Lifetime</strong><span>free tech support</span></div>
            <div><strong>100%</strong><span>brand-new parts</span></div>
          </div>
        </div>

        <div className="hero-stage" aria-label={`${heroBuild.name}, featured custom PC`}>
          <div className="hero-stage__grid" />
          <div className="hero-stage__image">
            <BuildImage build={heroBuild} eager />
            <span className="hero-stage__scan" />
          </div>
          <div className="hero-stage__note hero-stage__note--top">
            <span>Current reference</span>
            <strong>{heroBuild.name}</strong>
          </div>
          <div className="hero-stage__note hero-stage__note--bottom">
            <span>{heroBuild.gpu}</span>
            <span>{heroBuild.cpu}</span>
          </div>
          <span className="hero-stage__corner hero-stage__corner--one" />
          <span className="hero-stage__corner hero-stage__corner--two" />
        </div>
      </section>

      <section className="brand-tagline" aria-label="Assembly Line tagline">
        <div className="shell brand-tagline__inner">
          <span className="brand-tagline__mark" aria-hidden="true" />
          <p>Your portal to <strong>PC master race.</strong></p>
          <span className="brand-tagline__signature">Assembly Line</span>
        </div>
      </section>

      <section className="belief section shell">
        <Reveal className="belief__statement">
          <h2>A faster component is not always the right component.</h2>
        </Reveal>
        <Reveal className="belief__copy" delay={120}>
          <p>
            Random sales advice starts with a product. We start with the person using it. Your display, software, upgrade plans, room, noise tolerance and budget all change the right answer.
          </p>
          <p>
            So we explain the trade-offs plainly. You leave with a machine you understand, not just a longer invoice.
          </p>
          <Link className="text-link" to="/start">Tell us how you will use it <Arrow diagonal /></Link>
        </Reveal>
      </section>

      <section className="build-showcase section section--tinted">
        <div className="shell">
          <Reveal>
            <SectionIntro
              eyebrow="Reference builds"
              title="A useful place to start. Never a box you are stuck in."
              copy="Each configuration is a conversation starter. We can tune performance, acoustics, aesthetics and cost around you."
              action={<Link className="text-link" to="/builds">View all details <Arrow diagonal /></Link>}
            />
          </Reveal>
          <div className="build-showcase__grid">
            {builds.map((build, index) => (
              <Reveal key={build.slug} delay={index * 70}>
                <BuildCard build={build} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="method section shell">
        <Reveal>
          <SectionIntro
            title="Three stages. One person accountable throughout."
          />
        </Reveal>
        <div className="method__grid">
          {[
            ['Listen', 'We map your games, apps, monitor, budget and the upgrades you actually expect to make.'],
            ['Explain', 'You get a balanced part list with the real trade-offs: where to spend, where to save and why.'],
            ['Build + stay', 'We assemble, stress-test and tune the machine, then remain available when you need support.'],
          ].map(([title, copy], index) => (
            <Reveal className="method-card" delay={index * 90} key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="offers-peek section shell">
        <Reveal className="offers-peek__panel">
          <div>
            <p className="eyebrow eyebrow--light">Offers board</p>
            <h2>No loud countdowns.<br />Just worthwhile deals when they exist.</h2>
          </div>
          <div className="offers-peek__status">
            <span className="live-dot" />
            <p><strong>No public offer is live right now.</strong> We still check current distributor pricing while planning every build.</p>
            <Link className="text-link text-link--light" to="/offers">Check the offers board <Arrow diagonal /></Link>
          </div>
        </Reveal>
      </section>

      <section className="testimonials section section--tinted">
        <div className="shell">
          <Reveal>
            <SectionIntro
              title="The part we care about is what happens after the invoice."
            />
          </Reveal>
          <div className="testimonial-grid" aria-label="Customer testimonials" role="region" tabIndex={0}>
            {testimonials.map((testimonial, index) => (
              <Reveal className={`testimonial testimonial--${index + 1}`} delay={index * 70} key={testimonial.name}>
                <div className="testimonial__topline">
                  <span className="testimonial__rating"><Star size={15} weight="fill" /> Five-star review</span>
                  <Quotes className="testimonial__mark" size={30} weight="fill" aria-hidden="true" />
                </div>
                <blockquote>{testimonial.quote}</blockquote>
                <footer>
                  <span className="testimonial__avatar" aria-hidden="true">{testimonial.initials}</span>
                  <span>
                    <strong>{testimonial.name}</strong>
                    <small>{testimonial.context}</small>
                  </span>
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="notes-preview section shell">
        <Reveal>
          <SectionIntro
            eyebrow="Bench notes"
            title="Useful thinking from behind the workbench."
            action={<Link className="text-link" to="/news">Read every note <Arrow diagonal /></Link>}
          />
        </Reveal>
        <div className="notes-list">
          {benchNotes.map((note, index) => (
            <Reveal delay={index * 70} key={note.title}>
              <article className="note-row">
                <span className="note-row__index">0{index + 1}</span>
                <div>
                  <p className="eyebrow eyebrow--compact">{note.tag}</p>
                  <h3>{note.title}</h3>
                </div>
                <p>{note.summary}</p>
                <span className="note-row__time">{note.readTime}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ConsultationBanner />
    </>
  );
}

function ConsultationBanner() {
  return (
    <section className="consultation-banner section">
      <div className="shell consultation-banner__inner">
        <Reveal>
          <h2>Tell us what the PC needs to do. We will help with the rest.</h2>
        </Reveal>
        <Reveal className="consultation-banner__action" delay={120}>
          <Link className="button button--paper" to="/start">Build my brief <Arrow /></Link>
          <span>No payment. No call queue. Opens WhatsApp.</span>
        </Reveal>
      </div>
    </section>
  );
}

export function BuildsPage() {
  const [filter, setFilter] = useState<'All' | 'Albus' | 'Onyx'>('All');
  const filteredBuilds = filter === 'All' ? builds : builds.filter((build) => build.family === filter);

  return (
    <>
      <Suspense fallback={null}><ProductMediaMotion /></Suspense>
      <PageMeta
        title="Reference builds - Assembly Line"
        description="Explore Assembly Line reference gaming and workstation builds, then customise the right one with our team on WhatsApp."
      />
      <section className="page-hero page-hero--builds shell">
        <p className="eyebrow">Reference builds</p>
        <h1>Start informed.<br /><span>Finish personal.</span></h1>
        <p>These are proven starting points, not sealed SKUs. Every configuration can move with your work, games, display and budget.</p>
      </section>

      <section className="catalog section shell">
        <div className="catalog__bar">
          <div className="filter-tabs" role="group" aria-label="Filter build family">
            {(['All', 'Albus', 'Onyx'] as const).map((option) => (
              <button
                type="button"
                key={option}
                className={filter === option ? 'is-active' : ''}
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <p>{filteredBuilds.length} reference {filteredBuilds.length === 1 ? 'build' : 'builds'}</p>
        </div>

        <div className="catalog__list">
          {filteredBuilds.map((build, index) => {
            const url = whatsappUrl(`Hi Assembly Line, I want to discuss the ${build.name} starting at ${build.price}.`);
            return (
              <article className="catalog-build" id={build.slug} key={build.slug}>
                <div className="catalog-build__media-shell">
                  <div className="catalog-build__image build-media">
                    <BuildImage build={build} eager={index === 0} reveal />
                  </div>
                </div>
                <div className="catalog-build__content">
                  <div className="catalog-build__title">
                    <div><p className="eyebrow eyebrow--compact">{build.family} series</p><h2>{build.name}</h2><p className="catalog-build__intent">{build.intent}</p></div>
                    <p className="catalog-build__price"><span>Starting at</span><strong>{build.price}</strong></p>
                  </div>
                  <dl className="spec-list">
                    <div><dt>Processor</dt><dd>{build.cpu}</dd></div>
                    <div><dt>Graphics</dt><dd>{build.gpu}</dd></div>
                    <div><dt>Memory</dt><dd>{build.memory}</dd></div>
                    <div><dt>Storage</dt><dd>{build.storage}</dd></div>
                    <div><dt>Motherboard</dt><dd>{build.motherboard}</dd></div>
                    <div><dt>Power + cooling</dt><dd>{build.psu} · {build.cooler}</dd></div>
                  </dl>
                  <div className="catalog-build__actions">
                    <a className="button button--primary" href={url} target="_blank" rel="noreferrer">Customise on WhatsApp <Arrow /></a>
                    <span>Final price follows current component availability.</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <ConsultationBanner />
    </>
  );
}

export function OffersPage() {
  return (
    <>
      <PageMeta
        title="Current offers - Assembly Line"
        description="See the current Assembly Line custom PC offers and ask our team to check today’s component pricing."
      />
      <section className="page-hero shell">
        <p className="eyebrow">Offers board</p>
        <h1>The right deal<br /><span>earns its place.</span></h1>
        <p>We publish offers only when the saving helps a good build, not when it pushes the wrong part.</p>
      </section>
      <section className="offers-page section shell">
        <div className="offer-status-card">
          <div>
            <span className="live-dot" />
            <p className="eyebrow eyebrow--compact">Board status</p>
          </div>
          <h2>No public campaign is running right now.</h2>
          <p>Component prices move quickly. Send us your target budget and we will check the useful combinations available today.</p>
          <a className="button button--primary" href={whatsappUrl('Hi Assembly Line, are there any current component or full-build offers for my budget?')} target="_blank" rel="noreferrer">
            Ask for today’s options <Arrow />
          </a>
        </div>
        <div className="value-list">
          <article><span>01</span><h3>Current-part pricing</h3><p>We quote against available stock instead of leaving an expired promotional price online.</p></article>
          <article><span>02</span><h3>No forced bundle</h3><p>A discount does not justify the wrong motherboard, power supply or memory kit.</p></article>
          <article><span>03</span><h3>The complete cost</h3><p>We explain what is included, what is optional and what a sensible upgrade would cost.</p></article>
        </div>
      </section>
      <ConsultationBanner />
    </>
  );
}

export function NewsPage() {
  return (
    <>
      <PageMeta
        title="Bench notes - Assembly Line"
        description="Practical PC buying, building and upgrade notes from the Assembly Line workshop."
      />
      <section className="page-hero shell">
        <p className="eyebrow">Bench notes</p>
        <h1>Less launch noise.<br /><span>More useful context.</span></h1>
        <p>Short notes about buying, balancing and living with a custom PC, written by the people who assemble them.</p>
      </section>
      <section className="notes-page section shell">
        {benchNotes.map((note, index) => (
          <article className="notes-article" key={note.title}>
            <div className="notes-article__meta">
              <span>0{index + 1}</span>
              <p>{note.tag}</p>
              <small>{note.readTime}</small>
            </div>
            <div className="notes-article__body">
              <h2>{note.title}</h2>
              <p>{note.summary}</p>
              {index === 0 && <p>A well-balanced system keeps the graphics card fed, the thermals controlled and the power supply comfortably inside its efficient range. It also leaves enough budget for the monitor and storage that affect everyday use.</p>}
              {index === 1 && <p>Every handover should follow a repeatable check: sustained CPU and GPU load, memory stability, temperature behavior, fan noise, front-panel I/O, wireless connectivity and a final physical inspection.</p>}
              {index === 2 && <p>The useful upgrade path is specific. Choose the board features, memory capacity and power headroom your likely next component needs. Paying for every possible future is just another kind of overspending.</p>}
            </div>
          </article>
        ))}
      </section>
      <ConsultationBanner />
    </>
  );
}

export function StartPage() {
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const budget = String(data.get('budget') || '').trim();
    const requirements = String(data.get('requirements') || '').trim();

    if (!name || !budget || !requirements) {
      setError('Add your name, budget and what you need the PC to do.');
      return;
    }

    setError('');
    const message = [
      `Hi Assembly Line, I’m ${name}. I’d like help planning a custom PC.`,
      `Use: ${String(data.get('useCase') || 'Not specified')}`,
      `Budget: ${budget}`,
      `Location: ${String(data.get('location') || 'Not specified')}`,
      `What I need: ${requirements}`,
    ].join('\n');

    window.location.assign(whatsappUrl(message));
  }

  return (
    <>
      <PageMeta
        title="Plan your custom PC - Assembly Line"
        description="Share your use case and budget with Assembly Line, then continue the conversation with a PC enthusiast on WhatsApp."
      />
      <section className="start-page shell">
        <div className="start-page__intro">
          <p className="eyebrow">Your build brief</p>
          <h1>Give us the context a parts list cannot.</h1>
          <p>Answer four short questions. We will format your brief and open it in WhatsApp, where a real person from our team can take over.</p>
          <div className="start-page__promise">
            <span>What happens next</span>
            <ol>
              <li>We read the brief and ask what is missing.</li>
              <li>We suggest a balanced direction and explain why.</li>
              <li>You decide if and when to move ahead.</li>
            </ol>
          </div>
        </div>
        <form className="brief-form" onSubmit={handleSubmit} noValidate>
          <div className="field-row">
            <label><span>Your name *</span><input name="name" autoComplete="name" placeholder="How should we address you?" /></label>
            <label><span>Your location</span><input name="location" autoComplete="address-level2" placeholder="City or delivery location" /></label>
          </div>
          <label>
            <span>Main use</span>
            <select name="useCase" defaultValue="Gaming">
              <option>Gaming</option>
              <option>Content creation</option>
              <option>3D / VFX / architecture</option>
              <option>AI / development</option>
              <option>Office / business</option>
              <option>A mix of uses</option>
            </select>
          </label>
          <label><span>Comfortable budget *</span><input name="budget" inputMode="text" placeholder="For example, ₹1.2-1.5 lakh" /></label>
          <label><span>What should this PC do well? *</span><textarea name="requirements" rows={6} placeholder="Games or apps, monitor resolution, parts you already own, noise or size preferences, and anything else that matters." /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button--primary button--full" type="submit">Continue in WhatsApp <Arrow /></button>
          <p className="form-note">Your answers stay in your browser until you choose to open WhatsApp.</p>
        </form>
      </section>
    </>
  );
}

const legalCopy = {
  privacy: {
    title: 'Privacy policy',
    intro: 'A plain-language overview of how enquiry information is handled.',
    sections: [
      ['Information you share', 'When you contact us, you may choose to share your name, contact details, location, budget and PC requirements. The website does not store the build brief before WhatsApp opens.'],
      ['How it is used', 'We use enquiry information to answer questions, prepare a configuration, provide support and communicate about your order.'],
      ['Your choices', 'You may ask us to correct or delete information associated with your enquiry by emailing assemblylineindia@gmail.com.'],
    ],
  },
  terms: {
    title: 'Terms of service',
    intro: 'The practical terms that apply when you use this website or request a configuration.',
    sections: [
      ['Reference configurations', 'Builds and prices shown on this website are starting points. Final component selection, availability, price and delivery timing are confirmed in a written quotation.'],
      ['Advice and compatibility', 'Recommendations are based on the requirements you share and the information available when the quote is prepared.'],
      ['Contact', 'Questions about a quote or these terms can be sent to assemblylineindia@gmail.com.'],
    ],
  },
  refund: {
    title: 'Refund policy',
    intro: 'Refund and cancellation terms depend on the stage of a custom order.',
    sections: [
      ['Before ordering', 'Review the component list, price and lead time in your quotation before approving the build.'],
      ['Custom orders', 'Because components may be ordered specifically for an approved build, cancellation and refund eligibility can vary once procurement begins. The applicable terms will be confirmed with your order.'],
      ['Problems after delivery', 'Contact us promptly if an item arrives damaged or the system is not working as expected so we can assess the issue and help.'],
    ],
  },
  shipping: {
    title: 'Shipping policy',
    intro: 'How delivery is planned for a finished custom PC.',
    sections: [
      ['Delivery availability', 'Delivery options, charges and estimated timing are confirmed for your location before the order is approved.'],
      ['Packaging', 'Completed systems are prepared for transport with internal and external protection appropriate to the selected case and components.'],
      ['At delivery', 'Inspect the outer packaging when the shipment arrives and contact us promptly if there is visible transit damage.'],
    ],
  },
} satisfies Record<string, { title: string; intro: string; sections: [string, string][] }>;

export function LegalPage({ type }: { type: keyof typeof legalCopy }) {
  const content = legalCopy[type];
  return (
    <>
      <PageMeta title={`${content.title} - Assembly Line`} description={content.intro} />
      <section className="legal-page shell">
        <p className="eyebrow">Assembly Line</p>
        <h1>{content.title}</h1>
        <p className="legal-page__intro">{content.intro}</p>
        <div className="legal-page__sections">
          {content.sections.map(([title, copy]) => <section key={title}><h2>{title}</h2><p>{copy}</p></section>)}
        </div>
        <p className="legal-page__updated">Draft website copy · updated August 2026</p>
      </section>
    </>
  );
}

export function NotFoundPage() {
  return (
    <section className="not-found shell">
      <PageMeta title="Page not found - Assembly Line" description="This Assembly Line page could not be found." />
      <p className="eyebrow">404 · loose cable</p>
      <h1>This route is not connected.</h1>
      <p>The page may have moved, or the address may be incomplete.</p>
      <Link className="button button--primary" to="/">Return home <Arrow /></Link>
    </section>
  );
}
