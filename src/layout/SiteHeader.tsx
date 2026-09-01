import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Arrow } from '../components/Arrow.tsx';

type NavigationItem = {
  to: string;
  label: string;
  className?: string;
};

const navigationItems: NavigationItem[] = [
  { to: '/builds', label: 'Builds' },
  { to: '/offers', label: 'Offers' },
  { to: '/news', label: 'Bench notes' },
  { to: '/sim-racing', label: 'Sim Rig', className: 'site-nav__sim-rig' },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? 'menu-icon--open' : ''}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const usesDarkNavigation = isHome || location.pathname === '/sim-racing';

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
      document.body.classList.toggle('is-header-docked', docked);
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
      document.body.classList.remove('is-header-docked');
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousFocus = document.activeElement;
    const inertTargets = document.querySelectorAll<HTMLElement>(
      '.site-frame > main, .site-frame > .market-alert, .site-frame > .floating-whatsapp, .site-frame > .site-footer',
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
        className={`site-header${isHome ? ' site-header--home' : ''}${usesDarkNavigation ? ' site-header--dark' : ''}`}
        data-adaptive-header
      >
        <div className="site-header__inner">
          <Link className="brand" to="/" aria-label="Assembly Line home">
            <span className="brand__marks" aria-hidden="true">
              <img
                className="brand__mark brand__mark--light-nav"
                src="/asl-logo-black.png"
                width="208"
                height="252"
                alt=""
              />
              <img
                className="brand__mark brand__mark--dark-nav"
                src="/asl-logo.png"
                width="1573"
                height="1920"
                alt=""
              />
            </span>
            <span className="brand__wordmark">Assembly Line</span>
          </Link>

          <nav className="site-nav" aria-label="Primary navigation">
            {navigationItems.map((item) => (
              <NavLink className={item.className} key={item.to} to={item.to}>{item.label}</NavLink>
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
        className={`site-mobile-menu${usesDarkNavigation ? ' site-mobile-menu--dark' : ''}${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="site-mobile-menu__links" aria-label="Mobile navigation">
          {navigationItems.map((item) => (
            <NavLink className={item.className} key={item.to} to={item.to} onClick={closeMenu}>{item.label}</NavLink>
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
