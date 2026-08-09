import type { Build } from '../data.ts';

export function BuildImage({
  build,
  eager = false,
  reveal = false,
}: {
  build: Build;
  eager?: boolean;
  reveal?: boolean;
}) {
  const imageProps = {
    width: 800,
    height: 601,
    alt: `${build.name} custom PC build`,
    loading: eager ? 'eager' as const : 'lazy' as const,
    fetchPriority: eager ? 'high' as const : 'auto' as const,
    decoding: 'async' as const,
  };

  if (reveal) {
    return (
      <>
        <img className="build-media__preview" src={build.image} {...imageProps} />
        {build.imageLarge ? (
          <img
            className="build-media__detail"
            src={build.imageLarge}
            width="1600"
            height="1202"
            alt=""
            aria-hidden="true"
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'low'}
            decoding="async"
          />
        ) : null}
      </>
    );
  }

  return (
    <img
      src={build.image}
      srcSet={build.imageLarge ? `${build.image} 800w, ${build.imageLarge} 1600w` : undefined}
      sizes={eager ? '(max-width: 720px) 92vw, 52vw' : '(max-width: 720px) 92vw, 42vw'}
      {...imageProps}
    />
  );
}
