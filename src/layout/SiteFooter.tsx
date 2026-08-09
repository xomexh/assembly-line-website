import { Link } from 'react-router-dom';
import { primaryWhatsappUrl } from '../contact.ts';

export function SiteFooter() {
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
