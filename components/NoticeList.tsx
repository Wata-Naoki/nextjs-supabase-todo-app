import React from 'react'
import { useQueryNotices } from '../hooks/useQueryNotices'
import { NoticeItem } from './NoticeItem'
import { Spinner } from './Spinner'

export const NoticeList: React.FC = () => {
  const { data: notices, status } = useQueryNotices()
  if (status === 'loading') return <Spinner />
  if (status === 'error') return <div>Error</div>

  return (
    <div>
      <ul>
        {notices?.map((notice, index) => (
          <NoticeItem
            key={index}
            id={notice?.id}
            content={notice.content}
            user_id={notice.user_id}
          />
        ))}
      </ul>
    </div>
  )
}
