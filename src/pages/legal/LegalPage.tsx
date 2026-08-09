import { PageMeta } from '../../components/PageMeta.tsx';
import { legalCopy, type LegalDocument } from './legalCopy.ts';

export function LegalPage({ type }: { type: LegalDocument }) {
  const content = legalCopy[type];

  return (
    <>
      <PageMeta title={`${content.title} - Assembly Line`} description={content.intro} />
      <section className="legal-page shell">
        <p className="eyebrow">Assembly Line</p>
        <h1>{content.title}</h1>
        <p className="legal-page__intro">{content.intro}</p>
        <div className="legal-page__sections">
          {content.sections.map(([title, copy]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{copy}</p>
            </section>
          ))}
        </div>
        <p className="legal-page__updated">Draft website copy · updated August 2026</p>
      </section>
    </>
  );
}
