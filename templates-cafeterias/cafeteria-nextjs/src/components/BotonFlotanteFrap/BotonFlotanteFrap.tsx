'use client';

import React, { useState } from 'react';
import styles from './BotonFlotanteFrap.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface BotonFlotanteFrapProps {
  onClick?: () => void;
}

export const BotonFlotanteFrap: React.FC<BotonFlotanteFrapProps> = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className={styles.contenedor}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div 
            className={styles.tooltip}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            Empieza tu pedido
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button 
        className={styles.frap} 
        onClick={onClick} 
        aria-label="Order"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <ShoppingBag size={24} />
      </motion.button>
    </div>
  );
};
