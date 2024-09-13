import React, { useMemo } from "react"
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  EdgeTypes,
} from "reactflow"
import "reactflow/dist/style.css"
import CustomTaskNode from "./CustomTaskNode"

interface WorkflowDiagramProps {
  workflowState: {
    tasks: Array<{ id: number; name: string; status: string }>
    currentStep: number
  }
}

const nodeTypes = {
  customTask: CustomTaskNode,
}

// Custom edge style
const edgeStyle = {
  stroke: "#333",
  strokeWidth: 2,
}

const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({ workflowState }) => {
  const nodes: Node[] = useMemo(
    () =>
      workflowState.tasks.map((task, index) => ({
        id: task.id.toString(),
        data: {
          label: task.name,
          status: task.status,
          isCurrent: index === workflowState.currentStep,
        },
        position: { x: 400 * index, y: 100 }, // Increased spacing between nodes
        type: "customTask",
      })),
    [workflowState.tasks, workflowState.currentStep]
  )

  const edges: Edge[] = useMemo(
    () =>
      workflowState.tasks.slice(0, -1).map((task, index) => ({
        id: `e${task.id}-${task.id + 1}`,
        source: task.id.toString(),
        target: (task.id + 1).toString(),
        type: "smoothstep",
        style: edgeStyle,
      })),
    [workflowState.tasks]
  )

  return (
    <div style={{ height: "300px", width: "100%", overflowX: "auto" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView={false}
        defaultEdgeOptions={{ style: edgeStyle }}
        minZoom={0.1}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default WorkflowDiagram
