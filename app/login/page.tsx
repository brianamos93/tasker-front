"use client";
import { login } from '@/app/utils/authconnections'
import { setToken } from '../utils/apiconnections';
import { useRouter } from "next/navigation";
import { useState } from "react";
import Notification from '@/app/components/Notification'

export default function Home() {
  const { push } = useRouter();
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<null | string>(null)

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    try {
      const user = await login({username, password})
      window.localStorage.setItem(
        'loggedTaskappUser', JSON.stringify(user)
      )
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      //push('/task')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      console.log(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <main>
      <Notification message={errorMessage} />
      <h1>Login</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
            className="border rounded border-black"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
            className="border rounded border-black"
          />
        </div>

        <button
          type="submit"
          className="p-2 bg-orange-600 text-white w-fit rounded"
        >
          Submit
        </button>
      </form>
    </main>
  );
}