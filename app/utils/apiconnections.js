import url from "./utils"

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

export const createTask = async (task, token) => {
	const res = await fetch(url + '/todos', {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",

		},
		body: JSON.stringify({task})
	})
	return res.json()
}

export const updateTask = async (id, task, token) => {
	const res = await fetch(`${url}/todos/${id}`,{
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",

		},
		body: JSON.stringify({task})
	})
	return res.json()
}

export const deleteTask = async (id, token) => {
	await fetch(`${url}/todos/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		}
	})
}