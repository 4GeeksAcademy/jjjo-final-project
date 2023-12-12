import React, { useContext, useState } from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";

const Update = () => {

    {/* Define a state to save the info entered into the form */ }

    const [user, setUser] = useState({
        "name": "",
        "last_name": "",
        "email": "",
        "username": "",
        "password": "",
        "description": ""
    });

    {/* Call useNavigate() */ }

    const navigate = useNavigate()

    {/* Destructure the Context */ }

    const { actions } = useContext(Context)

    {/* Define a function to handle the change into the user state */ }

    const handleChange = (event) => {
        setUser({
            ...user, [event.target.name]: event.target.value
        })
    }
    {/* Define a function to handle the signup, namely that connects to the flux to add the user to the DB */ }

const handleUpdate = async (event) => {
    event.preventDefault()

    let result = await actions.updateUser(user)
    
    alert("Actualización de datos exitosa")
    navigate("/user")
}    

    return (
        <form onSubmit={handleUpdate}>
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

            <div class="mb-3">
                <label class="form-label"> Apellido </label>
                <input type="text"
                    class="form-control"
                    placeholder="Apellido"
                    name="last_name"
                    value={user.last_name}
                    onChange={handleChange}  
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input type="email"
                    className="form-control"
                    placeholder="example@email.com" 
                    name="email"
                    value={user.email}
                    onChange={handleChange} 
                    />
            </div>

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

            <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input type="password"
                    class="form-control"
                    placeholder="Contraseña"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label"> Cuentanos sobre ti </label>
                <textarea className="form-control" 
                rows="3"
                name="description"
                value={user.description}
                onChange={handleChange}
                ></textarea>
            </div>
            <button type="submit" class="btn btn-primary"> Actualizar </button>
        </form>
    )

}

export default Update