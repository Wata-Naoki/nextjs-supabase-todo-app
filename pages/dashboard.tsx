import { DocumentTextIcon, LogoutIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'
import React from 'react'
import { useQueryClient } from 'react-query'
import { Layout } from '../components/Layout'
import { NoticeForm } from '../components/NoticeForm'
import { NoticeList } from '../components/NoticeList'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { supabase } from '../utils/supabase'

const Dashboard: NextPage = () => {
  const queryClient = useQueryClient()
  const signOut = async () => {
    queryClient.removeQueries(['todos'])
    queryClient.removeQueries(['notices'])
    await supabase.auth.signOut()
  }
  return (
    <div>
      <Layout title="Dashboard">
        <LogoutIcon
          className="w-6 h-6 mb-6 text-gray-500 cursor-pointer"
          onClick={signOut}
        />
        <div className="grid grid-cols-2 gap-40">
          <div>
            <div className="flex justify-center my-3">
              <DocumentTextIcon className="w-10 h-10 text-blue-500" />
            </div>
            <TaskForm />
            <TaskList />
          </div>
          <div>
            <NoticeForm />
            <NoticeList />
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Dashboard
