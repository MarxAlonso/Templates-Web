'use client';

import React, { useState } from 'react';
import styles from './menu.module.css';
import { SeccionMenu } from '@/components/SeccionMenu/SeccionMenu';
import { AnimacionEntrada } from '@/components/AnimacionEntrada/AnimacionEntrada';

const CATEGORIAS = ['Bebidas', 'Repostería', 'Alimentos'];

const MENU_ITEMS = [
  {
    categoria: 'Bebidas',
    items: [
      { id: 'b1', nombre: 'Pink Energy Drink', descripcion: 'Fresa, acai y leche de coco.', precio: '$5.50', imagenUrl: '/imagenes/bebida-rosa.png' },
      { id: 'b2', nombre: 'Caramel Macchiato', descripcion: 'Espresso con vainilla y caramelo.', precio: '$4.75', imagenUrl: '/imagenes/cafe-premium.png' },
      { id: 'b3', nombre: 'Matcha Latte', descripcion: 'Té verde premium con leche vaporizada.', precio: '$5.25', imagenUrl: '/imagenes/hero-verano.png' },
    ]
  },
  {
    categoria: 'Repostería',
    items: [
      { id: 'r1', nombre: 'Croissant Clásico', descripcion: 'Mantequilla pura y capas crujientes.', precio: '$3.25', imagenUrl: '/imagenes/dulces-momentos.png' },
      { id: 'r2', nombre: 'Muffin de Arándanos', descripcion: 'Cargado de fruta y toque de limón.', precio: '$3.50', imagenUrl: '/imagenes/hero-menu.png' },
    ]
  }
];

export default function MenuPage() {
  const [filtro, setFiltro] = useState('Todas');

  return (
    <div className={styles.paginaMenu}>
      <header className={styles.hero}>
        <AnimacionEntrada>
          <h1 className={styles.tituloHero}>Nuestro Menú</h1>
          <p className={styles.subtituloHero}>Descubre sabores artesanales en cada taza.</p>
        </AnimacionEntrada>
      </header>

      <nav className={styles.filtros}>
        <button 
          className={`${styles.botonFiltro} ${filtro === 'Todas' ? styles.filtroActivo : ''}`}
          onClick={() => setFiltro('Todas')}
        >
          Todas
        </button>
        {CATEGORIAS.map(cat => (
          <button 
            key={cat}
            className={`${styles.botonFiltro} ${filtro === cat ? styles.filtroActivo : ''}`}
            onClick={() => setFiltro(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className={styles.secciones}>
        {MENU_ITEMS
          .filter(seccion => filtro === 'Todas' || seccion.categoria === filtro)
          .map(seccion => (
            <SeccionMenu key={seccion.categoria} titulo={seccion.categoria} items={seccion.items} />
          ))
        }
      </div>
    </div>
  );
}
