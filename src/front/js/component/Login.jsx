import React, { useState, useContext } from "react"
import { Context } from "../store/appContext"
import { Navigate, useNavigate } from "react-router-dom"



const Login = () => {

    const navigate = useNavigate()
    const { actions } = useContext(Context)

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

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
        if (result) (
            navigate("/private")
        )


    }

    return (
        <>
            <div>
            <form className="container" onSubmit={handleLogin}>
                <h1 className="m-2 p-2">Login</h1>
                <label className="mx-2 p-2">Email</label>
                <input
                    type="text"
                    placeholder="E-mail"
                    className="form-control"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
                <label className="mx-2 p-2" >Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />
                <button className="m-2">Login</button>


            </form>
        </div>

        </>


    )
}
export default Login 