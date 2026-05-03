'use client';

import React from 'react';
import styles from './SeccionMenu.module.css';
import { Tarjeta } from '../Tarjeta/Tarjeta';
import { Boton } from '../Boton/Boton';
import { AnimacionEntrada } from '../AnimacionEntrada/AnimacionEntrada';

interface ItemMenu {
  id: string;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  precio: string;
}

interface SeccionMenuProps {
  titulo: string;
  items: ItemMenu[];
}

export const SeccionMenu: React.FC<SeccionMenuProps> = ({ titulo, items }) => {
  return (
    <section className={styles.seccionMenu}>
      <AnimacionEntrada>
        <h2 className={styles.titulo}>{titulo}</h2>
      </AnimacionEntrada>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <AnimacionEntrada key={item.id} retraso={index * 0.1}>
            <Tarjeta padding="ninguno" className={styles.tarjetaItem}>
              <div className={styles.contenedorImagen}>
                <img src={item.imagenUrl} alt={item.nombre} className={styles.imagen} />
              </div>
              <div className={styles.contenido}>
                <h3 className={styles.nombreItem}>{item.nombre}</h3>
                <p className={styles.descripcion}>{item.descripcion}</p>
                <div className={styles.inferior}>
                  <span className={styles.precio}>{item.precio}</span>
                  <Boton variante="primarioContorno">Añadir</Boton>
                </div>
              </div>
            </Tarjeta>
          </AnimacionEntrada>
        ))}
      </div>
    </section>
  );
};
