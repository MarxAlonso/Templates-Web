import React from 'react';
import Image from 'next/image';
import styles from './BandaHero.module.css';
import { Boton } from '../Boton/Boton';
import { AnimacionEntrada } from '../AnimacionEntrada/AnimacionEntrada';
import { ArrowRight, Star } from 'lucide-react';

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
              <Boton variante="verdeInvertido">
                {textoBotonPrimario}
                <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </Boton>
            )}
            {textoBotonSecundario && (
              <Boton variante="blancoContornoOscuro">
                <Star size={18} style={{ marginRight: '8px' }} />
                {textoBotonSecundario}
              </Boton>
            )}
          </div>
        </AnimacionEntrada>
      </div>
      <div className={styles.columnaImagen}>
        <AnimacionEntrada direccion="derecha" retraso={0.4} className={styles.wrapperImagen}>
          <Image 
            src={imagenUrl} 
            alt={imagenAlt} 
            className={styles.imagen} 
            width={800} 
            height={600}
            priority={true}
          />
        </AnimacionEntrada>
      </div>
    </section>
  );
};
