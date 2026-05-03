import { useState, useCallback, useEffect } from 'react';
import { useReactFlow } from '@xyflow/react';

export const useHistory = () => {
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();
  const [history, setHistory] = useState<any[]>([{ nodes: [], edges: [] }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Toma una "foto" del estado actual.
  const takeSnapshot = useCallback(() => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();
    
    setHistory((prev) => {
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push({ nodes: currentNodes, edges: currentEdges });
      // Limitar el historial a los últimos 50 cambios
      if (newHistory.length > 50) {
        newHistory.shift();
        return newHistory;
      }
      return newHistory;
    });
    setCurrentIndex((prev) => Math.min(prev + 1, 50));
  }, [getNodes, getEdges, currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      const prev = history[prevIdx];
      setNodes(prev.nodes);
      setEdges(prev.edges);
      setCurrentIndex(prevIdx);
    }
  }, [currentIndex, history, setNodes, setEdges]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const nextIdx = currentIndex + 1;
      const next = history[nextIdx];
      setNodes(next.nodes);
      setEdges(next.edges);
      setCurrentIndex(nextIdx);
    }
  }, [currentIndex, history, setNodes, setEdges]);

  return { 
    takeSnapshot, 
    undo, 
    redo, 
    canUndo: currentIndex > 0, 
    canRedo: currentIndex < history.length - 1 
  };
};
