import { Link } from 'react-router-dom';
import {
  contactEmail,
  mapUrl,
  phoneNumbers,
} from '../contact.ts';

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
            <p className="footer-label">Follow</p>
            <a href="https://www.instagram.com/assemblyline.india" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.facebook.com/assemblyline.india" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>
      </div>
      <div className="shell site-footer__contact" aria-label="Assembly Line contact details">
        <article className="footer-contact">
          <p className="footer-contact__label">Visit</p>
          <a className="footer-contact__value" href={mapUrl} target="_blank" rel="noreferrer">
            View on Google Maps <span aria-hidden="true">↗</span>
          </a>
          <p className="footer-contact__meta">Bhubaneswar, Odisha</p>
        </article>
        <article className="footer-contact">
          <p className="footer-contact__label">Email</p>
          <a className="footer-contact__value" href={`mailto:${contactEmail}`}>
            {contactEmail} <span aria-hidden="true">↗</span>
          </a>
          <p className="footer-contact__meta">Build questions, support and partnerships</p>
        </article>
        <article className="footer-contact">
          <p className="footer-contact__label">Call</p>
          <div className="footer-contact__phones">
            {phoneNumbers.map((phone) => (
              <a href={phone.href} key={phone.href}>{phone.display}</a>
            ))}
          </div>
          <p className="footer-contact__meta">Speak directly with the team</p>
        </article>
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
