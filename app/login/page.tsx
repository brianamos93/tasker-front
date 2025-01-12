import { redirect } from "next/navigation";
import { getSession, login, logout } from '@/app/utils/loginlib'

export default async function Page() {
  const session = await getSession()
  return (
    <section>
      <form action={async (formData) => {
        'use server'
        await login(formData)
        redirect('/')
      }}
      >
        <input type="text" name="username" id="username" placeholder="username" />
        <br />
        <input type="password" name="password" placeholder="password" id="password" />
        <br />
        <button type="submit">
        Login
        </button>
      </form>
      <form action={async () => {
        'use server'
        await logout()
        redirect('/')
      }}
      >
        <button type="submit">Logout</button>
      </form>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  )

}