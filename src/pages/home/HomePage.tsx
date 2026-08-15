import { lazy, Suspense } from 'react';
import { Quotes, Star } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { Arrow } from '../../components/Arrow.tsx';
import { BuildImage } from '../../components/BuildImage.tsx';
import { ConsultationBanner } from '../../components/ConsultationBanner.tsx';
import { PageMeta } from '../../components/PageMeta.tsx';
import { Reveal } from '../../components/Reveal.tsx';
import { builds, testimonials, type Build } from '../../data.ts';

const HomeMotion = lazy(() => import('../../HomeMotion.tsx'));

const methodSteps = [
  ['Listen', 'Your games, apps, monitor, room, budget and real upgrade plans go on the table.'],
  ['Explain', 'You see where the money matters, where it does not and what every trade-off changes.'],
  ['Build + stay', 'We assemble, stress-test and tune the machine, then stay available for lifetime support.'],
] as const;

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
              <span className="portal-title__line-inner">
                <span data-portal-title="your">Your</span>
                <span data-portal-title="portal">portal</span>
              </span>
            </span>
            <span className="portal-title__line portal-title__line--mixed">
              <span className="portal-title__line-inner">
                <span className="portal-title__phrase" data-portal-title="to-pc">
                  <span>to</span><span>PC</span>
                </span>
                <span data-portal-title="master">master</span>
              </span>
            </span>
            <span className="portal-title__line portal-title__line--accent">
              <span className="portal-title__line-inner" data-portal-title="race">race.</span>
            </span>
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
            {methodSteps.map(([title, copy], index) => (
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
