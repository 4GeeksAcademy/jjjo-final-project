import React, { useContext, useState } from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";

const Signup = () => {

    {/* Define a state to save the info entered into the form */ }

    const [user, setUser] = useState({
        "name": "",
        "last_name": "",
        "email": "",
        "username": "",
        "password": ""
    });

    {/* Define a function to handle the change into the user state */ }

    const handleChange = (event) => {
        setUser({
            ...user, [event.target.name]: event.target.value
        })
    }

    {/* Call useNavigate() */ }

    const navigate = useNavigate()

    {/* Destructure the Context */ }

    const { actions } = useContext(Context)

    {/* Define a function to handle the signup, namely that connects to the flux to add the user to the DB */ }

    const handleSignup = async (event) => {
        event.preventDefault()
        let result = await actions.signup(user)
        // Verifica que todos los campos requeridos estén completos
        if (user.name === "" || user.last_name === "" || user.email === "" || user.username === "" || user.password === "") {
            alert("Se deben llenar todos los datos para continuar")
            return
        }

        if (result == 400) {
            alert("Este usuario ya existe")
        }
        else if (result == 201) {
            alert("Registro exitoso")
            navigate("/login")
        }
        else {
            alert("No se pudo completar el registro. Intente despues")
        }
    }

    return (

        <form onSubmit={handleSignup}>
            {/* Enter Name */}
            <div class="mb-3">
                <label class="form-label"> Nombre </label>
                <input type="text"
                    class="form-control"
                    placeholder="Nombre"
                    name="name" /* Here we add the event.target keys (name and value) to modify the state  */
                    value={user.name}
                    onChange={handleChange}
                />
            </div>
            {/* Enter Last name */}
            <div class="mb-3">
                <label class="form-label">Apellido</label>
                <input type="text"
                    class="form-control"
                    placeholder="Apellido"
                    name="last_name"
                    value={user.last_name}
                    onChange={handleChange} />
            </div>
            {/* Enter email */}
            <div class="mb-3">
                <label class="form-label">Correo electrónico</label>
                <input type="email"
                    class="form-control"
                    placeholder="example@email.com"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
            </div>
            {/* Enter username */}
            <div class="mb-3">
                <label class="form-label">Nombre de usuario</label>
                <input type="text"
                    class="form-control"
                    placeholder="example"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                />
            </div>
            {/* Enter password */}
            <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input type="password"
                    class="form-control"
                    placeholder="Contraseña"
                    name="password"
                    value={user.password}
                    onChange={handleChange} />
            </div>
            {/* Check for receiving news from the page */}
            <div class="mb-3 form-check">
                <input type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1"> Quiero recibir noticias interesantes </label>
            </div>
            <div id="emailHelp" class="form-text"> Nunca compartiremos tu información personal sin tu permiso </div>
            <button type="submit" class="btn btn-primary"> Registrate </button>
        </form>



    )
}

export default Signup