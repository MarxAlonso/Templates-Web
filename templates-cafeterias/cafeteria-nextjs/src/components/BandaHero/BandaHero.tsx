import React from 'react';
import styles from './BandaHero.module.css';
import { Boton } from '../Boton/Boton';
import { AnimacionEntrada } from '../AnimacionEntrada/AnimacionEntrada';

interface BandaHeroProps {
  titulo: string;
  subtitulo: string;
  textoBotonPrimario?: string;
  textoBotonSecundario?: string;
  imagenUrl: string;
  imagenAlt: string;
}

export const BandaHero: React.FC<BandaHeroProps> = ({
  titulo,
  subtitulo,
  textoBotonPrimario,
  textoBotonSecundario,
  imagenUrl,
  imagenAlt
}) => {
  return (
    <section className={styles.bandaHero}>
      <div className={styles.columnaTexto}>
        <AnimacionEntrada direccion="izquierda" retraso={0.2}>
          <h2 className={styles.titulo}>{titulo}</h2>
          <p className={styles.subtitulo}>{subtitulo}</p>
          <div className={styles.acciones}>
            {textoBotonPrimario && (
              <Boton variante="verdeInvertido">{textoBotonPrimario}</Boton>
            )}
            {textoBotonSecundario && (
              <Boton variante="blancoContornoOscuro">{textoBotonSecundario}</Boton>
            )}
          </div>
        </AnimacionEntrada>
      </div>
      <div className={styles.columnaImagen}>
        <AnimacionEntrada direccion="derecha" retraso={0.4} className={styles.wrapperImagen}>
          <img src={imagenUrl} alt={imagenAlt} className={styles.imagen} />
        </AnimacionEntrada>
      </div>
    </section>
  );
};
