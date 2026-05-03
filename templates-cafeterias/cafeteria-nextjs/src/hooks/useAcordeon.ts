import { useState, useCallback } from 'react';

export const useAcordeon = (estadoInicial: boolean = false) => {
  const [estaAbierto, setEstaAbierto] = useState(estadoInicial);

  const alternar = useCallback(() => {
    setEstaAbierto((prev) => !prev);
  }, []);

  return { estaAbierto, alternar };
};
