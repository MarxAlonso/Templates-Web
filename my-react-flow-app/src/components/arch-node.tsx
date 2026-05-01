import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { 
  Database, Server, Globe, LayoutTemplate, Layers, 
  TestTube, Puzzle, Network, Monitor, GitCommit, Wrench, Rocket
} from "lucide-react";
import {
  BaseNode,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
  BaseNodeContent,
} from "@/components/base-node";

const icons: Record<string, React.ReactNode> = {
  database: <Database className="size-4" />,
  server: <Server className="size-4" />,
  web: <Globe className="size-4" />,
  cloud: <Layers className="size-4" />,
  unit: <TestTube className="size-4" />,
  integration: <Puzzle className="size-4" />,
  api: <Network className="size-4" />,
  ui: <Monitor className="size-4" />,
  commit: <GitCommit className="size-4" />,
  build: <Wrench className="size-4" />,
  deploy: <Rocket className="size-4" />,
  default: <LayoutTemplate className="size-4" />,
};

export const ArchitectureNode = memo(({ data, selected }: any) => {
  const icon = icons[data.iconType] || icons.default;
  const color = data.color || "#3b82f6";

  return (
    <BaseNode 
      className="w-64" 
      style={{ 
        borderColor: selected ? color : "var(--border)",
        boxShadow: selected ? `0 0 0 2px ${color}40` : "none"
      }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 border-2" style={{ backgroundColor: color }} />
      
      <BaseNodeHeader className="border-b" style={{ backgroundColor: `${color}15` }}>
        <div style={{ color: color }}>{icon}</div>
        <BaseNodeHeaderTitle>{data.label || "Node"}</BaseNodeHeaderTitle>
      </BaseNodeHeader>
      
      <BaseNodeContent>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {data.description || "Sin descripción"}
        </p>
      </BaseNodeContent>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 border-2" style={{ backgroundColor: color }} />
    </BaseNode>
  );
});

ArchitectureNode.displayName = "ArchitectureNode";
