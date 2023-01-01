import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import React, { useEffect } from 'react'
import { useMutateNotice } from '../hooks/useMutateNotice'
import { useStore } from '../store'
import { Notice } from '../types/types'
import { supabase } from '../utils/supabase'

export const NoticeItem: React.FC<Omit<Notice, 'created_at'>> = ({
  id,
  content,
  user_id,
}) => {
  const [userId, setUserId] = React.useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedNotice)
  const { deleteNoticeMutation } = useMutateNotice()
  useEffect(() => {
    setUserId(supabase.auth.user()?.id)
  }, [])
  return (
    <div>
      <li className="my-3 text-lg font-extrabold">
        <span className="mr-3">{content}</span>
        {userId === user_id && (
          <div className="flex float-right ml-20">
            <PencilAltIcon
              className="w-5 h-5 mr-3 text-blue-500 cursor-pointer"
              onClick={() => {
                update({ id: id, content: content })
              }}
            />
            <TrashIcon
              className="w-5 h-5 text-red-500 cursor-pointer"
              onClick={() => {
                deleteNoticeMutation.mutate(id)
              }}
            />
          </div>
        )}
      </li>
    </div>
  )
}
