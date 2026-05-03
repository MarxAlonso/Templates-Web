'use client';

import React from 'react';
import Image from 'next/image';
import { useSeleccionTamano, TamanoBebida } from '@/hooks/useSeleccionTamano';
import { useCantidad } from '@/hooks/useCantidad';
import { Boton } from '@/components/Boton/Boton';
import styles from './producto.module.css';
import { CupSoda, Plus, Minus, Sparkles } from 'lucide-react';

export default function ProductoDetalle() {
  const { tamanoSeleccionado, seleccionarTamano } = useSeleccionTamano('Grande');
  const scoopsCantidad = useCantidad(1);

  const tamanos: { id: TamanoBebida; onzas: number }[] = [
    { id: 'Alto', onzas: 12 },
    { id: 'Grande', onzas: 16 },
    { id: 'Venti', onzas: 24 },
    { id: 'Trenta', onzas: 30 },
  ];

  return (
    <div className={styles.paginaProducto}>
      {/* Header Band */}
      <div className={styles.headerBanda}>
        <div className={styles.migaDePan}>Menú / Bebidas / Pink Energy Drink</div>
        <h1 className={styles.tituloProducto}>PINK ENERGY DRINK</h1>
      </div>

      {/* Hero Image */}
      <div className={styles.contenedorImagen}>
        <Image 
          src="/imagenes/bebida-rosa.png" 
          alt="Pink Energy Drink" 
          className={styles.imagenProducto} 
          width={600} 
          height={600}
          priority={true}
        />
      </div>

      <div className={styles.contenedorPrincipal}>
        {/* Selector de Tamaño */}
        <section className={styles.seccionOpciones}>
          <h2 className={styles.tituloSeccion}>Opciones de tamaño</h2>
          <div className={styles.selectorTamano}>
            {tamanos.map((t) => (
              <button 
                key={t.id} 
                className={`${styles.botonTamano} ${tamanoSeleccionado === t.id ? styles.tamanoActivo : ''}`}
                onClick={() => seleccionarTamano(t.id)}
              >
                <div className={styles.iconoVaso}>
                  <CupSoda size={24} />
                </div>
                <div className={styles.nombreTamano}>{t.id}</div>
                <div className={styles.onzasTamano}>{t.onzas} fl oz</div>
              </button>
            ))}
          </div>
        </section>

        {/* Customizations */}
        <section className={styles.seccionOpciones}>
          <div className={styles.filaPersonalizacion}>
            <label className={styles.labelFlotante}>Agregados</label>
            <div className={styles.controlCantidad}>
              <span className={styles.valorPersonalizacion}>Frutas rojas (Scoop)</span>
              <div className={styles.stepper}>
                <button className={styles.botonStepper} onClick={scoopsCantidad.decrementar}><Minus size={16} /></button>
                <span className={styles.valorStepper}>{scoopsCantidad.cantidad}</span>
                <button className={styles.botonStepper} onClick={scoopsCantidad.incrementar}><Plus size={16} /></button>
              </div>
            </div>
          </div>
          
          <div className={styles.accionesPedido}>
            <Boton variante="primarioContorno">
              <Sparkles size={18} style={{ marginRight: '8px' }} />
              Personalizar
            </Boton>
            <Boton variante="primarioRelleno">Añadir al pedido</Boton>
          </div>
        </section>
      </div>

      {/* Product Description Band */}
      <div className={styles.bandaDescripcion}>
        <div className={styles.contenedorDescripcion}>
          <div className={styles.pillRecompensa}>200★ artículo</div>
          <p className={styles.textoDescripcion}>Una bebida refrescante y vibrante con notas de fresa y acai, combinada con leche de coco para un sabor cremoso y tropical.</p>
          <div className={styles.nutricionBreve}>140 calorías, 25g azúcar, 2.5g grasa</div>
          <Boton variante="blancoContornoOscuro" className={styles.botonNutricion}>Lista completa de nutrición e ingredientes</Boton>
        </div>
      </div>
    </div>
  );
}
