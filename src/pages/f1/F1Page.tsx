import { lazy, Suspense, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  DesktopTower,
  Gauge,
  Monitor,
  SteeringWheel,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../../components/PageMeta.tsx';
import './f1.css';

const F1Motion = lazy(() => import('./F1Motion.tsx'));

type Tier = {
  id: 'rookie' | 'competizione' | 'corsa';
  name: string;
  level: string;
  statement: string;
  description: string;
  target: string;
  items: Array<{
    icon: typeof DesktopTower;
    name: string;
    detail: string;
  }>;
};

const tiers: Tier[] = [
  {
    id: 'rookie',
    name: 'Rookie',
    level: 'First lap',
    statement: 'A focused way into sim racing.',
    description: 'A purpose-built PC and responsive display give new racers everything they need to find their line.',
    target: 'PC component list ready for your final specification',
    items: [
      {
        icon: DesktopTower,
        name: 'Race-ready PC',
        detail: 'Final CPU and GPU specification reserved',
      },
      {
        icon: Monitor,
        name: 'Gaming monitor',
        detail: 'A high-refresh display selected around the PC',
      },
      {
        icon: Gauge,
        name: 'Flexible control',
        detail: 'Controller, keyboard, or your own wheel setup',
      },
    ],
  },
  {
    id: 'competizione',
    name: 'Competizione',
    level: 'Race pace',
    statement: 'More feedback. More commitment.',
    description: 'A stronger PC and display meet a complete Logitech control set for a tactile racing experience.',
    target: 'Balanced for sustained high-refresh racing',
    items: [
      {
        icon: DesktopTower,
        name: 'Performance PC',
        detail: 'Upgraded component specification reserved',
      },
      {
        icon: Monitor,
        name: 'Upgraded display',
        detail: 'More screen, faster response, deeper immersion',
      },
      {
        icon: SteeringWheel,
        name: 'Logitech G29',
        detail: 'Force-feedback wheel with paddle shifters',
      },
      {
        icon: Gauge,
        name: 'Three-pedal set',
        detail: 'Throttle, brake, and clutch included',
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
    items: [
      {
        icon: DesktopTower,
        name: 'Flagship PC',
        detail: 'Final 4K component specification reserved',
      },
      {
        icon: Monitor,
        name: 'Odyssey OLED G9',
        detail: '49-inch, 32:9, 5120 x 1440, up to 240 Hz',
      },
      {
        icon: SteeringWheel,
        name: 'Ferrari SF1000',
        detail: 'Formula wheel on the compatible T300RS GT base',
      },
      {
        icon: Gauge,
        name: 'T300RS GT base',
        detail: '25 W brushless dual-belt force feedback',
      },
      {
        icon: Gauge,
        name: 'T3PA-GT pedals',
        detail: 'Included three-pedal set with metal pedal heads',
      },
      {
        icon: Check,
        name: 'ClubSport GT cockpit',
        detail: 'Fixed seating position with monitor stand',
      },
    ],
  },
];

const hardware = [
  {
    role: 'Display',
    name: 'Odyssey OLED G9',
    type: 'Samsung 49-inch display',
    image: '/images/f1/g9-odessy-wo-bg.png',
    width: 1164,
    height: 776,
    alt: 'Samsung Odyssey OLED G9 ultrawide monitor',
    stats: ['5120 x 1440 DQHD', '32:9 OLED', 'Up to 240 Hz', '0.03 ms GtG'],
    href: 'https://www.samsung.com/in/monitors/gaming/odyssey-oled-g9-g93sd-49-inch-oled-dual-qhd-ls49dg930swxxl/',
  },
  {
    role: 'Control',
    name: 'Ferrari SF1000',
    type: 'Thrustmaster Formula wheel',
    image: '/images/f1/thrustmaster-sf1000.png',
    width: 600,
    height: 600,
    alt: 'Thrustmaster Ferrari SF1000 Formula wheel',
    stats: ['4.3-inch display', 'Carbon faceplate', '25 action buttons', 'Magnetic paddles'],
    href: 'https://vishalperipherals.com/products/formulawheel-add-on-ferrari-sf1000-edition?variant=49231172534587',
  },
  {
    role: 'Base + pedals',
    name: 'T300RS GT Edition',
    type: 'Thrustmaster force-feedback racing set',
    image: '/images/f1/thrustmaster-t300rs-gt.webp',
    width: 1280,
    height: 1280,
    alt: 'Thrustmaster T300RS GT Edition racing wheel base, wheel rim and T3PA-GT three-pedal set',
    stats: ['25 W brushless motor', 'Dual-belt force feedback', 'T3PA-GT 3-pedal set', 'PC / PS5 / PS4'],
    href: 'https://www.thrustmaster.com/en-us/products/t300rs-gt-edition/',
  },
  {
    role: 'Chassis',
    name: 'ClubSport GT',
    type: 'Fanatec cockpit and stand',
    image: '/images/f1/fanatec-cockpit-stand-optimized.webp',
    width: 860,
    height: 860,
    alt: 'White Fanatec ClubSport GT racing cockpit with monitor stand',
    stats: ['Rigid cockpit frame', 'Integrated seat', 'Monitor stand', 'Adjustable driving position'],
    href: 'https://vishalperipherals.com/collections/simulators-cockpits-accessories/products/fanatec-clubsport-cockpit-monitor-stand-crd-9060002-ww-white',
  },
] as const;

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

function TierSelector() {
  const [activeId, setActiveId] = useState<Tier['id']>('rookie');

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
              onClick={() => setActiveId(tier.id)}
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

              <div className="f1-tier__items">
                {tier.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div className="f1-tier-item" key={item.name}>
                      <Icon aria-hidden="true" weight="regular" />
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.detail}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function F1Page() {
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
            <TierSelector />
          </div>
        </section>

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
                  <strong>Display chosen around your preferred field of view.</strong>
                </div>
                <div>
                  <span>Control</span>
                  <strong>Feedback matched to the way you drive.</strong>
                </div>
                <div>
                  <span>Position</span>
                  <strong>Seat, wheel and pedals aligned as one.</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="f1-hardware" id="hardware" aria-labelledby="f1-hardware-title">
          <div className="f1-shell">
            <div className="f1-hardware__heading" data-f1-reveal>
              <h2 id="f1-hardware-title">
                One rig.
                <span className="f1-inline-wheel" aria-hidden="true">
                  <img src="/images/f1/thrustmaster-sf1000.png" alt="" />
                </span>
                No weak links.
              </h2>
              <p>PC, display and controls are specified together so latency, feedback and ergonomics feel coherent.</p>
            </div>

            <div className="f1-hardware-grid">
              {hardware.map((item, index) => (
                <article className={`f1-hardware-card f1-hardware-card--${index + 1}`} key={item.name}>
                  <div className="f1-hardware-card__media">
                    <span className="f1-hardware-card__role">{item.role}</span>
                    <img
                      src={item.image}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="f1-hardware-card__content">
                    <p>{item.type}</p>
                    <h3>{item.name}</h3>
                    <div className="f1-hardware-card__stats">
                      {item.stats.map((stat) => <span key={stat}>{stat}</span>)}
                    </div>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      Product details <ArrowUpRight weight="bold" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <p className="f1-compatibility-note" data-f1-reveal>
              The Ferrari SF1000 mounts directly to the T300RS GT base through its native screw quick-release system. The T300RS GT set also includes the T3PA-GT three-pedal set; fit the SF1000 in place of the supplied GT rim.
            </p>
          </div>
        </section>

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
