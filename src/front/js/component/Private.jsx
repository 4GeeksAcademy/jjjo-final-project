import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
//import "/workspaces/jjjo-final-project/src/front/styles/index.css"

export const Private = () => {
    const { store, actions } = useContext(Context)



    return (


        <>
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-pills card-header-pills">
                        <Link class="nav-item" to="/user">
                            <button class="nav-link active p-2 m-2"> Informacion general </button>
                        </Link>
                        <Link to="/user/background">
                            <button class="nav-link active p-2 m-2" > ¿Quieres ser profesor? </button>
                        </Link>
                    </ul>
                </div>
                <div className="container">
                    <div className="container m-3 d-flex justify-content-center">
                        <img src="https://picsum.photos/50/50" className=" my-profile-img d-flex justify-content-center" alt="..." />
                        <div className="card-body border">
                            {/* <p className="card-text">{store.user.location}</p> */}
                            <h1 className="card-title">{store.user.name}  {store.user.last_name} </h1>
                            <h5 className="p-3 mb-2 bg-secondary text-white bg-opacity-75 rounded">Nombre de Usuario</h5>
                            <p className="card-text">{store.user.username} </p>
                            <h5 className="p-3 mb-2 bg-secondary text-white bg-opacity-75 rounded">Correo electrónico - Contáctame</h5>
                            <h3 className="card-text">{store.user.email}</h3>
                            <h5 className="p-3 mb-2 bg-secondary text-white bg-opacity-75 rounded">Un poco mas sobre mi...</h5>
                            <p className="card-text">{store.user.description}</p>
                        </div>
                    </div>
                </div>
                <div className="card-body">

                    <p className="card-text">Una invitacion a seguir al usuario sea como estudiante o como profesor</p>
                    <Link to="/user/update">
                        <a href="#" className="btn btn-primary">Modifica tu información</a>
                    </Link>

                </div>
            </div>







        </>
    );
};
