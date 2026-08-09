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
const HomeMotion = lazy(() => import('./HomeMotion.tsx'));

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
  const location = useLocation();
  const isHome = location.pathname === '/';

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
      <header
        ref={headerRef}
        className={`site-header ${isHome ? 'site-header--home' : ''}`}
        data-adaptive-header
      >
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
        className={`site-mobile-menu ${isHome ? 'site-mobile-menu--home' : ''} ${menuOpen ? 'is-open' : ''}`}
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

function SplitWords({ children }: { children: string }) {
  const words = children.split(' ');

  return words.map((word, index) => (
    <span className="portal-belief__word" data-belief-word key={`${word}-${index}`}>
      {word}{index < words.length - 1 ? ' ' : ''}
    </span>
  ));
}

function PortalBuild({ build, index }: { build: Build; index: number }) {
  return (
    <article className="portal-build" data-portal-build>
      <Link
        className="portal-build__link"
        to={`/builds#${build.slug}`}
        aria-label={`Explore ${build.name}`}
      >
        <div className="portal-build__media build-media">
          <BuildImage build={build} reveal eager={index === 0} />
        </div>
        <span className="portal-build__index" aria-hidden="true">0{index + 1}</span>
        <div className="portal-build__content">
          <p>{build.family} series</p>
          <h3>{build.name}</h3>
          <span className="portal-build__intent">{build.intent}</span>
          <span className="portal-build__price">From {build.price}</span>
        </div>
        <span className="portal-build__arrow" aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}

export function HomePage() {
  return (
    <div className="home-rework">
      <PageMeta
        title="Assembly Line — Your portal to PC master race"
        description="Custom gaming and workstation PCs planned, built and supported by enthusiasts in Bhubaneswar."
      />
      <Suspense fallback={null}><HomeMotion /></Suspense>

      <section className="portal-hero" aria-labelledby="portal-title">
        <div className="portal-hero__media" aria-hidden="true">
          <img
            src="/images/hero-bg.jpg"
            width="1920"
            height="730"
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="portal-hero__wash" aria-hidden="true" />
        <div className="portal-hero__grid" aria-hidden="true" />

        <div className="shell portal-hero__inner">
          <h1 id="portal-title" className="portal-title" aria-label="Your portal to PC master race">
            <span className="portal-title__line">
              <span className="portal-title__line-inner"><span>Your</span><span>portal</span></span>
            </span>
            <span className="portal-title__line portal-title__line--mixed">
              <span className="portal-title__line-inner"><span>to</span><span>PC</span><span>master</span></span>
            </span>
            <span className="portal-title__line portal-title__line--accent"><span className="portal-title__line-inner">race.</span></span>
          </h1>

          <div className="portal-hero__footer">
            <p>
              We ask what you play, create and care about—then design the machine around the answer.
            </p>
            <div className="portal-hero__actions">
              <Link className="portal-action" to="/start">
                Start your build <Arrow />
              </Link>
              <Link className="portal-line-link" to="/builds">
                Explore reference builds <Arrow diagonal />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="portal-proof" aria-label="Assembly Line customer benefits">
        <div className="shell portal-proof__inner">
          <div className="portal-proof__item"><strong>2,000+</strong><span>customers guided</span></div>
          <div className="portal-proof__item"><strong>Lifetime</strong><span>free tech support</span></div>
          <div className="portal-proof__item"><strong>100%</strong><span>brand-new parts</span></div>
        </div>
      </section>

      <section className="portal-belief">
        <div className="shell portal-belief__inner">
          <p className="portal-belief__aside">The fastest part on paper can still be the wrong part for your room, display, software or upgrade path.</p>
          <h2 className="portal-belief__statement">
            <SplitWords>A faster component is not always the right component.</SplitWords>
          </h2>
          <div className="portal-belief__footer">
            <p>
              We explain the trade-offs plainly. You leave with a machine you understand—not a longer invoice.
            </p>
            <Link className="portal-belief__cta" to="/start">
              Tell us how you will use it <Arrow diagonal />
            </Link>
          </div>
        </div>
      </section>

      <section className="portal-builds-section">
        <div className="shell portal-section-heading">
          <div>
            <p>Reference builds</p>
            <h2>A starting point.<br />Never a box.</h2>
          </div>
          <p>Open a build to see the thinking, then change anything. Performance, noise, colour and cost all stay on the table.</p>
        </div>
        <div className="shell portal-builds" role="region" aria-label="Reference builds" tabIndex={0}>
          {builds.slice(0, 3).map((build, index) => (
            <PortalBuild build={build} index={index} key={build.slug} />
          ))}
        </div>
        <div className="shell portal-builds-section__footer">
          <Link className="portal-line-link" to="/builds">See every configuration <Arrow diagonal /></Link>
        </div>
      </section>

      <section className="portal-method">
        <div className="shell portal-method__inner">
          <div className="portal-method__heading">
            <span>One enthusiast with you throughout</span>
            <h2>We listen.<br />We explain.<br /><em>Then</em> we build.</h2>
          </div>
          <div className="portal-method__steps">
            {[
              ['Listen', 'Your games, apps, monitor, room, budget and real upgrade plans go on the table.'],
              ['Explain', 'You see where the money matters, where it does not and what every trade-off changes.'],
              ['Build + stay', 'We assemble, stress-test and tune the machine, then stay available for lifetime support.'],
            ].map(([title, copy], index) => (
              <Reveal className="portal-method__step" delay={index * 80} key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials home-testimonials section section--tinted">
        <div className="shell">
          <Reveal>
            <div className="section-intro home-testimonials__intro">
              <div>
                <p className="eyebrow">Customer stories</p>
                <h2>The part we care about is what happens after the invoice.</h2>
              </div>
              <div className="section-intro__aside">
                <p>Real feedback from people who trusted us with the machine they work and play on every day.</p>
                <span className="home-testimonials__hint">Swipe to read more →</span>
              </div>
            </div>
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

      <ConsultationBanner />
    </div>
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
