import { redirect } from "next/navigation"
import { signup } from "../utils/loginlib"

export default async function Page() {

	return (
		<section>
			<form action={async (formData) => {
				'use server'
				await signup(formData)
				redirect('/login')
			}}>
				<input type="text" name="username" id="username" placeholder="username" />
				<br />
				<input type="email" name="email" id="email" placeholder="email@email.com" />
				<br />
				<input type="password" name="password" id="password" placeholder="password" />
				<button type="submit">Signup</button>
			</form>
		</section>
	)
}