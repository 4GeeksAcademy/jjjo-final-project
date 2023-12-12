const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: localStorage.getItem("token") || null,
			favorites: [],
			user: {},
			teachers: []
		},
		actions: {
			// Use getActions to call a function within a fuction


			login: async (data) => {
				const store = getStore();

				try {
					let response = await fetch(`${process.env.BACKEND_URL}/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(data)
					})
					if (response.ok) {
						let result = await response.json()
						console.log(result)
						setStore({
							token: result.token

						})
						localStorage.setItem("token", result.token)
						getActions().getLogedUser()		// Esta linea trae el token del usuario logueado
						getActions().getFavorite()    //Esta linea nos trae los favoritos al hacer login
						return response.status, 200
					}
				} catch (error) {
					console.log("La información no existen en la base de datos")
					return response.status
				}
			},



			// Define a function inside the actions to consult the API and add a new user
			signup: async (data) => {
				let store = getStore()
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/signup`, {
						method: 'POST',
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(data)
					})
					return response.status
				} catch (error) {
					console.log(error)
				}
			},

			logout: () => {
				setStore({
					token: null
				})
				localStorage.removeItem("token")
			},

			addFavorite: async (item) => {
				let store = getStore()
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/favorites/user/${item.user.id}`, {
						method: 'POST',
						headers: {
							"Authorization": `Bearer ${store.token}`,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(item)
					})

					if (response.ok) {
						alert('Favorito agregado con éxito')
						getActions().getFavorite()
					}
					else {
						alert('Favorito ya existe')
					}
					return response.status

				} catch (error) {
					console.log(error)
				}

			},

			deleteFavorite: async (item) => {
				let store = getStore()
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/favorites/${item.instructor_id.id}`, {
						method: 'DELETE',
						headers: {
							"Authorization": `Bearer ${store.token}`
						}
					}
					)
					if (response.ok) {
						alert('Favorito borrado con éxito')
						getActions().getFavorite()
					}
				} catch (error) {
					console.log(error)
				}

			},

			getFavorite: async () => {
				try {
					let store = getStore()
					let response = await fetch(`${process.env.BACKEND_URL}/user/favorites`, {
						method: 'GET',
						headers: {
							"Authorization": `Bearer ${store.token}`
						}
					}

					)
					let data = await response.json()
					if (response.ok) {
						setStore({
							favorites: data
						})
					}

				} catch (error) {
					console.log(error)
				}

			},

			getLogedUser: async () => {
				const store = getStore()
				let response = await fetch(`${process.env.BACKEND_URL}/user`, {
					method: 'GET',
					headers: {
						"Authorization": `Bearer ${store.token}`
					}
				})
				console.log(response)
				let data = await response.json()
				console.log(data)
				if (response.ok) {
					setStore(
						{
							user: data
						}
					)
				}
			},


			// Define a function inside the actions to consult the API and add a modify an existing user
			updateUser: async (data) => {
				let store = getStore()
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/user`, {
						method: 'PUT',
						headers: {
							"Content-Type": "application/json", 
							"Authorization": `Bearer ${store.token}`
						},
						body: JSON.stringify(data)
					})
					return response.status
				} catch (error) {
					console.log(error)
				}
			},			

			getTeachers: async (id) => {
				let store = getStore()
				try {

					let response = await fetch(`${process.env.BACKEND_URL}/subject/${id}`)
					let data = await response.json()
					console.log(response)

					setStore({
						teachers: data
					})



				} catch (error) {
					console.log(error)
				}
			}
		}
	};
};

export default getState;
