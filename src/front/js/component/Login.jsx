import React, { useState, useContext } from "react"
import { Context } from "../store/appContext"
import { Navigate, useNavigate } from "react-router-dom"



const Login = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState(false)


    const handleChange = (event) => {
        event.preventDefault()
        setUser({
            ...user,
            [event.target.name]: event.target.value

        })

    }

    const handleLogin = async (event) => {
        event.preventDefault()
        let result = await actions.login(user)
        console.log(result)
        if (result == 200) {
            navigate(`/user`)
            setError(false)
        } else {
            setError(true)
            console.log("Debes introducir los datos correctos")
        }
    }

    return (
        <>
            <div className="container d-flex justify-content-center">
                <div className="row col-6 ">
                    {error ? <div className="alert alert-danger d-flex justify-content-center m" role="alert">
                        Los datos son incorrectos
                    </div> : ""}
                    <form className="container border border-secondary m-2" onSubmit={handleLogin}>
                        <h1 className="d-flex justify-content-center bg bg-secondary rounded text-white m-2 p-2">Bienvenido</h1>
                        <label className="mx-2 p-2">Email</label>
                        <input
                            type="text"
                            placeholder="Ingresa tu correo electrónico"
                            className="form-control"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                        <label className="mx-2 p-2" >Password</label>
                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            className="form-control"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                        <button type="submit" className="m-2 btn btn-primary"> Ingresa </button>


                    </form>
                </div>
            </div>

        </>


    )
}

export default Login
