import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProductMediaMotion() {
  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const mediaShells = gsap.utils.toArray<HTMLElement>('.catalog-build__media-shell');

    mediaShells.forEach((shell) => {
      const image = shell.querySelector('img');

      gsap.fromTo(
        shell,
        { opacity: 0.72, scale: 0.955, y: 28 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: shell,
            start: 'top 92%',
            end: 'top 48%',
            scrub: 0.75,
          },
        },
      );

      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.045, yPercent: -1.5 },
          {
            scale: 1,
            yPercent: 1.5,
            ease: 'none',
            scrollTrigger: {
              trigger: shell,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        );
      }
    });
  }, []);

  return null;
}
