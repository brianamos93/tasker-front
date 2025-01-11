import { getTask, setToken } from "@/app/utils/apiconnections";
import { useEffect, useState } from "react";

export default function EditTask({params}: {params: Promise<{ id: string }>
}) {
	const [user, setUser] = useState<null | string>(null)

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedTaskappUser')
			if (loggedUserJSON) {
				const user = JSON.parse(loggedUserJSON)
				setUser(user)
				setToken(user.token)
			}
	}, [])

	//const task = await getTask((await params).id)
	useEffect(() => {
		if(id) {
			const fetchTask = async () => {
				const data = await getTask((await params).id)
			}
		}
	})
}