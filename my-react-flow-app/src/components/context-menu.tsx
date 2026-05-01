import React, { useCallback, useRef, useEffect } from 'react';
import { useReactFlow } from '@xyflow/react';
import { Copy, Trash2 } from 'lucide-react';

export const ContextMenu = ({ id, top, left, closeMenu }: any) => {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeMenu]);

  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    if (node) {
      const position = {
        x: node.position.x + 50,
        y: node.position.y + 50,
      };
      addNodes({
        ...node,
        selected: false,
        id: `${node.id}-copy-${Date.now()}`,
        position,
      });
    }
    closeMenu();
  }, [id, getNode, addNodes, closeMenu]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
    closeMenu();
  }, [id, setNodes, setEdges, closeMenu]);

  return (
    <div
      ref={ref}
      style={{ top, left }}
      className="absolute z-50 bg-card border rounded-md shadow-lg py-1 flex flex-col min-w-[150px] animate-in fade-in zoom-in-95 duration-100"
    >
      <button onClick={duplicateNode} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted text-left w-full transition-colors">
        <Copy className="size-4" /> Duplicar
      </button>
      <button onClick={deleteNode} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-destructive/10 text-destructive text-left w-full transition-colors">
        <Trash2 className="size-4" /> Eliminar
      </button>
    </div>
  );
};
