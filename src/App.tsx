import React, { useState } from "react"
import WorkflowDiagram from "./components/WorkflowDiagram"
import TaskList from "./components/TaskList"
import Notifications from "./components/Notifications"
import "./App.css"

interface Task {
  id: number
  name: string
  status: string
  progress: number
}

interface WorkflowState {
  currentStep: number
  tasks: Task[]
  notifications: string[]
}

const App: React.FC = () => {
  const [workflowState, setWorkflowState] = useState<WorkflowState>({
    currentStep: 1, // Set the initial current step
    tasks: [
      {
        id: 1,
        name: "Go Live with Service Delivery",
        status: "completed",
        progress: 100,
      },
      { id: 2, name: "Complete Inputs", status: "in progress", progress: 50 },
      { id: 3, name: "Validate Inputs", status: "pending", progress: 0 },
      {
        id: 4,
        name: "Share Information Required",
        status: "pending",
        progress: 0,
      },
      { id: 5, name: "Raise DMS Ticket", status: "pending", progress: 0 },
      {
        id: 6,
        name: "Perform Duplicates Check",
        status: "pending",
        progress: 0,
      },
    ],
    notifications: [],
  })

  const handleTaskAction = (taskId: number, action: string) => {
    const updatedTasks = workflowState.tasks.map((task) => {
      if (task.id === taskId) {
        switch (action) {
          case "edit":
            return { ...task, status: "in progress" }
          case "approve":
          case "complete":
            return { ...task, status: "completed" }
          case "revalidate":
            return { ...task, status: "pending" }
          default:
            return task
        }
      }
      return task
    })

    setWorkflowState((prevState) => ({
      ...prevState,
      tasks: updatedTasks,
      notifications: [...prevState.notifications, `Task ${taskId} ${action}d`],
    }))
  }

  const addNewWorkflow = () => {
    const newId = workflowState.tasks.length + 1
    const newTask: Task = {
      id: newId,
      name: `New Task ${newId}`,
      status: "pending",
      progress: 0,
    }
    setWorkflowState((prevState) => ({
      ...prevState,
      tasks: [...prevState.tasks, newTask],
      notifications: [...prevState.notifications, `New task ${newId} added`],
    }))
  }

  return (
    <div className="app">
      <h1>Invoice Processing Workflow</h1>
      <button onClick={addNewWorkflow}>Add New Workflow</button>
      <WorkflowDiagram workflowState={workflowState} />
      <TaskList
        tasks={workflowState.tasks}
        handleTaskAction={handleTaskAction}
      />
      <Notifications notifications={workflowState.notifications} />
    </div>
  )
}

export default App
