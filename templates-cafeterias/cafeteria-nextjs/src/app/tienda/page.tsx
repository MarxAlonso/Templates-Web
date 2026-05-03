'use client';

import React from 'react';
import styles from './tienda.module.css';
import { AnimacionEntrada } from '@/components/AnimacionEntrada/AnimacionEntrada';
import { Tarjeta } from '@/components/Tarjeta/Tarjeta';
import { Boton } from '@/components/Boton/Boton';

export default function TiendaPage() {
  const tiendas = [
    { id: 1, nombre: 'Centro Histórico', dir: 'Av. Principal #123, Ciudad de México', tel: '55 1234 5678', horario: '7:00 AM - 10:00 PM' },
    { id: 2, nombre: 'Polanco', dir: 'Calle Lujo #45, Miguel Hidalgo', tel: '55 8765 4321', horario: '6:30 AM - 11:00 PM' },
    { id: 3, nombre: 'Santa Fe', dir: 'Centro Comercial #8, Cuajimalpa', tel: '55 4321 0987', horario: '8:00 AM - 9:00 PM' },
  ];

  return (
    <div className={styles.paginaTienda}>
      <header className={styles.hero}>
        <AnimacionEntrada>
          <h1 className={styles.tituloHero}>Encuentra tu tienda</h1>
          <div className={styles.contenedorBusqueda}>
            <input type="text" placeholder="Ingresa tu ubicación o código postal" className={styles.inputBusqueda} />
            <Boton variante="primarioRelleno">Buscar</Boton>
          </div>
        </AnimacionEntrada>
      </header>

      <div className={styles.contenido}>
        <div className={styles.listaTiendas}>
          {tiendas.map((tienda, index) => (
            <AnimacionEntrada key={tienda.id} retraso={index * 0.1}>
              <Tarjeta className={styles.tarjetaTienda}>
                <h3 className={styles.nombreTienda}>{tienda.nombre}</h3>
                <p className={styles.infoTienda}>📍 {tienda.dir}</p>
                <p className={styles.infoTienda}>📞 {tienda.tel}</p>
                <p className={styles.infoTienda}>🕒 {tienda.horario}</p>
                <div className={styles.accionesTienda}>
                  <Boton variante="primarioContorno">Cómo llegar</Boton>
                  <Boton variante="oscuroContorno">Ver más</Boton>
                </div>
              </Tarjeta>
            </AnimacionEntrada>
          ))}
        </div>
        
        <div className={styles.contenedorMapa}>
          <div className={styles.mapaPlaceholder}>
            <span className={styles.textoMapa}>Mapa Interactivo Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
}
