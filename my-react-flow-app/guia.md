# Guía de Ejecución y Desarrollo - React Flow App (Estilo n8n)

Esta guía explica cómo ejecutar el proyecto y cómo extender la interactividad para construir flujos visuales similares a los de herramientas como n8n.

## 🚀 Cómo Ejecutar el Proyecto

El proyecto ha sido configurado con **Vite**, **React**, **Tailwind CSS v4** y los componentes de **shadcn/ui**.

1. **Abrir la terminal** en la carpeta del proyecto (`my-react-flow-app`).
2. **Instalar dependencias** (si clonas el proyecto de nuevo):
   ```bash
   pnpm install
   ```
3. **Iniciar el servidor de desarrollo**:
   ```bash
   pnpm run dev
   ```
4. **Abrir la aplicación**: Ve a la URL que indica la consola, habitualmente `http://localhost:5173`.

## 🧩 Estructura de Componentes

La app tiene los siguientes elementos clave para los nodos:
- `src/components/base-node.tsx`: Componentes de construcción (`BaseNode`, `BaseNodeHeader`, `BaseNodeContent`, etc.) que aplican estilos consistentes de `shadcn/ui` sobre los nodos de React Flow.
- `src/components/component-example.tsx`: Implementación del nodo de prueba `BaseNodeFullDemo`.
- `src/App.tsx`: Lienzo principal de **React Flow** que define los nodos iniciales y los tipos de nodos personalizados.

## 💡 Agregando Interactividad tipo n8n

Para que tu aplicación de React Flow se comporte como n8n (conectar nodos, mover datos, agregar nodos dinámicamente), necesitas implementar el manejo del estado global de React Flow:

### 1. Manejo de Estados de Nodos y Conexiones (`useNodesState`, `useEdgesState`)

Actualiza tu `App.tsx` para usar estados y permitir arrastrar o conectar nodos:

```tsx
import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge
} from '@xyflow/react';
import { BaseNodeFullDemo } from "./components/component-example";

const nodeTypes = {
  baseNodeFull: BaseNodeFullDemo,
};

const initialNodes = [
  { id: "1", position: { x: 200, y: 200 }, data: {}, type: "baseNodeFull" },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
```

### 2. Agregar Handle (Puntos de Conexión) a los Nodos

Para poder conectar los nodos como en n8n, tu componente de nodo personalizado necesita `Handle` (puertos de entrada y salida). 

Edita tu `component-example.tsx` y agrega `<Handle>` de React Flow:

```tsx
import { Handle, Position } from "@xyflow/react";

// Dentro de tu return de BaseNodeFullDemo:
return (
  <BaseNode className="w-96">
    {/* Handle de Entrada */}
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    
    <BaseNodeHeader>...</BaseNodeHeader>
    <BaseNodeContent>...</BaseNodeContent>
    <BaseNodeFooter>...</BaseNodeFooter>
    
    {/* Handle de Salida */}
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
  </BaseNode>
);
```

### 3. Siguientes Pasos (Avanzado)
- **Panel lateral (Sidebar)**: Crea una barra lateral con diferentes "tipos de nodos" (ej. Nodo Trigger, Nodo Webhook, Nodo Condicional). Usa la API de Drag & Drop de HTML5 para arrastrarlos al lienzo.
- **Datos Dinámicos (`data` prop)**: Usa la propiedad `data` del nodo para almacenar configuraciones (por ejemplo, la URL de una petición API) y muestra campos de input dentro de `<BaseNodeContent>`.
- **Ejecución de Flujo**: Para hacer que el flujo funcione, debes procesar el grafo internamente. Puedes usar bibliotecas para recorrer grafos dirigidos y ejecutar lógica secuencial a través de las conexiones (`edges`).
