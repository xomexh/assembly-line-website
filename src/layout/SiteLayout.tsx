import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FloatingWhatsapp } from '../components/FloatingWhatsapp.tsx';
import { MarketAlert } from '../components/MarketAlert.tsx';
import { SiteFooter } from './SiteFooter.tsx';
import { SiteHeader } from './SiteHeader.tsx';

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
      <MarketAlert />
      <main id="main-content">
        <Outlet />
      </main>
      <FloatingWhatsapp />
      <SiteFooter />
    </div>
  );
}
