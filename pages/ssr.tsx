import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Layout } from '../components/Layout'
import { Notice, Task } from '../types/types'
import { supabase } from '../utils/supabase'
export const getServerSideProps: GetServerSideProps = async () => {
  console.log('getServerSideProps')
  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })

  return { props: { tasks, notices } }
}
type StaticProps = {
  tasks: Task[]
  notices: Notice[]
}
const Ssr: NextPage<StaticProps> = ({ tasks, notices }) => {
  const router = useRouter()
  return (
    <div>
      <Layout title="SSR">
        <p className="mb-3 text-red-500">SSG</p>
        <ul className="mb-3">
          {tasks.map((task) => (
            <li key={task.id}>
              <p className="text-lg font-extrabold">{task.title}</p>
            </li>
          ))}
        </ul>
        <ul className="mb-3">
          {notices.map((notice) => (
            <li key={notice.id}>
              <p className="text-lg font-extrabold">{notice.content}</p>
            </li>
          ))}
        </ul>
        <Link href="/ssg" prefetch={false} className="my-3 text-xs">
          Link to ssg
        </Link>
        <Link href="/isr" prefetch={false} className="mb-3 text-xs">
          Link to isr
        </Link>
        <button onClick={() => router.push('/ssg')} className="mb-3 text-xs">
          Router to ssg
        </button>
        <button onClick={() => router.push('/isr')} className="mb-3 text-xs">
          Router to isr
        </button>
      </Layout>
    </div>
  )
}

export default Ssr
