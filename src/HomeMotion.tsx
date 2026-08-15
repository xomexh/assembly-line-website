import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HomeMotion() {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const titleParts = {
      your: '[data-portal-title="your"]',
      portal: '[data-portal-title="portal"]',
      toPc: '[data-portal-title="to-pc"]',
      master: '[data-portal-title="master"]',
      race: '[data-portal-title="race"]',
    };
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set(titleParts.your, { autoAlpha: 0, scale: 0.94 });
    gsap.set(titleParts.portal, { autoAlpha: 0, xPercent: -48 });
    gsap.set(titleParts.toPc, { autoAlpha: 0, yPercent: -115 });
    gsap.set(titleParts.master, { autoAlpha: 0, xPercent: -42 });
    gsap.set(titleParts.race, { autoAlpha: 0, yPercent: -105 });

    intro
      .to(titleParts.your, { autoAlpha: 1, scale: 1, duration: 0.9 }, 0)
      .to(titleParts.portal, { autoAlpha: 1, xPercent: 0, duration: 0.9 }, 0)
      .to(titleParts.toPc, { autoAlpha: 1, yPercent: 0, duration: 0.9 }, 0)
      .to(titleParts.master, { autoAlpha: 1, xPercent: 0, duration: 0.9 }, 0)
      .to(titleParts.race, { autoAlpha: 1, yPercent: 0, duration: 0.9 }, 0)
      .to('.portal-hero__footer > *', {
        opacity: 1,
        y: 0,
        duration: 0.72,
        stagger: 0.09,
      }, 0.46);

    gsap.to(
      '.portal-hero__media',
      { scale: 1, opacity: 1, duration: 1.7, ease: 'power3.out' },
    );

    gsap.to('.portal-hero__media img', {
      yPercent: 9,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: '.portal-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    gsap.from('.portal-proof__item', {
      opacity: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.portal-proof',
        start: 'top 98%',
      },
    });

    const beliefWords = gsap.utils.toArray<HTMLElement>('[data-belief-word]');
    gsap.fromTo(
      beliefWords,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.portal-belief__statement',
          start: 'top 78%',
          end: 'bottom 42%',
          scrub: 0.9,
        },
      },
    );

    gsap.from('.portal-section-heading > *', {
      opacity: 0,
      y: 42,
      duration: 0.95,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.portal-section-heading',
        start: 'top 82%',
      },
    });

    gsap.utils.toArray<HTMLElement>('[data-portal-build]').forEach((card) => {
      const media = card.querySelector<HTMLElement>('.portal-build__media');
      const image = card.querySelector<HTMLImageElement>('.build-media__preview');

      gsap.fromTo(
        card,
        { opacity: 0.3, y: 48 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            end: 'top 58%',
            scrub: 0.7,
          },
        },
      );

      if (media) {
        gsap.fromTo(
          media,
          { scale: 0.88 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 94%',
              end: 'top 48%',
              scrub: 0.8,
            },
          },
        );
      }

      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.12, yPercent: -3 },
          {
            scale: 1.02,
            yPercent: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
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
