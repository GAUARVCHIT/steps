import React from "react"
import ReactFlow, { Background, Controls, Edge, Node } from "reactflow"
import "reactflow/dist/style.css"

interface WorkflowDiagramProps {
  workflowState: {
    tasks: Array<{ id: number; name: string; status: string }>
  }
}

const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({ workflowState }) => {
  const nodes: Node[] = workflowState.tasks.map((task, index) => ({
    id: task.id.toString(),
    data: { label: task.name, status: task.status },
    position: { x: 250 * index, y: 0 },
    type: "default",
  }))

  const edges: Edge[] = workflowState.tasks.slice(0, -1).map((task, index) => ({
    id: `e${task.id}-${task.id + 1}`,
    source: task.id.toString(),
    target: (task.id + 1).toString(),
    type: "smoothstep",
  }))

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default WorkflowDiagram
