import React from 'react';
import Link from 'next/link';
import styles from './PieGlobal.module.css';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

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
            <a href="#" className={styles.iconoRed} aria-label="Facebook"><FaFacebook size={24} /></a>
            <a href="#" className={styles.iconoRed} aria-label="Instagram"><FaInstagram size={24} /></a>
            <a href="#" className={styles.iconoRed} aria-label="Twitter"><FaTwitter size={24} /></a>
            <a href="#" className={styles.iconoRed} aria-label="Youtube"><FaYoutube size={24} /></a>
          </div>
          <div className={styles.legales}>
            <div className={styles.enlacesLegales}>
              <Link href="#" className={styles.enlaceLegal}>Privacidad</Link>
              <span className={styles.separador}>|</span>
              <Link href="#" className={styles.enlaceLegal}>Términos de uso</Link>
              <span className={styles.separador}>|</span>
              <Link href="#" className={styles.enlaceLegal}>Cookies</Link>
            </div>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Starbucks Coffee Company. Todos los derechos reservados. 
              <br />
              Este es un template de demostración para fines de diseño.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
