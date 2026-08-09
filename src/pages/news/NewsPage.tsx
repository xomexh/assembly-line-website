import { ConsultationBanner } from '../../components/ConsultationBanner.tsx';
import { PageMeta } from '../../components/PageMeta.tsx';
import { benchNotes } from '../../data.ts';

const noteDetails = [
  'A well-balanced system keeps the graphics card fed, the thermals controlled and the power supply comfortably inside its efficient range. It also leaves enough budget for the monitor and storage that affect everyday use.',
  'Every handover should follow a repeatable check: sustained CPU and GPU load, memory stability, temperature behavior, fan noise, front-panel I/O, wireless connectivity and a final physical inspection.',
  'The useful upgrade path is specific. Choose the board features, memory capacity and power headroom your likely next component needs. Paying for every possible future is just another kind of overspending.',
];

export function NewsPage() {
  return (
    <>
      <PageMeta
        title="Bench notes - Assembly Line"
        description="Practical PC buying, building and upgrade notes from the Assembly Line workshop."
      />
      <section className="page-hero shell">
        <p className="eyebrow">Bench notes</p>
        <h1>Less launch noise.<br /><span>More useful context.</span></h1>
        <p>Short notes about buying, balancing and living with a custom PC, written by the people who assemble them.</p>
      </section>
      <section className="notes-page section shell">
        {benchNotes.map((note, index) => (
          <article className="notes-article" key={note.title}>
            <div className="notes-article__meta">
              <span>0{index + 1}</span>
              <p>{note.tag}</p>
              <small>{note.readTime}</small>
            </div>
            <div className="notes-article__body">
              <h2>{note.title}</h2>
              <p>{note.summary}</p>
              <p>{noteDetails[index]}</p>
            </div>
          </article>
        ))}
      </section>
      <ConsultationBanner />
    </>
  );
}
