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
        // Verifica que todos los campos requeridos estén completos
        if (user.name === "" || user.last_name === "" || user.email === "" || user.username === "" || user.password === "") {
            alert("Se deben llenar todos los datos para continuar")
            return
        }
        else {
            let result = await actions.signup(user)


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
    }

    return (
        <>
            <div className="container">
                <div className="row m-3 p-2">
                    <form className="border border-secondary " onSubmit={handleSignup}>
                        <h1 className="d-flex justify-content-center bg bg-secondary rounded text-white m-2 p-2">Ingresa tus datos</h1>
                        {/* Enter Name */}
                        <div className="mb-3">
                            <label className="form-label"> Nombre </label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="name" /* Here we add the event.target keys (name and value) to modify the state  */
                                value={user.name}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Enter Last name */}
                        <div className="mb-3">
                            <label className="form-label">Apellido</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Apellido"
                                name="last_name"
                                value={user.last_name}
                                onChange={handleChange} />
                        </div>
                        {/* Enter email */}
                        <div className="mb-3">
                            <label className="form-label">Correo electrónico</label>
                            <input type="email"
                                className="form-control"
                                placeholder="ejemplo@email.com"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Enter username */}
                        <div className="mb-3">
                            <label className="form-label">Nombre de usuario</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Tu nombre de usuario"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Enter password */}
                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                value={user.password}
                                onChange={handleChange} />
                        </div>
                        {/* Check for receiving news from the page */}
                        {/*<div className="mb-3 form-check">
                            <input type="checkbox"
                                className="form-check-input"
                                id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1"> Quiero recibir noticias interesantes </label>
                        </div>*/}
                        <div id="emailHelp" className="form-text"> Nunca compartiremos tu información personal sin tu permiso </div>
                        <button type="submit" className="m-2 btn btn-primary"> Registrate </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup