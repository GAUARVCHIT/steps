import React from "react"

interface TaskCardProps {
  task: {
    id: number
    name: string
    status: string
  }
  handleTaskAction: (taskId: number, action: string) => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, handleTaskAction }) => {
  return (
    <div className={`task-card ${task.status}`}>
      <h3>{task.name}</h3>
      <p>Status: {task.status}</p>
      <button onClick={() => handleTaskAction(task.id, "edit")}>Edit</button>
      <button onClick={() => handleTaskAction(task.id, "approve")}>
        Approve
      </button>
      {task.name === "Validate Inputs" && (
        <button onClick={() => handleTaskAction(task.id, "revalidate")}>
          Revalidate
        </button>
      )}
    </div>
  )
}

export default TaskCard
