import React from 'react';
import Link from 'next/link';
import styles from './PieGlobal.module.css';

export const PieGlobal: React.FC = () => {
  return (
    <footer className={styles.pieGlobal}>
      <div className={styles.contenedor}>
        <div className={styles.columnas}>
          <div className={styles.columna}>
            <h3 className={styles.tituloColumna}>Sobre Nosotros</h3>
            <ul className={styles.listaEnlaces}>
              <li><Link href="/nosotros" className={styles.enlace}>Nuestra Historia</Link></li>
              <li><Link href="#" className={styles.enlace}>Sostenibilidad</Link></li>
              <li><Link href="#" className={styles.enlace}>Impacto Social</Link></li>
            </ul>
          </div>
          <div className={styles.columna}>
            <h3 className={styles.tituloColumna}>Carreras</h3>
            <ul className={styles.listaEnlaces}>
              <li><Link href="#" className={styles.enlace}>Trabaja con Nosotros</Link></li>
              <li><Link href="#" className={styles.enlace}>Oportunidades</Link></li>
              <li><Link href="#" className={styles.enlace}>Alumni</Link></li>
            </ul>
          </div>
          <div className={styles.columna}>
            <h3 className={styles.tituloColumna}>Servicio al Cliente</h3>
            <ul className={styles.listaEnlaces}>
              <li><Link href="#" className={styles.enlace}>Preguntas Frecuentes</Link></li>
              <li><Link href="#" className={styles.enlace}>Contacto</Link></li>
              <li><Link href="#" className={styles.enlace}>Tarjetas de Regalo</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.divisor}></div>
        
        <div className={styles.inferior}>
          <div className={styles.redes}>
            <a href="#" aria-label="Facebook" className={styles.iconoRed}>📱</a>
            <a href="#" aria-label="Instagram" className={styles.iconoRed}>📸</a>
            <a href="#" aria-label="Twitter" className={styles.iconoRed}>🐦</a>
          </div>
          <div className={styles.legales}>
            <p>&copy; {new Date().getFullYear()} Starbucks Style Template. Todos los derechos reservados.</p>
            <div className={styles.enlacesLegales}>
              <Link href="#" className={styles.enlaceLegal}>Política de Privacidad</Link>
              <span className={styles.separador}>|</span>
              <Link href="#" className={styles.enlaceLegal}>Términos de Uso</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
