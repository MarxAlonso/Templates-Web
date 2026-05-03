'use client';

import { useState } from 'react';

export const useCantidad = (inicial: number = 1, min: number = 1, max: number = 99) => {
  const [cantidad, setCantidad] = useState(inicial);

  const incrementar = () => {
    setCantidad(prev => (prev < max ? prev + 1 : prev));
  };

  const decrementar = () => {
    setCantidad(prev => (prev > min ? prev - 1 : prev));
  };

  return {
    cantidad,
    incrementar,
    decrementar
  };
};
