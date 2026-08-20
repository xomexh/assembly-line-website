import { CaretUp, ChartLineUp, X } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';

export function MarketAlert() {
  const [open, setOpen] = useState(false);
  const alertRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!alertRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('pointerdown', closeOnOutsidePress);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const closeAndReturnFocus = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <aside
      ref={alertRef}
      className={`market-alert ${open ? 'is-open' : ''}`}
      aria-label="PC parts pricing alert"
    >
      <div
        id="market-alert-panel"
        className="market-alert__panel"
        aria-hidden={!open}
        aria-labelledby="market-alert-title"
      >
        <div className="market-alert__panel-header">
          <span className="market-alert__eyebrow">
            <span className="market-alert__pulse" aria-hidden="true" />
            Component price watch
          </span>
          <button
            className="market-alert__close"
            type="button"
            aria-label="Close price warning"
            onClick={closeAndReturnFocus}
          >
            <X size={15} weight="bold" aria-hidden="true" />
          </button>
        </div>
        <h2 id="market-alert-title">Part prices are rising.</h2>
        <p className="market-alert__copy">
          Waiting for a drop can backfire while stock and distributor pricing keep moving. If you plan to buy, start your brief early so we have more time to source the right parts at the right price.
        </p>
        <p className="market-alert__meta">
          <span>Live component stock</span>
          <span>Quotes updated at enquiry</span>
        </p>
      </div>

      <button
        ref={triggerRef}
        className="market-alert__trigger"
        type="button"
        aria-expanded={open}
        aria-controls="market-alert-panel"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="market-alert__trigger-icon" aria-hidden="true">
          <ChartLineUp size={19} weight="bold" />
        </span>
        <span className="market-alert__trigger-copy">
          <strong>Price watch</strong>
          <span>Parts rising</span>
        </span>
        <CaretUp className="market-alert__caret" size={14} weight="bold" aria-hidden="true" />
      </button>
    </aside>
  );
}
