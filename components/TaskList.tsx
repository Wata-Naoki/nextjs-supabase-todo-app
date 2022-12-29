import React from 'react'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { Spinner } from './Spinner'
import { TaskItem } from './TaskItem'

export const TaskList: React.FC = () => {
  const { data: tasks, status, refetch } = useQueryTasks()
  if (status === 'loading') return <Spinner />
  if (status === 'error') return <div>Error</div>
  return (
    <div>
      <ul>
        {tasks?.map((task, index) => (
          <TaskItem key={index} id={task?.id} title={task?.title} />
        ))}
      </ul>
    </div>
  )
}
