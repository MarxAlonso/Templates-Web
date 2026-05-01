import React from 'react';
import { 
  Database, Server, Globe, Layers, 
  TestTube, Puzzle, Network, Monitor, 
  GitCommit, Wrench, Rocket, Boxes
} from "lucide-react";

export const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeData: any) => {
    const dataToTransfer = {
      type: nodeData.type,
      label: nodeData.label,
      iconType: nodeData.iconType,
      color: nodeData.color,
      templateId: nodeData.templateId
    };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(dataToTransfer));
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodeGroups = [
    {
      title: "Módulos de Arquitectura",
      nodes: [
        { type: 'archNode', icon: <Database className="size-4" />, label: 'Base de Datos (MySQL)', iconType: 'database', color: '#10b981' },
        { type: 'archNode', icon: <Server className="size-4" />, label: 'Servicio / Lógica', iconType: 'server', color: '#f59e0b' },
        { type: 'archNode', icon: <Globe className="size-4" />, label: 'Web Frontend', iconType: 'web', color: '#3b82f6' },
        { type: 'archNode', icon: <Network className="size-4" />, label: 'API / Controller', iconType: 'api', color: '#8b5cf6' },
      ]
    },
    {
      title: "Módulos de Testing",
      nodes: [
        { type: 'archNode', icon: <TestTube className="size-4" />, label: 'Test Unitario', iconType: 'unit', color: '#ec4899' },
        { type: 'archNode', icon: <Puzzle className="size-4" />, label: 'Test Integración', iconType: 'integration', color: '#8b5cf6' },
        { type: 'archNode', icon: <Network className="size-4" />, label: 'Test API / Funcional', iconType: 'api', color: '#3b82f6' },
        { type: 'archNode', icon: <Monitor className="size-4" />, label: 'Test UI / Usabilidad', iconType: 'ui', color: '#10b981' },
      ]
    },
    {
      title: "CI/CD & Pipeline",
      nodes: [
        { type: 'archNode', icon: <GitCommit className="size-4" />, label: 'Source (GitHub)', iconType: 'commit', color: '#64748b' },
        { type: 'archNode', icon: <Wrench className="size-4" />, label: 'Build / Maven', iconType: 'build', color: '#f59e0b' },
        { type: 'archNode', icon: <Rocket className="size-4" />, label: 'Deploy / Release', iconType: 'deploy', color: '#ef4444' },
      ]
    },
    {
      title: "Plantillas (Flujos Completos)",
      nodes: [
        { type: 'template', icon: <Boxes className="size-4" />, label: 'Arquitectura Monolito', templateId: 'monolith-full', color: '#8b5cf6' },
        { type: 'template', icon: <Layers className="size-4" />, label: 'Estrategia Pirámide', templateId: 'test-pyramid', color: '#ec4899' },
        { type: 'template', icon: <Rocket className="size-4" />, label: 'Pipeline CI/CD Full', templateId: 'cicd-full', color: '#10b981' },
        { type: 'template', icon: <Globe className="size-4" />, label: 'Frontend-API-DB', templateId: 'web-arch', color: '#3b82f6' },
      ]
    },
    {
      title: "Utilidades",
      nodes: [
        { type: 'groupNode', icon: <Layers className="size-4" />, label: 'Contenedor Lógico', iconType: 'default', color: '#64748b' },
      ]
    }
  ];

  return (
    <aside className="w-64 border-r bg-card p-4 flex flex-col gap-6 overflow-y-auto">
      {nodeGroups.map((group) => (
        <div key={group.title} className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-muted-foreground border-b pb-1">
            {group.title}
          </div>
          <div className="flex flex-col gap-2">
            {group.nodes.map((node) => (
              <div 
                key={node.label}
                className="cursor-grab rounded-md border bg-background p-3 text-sm shadow-sm hover:ring-1 hover:ring-primary/50 transition-all active:cursor-grabbing flex items-center gap-3" 
                onDragStart={(event) => onDragStart(event, node)} 
                draggable
              >
                <div style={{ color: node.color }}>{node.icon}</div>
                <span className="truncate">{node.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="text-xs text-muted-foreground mt-auto pt-4 border-t">
        Arrastra una <b>Plantilla</b> para generar un flujo completo al instante.
      </div>
    </aside>
  );
};
