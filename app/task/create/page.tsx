import Form from 'next/form'
import { createTask, setToken } from "@/app/utils/apiconnections";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react"

export default function CreateTask() {
	const [user, setUser] = useState<null | string>(null)

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedTaskappUser')
			if (loggedUserJSON) {
				const user = JSON.parse(loggedUserJSON)
				setUser(user)
				setToken(user.token)
			}
	}, [])

	async function submitTask(formData: FormData) {
		const newtask = formData.get("task")
		await createTask(newtask)
		redirect('/tasks')
	}
	
	return (
		<Form action={submitTask}>
			<input name="task" />
			<button type="submit">Submit</button>
		</Form>
	)
}