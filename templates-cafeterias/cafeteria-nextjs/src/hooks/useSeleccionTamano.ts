import { useState } from 'react';

export type TamanoBebida = 'Alto' | 'Grande' | 'Venti' | 'Trenta';

export const useSeleccionTamano = (tamanoInicial: TamanoBebida = 'Grande') => {
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState<TamanoBebida>(tamanoInicial);

  const seleccionarTamano = (tamano: TamanoBebida) => {
    setTamanoSeleccionado(tamano);
  };

  return {
    tamanoSeleccionado,
    seleccionarTamano
  };
};
