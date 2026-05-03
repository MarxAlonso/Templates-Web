'use client';

import React from 'react';
import styles from './recompensas.module.css';
import { AnimacionEntrada } from '@/components/AnimacionEntrada/AnimacionEntrada';
import { TarjetaRecompensa } from '@/components/TarjetaRecompensa/TarjetaRecompensa';
import { Acordeon } from '@/components/Acordeon/Acordeon';
import { Boton } from '@/components/Boton/Boton';

export default function RecompensasPage() {
  return (
    <div className={styles.paginaRecompensas}>
      <header className={styles.hero}>
        <AnimacionEntrada>
          <h1 className={styles.tituloHero}>STARBUCKS REWARDS</h1>
          <p className={styles.subtituloHero}>Café gratis es solo el comienzo.</p>
          <Boton variante="negro" className={styles.botonHero}>Únete ahora</Boton>
        </AnimacionEntrada>
      </header>

      <section className={styles.pasos}>
        <h2 className={styles.tituloSeccion}>Cómo funciona</h2>
        <div className={styles.gridPasos}>
          {[
            { num: 1, tit: 'Crea una cuenta', des: 'Regístrate en la app para empezar a acumular estrellas.' },
            { num: 2, tit: 'Pide y paga', des: 'Usa efectivo, tarjeta o carga tu Starbucks Card.' },
            { num: 3, tit: 'Gana estrellas', des: 'Canjea tus estrellas por bebidas, comida y más.' },
          ].map((paso, index) => (
            <AnimacionEntrada key={paso.num} retraso={index * 0.2} className={styles.paso}>
              <div className={styles.circuloPaso}>{paso.num}</div>
              <h3 className={styles.tituloPaso}>{paso.tit}</h3>
              <p className={styles.descPaso}>{paso.des}</p>
            </AnimacionEntrada>
          ))}
        </div>
      </section>

      <section className={styles.niveles}>
        <div className={styles.contenedorNiveles}>
          <h2 className={styles.tituloSeccion}>Tus beneficios por nivel</h2>
          <div className={styles.gridNiveles}>
            <AnimacionEntrada retraso={0.1}>
              <TarjetaRecompensa 
                nivel="Bronce" 
                estrellas="25" 
                titulo="Personaliza tu bebida" 
                descripcion="Añade un shot extra de espresso, jarabe o sustituto de leche gratis."
                colorAcento="#CD7F32"
              />
            </AnimacionEntrada>
            <AnimacionEntrada retraso={0.3}>
              <TarjetaRecompensa 
                nivel="Plata" 
                estrellas="100" 
                titulo="Bebida o Comida" 
                descripcion="Canjea por un café del día, té caliente o una pieza de panadería."
                colorAcento="#C0C0C0"
              />
            </AnimacionEntrada>
            <AnimacionEntrada retraso={0.5}>
              <TarjetaRecompensa 
                nivel="Oro" 
                estrellas="200" 
                titulo="Bebida Preparada" 
                descripcion="Canjea por cualquier bebida preparada a mano o sandwich de desayuno."
                colorAcento="#D4AF37"
              />
            </AnimacionEntrada>
          </div>
        </div>
      </section>

      <section className={styles.preguntas}>
        <div className={styles.contenedorFaq}>
          <h2 className={styles.tituloSeccion}>Preguntas frecuentes</h2>
          <Acordeon 
            pregunta="¿Cómo acumulo estrellas?" 
            respuesta="Escanea el código QR de tu app al pagar en tienda o realiza pedidos directamente desde la aplicación para acumular estrellas automáticamente." 
          />
          <Acordeon 
            pregunta="¿Las estrellas caducan?" 
            respuesta="Sí, las estrellas caducan a los 6 meses de haber sido obtenidas si no se han utilizado. ¡No dejes que se pierdan!" 
          />
          <Acordeon 
            pregunta="¿Puedo usar mis recompensas en cualquier tienda?" 
            respuesta="La mayoría de nuestras tiendas participan en el programa Rewards, aunque algunas tiendas en aeropuertos o campus pueden tener restricciones." 
          />
        </div>
      </section>
    </div>
  );
}
