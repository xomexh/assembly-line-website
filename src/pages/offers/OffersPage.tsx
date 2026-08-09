import { Arrow } from '../../components/Arrow.tsx';
import { ConsultationBanner } from '../../components/ConsultationBanner.tsx';
import { PageMeta } from '../../components/PageMeta.tsx';
import { whatsappUrl } from '../../data.ts';

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
          <a
            className="button button--primary"
            href={whatsappUrl('Hi Assembly Line, are there any current component or full-build offers for my budget?')}
            target="_blank"
            rel="noreferrer"
          >
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
