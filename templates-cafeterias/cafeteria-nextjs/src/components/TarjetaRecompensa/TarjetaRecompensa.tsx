'use client';

import React from 'react';
import styles from './TarjetaRecompensa.module.css';
import { Tarjeta } from '../Tarjeta/Tarjeta';
import { Star } from 'lucide-react';

interface TarjetaRecompensaProps {
  nivel: string;
  estrellas: string;
  titulo: string;
  descripcion: string;
  colorAcento: string;
}

export const TarjetaRecompensa: React.FC<TarjetaRecompensaProps> = ({
  nivel,
  estrellas,
  titulo,
  descripcion,
  colorAcento
}) => {
  return (
    <Tarjeta padding="ninguno" className={styles.tarjeta}>
      <div className={styles.barraSuperior} style={{ backgroundColor: colorAcento }}></div>
      <div className={styles.contenido}>
        <div className={styles.badgeNivel}>
          <span className={styles.nivelTexto}>{nivel}</span>
        </div>
        <div className={styles.estrellasContenedor}>
          <span className={styles.estrellas}>{estrellas}</span>
          <Star className={styles.iconoEstrella} fill="currentColor" />
        </div>
        <h4 className={styles.titulo}>{titulo}</h4>
        <p className={styles.descripcion}>{descripcion}</p>
      </div>
    </Tarjeta>
  );
};
