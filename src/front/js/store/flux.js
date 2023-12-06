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
	
			user: {}
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
						getActions().getLogedUser()
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
			
			addFavorite: (itemToSave) => {
				let store = getStore()
				let exists = store.favorites.some((item) => item.id == itemToSave.id)
				if (exists) {
					let newArr = store.favorites.filter((item) => item.id != itemToSave.id)

					setStore({
						favorites: newArr
					})
				} else {
					setStore({
						favorites: [...store.favorites, itemToSave]
					})
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
				if (response.ok) {
					setStore(
						{
							user: data
						}
					)
				}


			}
		}
	};
};

export default getState;
