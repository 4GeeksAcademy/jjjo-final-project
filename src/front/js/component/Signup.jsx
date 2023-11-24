import React from "react"

const Signup = () => {

    return (

        <form>
            {/* Enter Name */}
            <div class="mb-3">
                <label class="form-label"> Nombre </label>
                <input type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp" />
            </div>
            {/* Enter Last name */}
            <div class="mb-3">
                <label class="form-label">Apellido</label>
                <input type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp" />
            </div>
            {/* Enter email */}
            <div class="mb-3">
                <label class="form-label">Correo electrónico</label>
                <input type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp" />
            </div>
            {/* Enter username */}
            <div class="mb-3">
                <label class="form-label">Nombre de usuario</label>
                <input type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp" />
            </div>
            {/* Enter password */}
            <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input type="password"
                    class="form-control"
                    id="exampleInputPassword1" />
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