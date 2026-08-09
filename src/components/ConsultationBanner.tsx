import { Link } from 'react-router-dom';
import { Arrow } from './Arrow.tsx';
import { Reveal } from './Reveal.tsx';

export function ConsultationBanner() {
  return (
    <section className="consultation-banner section">
      <div className="shell consultation-banner__inner">
        <Reveal>
          <h2>Tell us what the PC needs to do. We will help with the rest.</h2>
        </Reveal>
        <Reveal className="consultation-banner__action" delay={120}>
          <Link className="button button--paper" to="/start">
            Build my brief <Arrow />
          </Link>
          <span>No payment. No call queue. Opens WhatsApp.</span>
        </Reveal>
      </div>
    </section>
  );
}
