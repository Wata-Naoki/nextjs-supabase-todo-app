import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import React from 'react'
import { useMutateTask } from '../hooks/useMutateTask'
import { useStore } from '../store'
import { Task } from '../types/types'

type Props = {
  id: Task['id']
  title: Task['title']
}
export const TaskItem: React.FC<Props> = ({ id, title }) => {
  const update = useStore((state) => state.updateEditedTask)
  const { deleteTaskMutation } = useMutateTask()
  return (
    <div>
      <li className="my-3 text-lg font-extrabold">
        <span className="mr-3">{title}</span>
        <div className="flex float-right ml-20">
          <PencilAltIcon
            className="w-5 h-5 mr-3 text-blue-500 cursor-pointer"
            onClick={() => {
              update({ id, title })
            }}
          />
          <TrashIcon
            className="w-5 h-5 text-red-500 cursor-pointer"
            onClick={() => {
              deleteTaskMutation.mutate(id)
            }}
          />
        </div>
      </li>
    </div>
  )
}
