import { memo } from "react";
import { NodeResizer } from "@xyflow/react";

export const GroupNode = memo(({ selected, data }: any) => {
  return (
    <>
      <NodeResizer 
        color="var(--primary)" 
        isVisible={selected} 
        minWidth={200} 
        minHeight={150} 
      />
      <div className="w-full h-full min-w-[200px] min-h-[150px] border-2 border-dashed border-primary/50 bg-primary/5 rounded-xl relative">
        <div className="absolute -top-3 left-4 px-2 bg-background text-xs font-bold text-primary uppercase tracking-wider rounded-full shadow-sm border">
          {data.label || "Contenedor Lógico"}
        </div>
      </div>
    </>
  );
});

GroupNode.displayName = "GroupNode";
