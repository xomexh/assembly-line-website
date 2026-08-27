import {
  ArrowCounterClockwise,
  CheckCircle,
  Database,
  ImageSquare,
} from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { PageMeta } from '../../components/PageMeta.tsx';

type CategoryId = 'cabinet' | 'motherboard' | 'gpu' | 'cooler' | 'ram';
type Selection = Record<CategoryId, string>;

interface ComponentOption {
  id: string;
  name: string;
  note: string;
  image: string;
}

interface ComponentCategory {
  id: CategoryId;
  label: string;
  options: ComponentOption[];
}

const categories: ComponentCategory[] = [
  {
    id: 'cabinet',
    label: 'Cabinet',
    options: [
      {
        id: 'tag-supernova-white',
        name: 'TAG Gamerz Supernova',
        note: 'White panoramic',
        image: '/images/builds/cabinet/TAG-Gamerz-Supernova-ARGB-EATX-Mid-Tower-Cabinet-White-5.jpg',
      },
      {
        id: 'hyte-y70-black-cherry',
        name: 'HYTE Y70 Touch Infinite',
        note: 'Black Cherry',
        image: '/images/builds/cabinet/Hyte-Y70-touch-infinite-E-ATX-Mid-Tower-Cabinet-Black-Cherry.webp',
      },
      {
        id: 'tag-nebula-black',
        name: 'TAG Gamerz Nebula',
        note: 'Black mesh',
        image: '/images/builds/cabinet/TAG_Gamerz_Nebula_ATX_Mid-Tower_3_ARGB_Fans_Cabinet_Black_1.jpg',
      },
    ],
  },
  {
    id: 'motherboard',
    label: 'Motherboard',
    options: [
      {
        id: 'aorus-b650m-pro-ax',
        name: 'Gigabyte B650M Aorus Pro AX',
        note: 'Black mATX',
        image: '/images/builds/motherboard/B650M-Aorus-PRO-AX-1.jpg',
      },
      {
        id: 'rog-crosshair-dark-hero',
        name: 'ROG Crosshair VIII Dark Hero',
        note: 'Black ATX',
        image: '/images/builds/motherboard/rog-crosshair-viii-dark-hero-ima3.png',
      },
    ],
  },
  {
    id: 'gpu',
    label: 'Graphics card',
    options: [
      {
        id: 'colorful-5080-ultra',
        name: 'Colorful iGame RTX 5080 Ultra',
        note: 'Black triple-fan',
        image: '/images/builds/gpu/Colorful_iGame_GeForce_RTX_5080_Ultra_OC_16GB_V2-V_Graphics_Card_1.jpg',
      },
      {
        id: 'msi-ventus-3x',
        name: 'MSI Ventus 3X',
        note: 'Graphite triple-fan',
        image: '/images/builds/gpu/ventus3x.webp',
      },
    ],
  },
  {
    id: 'cooler',
    label: 'AIO cooler',
    options: [
      {
        id: 'dawg-l360-white',
        name: 'Dawg L360 AIO',
        note: 'White 360 mm',
        image: '/images/builds/aio:cooler/Dawg_L360AIO5_ARGB_360mm_CPU_Liquid_Cooler_White_1.jpg',
      },
      {
        id: 'deepcool-lm360-black',
        name: 'Deepcool LM360 ARGB',
        note: 'Black 360 mm',
        image: '/images/builds/aio:cooler/Deepcool-LM360-ARGB-CPU-Liquid-Cooler.jpg',
      },
    ],
  },
  {
    id: 'ram',
    label: 'Memory',
    options: [
      {
        id: 'acer-hera-silver',
        name: 'Acer Predator Hera RGB 48GB',
        note: 'Silver, 2 sticks',
        image: '/images/builds/rams/Acer-Predator-Hera-RGB-48GB-24GBx2-DDR5-CL28-6000MHz-RAM-Silver-2.jpg',
      },
      {
        id: 'gskill-trident-z5',
        name: 'G.Skill Trident Z5 CK RGB 48GB',
        note: 'Black, 2 sticks',
        image: '/images/builds/rams/G.Skill-Trident-Z5-CK-RGB-48GB-24GBx2-DDR5-8200MHz-Desktop-Ram-3.jpg',
      },
    ],
  },
];

const readySelection: Selection = {
  cabinet: 'tag-supernova-white',
  motherboard: 'aorus-b650m-pro-ax',
  gpu: 'colorful-5080-ultra',
  cooler: 'dawg-l360-white',
  ram: 'acer-hera-silver',
};

const views = [
  {
    label: 'Primary',
    description: 'Three-quarter view',
    image: '/images/builds/visualizer-poc/supernova-5080-primary-1600.webp',
  },
  {
    label: 'Wide',
    description: 'Full desk context',
    image: '/images/builds/visualizer-poc/supernova-5080-wide-1600.webp',
  },
  {
    label: 'Interior',
    description: 'Component detail',
    image: '/images/builds/visualizer-poc/supernova-5080-detail-1600.webp',
  },
];

const possibleConfigurations = categories.reduce(
  (total, category) => total * category.options.length,
  1,
);

function selectionIsReady(selection: Selection) {
  return categories.every((category) => selection[category.id] === readySelection[category.id]);
}

function configurationImage(selection: Selection) {
  const key = categories.map((category) => selection[category.id]).join('__');
  return `/images/builds/visualizer-poc/configurations/${key}-1600.webp`;
}

