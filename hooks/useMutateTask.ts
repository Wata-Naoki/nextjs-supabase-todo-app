import { useMutation, useQueryClient } from 'react-query'
import { useStore } from '../store'
import { EditedTask, Task } from '../types/types'
import { supabase } from '../utils/supabase'

export const useMutateTask = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedTask)

  const createTaskMutation = useMutation(
    async (task: Omit<Task, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('todos').insert(task)
      if (error) throw new Error(error.message)
      return data
    },
    {
      // resはdata
      onSuccess: (res) => {
        alert(`${res}`)
        const previousTodos = queryClient.getQueryData<Task[]>('todos')
        if (previousTodos) {
          queryClient.setQueryData('todos', [...previousTodos, res[0]])
        }
        // キャッシュが古いとみなし、明示的に再取得もできる
        // queryClient.invalidateQueries('todos')
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  const updateTaskMutation = useMutation(
    async (task: EditedTask) => {
      const { data, error } = await supabase
        .from('todos')
        .update({ title: task.title })
        .eq('id', task.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res, variables) => {
        alert(`${res} ${res[0]} ${variables}}`)
        const previousTodos = queryClient.getQueryData<Task[]>(['todos'])
        if (previousTodos) {
          queryClient.setQueryData(
            ['todos'],
            previousTodos.map((todo) => {
              todo.id === variables.id ? res[0] : todo
            })
          )
        }

        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  const deleteTaskMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase.from('todos').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['todos'])
        if (previousTodos) {
          queryClient.setQueryData(
            ['todos'],
            previousTodos.filter((todo) => todo.id !== variables)
          )
        }
      },

      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
}
