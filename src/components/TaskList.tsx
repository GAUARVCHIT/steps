import React from "react"
import TaskCard from "./TaskCard"

interface TaskListProps {
  tasks: Array<{
    id: number
    name: string
    status: string
  }>
  handleTaskAction: (taskId: number, action: string) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, handleTaskAction }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          handleTaskAction={handleTaskAction}
        />
      ))}
    </div>
  )
}

export default TaskList
