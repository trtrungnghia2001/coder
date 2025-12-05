import { createContext, useContext } from 'react'
import type {
  ContextActionType,
  Task,
  TaskContextType,
  TasksDialogType,
} from './type'
import { useEffect, useReducer, useState } from 'react'
import { tasksData } from './data'

const taskReducer = (state: Task[], action: ContextActionType) => {
  switch (action.type) {
    case 'GET': {
      return action.payload
    }
    case 'SET': {
      return action.payload
    }
    case 'ADD': {
      const newTask: Task = { ...action.payload, id: Date.now().toString() }
      return [newTask, ...state]
    }
    case 'UPDATE':
      return state.map((task) =>
        task.id === action.payload?.id ? { ...task, ...action.payload } : task,
      )
    case 'UPDATE_SELECTED': {
      const rowIds = action.payload.map((item) => item.id)

      return state.map((item) =>
        rowIds.includes(item.id)
          ? {
              ...item,
              [action.key]: action.value,
            }
          : item,
      )
    }
    case 'DELETE':
      return state.filter((task) => task.id !== action.payload?.id)
    case 'DELETE_SELECTED': {
      const rowIds = action.payload.map((item) => item.id)

      return state.filter((item) => !rowIds.includes(item.id))
    }
    case 'IMPORT':
      return [...state, ...action.payload]
    default:
      return state
  }
}

const TaskContext = createContext<TaskContextType | null>(null)

export const useTaskContext = (): TaskContextType => {
  const ctx = useContext(TaskContext)

  if (!ctx) {
    throw new Error('useTaskContext must be used inside <TaskProvider>')
  }

  return ctx
}

const initTasks = () => {
  try {
    const raw = localStorage.getItem('tasksData')
    if (!raw) {
      return tasksData
    }
    const tasksLocal = JSON.parse(raw) as Task[]
    return tasksLocal.length > 0 ? tasksLocal : tasksData
  } catch {
    return tasksData
  }
}

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  // task state management
  const [tasks, dispatch] = useReducer(taskReducer, initTasks())

  const handleAddTask = (task: Task) => {
    dispatch({
      type: 'ADD',
      payload: task,
    })
  }
  const handleUpdateTask = (task: Task) => {
    dispatch({
      type: 'UPDATE',
      payload: task,
    })
    setOpen('update')
    setCurrentData(null)
  }
  const handleUpdateSelectTask = (
    tasks: Task[],
    key: string,
    value: string | number,
  ) => {
    dispatch({
      type: 'UPDATE_SELECTED',
      payload: tasks,
      key,
      value,
    })
  }
  const handleDeleteTask = (task: Task) => {
    dispatch({
      type: 'DELETE',
      payload: task,
    })
  }
  const handleDeleteSelectTask = (tasks: Task[]) => {
    dispatch({
      type: 'DELETE_SELECTED',
      payload: tasks,
    })
  }
  const handleImportTask = (tasks: Task[]) => {
    dispatch({
      type: 'IMPORT',
      payload: tasks,
    })
  }
  const handleSetTasks = (tasks: Task[]) => {
    dispatch({
      type: 'SET',
      payload: tasks,
    })
  }

  useEffect(() => {
    localStorage.setItem('tasksData', JSON.stringify(tasks))
  }, [tasks])

  const [open, setOpen] = useState<TasksDialogType>(false)
  const [currentData, setCurrentData] = useState<Task | null>(null)

  return (
    <TaskContext.Provider
      value={{
        tasks,
        handleAddTask,
        handleUpdateTask,
        handleUpdateSelectTask,
        handleDeleteTask,
        handleDeleteSelectTask,
        handleImportTask,
        handleSetTasks,
        open,
        setOpen,
        currentData,
        setCurrentData,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
