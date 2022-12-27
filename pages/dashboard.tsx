import { LogoutIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'
import React from 'react'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'

const Dashboard: NextPage = () => {
  const signOut = async () => {
    supabase.auth.signOut()
  }
  return (
    <div>
      <Layout title="Dashboard">
        <LogoutIcon
          className="w-6 h-6 text-gray-500 cursor-pointer"
          onClick={signOut}
        />
      </Layout>
    </div>
  )
}

export default Dashboard
