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
			teachers: [],
			subjects: [],
			teach_subjects: []
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
						getActions().getFavorite() // Esta linea es para actualizar la informacion del favorito
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
				// if (response.ok){
				// 	getActions().getLogedUser()
				// }
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
					getActions().getLogedUser()
					return response.status
				} catch (error) {
					console.log(error)
				}
			},

			getTeachers: async (id) => {
				let store = getStore()
				console.log(id)
				try {

					let response = await fetch(`${process.env.BACKEND_URL}/subject/${id}`)
					let data = await response.json()
					// console.log(response)

					setStore({
						teachers: data
					})



				} catch (error) {
					console.log(error)
				}
			},

			getTeacherSubjects: async () => {
				let store = getStore()
				try {

					let response = await fetch(`${process.env.BACKEND_URL}/subjects`)
					let data = await response.json()
					console.log(response)

					setStore({
						teach_subjects: data
					})



				} catch (error) {
					console.log(error)
				}
			},

			// Funcion para agregar materias que el usuario desea enseñar

			addSubject: async (id) => {
				let store = getStore()
				try {
					console.log(id)
					let response = await fetch(`${process.env.BACKEND_URL}/subjects/${id}`, {
						method: 'POST',
						headers: {
							"Authorization": `Bearer ${store.token}`,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(id)
					})

					if (response.ok) {
						alert('Materia agregado con éxito')
						getActions().getTeacherSubjects()
					}
					else {
						alert('Ya enseñas esta materia')
					}
					return response.status

				} catch (error) {
					console.log(error)
				}

			},


			getAllSubjects: async () => {
				try {
					let store = getStore()
					let response = await fetch(`${process.env.BACKEND_URL}/subjects/all`, {
						method: 'GET',
						headers: {
							"Authorization": `Bearer ${store.token}`
						}
					}

					)
					let data = await response.json()
					if (response.ok) {
						setStore({
							subjects: data
						})
					}

				} catch (error) {
					console.log(error)
				}

			},

			deleteSubject: async (item) => {
				let store = getStore()
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/subjects/${item.id}`, {
						method: 'DELETE',
						headers: {
							"Authorization": `Bearer ${store.token}`
						}
					}
					)
					if (response.ok) {
						alert('Ya no enseñas este materia')
						getActions().getTeacherSubjects()
					}
				} catch (error) {
					console.log(error)
				}

			},
			
			saveUser: async (user) => {
				let store = getStore();
	// No es necesario pasar un header por como se maneja este formulario con la funcion formData
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/user/avatar`, {
						method:"PUT",
						headers: {
							"Authorization": `Bearer ${store.token}`
						},
						body:user
					})
					console.log(response)
					if (response.ok){
					getActions().getLogedUser()
				}
					return response.status
				} catch (error) {
					console.log(error)
				}
			}

		}
	};
};

export default getState;
