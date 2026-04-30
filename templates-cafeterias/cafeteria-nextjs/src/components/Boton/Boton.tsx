import React from 'react';
import styles from './Boton.module.css';

export type VariantesBoton = 
  | 'primarioRelleno'
  | 'primarioContorno'
  | 'negro'
  | 'oscuroContorno'
  | 'verdeInvertido'
  | 'blancoContornoOscuro'
  | 'consentimiento';

export interface BotonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: VariantesBoton;
  children: React.ReactNode;
}

export const Boton: React.FC<BotonProps> = ({ 
  variante = 'primarioRelleno', 
  children, 
  className = '', 
  ...props 
}) => {
  const claseVariante = styles[variante] || styles.primarioRelleno;

  return (
    <button 
      className={`${styles.boton} ${claseVariante} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};
