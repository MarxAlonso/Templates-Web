'use client';

import React from 'react';
import styles from './tienda.module.css';
import { AnimacionEntrada } from '@/components/AnimacionEntrada/AnimacionEntrada';
import { Tarjeta } from '@/components/Tarjeta/Tarjeta';
import { Boton } from '@/components/Boton/Boton';
import { MapPin, Phone, Clock, Search, Navigation } from 'lucide-react';

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
            <div className={styles.inputWrapper}>
              <Search className={styles.iconoBusqueda} size={20} />
              <input type="text" placeholder="Ingresa tu ciudad, dirección o código postal" className={styles.inputBusqueda} />
            </div>
            <Boton variante="primarioRelleno">Buscar tiendas</Boton>
          </div>
        </AnimacionEntrada>
      </header>

      <div className={styles.contenido}>
        <div className={styles.listaTiendas}>
          {tiendas.map((tienda, index) => (
            <AnimacionEntrada key={tienda.id} retraso={index * 0.1}>
              <Tarjeta className={styles.tarjetaTienda}>
                <h3 className={styles.nombreTienda}>{tienda.nombre}</h3>
                <div className={styles.infoLinea}>
                  <MapPin size={16} className={styles.iconoInfo} />
                  <p className={styles.infoTienda}>{tienda.dir}</p>
                </div>
                <div className={styles.infoLinea}>
                  <Phone size={16} className={styles.iconoInfo} />
                  <p className={styles.infoTienda}>{tienda.tel}</p>
                </div>
                <div className={styles.infoLinea}>
                  <Clock size={16} className={styles.iconoInfo} />
                  <p className={styles.infoTienda}>{tienda.horario}</p>
                </div>
                <div className={styles.accionesTienda}>
                  <Boton variante="primarioContorno">
                    <Navigation size={14} style={{ marginRight: '6px' }} />
                    Cómo llegar
                  </Boton>
                  <Boton variante="oscuroContorno">Detalles</Boton>
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
