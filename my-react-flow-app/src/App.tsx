import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { FlowBuilder } from "./components/flow-builder";

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
}
