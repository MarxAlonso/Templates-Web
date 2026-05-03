import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  Controls,
  useReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type FitViewOptions,
  type Node,
} from "@xyflow/react";

import { BaseNodeFullDemo } from "./component-example";
import { ArchitectureNode } from "./arch-node";
import { GroupNode } from "./group-node";
import { Sidebar } from "./sidebar";
import { EditPanel } from "./edit-panel";
import { ContextMenu } from "./context-menu";
import { getTemplateNodesAndEdges } from "../utils/templates";
import { useHistory } from "../hooks/useHistory";
import { Save, Sun, Moon, Undo2, Redo2 } from "lucide-react";

const FLOW_KEY = "react-flow-architecture-save";

let idCounter = 0;
const getId = () => `dndnode_${Date.now()}_${idCounter++}`;

const nodeTypes = {
  baseNodeFull: BaseNodeFullDemo,
  archNode: ArchitectureNode,
  groupNode: GroupNode,
};

const fitViewOptions: FitViewOptions = {
  padding: 100,
};

export const FlowBuilder = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const { screenToFlowPosition, getViewport, setViewport } = useReactFlow();
  const { takeSnapshot, undo, redo, canUndo, canRedo } = useHistory();
  
  const [isDark, setIsDark] = useState(true);
  const [menu, setMenu] = useState<{ id: string; top: number; left: number } | null>(null);
  const [clipboard, setClipboard] = useState<{ nodes: Node[], edges: Edge[] } | null>(null);

  // Manejar cambio de tema
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Cargar estado inicial desde localStorage
  useEffect(() => {
    const flowStr = localStorage.getItem(FLOW_KEY);
    if (flowStr) {
      try {
        const flow = JSON.parse(flowStr);
        if (flow) {
          if (flow.nodes) {
            setNodes(flow.nodes.filter((n: any) => n.type !== 'template'));
          }
          if (flow.edges) {
            setEdges(flow.edges);
          }
          if (flow.viewport) {
            setViewport(flow.viewport);
          }
        }
      } catch (err) {
        console.error("Error restaurando el flujo:", err);
      }
    }
  }, [setNodes, setEdges, setViewport]);

  const onSave = useCallback(() => {
    const flow = {
      nodes,
      edges,
      viewport: getViewport(),
    };
    localStorage.setItem(FLOW_KEY, JSON.stringify(flow));
    alert("Flujo guardado localmente.");
  }, [nodes, edges, getViewport]);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      takeSnapshot();
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges, takeSnapshot],
  );

  const onNodeDragStart = useCallback(() => {
    takeSnapshot();
  }, [takeSnapshot]);

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      setMenu({
        id: node.id,
        top: event.clientY,
        left: event.clientX,
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      
      const dropData = event.dataTransfer.getData("application/reactflow");
      if (!dropData) return;

      try {
        const nodeData = JSON.parse(dropData);
        const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });

        takeSnapshot();

        if (nodeData.type === 'template') {
          const { nodes: tplNodes, edges: tplEdges } = getTemplateNodesAndEdges(nodeData.templateId, position);
          setNodes((nds) => nds.concat(tplNodes as Node[]));
          setEdges((eds) => eds.concat(tplEdges as Edge[]));
          return;
        }

        const newNode: Node = {
          id: getId(),
          type: nodeData.type,
          position,
          data: { 
            label: nodeData.label,
            iconType: nodeData.iconType,
            color: nodeData.color,
            description: ""
          },
        };

        // Lógica de Grouping
        const intersectingGroup = nodes.find(n => 
          n.type === 'groupNode' && 
          position.x > n.position.x && position.x < n.position.x + (n.measured?.width || 200) &&
          position.y > n.position.y && position.y < n.position.y + (n.measured?.height || 150)
        );

        if (intersectingGroup) {
          newNode.position = {
            x: position.x - intersectingGroup.position.x,
            y: position.y - intersectingGroup.position.y
          };
          newNode.parentId = intersectingGroup.id;
          newNode.extent = 'parent';
        }

        setNodes((nds) => nds.concat(newNode));
      } catch (e) {
        console.error("Error en Drop:", e);
      }
    },
    [screenToFlowPosition, nodes, setNodes, setEdges, takeSnapshot],
  );

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'z') undo();
      if (event.ctrlKey && event.key === 'y') redo();
      
      if (event.ctrlKey && event.key === 'c') {
        const selectedNodes = nodes.filter(n => n.selected);
        const selectedEdges = edges.filter(e => e.selected);
        if (selectedNodes.length > 0) {
          setClipboard({ nodes: selectedNodes, edges: selectedEdges });
        }
      }
      
      if (event.ctrlKey && event.key === 'v' && clipboard) {
        takeSnapshot();
        const newNodes: Node[] = [];
        const idMap = new Map();
        
        clipboard.nodes.forEach(n => {
          const newId = `${n.id}-copy-${Date.now()}`;
          idMap.set(n.id, newId);
          newNodes.push({
            ...n,
            id: newId,
            position: { x: n.position.x + 50, y: n.position.y + 50 },
            selected: true,
          });
        });

        const newEdges: Edge[] = [];
        clipboard.edges.forEach(e => {
          if (idMap.has(e.source) && idMap.has(e.target)) {
            newEdges.push({
              ...e,
              id: `${e.id}-copy-${Date.now()}`,
              source: idMap.get(e.source),
              target: idMap.get(e.target),
              selected: true,
            });
          }
        });

        setNodes(nds => nds.map(n => ({...n, selected: false})).concat(newNodes));
        setEdges(eds => eds.map(e => ({...e, selected: false})).concat(newEdges));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, clipboard, nodes, edges, setNodes, setEdges, takeSnapshot]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 h-full relative overflow-hidden" ref={reactFlowWrapper}>
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <button onClick={undo} disabled={!canUndo} className="flex items-center justify-center size-10 bg-card text-foreground rounded-md shadow border hover:bg-muted disabled:opacity-50 transition-colors" title="Undo (Ctrl+Z)">
            <Undo2 className="size-4" />
          </button>
          <button onClick={redo} disabled={!canRedo} className="flex items-center justify-center size-10 bg-card text-foreground rounded-md shadow border hover:bg-muted disabled:opacity-50 transition-colors" title="Redo (Ctrl+Y)">
            <Redo2 className="size-4" />
          </button>
        </div>

        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button onClick={toggleTheme} className="flex items-center justify-center size-10 bg-card text-foreground rounded-md shadow border hover:bg-muted transition-colors">
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md shadow hover:bg-primary/90 transition-all font-medium">
            <Save className="size-4" /> Guardar
          </button>
        </div>
        
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStart={onNodeDragStart}
          onNodeContextMenu={onNodeContextMenu}
          onPaneClick={onPaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={fitViewOptions}
          deleteKeyCode={["Backspace", "Delete"]}
          className="bg-muted/10"
        >
          <Controls />
          <Background variant={"dots" as any} gap={12} size={1} />
        </ReactFlow>

        {menu && <ContextMenu onClick={onPaneClick} closeMenu={onPaneClick} {...menu} />}
      </div>
      <EditPanel />
    </div>
  );
};
