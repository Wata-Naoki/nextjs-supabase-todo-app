import React, { FormEvent } from 'react'
import { useMutateNotice } from '../hooks/useMutateNotice'
import { useStore } from '../store'
import { supabase } from '../utils/supabase'

export const NoticeForm = () => {
  const { editedNotice } = useStore()
  const update = useStore((state) => state.updateEditedNotice)
  const { createNoticeMutation, updateNoticeMutation } = useMutateNotice()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedNotice.id === '')
      createNoticeMutation.mutate({
        content: editedNotice.content,
        user_id: supabase.auth.user()?.id,
      })
    else {
      updateNoticeMutation.mutate({
        id: editedNotice.id,
        content: editedNotice.content,
      })
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="px-3 py-2 my-2 text-sm placeholder-gray-500 border border-gray-300 rounded focus:border-indigo-500 focus:outline-none"
        placeholder="New notice ?"
        value={editedNotice.content}
        onChange={(e) => update({ ...editedNotice, content: e.target.value })}
      />
      <button
        type="submit"
        className="px-3 py-2 ml-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 "
      >
        {editedNotice.id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
