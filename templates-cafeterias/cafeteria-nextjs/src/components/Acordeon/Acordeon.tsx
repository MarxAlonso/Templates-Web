'use client';

import React from 'react';
import styles from './Acordeon.module.css';
import { useAcordeon } from '@/hooks/useAcordeon';
import { motion, AnimatePresence } from 'framer-motion';

interface AcordeonProps {
  pregunta: string;
  respuesta: React.ReactNode;
}

export const Acordeon: React.FC<AcordeonProps> = ({ pregunta, respuesta }) => {
  const { estaAbierto, alternar } = useAcordeon();

  return (
    <div className={styles.acordeon}>
      <button className={styles.cabecera} onClick={alternar}>
        <span className={styles.pregunta}>{pregunta}</span>
        <motion.span 
          className={styles.icono}
          animate={{ rotate: estaAbierto ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {estaAbierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={styles.contenedorRespuesta}
          >
            <div className={styles.respuesta}>
              {respuesta}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
