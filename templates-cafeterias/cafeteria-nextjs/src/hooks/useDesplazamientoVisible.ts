'use client';

import { useState, useEffect, useRef } from 'react';

export const useDesplazamientoVisible = (opciones = { threshold: 0.1, rootMargin: '0px' }) => {
  const [esVisible, setEsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEsVisible(true);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, opciones);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [opciones.threshold, opciones.rootMargin]);

  return { ref, esVisible };
};
