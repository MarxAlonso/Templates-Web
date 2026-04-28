import { useState, useCallback } from 'react';

export const useAlternarMenu = (estadoInicial: boolean = false) => {
  const [estaAbierto, setEstaAbierto] = useState(estadoInicial);

  const alternar = useCallback(() => {
    setEstaAbierto(prev => !prev);
  }, []);

  const abrir = useCallback(() => setEstaAbierto(true), []);
  const cerrar = useCallback(() => setEstaAbierto(false), []);

  return {
    estaAbierto,
    alternar,
    abrir,
    cerrar
  };
};
