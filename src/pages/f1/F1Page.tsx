import { lazy, Suspense, useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Gauge,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../../components/PageMeta.tsx';
import './f1.css';

const F1Motion = lazy(() => import('./F1Motion.tsx'));

type TierId = 'rookie' | 'competizione' | 'corsa';

type PcPart = {
  category: string;
  name: string;
  price: string;
};

type TierProduct = {
  role: string;
  name: string;
  detail: string;
  price: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  href: string;
  className?: string;
};

type Tier = {
  id: TierId;
  name: string;
  level: string;
  statement: string;
  description: string;
  target: string;
  packagePrice: string;
  pcTotal: string;
  parts: PcPart[];
  products: TierProduct[];
  compatibilityNote?: string;
};

const tiers: Tier[] = [
  {
    id: 'rookie',
    name: 'Rookie',
    level: 'First lap',
    statement: 'A focused way into sim racing.',
    description: 'A purpose-built PC and responsive display give new racers everything they need to find their line.',
    target: 'WQHD racing on a responsive 27-inch curved display',
    packagePrice: '₹1,69,990',
    pcTotal: '₹1,50,963',
    parts: [
      { category: 'CPU', name: 'AMD Ryzen 5 7500F', price: '₹14,396' },
      { category: 'Motherboard', name: 'MSI B650M GAMING WIFI6E', price: '₹10,099' },
      { category: 'GPU', name: 'MSI GeForce RTX 5060 Ti SHADOW 2X OC PLUS 8GB GDDR7', price: '₹54,280' },
      { category: 'Cabinet', name: 'Ant Esports Crystal Z3 ARGB Black', price: '₹4,366' },
      { category: 'PSU', name: 'Deepcool PN750D 750W 80+ Gold', price: '₹6,431' },
      { category: 'RAM', name: 'Patriot Viper Venom 16GB DDR5 6000MHz CL30', price: '₹27,499' },
      { category: 'SSD', name: 'Crucial P310 1TB Gen4 NVMe M.2 with Heatsink', price: '₹16,399' },
    ],
    products: [
      {
        role: 'Display',
        name: 'MSI MAG 27CQ6F',
        detail: '27-inch WQHD · 1500R curved · 180 Hz',
        price: '₹15,000',
        image: '/images/f1/msi-mag-27cq6f.webp',
        width: 1000,
        height: 800,
        alt: 'MSI MAG 27CQ6F 27-inch curved gaming monitor',
        href: 'https://www.msi.com/Monitor/MAG-27CQ6F',
        className: 'f1-tier-product--monitor-27',
      },
    ],
  },
  {
    id: 'competizione',
    name: 'Competizione',
    level: 'Race pace',
    statement: 'More feedback. More commitment.',
    description: 'A stronger PC and display meet a complete Logitech control set for a tactile racing experience.',
    target: 'Ultrawide 200 Hz racing with wheel-and-pedal control',
    packagePrice: '₹2,99,990',
    pcTotal: '₹2,36,493',
    parts: [
      { category: 'CPU', name: 'AMD Ryzen 7 7700X OEM', price: '₹21,476' },
      { category: 'Motherboard', name: 'MSI B650 GAMING PLUS WIFI', price: '₹16,048' },
      { category: 'GPU', name: 'SAPPHIRE Pure Radeon RX 9070 XT 16GB GDDR6', price: '₹84,370' },
      { category: 'Cabinet', name: 'Lian Li Lancool 217 INF Black', price: '₹11,208' },
      { category: 'PSU', name: 'Deepcool PN850M 850W 80+ Gold', price: '₹8,614' },
      { category: 'RAM', name: 'Crucial Pro Overclocking 32GB (16GBx2) DDR5 6000MHz CL36 White', price: '₹54,999' },
      { category: 'SSD', name: 'Crucial P310 1TB Gen4 NVMe M.2 with Heatsink', price: '₹16,399' },
    ],
    products: [
      {
        role: 'Display',
        name: 'MSI MAG 345CQRF E20',
        detail: '34-inch UWQHD · 1000R curved · 200 Hz',
        price: '₹28,000',
        image: '/images/f1/msi-mag-345cqrf-e20.webp',
        width: 1000,
        height: 800,
        alt: 'MSI MAG 345CQRF E20 34-inch ultrawide curved gaming monitor',
        href: 'https://www.msi.com/Monitor/MAG-345CQRF-E20',
        className: 'f1-tier-product--monitor-34',
      },
      {
        role: 'Control',
        name: 'Logitech G29',
        detail: 'Dual-motor force feedback · wheel and three pedals',
        price: '₹29,000',
        image: '/images/f1/logitech-g29.png',
        width: 1088,
        height: 932,
        alt: 'Logitech G29 force-feedback racing wheel and three-pedal set',
        href: 'https://www.logitechg.com/en-in/products/driving/driving-force-racing-wheel.html',
        className: 'f1-tier-product--g29',
      },
    ],
  },
  {
    id: 'corsa',
    name: 'Corsa',
    level: 'Elite line',
    statement: 'Every input. Every kerb. Every tenth.',
    description: 'The flagship system targets native 4K at 60 FPS with Formula control and a full cockpit.',
    target: 'Native 4K at 60 FPS performance target',
    packagePrice: '₹5,99,990',
    pcTotal: '₹3,64,812',
    parts: [
      { category: 'CPU', name: 'AMD Ryzen 7 9800X3D OEM', price: '₹43,070' },
      { category: 'Motherboard', name: 'MSI MAG X870E GAMING MAX WIFI7', price: '₹22,420' },
      { category: 'GPU', name: 'COLORFUL iGame GeForce RTX 5080 Vulcan OC 16GB-V GDDR7', price: '₹1,71,100' },
      { category: 'Cabinet', name: 'Lian Li Lancool 217 INF Black', price: '₹11,208' },
      { category: 'PSU', name: 'Deepcool PX1000P 1000W 80+ Platinum', price: '₹15,945' },
      { category: 'RAM', name: 'Crucial Pro Overclocking 32GB (16GBx2) DDR5 6000MHz CL36 White', price: '₹54,999' },
      { category: 'SSD', name: 'Crucial P310 1TB Gen4 NVMe M.2 with Heatsink', price: '₹16,399' },
    ],
    products: [
      {
        role: 'Display',
        name: 'Odyssey OLED G9',
        detail: '49-inch DQHD · 32:9 OLED · up to 240 Hz',
        price: '₹95,000',
        image: '/images/f1/g9-odessy-wo-bg.png',
        width: 1164,
        height: 776,
        alt: 'Samsung Odyssey OLED G9 ultrawide monitor',
        href: 'https://www.samsung.com/in/monitors/gaming/odyssey-oled-g9-g93sd-49-inch-oled-dual-qhd-ls49dg930swxxl/',
        className: 'f1-tier-product--g9',
      },
      {
        role: 'Formula control',
        name: 'Ferrari SF1000',
        detail: 'Carbon faceplate · 4.3-inch display · magnetic paddles',
        price: '₹43,000',
        image: '/images/f1/thrustmaster-sf1000.png',
        width: 600,
        height: 600,
        alt: 'Thrustmaster Ferrari SF1000 Formula wheel',
        href: 'https://vishalperipherals.com/products/formulawheel-add-on-ferrari-sf1000-edition?variant=49231172534587',
        className: 'f1-tier-product--sf1000',
      },
      {
        role: 'Base + pedals',
        name: 'T300RS GT Edition',
        detail: '25 W brushless dual-belt feedback · T3PA-GT pedals',
        price: '₹40,000',
        image: '/images/f1/thrustmaster-t300rs-gt.webp',
        width: 1280,
        height: 1280,
        alt: 'Thrustmaster T300RS GT Edition wheel base and T3PA-GT pedal set',
        href: 'https://www.thrustmaster.com/en-us/products/t300rs-gt-edition/',
        className: 'f1-tier-product--t300',
      },
      {
        role: 'Cockpit',
        name: 'ClubSport GT cockpit',
        detail: 'Rigid driving position · integrated seat and monitor stand',
        price: '₹49,500',
        image: '/images/f1/fanatec-cockpit-stand-optimized.webp',
        width: 860,
        height: 860,
        alt: 'White Fanatec ClubSport GT racing cockpit with monitor stand',
        href: 'https://vishalperipherals.com/collections/simulators-cockpits-accessories/products/fanatec-clubsport-cockpit-monitor-stand-crd-9060002-ww-white',
        className: 'f1-tier-product--cockpit',
      },
    ],
    compatibilityNote: 'The Ferrari SF1000 mounts directly to the T300RS GT base through its native screw quick-release system. The T300RS GT set includes the T3PA-GT three-pedal set; fit the SF1000 in place of the supplied GT rim.',
  },
];

const games = [
  {
    name: 'F1 25',
    image: '/images/f1/f1-25-logo.png',
    className: 'f1-game-card--f125',
    mode: 'Formula racing',
    description: 'Precision circuits and split-second inputs.',
  },
  {
    name: 'Assetto Corsa',
    image: '/images/f1/assetto-corsa-seeklogo.png',
    className: 'f1-game-card--assetto',
    mode: 'Track simulation',
    description: 'Physics-first handling and focused track work.',
  },
  {
    name: 'Forza Horizon',
    image: '/images/f1/forza-horizon-logo.svg',
    className: 'f1-game-card--forza',
    mode: 'Open-road racing',
    description: 'Fast road cars and wide-open environments.',
  },
] as const;

const immersionWords = 'The rig disappears. The drive takes over.'.split(' ');

function F1Nav() {
  return (
    <header className="f1-nav">
      <Link className="f1-brand" to="/" aria-label="Assembly Line home">
        <img src="/asl-logo.png" alt="" width="1573" height="1920" />
        <span>Assembly Line</span>
      </Link>
      <nav className="f1-nav__links" aria-label="Sim racing navigation">
        <a href="#setups">The rigs</a>
        <a href="#hardware">Hardware</a>
      </nav>
      <Link className="f1-button f1-button--small" to="/start">
        Build yours <ArrowRight weight="bold" />
      </Link>
    </header>
  );
}

function TierSelector({ activeId, onSelect }: { activeId: TierId; onSelect: (id: TierId) => void }) {
  return (
    <div className="f1-tier-accordion" data-f1-reveal>
      {tiers.map((tier, index) => {
        const isActive = tier.id === activeId;

        return (
          <article
            key={tier.id}
            className={`f1-tier f1-tier--${tier.id}${isActive ? ' is-active' : ''}`}
          >
            <button
              type="button"
              className="f1-tier__trigger"
              aria-expanded={isActive}
              aria-controls={`tier-content-${tier.id}`}
              onClick={() => onSelect(tier.id)}
            >
              <span className="f1-tier__number">0{index + 1}</span>
              <span className="f1-tier__trigger-copy">
                <small>{tier.level}</small>
                <strong>{tier.name}</strong>
              </span>
              <ArrowRight aria-hidden="true" weight="bold" />
            </button>

            <div
              id={`tier-content-${tier.id}`}
              className="f1-tier__content"
              hidden={!isActive}
            >
              <div className="f1-tier__heading">
                <h3>{tier.statement}</h3>
                <p>{tier.description}</p>
              </div>

              <strong className="f1-tier__target">
                <Gauge aria-hidden="true" weight="regular" />
                {tier.target}
              </strong>

              <div className="f1-tier__price">
                <span>Complete rig</span>
                <strong>{tier.packagePrice}</strong>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function TierConfiguration({ tier }: { tier: Tier }) {
  return (
    <section
      className={`f1-tier-config f1-tier-config--${tier.id}`}
      id="hardware"
      aria-labelledby={`f1-tier-config-title-${tier.id}`}
    >
      <header className="f1-tier-config__header" data-f1-reveal>
        <div>
          <p>{tier.name} hardware</p>
          <h3 id={`f1-tier-config-title-${tier.id}`}>See the setup first.</h3>
        </div>
        <div className="f1-tier-config__headline-price" aria-live="polite">
          <span>Complete rig</span>
          <strong>{tier.packagePrice}</strong>
          <small>Configured selling price</small>
        </div>
      </header>

      <div className={`f1-tier-products f1-tier-products--${tier.id}`} data-f1-reveal>
        {tier.products.map((product) => (
          <article
            className={`f1-tier-product${product.className ? ` ${product.className}` : ''}`}
            key={product.name}
          >
            <div className="f1-tier-product__media">
              <span>{product.role}</span>
              <img
                src={product.image}
                alt={product.alt}
                width={product.width}
                height={product.height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="f1-tier-product__copy">
              <div>
                <h4>{product.name}</h4>
                <p>{product.detail}</p>
              </div>
              <strong>{product.price}</strong>
              <a href={product.href} target="_blank" rel="noreferrer" aria-label={`${product.name} product details`}>
                <ArrowUpRight weight="bold" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {tier.compatibilityNote && (
        <p className="f1-compatibility-note">{tier.compatibilityNote}</p>
      )}

      <section className="f1-build-sheet" aria-labelledby={`f1-build-sheet-title-${tier.id}`} data-f1-reveal>
        <header className="f1-build-sheet__header">
          <p>PC configuration</p>
          <h3 id={`f1-build-sheet-title-${tier.id}`}>Under the skin.</h3>
          <span>The complete specification inside the {tier.name} PC.</span>
        </header>

        <div className="f1-build-sheet__layout">
          <div className="f1-build-parts" role="list" aria-label={`${tier.name} PC components`}>
            {tier.parts.map((part) => (
              <div className="f1-build-part" role="listitem" key={part.category}>
                <span>{part.category}</span>
                <strong>{part.name}</strong>
              </div>
            ))}
          </div>

          <aside className="f1-build-summary" aria-label={`${tier.name} pricing summary`}>
            <div className="f1-build-summary__section">
              <h4>Package breakdown</h4>
              <dl>
                <div className="is-pc-cost">
                  <dt>{tier.name} PC</dt>
                  <dd>{tier.pcTotal}</dd>
                </div>
                {tier.products.map((product) => (
                  <div key={product.name}>
                    <dt>{product.name}</dt>
                    <dd>{product.price}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="f1-build-summary__rig-total">
              <span>{tier.name} rig</span>
              <strong>{tier.packagePrice}</strong>
            </div>
          </aside>
        </div>
      </section>
    </section>
  );
}

export function F1Page() {
  const [activeTierId, setActiveTierId] = useState<TierId>('rookie');
  const activeTier = tiers.find((tier) => tier.id === activeTierId) ?? tiers[0];

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    return () => window.cancelAnimationFrame(frame);
  }, [activeTierId]);

  return (
    <div className="f1-page">
      <PageMeta
        title="Sim Racing Rigs | Assembly Line"
        description="Purpose-built sim racing PCs, wheel systems, displays and cockpits tuned as one complete driving experience."
      />
      <Suspense fallback={null}><F1Motion /></Suspense>
      <svg className="f1-filter-defs" aria-hidden="true">
        <defs>
          <filter id="f1-assetto-dark-logo" colorInterpolationFilters="sRGB">
            <feFlood floodColor="#f3f1ea" result="assettoWhite" />
            <feComposite in="assettoWhite" in2="SourceAlpha" operator="in" result="assettoWhiteLogo" />
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      1 -1 -0.2 0 0"
              result="assettoRedDifference"
            />
            <feComponentTransfer in="assettoRedDifference" result="assettoRedMask">
              <feFuncA type="discrete" tableValues="0 1" />
            </feComponentTransfer>
            <feComposite in="assettoRedMask" in2="SourceAlpha" operator="in" result="assettoRedAlpha" />
            <feFlood floodColor="#e30613" result="assettoRed" />
            <feComposite in="assettoRed" in2="assettoRedAlpha" operator="in" result="assettoRedLogo" />
            <feMerge>
              <feMergeNode in="assettoWhiteLogo" />
              <feMergeNode in="assettoRedLogo" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <a className="f1-skip" href="#sim-main">Skip to content</a>
      <F1Nav />

      <main id="sim-main">
        <section className="f1-hero" aria-labelledby="f1-hero-title">
          <div className="f1-hero__media" aria-hidden="true">
            <img
              src="/images/f1/sim-rig-hero.webp"
              width="1672"
              height="941"
              alt=""
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="f1-hero__shade" aria-hidden="true" />
          <div className="f1-hero__speedbeam" aria-hidden="true" />

          <div className="f1-shell f1-hero__content">
            <div className="f1-hero__copy">
              <p className="f1-eyebrow" data-f1-intro>Assembly Line Sim Racing</p>
              <h1 id="f1-hero-title">
                <span className="f1-line-mask"><span data-f1-line>Drive beyond</span></span>
                <span className="f1-line-mask"><span data-f1-line>the screen.</span></span>
              </h1>
              <p className="f1-hero__lede" data-f1-intro>
                Purpose-built PCs, force-feedback control and full cockpit systems tuned as one.
              </p>
              <div className="f1-hero__actions" data-f1-intro>
                <a className="f1-button" href="#setups">
                  Compare the rigs <ArrowRight weight="bold" />
                </a>
                <a className="f1-text-link" href="#hardware">
                  See the hardware <ArrowUpRight weight="bold" />
                </a>
              </div>
            </div>
          </div>

          <p className="f1-hero__side-note" aria-hidden="true">PC / DISPLAY / CONTROL / COCKPIT</p>
        </section>

        <section className="f1-games" aria-labelledby="f1-games-title">
          <div className="f1-shell">
            <div className="f1-games__heading" data-f1-reveal>
              <p>Game ready</p>
              <h2 id="f1-games-title">One rig. Three ways to race.</h2>
              <span>Built around the titles you actually want to drive.</span>
            </div>

            <div className="f1-games__grid" data-f1-reveal>
              {games.map((game) => (
                <article className={`f1-game-card ${game.className}`} key={game.name}>
                  <div className="f1-game-card__logo">
                    <img src={game.image} alt={`${game.name} logo`} loading="lazy" decoding="async" />
                  </div>
                  <div className="f1-game-card__copy">
                    <strong>{game.mode}</strong>
                    <p>{game.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="f1-setups" id="setups" aria-labelledby="f1-setups-title">
          <div className="f1-shell">
            <div className="f1-section-heading" data-f1-reveal>
              <p>Three ways to race</p>
              <h2 id="f1-setups-title">Choose how deep you want to go.</h2>
            </div>
            <TierSelector activeId={activeTierId} onSelect={setActiveTierId} />
            <TierConfiguration key={activeTier.id} tier={activeTier} />
          </div>
        </section>

        {activeTierId === 'corsa' && (
          <section className="f1-feel" aria-labelledby="f1-feel-title">
            <div className="f1-feel__stage">
              <div className="f1-feel__media" aria-hidden="true">
                <img
                  src="/images/f1/driver-closeup.webp"
                  alt=""
                  width="1600"
                  height="1067"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="f1-feel__shade" aria-hidden="true" />

              <div className="f1-feel__content">
                <h2 id="f1-feel-title" aria-label="The rig disappears. The drive takes over.">
                  {immersionWords.map((word, index) => (
                    <span className="f1-feel__word" aria-hidden="true" key={`${word}-${index}`}>{word} </span>
                  ))}
                </h2>
                <div className="f1-feel__facts">
                  <div>
                    <span>Vision</span>
                    <strong>49-inch OLED fills the peripheral view.</strong>
                  </div>
                  <div>
                    <span>Control</span>
                    <strong>Formula inputs meet smooth dual-belt feedback.</strong>
                  </div>
                  <div>
                    <span>Position</span>
                    <strong>Seat, wheel and pedals lock into one driving position.</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="f1-finale" aria-labelledby="f1-finale-title">
          <div className="f1-finale__media" aria-hidden="true">
            <img src="/images/f1/sim-rig-hero.webp" alt="" width="1672" height="941" loading="lazy" decoding="async" />
          </div>
          <div className="f1-finale__shade" aria-hidden="true" />
          <div className="f1-shell f1-finale__content" data-f1-reveal>
            <p>Built around how you want to drive.</p>
            <h2 id="f1-finale-title">Build the rig you will keep coming back to.</h2>
            <Link className="f1-button" to="/start">
              Configure a rig <ArrowRight weight="bold" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="f1-footer">
        <div className="f1-shell">
          <Link className="f1-brand" to="/">
            <img src="/asl-logo.png" alt="" width="1573" height="1920" />
            <span>Assembly Line</span>
          </Link>
          <p>Game and hardware trademarks belong to their respective owners.</p>
          <span>© Assembly Line 2026</span>
        </div>
      </footer>
    </div>
  );
}
