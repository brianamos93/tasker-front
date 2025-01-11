"use client"
import { Task } from "../utils/def"
import { getTasks, setToken } from "../utils/apiconnections"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Tasks() {

	const [tasks, setTasks] = useState([])
	const [user, setUser] = useState<null | string>(null)

	useEffect(() => {
		getTasks().then(tasks => {
			setTasks(tasks)
		})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedTaskappuser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			setToken(user.token)
		}
	}, [])

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