export function VisualizePage() {
  const [selection, setSelection] = useState<Selection>(readySelection);
  const [activeView, setActiveView] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [imageError, setImageError] = useState(false);
  const isHeroConfiguration = selectionIsReady(selection);

  const selectedComponents = useMemo(() => categories.map((category) => ({
    category: category.label,
    option: category.options.find((option) => option.id === selection[category.id])!,
  })), [selection]);

  const currentImage = isHeroConfiguration
    ? views[activeView].image
    : configurationImage(selection);
  const currentViewDescription = isHeroConfiguration
    ? views[activeView].description.toLowerCase()
    : 'generated three-quarter view';

  const chooseComponent = (category: CategoryId, option: string) => {
    if (selection[category] === option) return;

    setSelection((current) => ({ ...current, [category]: option }));
    setActiveView(0);
    setImageLoaded(false);
    setImageError(false);
  };

  const restoreReadySample = () => {
    setSelection(readySelection);
    setActiveView(0);
    setImageLoaded(false);
    setImageError(false);
  };

  return (
    <>
      <PageMeta
        title="Visualize your PC: Experimental - Assembly Line"
        description="Choose visible PC components and explore an experimental photo-real preview from Assembly Line."
      />

      <div className="visualizer-page">
        <header className="visualizer-intro shell">
          <p className="eyebrow">Experimental visualizer</p>
          <h1>Visualize your PC.</h1>
          <p>Choose visible parts and inspect a generated photo before we build it.</p>
        </header>

        <section className="visualizer-section shell" aria-labelledby="visualizer-heading">
          <div className="visualizer-section__heading">
            <div>
              <h2 id="visualizer-heading">Build the visible layer</h2>
              <p>Every supported combination is pre-generated for this proof of concept.</p>
            </div>
            <div className="visualizer-coverage" aria-label="Proof of concept coverage">
              <strong>{possibleConfigurations}</strong>
              <span>generated configurations in the current PoC catalogue</span>
            </div>
          </div>

          <div className="visualizer-workspace">
            <div className="visualizer-preview">
              <div className="visualizer-preview__status" aria-live="polite">
                <span className={`visualizer-status ${imageError ? '' : 'visualizer-status--ready'}`}>
                  {imageError ? <ImageSquare /> : <CheckCircle weight="fill" />}
                  {imageError ? 'Preview unavailable' : 'Cached preview ready'}
                </span>
                <span>{isHeroConfiguration ? '3 views, 1600px WebP' : '1 generated view, 1600px WebP'}</span>
              </div>

              <div className={`visualizer-stage ${imageError ? 'is-empty' : 'is-ready'}`}>
                {!imageError ? (
                  <>
                    {!imageLoaded && <div className="visualizer-stage__skeleton" aria-hidden="true" />}
                    <img
                      key={currentImage}
                      className={imageLoaded ? 'is-loaded' : ''}
                      src={currentImage}
                      width="1600"
                      height="1200"
                      alt={`${selectedComponents.map(({ option }) => option.name).join(', ')}, ${currentViewDescription}`}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                    />
                  </>
                ) : (
                  <div className="visualizer-empty">
                    <div className="visualizer-empty__parts" aria-hidden="true">
                      {selectedComponents.map(({ category, option }) => (
                        <div className="visualizer-empty__part" key={category}>
                          <img src={option.image} alt="" />
                        </div>
                      ))}
                    </div>
                    <div className="visualizer-empty__message">
                      <ImageSquare weight="light" aria-hidden="true" />
                      <h3>This generated preview could not be loaded.</h3>
                      <p>Reset to the reference configuration or try this selection again.</p>
                      <button className="visualizer-text-button" type="button" onClick={restoreReadySample}>
                        <ArrowCounterClockwise weight="bold" /> View reference configuration
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {isHeroConfiguration && !imageError && (
                <div className="visualizer-views" role="group" aria-label="Choose photo angle">
                  {views.map((view, index) => (
                    <button
                      className={activeView === index ? 'is-active' : ''}
                      type="button"
                      key={view.label}
                      aria-pressed={activeView === index}
                      onClick={() => {
                        if (activeView === index) return;
                        setImageLoaded(false);
                        setActiveView(index);
                      }}
                    >
                      <img src={view.image} width="160" height="120" alt="" />
                      <span><strong>{view.label}</strong><small>{view.description}</small></span>
                    </button>
                  ))}
                </div>
              )}

              <div className="visualizer-note">
                <Database weight="light" aria-hidden="true" />
                <p><strong>Photo accuracy is experimental.</strong> Component fitment and stock still need confirmation from our team.</p>
              </div>
            </div>

            <aside className="visualizer-configurator" aria-label="PC component selector">
              <div className="visualizer-configurator__header">
                <div>
                  <span>Your configuration</span>
                  <strong>{isHeroConfiguration ? 'Reference configuration' : 'Cached combination'}</strong>
                </div>
                {!isHeroConfiguration && (
                  <button type="button" onClick={restoreReadySample}>
                    <ArrowCounterClockwise weight="bold" /> Reset
                  </button>
                )}
              </div>

              <div className="visualizer-fields">
                {categories.map((category) => (
                  <fieldset key={category.id}>
                    <legend>{category.label}</legend>
                    <div className="visualizer-options">
                      {category.options.map((option) => {
                        const selected = selection[category.id] === option.id;
                        return (
                          <button
                            className={selected ? 'is-selected' : ''}
                            type="button"
                            key={option.id}
                            aria-pressed={selected}
                            onClick={() => chooseComponent(category.id, option.id)}
                          >
                            <img src={option.image} width="72" height="72" alt="" loading="lazy" />
                            <span><strong>{option.name}</strong><small>{option.note}</small></span>
                            <CheckCircle weight={selected ? 'fill' : 'regular'} aria-hidden="true" />
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}
