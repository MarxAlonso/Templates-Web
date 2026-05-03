'use client';

import React from 'react';
import styles from './BandaCaracteristica.module.css';
import { Boton } from '../Boton/Boton';
import { AnimacionEntrada } from '../AnimacionEntrada/AnimacionEntrada';

interface BandaCaracteristicaProps {
  titulo: string;
  subtitulo: string;
  textoBoton?: string;
  enlaceBoton?: string;
  imagenUrl: string;
  imagenAlt: string;
  invertido?: boolean;
  colorFondo?: string;
  colorTexto?: string;
}

export const BandaCaracteristica: React.FC<BandaCaracteristicaProps> = ({
  titulo,
  subtitulo,
  textoBoton,
  enlaceBoton = '#',
  imagenUrl,
  imagenAlt,
  invertido = false,
  colorFondo = 'var(--color-house-green)',
  colorTexto = 'var(--color-white)'
}) => {
  return (
    <section 
      className={`${styles.banda} ${invertido ? styles.invertido : ''}`}
      style={{ backgroundColor: colorFondo, color: colorTexto }}
    >
      <div className={styles.columnaTexto}>
        <AnimacionEntrada direccion={invertido ? 'derecha' : 'izquierda'}>
          <h2 className={styles.titulo} style={{ color: colorTexto }}>{titulo}</h2>
          <p className={styles.subtitulo}>{subtitulo}</p>
          {textoBoton && (
            <Boton variante="verdeInvertido">{textoBoton}</Boton>
          )}
        </AnimacionEntrada>
      </div>
      <div className={styles.columnaImagen}>
        <img src={imagenUrl} alt={imagenAlt} className={styles.imagen} />
      </div>
    </section>
  );
};
