'use client';

import React from 'react';
import Link from 'next/link';
import styles from './BarraNavegacion.module.css';
import { useAlternarMenu } from '@/hooks/useAlternarMenu';
import { Boton } from '../Boton/Boton';

export const BarraNavegacion: React.FC = () => {
  const { estaAbierto, alternar } = useAlternarMenu();

  return (
    <nav className={styles.navGlobal}>
      <div className={styles.contenedor}>
        <div className={styles.izquierda}>
          <Link href="/" className={styles.logo}>
            ☕ STARBUCKS
          </Link>
          <div className={`${styles.enlaces} ${estaAbierto ? styles.menuAbierto : ''}`}>
            <Link href="/menu/producto" className={styles.enlace}>Menú</Link>
            <Link href="#" className={styles.enlace}>Recompensas</Link>
            <Link href="#" className={styles.enlace}>Tarjetas de Regalo</Link>
          </div>
        </div>
        <div className={styles.derecha}>
          <div className={styles.accionesEscritorio}>
            <Link href="#" className={styles.enlaceTienda}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Encontrar tienda
            </Link>
            <Boton variante="oscuroContorno">Iniciar sesión</Boton>
            <Boton variante="negro">Únete ahora</Boton>
          </div>
          <button className={styles.hamburguesa} onClick={alternar} aria-label="Menú">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
              {estaAbierto ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
