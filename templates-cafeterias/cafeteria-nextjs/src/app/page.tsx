'use client';

import { BandaHero } from "@/components/BandaHero/BandaHero";
import { Tarjeta } from "@/components/Tarjeta/Tarjeta";
import { Boton } from "@/components/Boton/Boton";
import { BandaCaracteristica } from "@/components/BandaCaracteristica/BandaCaracteristica";
import { AnimacionEntrada } from "@/components/AnimacionEntrada/AnimacionEntrada";
import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.paginaPrincipal}>
      <BandaHero 
        titulo="EL SABOR DEL VERANO"
        subtitulo="Refréscate con nuestra nueva línea de bebidas frías. Perfecto para acompañar tus tardes de calor."
        textoBotonPrimario="Ver el menú de verano"
        textoBotonSecundario="Explorar recompensas"
        imagenUrl="/imagenes/hero-verano.png"
        imagenAlt="Bebidas refrescantes de verano"
      />

      <section className={styles.seccionTarjetas}>
        <div className={styles.contenedorRejilla}>
          <AnimacionEntrada retraso={0.1}>
            <Tarjeta padding="ninguno" className={styles.tarjeta}>
              <img src="/imagenes/cafe-premium.png" alt="Café" className={styles.imagenTarjeta} />
              <div className={styles.contenidoTarjeta}>
                <h3 className={styles.tituloTarjeta}>Café Premium</h3>
                <p className={styles.textoTarjeta}>Descubre nuestra selección de granos tostados especialmente para ti.</p>
                <Link href="/menu">
                  <Boton variante="primarioContorno">Conocer más</Boton>
                </Link>
              </div>
            </Tarjeta>
          </AnimacionEntrada>

          <AnimacionEntrada retraso={0.3}>
            <Tarjeta padding="ninguno" className={styles.tarjeta}>
              <img src="/imagenes/dulces-momentos.png" alt="Postre" className={styles.imagenTarjeta} />
              <div className={styles.contenidoTarjeta}>
                <h3 className={styles.tituloTarjeta}>Dulces Momentos</h3>
                <p className={styles.textoTarjeta}>El complemento perfecto para tu bebida favorita.</p>
                <Link href="/menu">
                  <Boton variante="primarioContorno">Ver repostería</Boton>
                </Link>
              </div>
            </Tarjeta>
          </AnimacionEntrada>
        </div>
      </section>

      <BandaCaracteristica 
        titulo="TU CAFÉ, A TU MANERA"
        subtitulo="Personaliza cada detalle de tu bebida favorita. Desde el tipo de leche hasta el nivel de dulzura."
        textoBoton="Personalizar ahora"
        imagenUrl="/imagenes/bebida-rosa.png"
        imagenAlt="Café personalizado"
        invertido={true}
      />

      <section className={styles.seccionRecompensas}>
        <div className={styles.contenedorRecompensas}>
          <AnimacionEntrada>
            <h2 className={styles.tituloSeccion}>Gana estrellas gratis</h2>
            <p className={styles.textoSeccion}>Únete a Starbucks Rewards para obtener bebidas gratis y beneficios exclusivos.</p>
            <Link href="/recompensas">
              <Boton variante="negro">Saber más</Boton>
            </Link>
          </AnimacionEntrada>
        </div>
      </section>

      <BandaCaracteristica 
        titulo="ENCUENTRA TU LUGAR"
        subtitulo="Hay una tienda cerca de ti esperando para ofrecerte el mejor café y un ambiente inigualable."
        textoBoton="Buscar tiendas"
        imagenUrl="/imagenes/hero-nosotros.png"
        imagenAlt="Interior de tienda"
        colorFondo="var(--color-green-light)"
        colorTexto="var(--color-house-green)"
      />
    </div>
  );
}
