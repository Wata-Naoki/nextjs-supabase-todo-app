import { BadgeCheckIcon, ShieldCheckIcon } from '@heroicons/react/solid'
import React from 'react'
import { Layout } from '../components/Layout'
import { Spinner } from '../components/Spinner'
import { useMutateAuth } from '../hooks/useMutateAuth'

const Auth = () => {
  const [isLogin, setIsLogin] = React.useState(true)
  // useMutateAuthを呼ぶ
  const {
    loginMutation,
    registerMutation,
    email,
    password,
    setEmail,
    setPassword,
  } = useMutateAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    } else {
      registerMutation.mutate()
    }
  }

  return (
    <Layout title="Auth">
      <ShieldCheckIcon className="w-10 h-10 text-blue-500" />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            required
            className="px-3 py-2 my-2 text-sm placeholder-gray-500 border border-gray-300 rounded focus:border-indigo-500 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="px-3 py-2 my-2 text-sm placeholder-gray-500 border border-gray-300 rounded focus:border-indigo-500 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className="flex items-center justify-center my-6 text-sm">
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium cursor-pointer hover:text-indigo-500"
          >
            change mode ?
          </span>
        </div>
        <button
          type="submit"
          className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md group hover:bg-indigo-700"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <BadgeCheckIcon className="w-5 h-5" />
          </span>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </Layout>
  )
}

export default Auth
