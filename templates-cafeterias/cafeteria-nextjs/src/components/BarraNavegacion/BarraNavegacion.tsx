import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BarraNavegacion.module.css';
import { useAlternarMenu } from '@/hooks/useAlternarMenu';
import { Boton } from '../Boton/Boton';
import { motion, AnimatePresence } from 'framer-motion';

export const BarraNavegacion: React.FC = () => {
  const { estaAbierto, alternar, cerrar } = useAlternarMenu();
  const pathname = usePathname();
  const [estaArriba, setEstaArriba] = useState(true);

  useEffect(() => {
    const manejarScroll = () => {
      setEstaArriba(window.scrollY < 20);
    };
    window.addEventListener('scroll', manejarScroll);
    return () => window.removeEventListener('scroll', manejarScroll);
  }, []);

  useEffect(() => {
    cerrar();
  }, [pathname, cerrar]);

  const enlaces = [
    { nombre: 'Menú', href: '/menu' },
    { nombre: 'Recompensas', href: '/recompensas' },
    { nombre: 'Nosotros', href: '/nosotros' },
  ];

  return (
    <nav className={`${styles.navGlobal} ${!estaArriba ? styles.navScroll : ''}`}>
      <div className={styles.contenedor}>
        <div className={styles.izquierda}>
          <Link href="/" className={styles.logo}>
            ☕ STARBUCKS
          </Link>
          <div className={styles.enlacesEscritorio}>
            {enlaces.map((enlace) => (
              <Link 
                key={enlace.href} 
                href={enlace.href} 
                className={`${styles.enlace} ${pathname === enlace.href ? styles.enlaceActivo : ''}`}
              >
                {enlace.nombre}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.derecha}>
          <div className={styles.accionesEscritorio}>
            <Link href="/tienda" className={styles.enlaceTienda}>
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

      <AnimatePresence>
        {estaAbierto && (
          <motion.div 
            className={styles.menuMovil}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className={styles.enlacesMovil}>
              {enlaces.map((enlace) => (
                <Link 
                  key={enlace.href} 
                  href={enlace.href} 
                  className={`${styles.enlaceMovil} ${pathname === enlace.href ? styles.enlaceActivo : ''}`}
                >
                  {enlace.nombre}
                </Link>
              ))}
              <div className={styles.divisorMovil}></div>
              <Link href="/tienda" className={styles.enlaceMovilTienda}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Encontrar tienda
              </Link>
              <div className={styles.accionesMovil}>
                <Boton variante="oscuroContorno">Iniciar sesión</Boton>
                <Boton variante="negro">Únete ahora</Boton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
