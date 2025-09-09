import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    (element as HTMLElement).classList.add('scroll-reveal');
    observer.observe(element as Element);

    return () => {
      observer.unobserve(element as Element);
    };
  }, []);

  return elementRef;
}
