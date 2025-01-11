import url from "./utils"

export const login = async ({username, password}) => {
	console.log({username, password})
	const res = await fetch(url + '/login/', {
		method: "POST",
		headers: {
			"Content-Type": "application/json",

		},
		body: JSON.stringify({username, password})
	})
	return res.json()
}

export const signup = async (newuserdata) => {
	const res = await fetch(url + '/signup', {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({newuserdata})
	})
	return res.json()
}