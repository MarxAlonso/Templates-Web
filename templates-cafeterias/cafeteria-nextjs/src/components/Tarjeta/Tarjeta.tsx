import React from 'react';
import styles from './Tarjeta.module.css';

export interface TarjetaProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'normal' | 'ninguno' | 'amplio';
}

export const Tarjeta: React.FC<TarjetaProps> = ({ 
  children, 
  className = '',
  padding = 'normal'
}) => {
  const clasePadding = 
    padding === 'ninguno' ? styles.paddingNinguno : 
    padding === 'amplio' ? styles.paddingAmplio : 
    styles.paddingNormal;

  return (
    <div className={`${styles.tarjeta} ${clasePadding} ${className}`}>
      {children}
    </div>
  );
};
