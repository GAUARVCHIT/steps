import React from "react"
import { Handle, Position } from "reactflow"

const CustomTaskNode = ({ data }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#4CAF50"
      case "in progress":
        return "#FFC107"
      default:
        return "#9E9E9E"
    }
  }

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "10px",
        width: "200px",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <div
        style={{
          width: "100%",
          height: "5px",
          background: getStatusColor(data.status),
          marginTop: "5px",
        }}
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default CustomTaskNode
