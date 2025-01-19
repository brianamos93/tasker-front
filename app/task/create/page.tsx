import Form from 'next/form'
import { createTask } from "@/app/utils/apiconnections";
import { redirect } from "next/navigation";
import { getSession } from '@/app/utils/loginlib';

export default async function CreateTask() {

	const session = await getSession()

	async function submitTask(formData: FormData) {
		'use server'
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