import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

const lines = [
  { className: '', words: ['Your', 'portal'] },
  { className: 'portal-title__line--mixed', words: ['to', 'PC', 'master'] },
  { className: 'portal-title__line--accent', words: ['race.'] },
] as const;

function TitleCopy({ echo = false }: { echo?: boolean }) {
  return (
    <span
      className={`portal-title__copy portal-title__copy--${echo ? 'echo' : 'base'}`}
      aria-hidden={echo || undefined}
    >
      {lines.map((line) => (
        <span className={`portal-title__line ${line.className}`} key={line.words.join('-')}>
          <span className="portal-title__line-inner">
            {line.words.map((word) => (
              <span className="portal-title__word" key={word}>
                {Array.from(word).map((character, characterIndex) => (
                  <span
                    className="portal-title__char"
                    key={`${character}-${characterIndex}`}
                  >
                    {character}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

export function HeroTitle() {
  const stageRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage || event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    stage.setAttribute('data-active', 'true');
    const bounds = stage.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    stage.style.setProperty('--pointer-x', `${localX}px`);
    stage.style.setProperty('--pointer-y', `${localY}px`);
    stage.style.setProperty('--echo-x', `${((localX / bounds.width) - 0.5) * 16}px`);
    stage.style.setProperty('--echo-y', `${((localY / bounds.height) - 0.5) * 10}px`);
  };

  const handlePointerLeave = () => {
    stageRef.current?.setAttribute('data-active', 'false');
  };

  return (
    <div
      className="portal-title-stage"
      data-active="false"
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={stageRef}
    >
      <h1 id="portal-title" className="portal-title" aria-label="Your portal to PC master race">
        <TitleCopy />
        <TitleCopy echo />
      </h1>
    </div>
  );
}
