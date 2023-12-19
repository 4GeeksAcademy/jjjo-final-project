import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
//import "/workspaces/jjjo-final-project/src/front/styles/index.css"


//const getCharacterInfo = () => {
//    let result = store[nature].find((item) => item._id === id)
//    setCharacter(result)
//    console.log(result)
//}

const UserDetail = ( ) => {

    const { store, actions } = useContext(Context)

    return (
        <>
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-pills card-header-pills">
                        <Link class="nav-item" to="/user">
                            <button class="nav-link active p-2 m-2"> Información general </button>
                        </Link>
                        <Link to="/user/background">
                            <button class="nav-link active p-2 m-2" > ¿Quieres ser profesor? </button>
                        </Link>
                    </ul>
                </div>
                <div className="container">
                    <div className="container m-3 d-flex justify-content-center">
                        <div className="d-flex flex-column">
                            <div className="">
                                {/* cambiar estilo */}
                                <img className="" src={store.user_to_see.avatar}></img>
                            </div>

                        </div>
                        <div className="card-body border">
                            <h1 className="card-title">{store.user_to_see.name}  {store.user_to_see.last_name} </h1>
                            <h5 className="p-3 mb-2 bg-secondary text-white bg-opacity-75 rounded">Nombre de Usuario</h5>
                            <p className="card-text">{store.user_to_see.username} </p>
                            <h5 className="p-3 mb-2 bg-secondary text-white bg-opacity-75 rounded">Correo electrónico {/*- Contáctame */} </h5>
                            <h3 className="card-text">{store.user_to_see.email}</h3>
                            <h5 className="p-3 mb-2 bg-secondary text-white bg-opacity-75 rounded">Un poco mas sobre mi...</h5>
                            <p className="card-text">{store.user_to_see.description}</p>
                        </div>
                    </div>
                </div>
                <div className="card-body">

                </div>
            </div>

        </>
    )
}

export default UserDetail