'use client';

import { BandaHero } from "@/components/BandaHero/BandaHero";
import Image from 'next/image';
import { Tarjeta } from "@/components/Tarjeta/Tarjeta";
import { Boton } from "@/components/Boton/Boton";
import { BandaCaracteristica } from "@/components/BandaCaracteristica/BandaCaracteristica";
import { AnimacionEntrada } from "@/components/AnimacionEntrada/AnimacionEntrada";
import styles from "./page.module.css";
import Link from 'next/link';
import { ShoppingBag, Star, Info, ChevronRight, MapPin } from 'lucide-react';

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
              <div className={styles.wrapperImagenTarjeta}>
                <Image 
                  src="/imagenes/cafe-premium.png" 
                  alt="Café" 
                  className={styles.imagenTarjeta} 
                  width={600} 
                  height={400} 
                />
              </div>
              <div className={styles.contenidoTarjeta}>
                <h3 className={styles.tituloTarjeta}>Café de Especialidad</h3>
                <p className={styles.textoTarjeta}>Disfruta de una selección exclusiva de granos de origen único, tostados artesanalmente para resaltar cada nota de sabor.</p>
                <Link href="/menu">
                  <Boton variante="primarioContorno">
                    Explorar selección
                    <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                  </Boton>
                </Link>
              </div>
            </Tarjeta>
          </AnimacionEntrada>

          <AnimacionEntrada retraso={0.3}>
            <Tarjeta padding="ninguno" className={styles.tarjeta}>
              <div className={styles.wrapperImagenTarjeta}>
                <Image 
                  src="/imagenes/dulces-momentos.png" 
                  alt="Postre" 
                  className={styles.imagenTarjeta} 
                  width={600} 
                  height={400} 
                />
              </div>
              <div className={styles.contenidoTarjeta}>
                <h3 className={styles.tituloTarjeta}>Momentos para Endulzar</h3>
                <p className={styles.textoTarjeta}>Acompaña tu bebida con nuestra repostería recién horneada: desde croissants de mantequilla hasta muffins artesanales.</p>
                <Link href="/menu">
                  <Boton variante="primarioContorno">
                    Ver repostería
                    <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                  </Boton>
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
            <div className={styles.badgeEstrellas}>
              <Star size={24} fill="currentColor" />
            </div>
            <h2 className={styles.tituloSeccion}>Gana estrellas con cada sorbo</h2>
            <p className={styles.textoSeccion}>Únete a Starbucks Rewards™ y descubre un mundo de beneficios: bebidas de cortesía, ofertas personalizadas y acceso anticipado a nuevos productos.</p>
            <Link href="/recompensas">
              <Boton variante="negro">
                <Star size={16} style={{ marginRight: '8px' }} />
                Conoce los beneficios
              </Boton>
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
