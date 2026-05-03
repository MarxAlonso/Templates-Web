import React, { useState } from 'react';
import styles from './BotonFlotanteFrap.module.css';
import { motion, AnimatePresence } from 'framer-motion';

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
        <svg 
          width="24" height="24" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      </motion.button>
    </div>
  );
};
