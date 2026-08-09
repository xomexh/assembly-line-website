import { lazy, Suspense, useState } from 'react';
import { Arrow } from '../../components/Arrow.tsx';
import { BuildImage } from '../../components/BuildImage.tsx';
import { ConsultationBanner } from '../../components/ConsultationBanner.tsx';
import { PageMeta } from '../../components/PageMeta.tsx';
import { builds, whatsappUrl } from '../../data.ts';

const ProductMediaMotion = lazy(() => import('../../ProductMediaMotion.tsx'));

export function BuildsPage() {
  const [filter, setFilter] = useState<'All' | 'Albus' | 'Onyx'>('All');
  const filteredBuilds = filter === 'All'
    ? builds
    : builds.filter((build) => build.family === filter);

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
