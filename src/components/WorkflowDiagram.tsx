import React, { useMemo } from "react"
import ReactFlow, { Background, Controls, Edge, Node } from "reactflow"
import "reactflow/dist/style.css"
import CustomTaskNode from "./CustomTaskNode"

interface WorkflowDiagramProps {
  workflowState: {
    tasks: Array<{ id: number; name: string; status: string }>
  }
}

const nodeTypes = {
  customTask: CustomTaskNode,
}

const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({ workflowState }) => {
  const nodes: Node[] = useMemo(
    () =>
      workflowState.tasks.map((task, index) => ({
        id: task.id.toString(),
        data: { label: task.name, status: task.status },
        position: { x: 0, y: 100 * index },
        type: "customTask",
      })),
    [workflowState.tasks]
  )

  const edges: Edge[] = useMemo(
    () =>
      workflowState.tasks.slice(0, -1).map((task, index) => ({
        id: `e${task.id}-${task.id + 1}`,
        source: task.id.toString(),
        target: (task.id + 1).toString(),
        type: "smoothstep",
      })),
    [workflowState.tasks]
  )

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default WorkflowDiagram
