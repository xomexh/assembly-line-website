import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HomeMotion() {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

    intro
      .from('.portal-hero__kicker > span', {
        opacity: 0,
        y: 18,
        duration: 0.7,
        stagger: 0.08,
      })
      .from('.portal-title__line-inner', {
        yPercent: 112,
        rotate: 1.5,
        duration: 1.15,
        stagger: 0.09,
      }, 0.08)
      .from('.portal-title__window', {
        clipPath: 'inset(50% 50% 50% 50%)',
        scale: 0.78,
        duration: 1.05,
      }, 0.42)
      .from('.portal-hero__footer > *', {
        opacity: 0,
        y: 22,
        duration: 0.72,
        stagger: 0.09,
      }, 0.58);

    gsap.fromTo(
      '.portal-hero__media',
      { scale: 1.08, opacity: 0 },
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
        start: 'top 88%',
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
