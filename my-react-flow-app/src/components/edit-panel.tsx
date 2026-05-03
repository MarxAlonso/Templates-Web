import { useReactFlow, useOnSelectionChange, type Node } from "@xyflow/react";
import { useState } from "react";
import { Trash2 } from "lucide-react";

type CustomNodeData = {
  label?: string;
  description?: string;
  color?: string;
};

export const EditPanel = () => {
  const { setNodes, getNodes, setEdges } = useReactFlow();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // Local state para escritura fluida sin perder el foco
  const [formData, setFormData] = useState<CustomNodeData>({});

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      const selectedId = nodes.length === 1 ? nodes[0].id : null;
      setSelectedNodeId(selectedId);
      
      if (selectedId) {
        const node = getNodes().find(n => n.id === selectedId);
        if (node) {
          setFormData((node.data as CustomNodeData) || {});
        }
      }
    },
  });

  if (!selectedNodeId) {
    return (
      <aside className="w-72 border-l bg-card p-4 flex flex-col gap-4">
        <div className="text-sm font-semibold text-muted-foreground">Editor de Nodos</div>
        <div className="text-sm text-muted-foreground p-4 text-center border border-dashed rounded-md">
          Selecciona un nodo en el lienzo para editar sus propiedades.
        </div>
      </aside>
    );
  }

  const handleChange = (field: keyof CustomNodeData, value: string) => {
    // Actualizamos el estado local instantáneamente
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Y sincronizamos con React Flow
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === selectedNodeId) {
          return {
            ...n,
            data: { ...n.data, [field]: value },
          };
        }
        return n;
      })
    );
  };

  const handleDelete = () => {
    setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
    setEdges((eds) => eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId));
    setSelectedNodeId(null);
  };

  const inputClass = "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

  return (
    <aside className="w-72 border-l bg-card p-4 flex flex-col gap-6 overflow-y-auto">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="text-sm font-semibold text-muted-foreground">
          Editar Nodo
        </div>
        <button 
          onClick={handleDelete}
          className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
          title="Eliminar nodo"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Nombre</label>
        <input 
          className={inputClass}
          value={formData.label || ""} 
          onChange={(e) => handleChange("label", e.target.value)} 
          placeholder="Ej: Base de Datos Principal"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Descripción</label>
        <textarea 
          className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          value={formData.description || ""} 
          onChange={(e) => handleChange("description", e.target.value)} 
          placeholder="Detalles sobre este nodo..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Color</label>
        <div className="flex gap-2 items-center">
          <input 
            type="color" 
            className="w-10 h-10 p-1 rounded border border-input cursor-pointer"
            value={formData.color || "#3b82f6"} 
            onChange={(e) => handleChange("color", e.target.value)} 
          />
          <input 
            className={inputClass}
            value={formData.color || "#3b82f6"} 
            onChange={(e) => handleChange("color", e.target.value)} 
          />
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground mt-auto pt-4 border-t">
        ID Interno: <code className="bg-muted px-1 py-0.5 rounded">{selectedNodeId}</code>
      </div>
    </aside>
  );
};
