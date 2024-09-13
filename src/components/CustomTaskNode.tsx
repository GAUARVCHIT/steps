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
        width: "180px", // Adjust this value if needed
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Handle type="target" position={Position.Left} />{" "}
      {/* Adjust handle position */}
      <div>{data.label}</div>
      <div
        style={{
          width: "100%",
          height: "5px",
          background: getStatusColor(data.status),
          marginTop: "5px",
        }}
      />
      {data.isCurrent && (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: "10px solid #FF4500",
            marginTop: "5px",
          }}
        />
      )}
      <Handle type="source" position={Position.Right} />{" "}
      {/* Adjust handle position */}
    </div>
  )
}

export default CustomTaskNode
