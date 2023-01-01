import React from 'react'
import { useMutateTask } from '../hooks/useMutateTask'
import { useStore } from '../store'
import { supabase } from '../utils/supabase'

export const TaskForm = () => {
  const { editedTask } = useStore()
  const update = useStore((state) => state.updateEditedTask)
  const { createTaskMutation, updateTaskMutation } = useMutateTask()
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === '') {
      createTaskMutation.mutate({
        title: editedTask.title,
        user_id: supabase.auth.user()?.id,
      })
    } else {
      updateTaskMutation.mutate({
        id: editedTask.id,
        title: editedTask.title,
      })
    }
  }
  return (
    <div>
      TaskForm
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="px-3 py-2 my-2 text-sm placeholder-gray-500 border border-gray-300 rounded focus:border-indigo-500 focus:outline-none"
          placeholder="New Task"
          value={editedTask.title}
          onChange={(e) => {
            update({ ...editedTask, title: e.target.value })
          }}
        />
        <button className="px-3 py-2 ml-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
          {editedTask.id === '' ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}
