'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BarraNavegacion.module.css';
import { useAlternarMenu } from '@/hooks/useAlternarMenu';
import { Boton } from '../Boton/Boton';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, MapPin, User, LogIn, Menu, X } from 'lucide-react';

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
            <Coffee className={styles.iconoLogo} />
            <span className={styles.logoTexto}>STARBUCKS</span>
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
              <MapPin size={18} />
              <span>Localizar Tienda</span>
            </Link>
            <Boton variante="oscuroContorno">
              <User size={16} style={{ marginRight: '8px' }} />
              Iniciar sesión
            </Boton>
            <Boton variante="negro">Únete ahora</Boton>
          </div>
          <button className={styles.hamburguesa} onClick={alternar} aria-label="Abrir Menú de Navegación">
            {estaAbierto ? <X size={24} /> : <Menu size={24} />}
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
                <MapPin size={20} />
                <span>Encontrar una tienda cercana</span>
              </Link>
              <div className={styles.accionesMovil}>
                <Boton variante="oscuroContorno">
                  <User size={18} style={{ marginRight: '10px' }} />
                  Acceder a mi cuenta
                </Boton>
                <Boton variante="negro">Crear cuenta Rewards</Boton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
