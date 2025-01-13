import { Task } from "../utils/def"
import Link from "next/link"
import { getSession } from "../utils/loginlib"
import { getTasks } from "../utils/apiconnections"

export default async function Tasks() {
	const session = await getSession()
	const tasks = await getTasks()
	return (
		<div>
			<h1>Tasks</h1>
			<Link href="/create">
			Create a New Task
			</Link>
			<ul>
				{tasks.map((task: Task) => (
					<li key={task.id}>
						<Link href={`/task/${task.id}`}>
						{task.task}
						</Link>
						<Link href={'/task/edit/'}>
						Edit Task</Link>
					</li>
				))}
			</ul>
		</div>
	)
}