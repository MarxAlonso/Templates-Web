'use client';

import React from 'react';
import styles from './nosotros.module.css';
import { AnimacionEntrada } from '@/components/AnimacionEntrada/AnimacionEntrada';
import { BandaCaracteristica } from '@/components/BandaCaracteristica/BandaCaracteristica';

export default function NosotrosPage() {
  return (
    <div className={styles.paginaNosotros}>
      <header className={styles.hero}>
        <AnimacionEntrada>
          <h1 className={styles.tituloHero}>Nuestra Historia</h1>
          <p className={styles.subtituloHero}>Inspirando y nutriendo el espíritu humano — una persona, una taza de café y una comunidad a la vez.</p>
        </AnimacionEntrada>
      </header>

      <BandaCaracteristica 
        titulo="Calidad desde el grano"
        subtitulo="Seleccionamos solo los mejores granos de café de regiones sostenibles, asegurando un tueste perfecto para cada lote."
        imagenUrl="/imagenes/cafe-premium.png"
        imagenAlt="Barista preparando café"
        colorFondo="var(--color-white)"
        colorTexto="var(--color-text-black)"
      />

      <BandaCaracteristica 
        titulo="Nuestra Comunidad"
        subtitulo="Nuestras tiendas son un tercer lugar, un ambiente acogedor fuera de casa y del trabajo donde todos son bienvenidos."
        imagenUrl="/imagenes/hero-nosotros.png"
        imagenAlt="Cafetería acogedora"
        invertido={true}
      />

      <section className={styles.valores}>
        <div className={styles.contenedorValores}>
          <h2 className={styles.tituloSeccion}>Nuestros Valores</h2>
          <div className={styles.gridValores}>
            {[
              { tit: 'Excelencia', des: 'Nos esforzamos por la perfección en cada bebida que preparamos.' },
              { tit: 'Inclusión', des: 'Creamos una cultura de pertenencia donde todos son bienvenidos.' },
              { tit: 'Sostenibilidad', des: 'Cuidamos nuestro planeta y apoyamos a las comunidades cafetaleras.' },
            ].map((valor, index) => (
              <AnimacionEntrada key={valor.tit} retraso={index * 0.2} className={styles.valor}>
                <h3 className={styles.tituloValor}>{valor.tit}</h3>
                <p className={styles.descValor}>{valor.des}</p>
              </AnimacionEntrada>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
