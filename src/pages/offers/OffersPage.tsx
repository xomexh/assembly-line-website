import { Arrow } from '../../components/Arrow.tsx';
import { ConsultationBanner } from '../../components/ConsultationBanner.tsx';
import { PageMeta } from '../../components/PageMeta.tsx';
import { whatsappUrl } from '../../data.ts';

export function OffersPage() {
  return (
    <>
      <PageMeta
        title="Current offers - Assembly Line"
        description="See current NVIDIA GeForce rewards and GPU bundle status from Assembly Line, an accredited NVIDIA-certified PC builder."
      />
      <section className="page-hero shell">
        <p className="eyebrow">Offers board</p>
        <h1>The right deal<br /><span>earns its place.</span></h1>
        <p>As an accredited NVIDIA-certified PC builder, we check official GeForce rewards and bundle eligibility before your GPU goes on the invoice.</p>
      </section>

      <section className="nvidia-offers section shell" aria-labelledby="nvidia-offers-title">
        <div className="nvidia-offers__brand">
          <div className="nvidia-offers__logo">
            <img src="/images/nvidia-logo-horiz-wht-16x9.png" width="3840" height="2160" alt="NVIDIA" />
          </div>
          <div>
            <p>Accredited NVIDIA-certified PC builder</p>
            <h2 id="nvidia-offers-title">Official GeForce offers, checked before you buy.</h2>
          </div>
          <time dateTime="2026-08-20">Verified<br />20 Aug 2026</time>
        </div>

        <div className="nvidia-offers__grid">
          <article className="nvidia-offer nvidia-offer--live">
            <header>
              <span className="nvidia-offer__state">Live reward</span>
              <span>Via NVIDIA App</span>
            </header>
            <h3>3 months of Discord Nitro</h3>
            <p className="nvidia-offer__lead">Claim premium Discord features through NVIDIA App. The reward is available in India for a limited time while codes last.</p>
            <dl className="nvidia-offer__facts">
              <div><dt>Availability</dt><dd>Limited time · first come, first served</dd></div>
              <div><dt>Eligible GPU</dt><dd>GeForce GTX 10 Series or newer</dd></div>
              <div><dt>Account rule</dt><dd>No Discord Nitro subscription in the previous 12 months</dd></div>
            </dl>
            <p className="nvidia-offer__fineprint">A valid payment method is required. Nitro renews at the standard monthly price after the three-month trial unless cancelled.</p>
            <a className="nvidia-offer__link" href="https://www.nvidia.com/en-in/geforce/rewards/" target="_blank" rel="noreferrer">
              View NVIDIA reward details <Arrow diagonal />
            </a>
          </article>

          <article className="nvidia-offer nvidia-offer--watch">
            <header>
              <span className="nvidia-offer__state">Game bundle watch</span>
              <span>India</span>
            </header>
            <h3>No active GPU game bundle confirmed this month.</h3>
            <p className="nvidia-offer__lead">NVIDIA’s latest India campaign was the 007 First Light GeForce RTX 50 Series bundle. It is no longer available, so we will not advertise an expired game code.</p>
            <dl className="nvidia-offer__facts">
              <div><dt>Purchase window closed</dt><dd>16 June 2026</dd></div>
              <div><dt>Redemption closed</dt><dd>14 July 2026</dd></div>
            </dl>
            <div className="nvidia-offer__actions">
              <a
                className="nvidia-offer__link"
                href={whatsappUrl('Hi Assembly Line, I am considering a GeForce RTX PC. Please check whether my GPU qualifies for any current NVIDIA bundle or reward.')}
                target="_blank"
                rel="noreferrer"
              >
                Check my RTX build <Arrow />
              </a>
              <a className="nvidia-offer__source" href="https://www.nvidia.com/en-in/geforce/" target="_blank" rel="noreferrer">
                NVIDIA India promotions <Arrow diagonal />
              </a>
            </div>
          </article>
        </div>

        <p className="nvidia-offers__legal">Offers are administered by NVIDIA and remain subject to regional eligibility, participating-product lists and code availability. NVIDIA, the NVIDIA logo, GeForce and GeForce RTX are trademarks or registered trademarks of NVIDIA Corporation in the United States and other countries.</p>
      </section>

      <section className="offers-page section shell">
        <div className="offer-status-card">
          <div>
            <span className="live-dot" />
            <p className="eyebrow eyebrow--compact">Assembly Line bundle check</p>
          </div>
          <h2>A bundle only counts if your exact GPU qualifies.</h2>
          <p>Send us the model you are considering. We will verify the participating SKU, purchase window, stock and redemption steps before you pay.</p>
          <a
            className="button button--primary"
            href={whatsappUrl('Hi Assembly Line, please check the current NVIDIA offers and bundle eligibility for the GPU in my build.')}
            target="_blank"
            rel="noreferrer"
          >
            Verify my GPU offer <Arrow />
          </a>
        </div>
        <div className="value-list">
          <article><span>01</span><h3>Exact product eligibility</h3><p>Series names are not enough. We confirm the specific graphics card or desktop SKU against the official partner list.</p></article>
          <article><span>02</span><h3>Redemption support</h3><p>When a code applies, we explain the NVIDIA App, account and installed-GPU requirements before you leave.</p></article>
          <article><span>03</span><h3>No expired promises</h3><p>Campaign and redemption deadlines are different. We publish both, and remove game offers when either window closes.</p></article>
        </div>
      </section>
      <ConsultationBanner />
    </>
  );
}
