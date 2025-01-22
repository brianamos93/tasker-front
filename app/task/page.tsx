import { Task } from "../utils/def"
import Link from "next/link"
import { deleteTask, getTasks } from "../utils/apiconnections"
import { getSession } from "../utils/loginlib"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function Tasks() {
	const tasks = await getTasks()
	const session = await getSession()
	async function deleteTaskAction(id: number) {
		'use server'
		const stringid = id.toString()
		deleteTask(stringid, session.token)
		revalidatePath('/task')
		redirect("/task")
	}
	return (
		<div>
			<h1>Tasks</h1>
			<Link href="/task/create">
			Create a New Task
			</Link>
			<ul>
				{tasks.map((task: Task) => (
					<li key={task.id}>
						<Link href={`/task/${task.id}`}>
						{task.task}
						</Link>
						<Link href={`/task/edit/${task.id}`}>
						Edit Task</Link>
						<form action={deleteTaskAction.bind(null, task.id)}>
							<button type="submit">Delete</button>
						</form>
					</li>
				))}
			</ul>
		</div>
	)
}