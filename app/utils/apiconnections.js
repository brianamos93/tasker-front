import url from "./utils"

let token = null

export const setToken = newToken => {  
	token = `Bearer ${newToken}`
}

export const getTasks = async () => {
	const res = await fetch(url + '/todos')
	return res.json()
}

export const getTasksList = async () => {
	const res = await fetch(url + '/todos/list')
	return res.json()
}

export const getTask = async (id) => {
	const res = await fetch(`${url}/todos/${id}`)
	return res.json()
}

export const createTask = async (task) => {
	const res = await fetch(url + '/todos', {
		method: "POST",
		headers: {
			Authorization: token,
			"Content-Type": "application-json",

		},
		body: JSON.stringify({task})
	})
	return res.json()
}

export const updateTask = async (id, task) => {
	const res = await fetch(`${url}/todos/${id}`,{
		method: "PUT",
		headers: {
			Authorization: token,
			"Content-Type": "application-json",

		},
		body: JSON.stringify({task})
	})
	return res.json()
}

export const deleteTask = async (id) => {
	await fetch(`${url}/todos/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: token,
			"Content-Type": "application-json",
		}
	})
}