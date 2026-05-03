'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimacionEntradaProps {
  children: ReactNode;
  direccion?: 'arriba' | 'abajo' | 'izquierda' | 'derecha' | 'ninguna';
  retraso?: number;
  duracion?: number;
  className?: string;
  triggerOnce?: boolean;
}

export const AnimacionEntrada: React.FC<AnimacionEntradaProps> = ({
  children,
  direccion = 'arriba',
  retraso = 0,
  duracion = 0.5,
  className = '',
  triggerOnce = true
}) => {
  const variaciones = {
    oculto: {
      opacity: 0,
      y: direccion === 'arriba' ? 40 : direccion === 'abajo' ? -40 : 0,
      x: direccion === 'izquierda' ? 40 : direccion === 'derecha' ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: duracion,
        delay: retraso,
        ease: [0.25, 0.46, 0.45, 0.94] // Starbucks cubic-bezier
      }
    }
  };

  return (
    <motion.div
      initial="oculto"
      whileInView="visible"
      viewport={{ once: triggerOnce, margin: "-50px" }}
      variants={variaciones}
      className={className}
    >
      {children}
    </motion.div>
  );
};
