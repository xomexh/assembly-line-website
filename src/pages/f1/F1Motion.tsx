import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function F1Motion() {
  useGSAP(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) return;

    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

    intro
      .from('.f1-nav', { opacity: 0, y: -22, duration: 0.7 })
      .fromTo(
        '.f1-hero__media',
        { opacity: 0, clipPath: 'polygon(22% 0, 100% 0, 100% 100%, 45% 100%)', scale: 1.1 },
        { opacity: 1, clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 27% 100%)', scale: 1, duration: 1.45 },
        0.06,
      )
      .from('[data-f1-line]', {
        yPercent: 112,
        rotate: 2,
        duration: 0.95,
        stagger: 0.08,
      }, 0.15)
      .from('[data-f1-intro]', {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.09,
      }, 0.32)
      .from('.f1-hero__side-note', { opacity: 0, x: 28, duration: 0.8 }, 0.62);

    gsap.to('.f1-hero__media img', {
      yPercent: 9,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: '.f1-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });

    gsap.to('.f1-hero__copy', {
      yPercent: 24,
      opacity: 0.18,
      ease: 'none',
      scrollTrigger: {
        trigger: '.f1-hero',
        start: '55% top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });

    gsap.utils.toArray<HTMLElement>('[data-f1-reveal]').forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 42,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 86%',
          once: true,
        },
      });
    });

    const media = gsap.matchMedia();

    media.add('(min-width: 901px)', () => {
      const words = gsap.utils.toArray<HTMLElement>('.f1-feel__word');
      gsap.set(words, { opacity: 0.12 });
      gsap.set('.f1-feel__facts', { opacity: 0, y: 36 });

      const immersion = gsap.timeline({
        scrollTrigger: {
          trigger: '.f1-feel__stage',
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      immersion
        .fromTo(
          '.f1-feel__media img',
          { scale: 0.86, filter: 'saturate(0.55) brightness(0.58)' },
          { scale: 1.08, filter: 'saturate(1) brightness(0.8)', ease: 'none' },
          0,
        )
        .to(words, { opacity: 1, stagger: 0.09, ease: 'none' }, 0.08)
        .to('.f1-feel__facts', { opacity: 1, y: 0, ease: 'power2.out' }, 0.74);
    });

    media.add('(max-width: 900px)', () => {
      gsap.from('.f1-feel__word', {
        opacity: 0.12,
        stagger: 0.06,
        duration: 0.7,
        scrollTrigger: {
          trigger: '.f1-feel__content',
          start: 'top 78%',
          once: true,
        },
      });
    });

    gsap.utils.toArray<HTMLElement>('.f1-hardware-card').forEach((card) => {
      const image = card.querySelector('img');
      const content = card.querySelector('.f1-hardware-card__content');

      gsap.from(card, {
        opacity: 0,
        y: 54,
        duration: 0.95,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true,
        },
      });

      if (image) {
        gsap.fromTo(image, { scale: 0.82 }, {
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
          },
        });
      }

      if (content) {
        gsap.from(content, {
          opacity: 0,
          y: 24,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 91%',
            once: true,
          },
        });
      }
    });

    gsap.fromTo(
      '.f1-finale__media img',
      { scale: 1.16, yPercent: -5 },
      {
        scale: 1.03,
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.f1-finale',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      },
    );

    return () => media.revert();
  }, []);

  return null;
}
