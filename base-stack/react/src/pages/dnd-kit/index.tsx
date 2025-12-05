import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// types
export interface Task {
  id: string
  content: string
  columnId: string
}

export interface Column {
  id: string
  title: string
}

// mock data
const initialTasks: Task[] = [
  { id: 'task-1', content: 'Learn TypeScript', columnId: 'column-1' },
  { id: 'task-2', content: 'Build DnD App', columnId: 'column-1' },
  { id: 'task-3', content: 'Write Docs', columnId: 'column-2' },
  { id: 'task-4', content: 'Test App', columnId: 'column-3' },
]

const initialColumns: Column[] = [
  { id: 'column-1', title: 'Todo' },
  { id: 'column-2', title: 'In Progress' },
  { id: 'column-3', title: 'Done' },
]

type DragItemType = 'task' | 'column'

interface DragItem {
  id: string
  type: DragItemType
}

export const DndKitPage = () => {
  const [tasks, setTasks] = useState(initialTasks)
  const [columns, setColumns] = useState(initialColumns)

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeData = active.data.current as DragItem
    const overData = over.data.current as DragItem

    // Column x Column → reorder columns
    if (activeData.type === 'column' && overData.type === 'column') {
      const oldIndex = columns.findIndex((c) => c.id === active.id)
      const newIndex = columns.findIndex((c) => c.id === over.id)
      if (oldIndex !== newIndex) {
        setColumns((prev) => arrayMove(prev, oldIndex, newIndex))
      }
      return
    }

    // Task x Task
    if (activeData.type === 'task' && overData.type === 'task') {
      const draggedTask = tasks.find((t) => t.id === active.id)!
      const overTask = tasks.find((t) => t.id === over.id)!

      // Same column → reorder
      if (draggedTask.columnId === overTask.columnId) {
        const columnTasks = tasks.filter(
          (t) => t.columnId === draggedTask.columnId,
        )
        const oldIndex = columnTasks.findIndex((t) => t.id === draggedTask.id)
        const newIndex = columnTasks.findIndex((t) => t.id === overTask.id)
        if (oldIndex !== newIndex) {
          const newTasks = [...tasks]
          newTasks.splice(
            tasks.findIndex((t) => t.id === draggedTask.id),
            1,
          )
          newTasks.splice(
            tasks.findIndex((t) => t.id === overTask.id),
            0,
            draggedTask,
          )
          setTasks(newTasks)
        }
      }
      // Different column → move task
      else {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === draggedTask.id ? { ...t, columnId: overTask.columnId } : t,
          ),
        )
      }
      return
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragOver={handleDragEnd}
      // onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 p-4">
        <SortableContext
          items={columns.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {columns.map((col) => {
            const columnTasks = tasks.filter((t) => t.columnId === col.id)
            return (
              <div key={col.id} className="bg-gray-100 p-2 rounded w-64">
                <SortableItem id={col.id} type="column">
                  <h2 className="font-bold mb-2">{col.title}</h2>
                </SortableItem>
                <SortableContext
                  items={columnTasks.map((t) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {columnTasks.map((task) => (
                    <SortableItem key={task.id} id={task.id} type="task">
                      {task.content}
                    </SortableItem>
                  ))}
                </SortableContext>
              </div>
            )
          })}
        </SortableContext>
      </div>
    </DndContext>
  )
}

interface Props {
  id: string
  type: DragItemType
  children: React.ReactNode
}
const SortableItem = ({ id, type, children }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: { type },
    })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px',
    marginBottom: '8px',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export default DndKitPage
