import { BandaHero } from "@/components/BandaHero/BandaHero";
import { Tarjeta } from "@/components/Tarjeta/Tarjeta";
import { Boton } from "@/components/Boton/Boton";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.paginaPrincipal}>
      <BandaHero 
        titulo="EL SABOR DEL VERANO"
        subtitulo="Refréscate con nuestra nueva línea de bebidas frías. Perfecto para acompañar tus tardes de calor."
        textoBotonPrimario="Ver el menú de verano"
        textoBotonSecundario="Explorar recompensas"
        imagenUrl="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop"
        imagenAlt="Bebidas refrescantes de verano"
      />

      <section className={styles.seccionTarjetas}>
        <div className={styles.contenedorRejilla}>
          <Tarjeta>
            <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop" alt="Café" className={styles.imagenTarjeta} />
            <div className={styles.contenidoTarjeta}>
              <h3 className={styles.tituloTarjeta}>Café Premium</h3>
              <p className={styles.textoTarjeta}>Descubre nuestra selección de granos tostados especialmente para ti.</p>
              <Boton variante="primarioContorno">Conocer más</Boton>
            </div>
          </Tarjeta>

          <Tarjeta>
            <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop" alt="Postre" className={styles.imagenTarjeta} />
            <div className={styles.contenidoTarjeta}>
              <h3 className={styles.tituloTarjeta}>Dulces Momentos</h3>
              <p className={styles.textoTarjeta}>El complemento perfecto para tu bebida favorita.</p>
              <Boton variante="primarioContorno">Ver repostería</Boton>
            </div>
          </Tarjeta>
        </div>
      </section>
    </div>
  );
}
