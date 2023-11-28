import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "/workspaces/jjjo-final-project/src/front/styles/index.css"

export const Private = () => {
    // const { store, actions } = useContext(Context)
    // const { userInfo, setUserInfo } = useState({});
    // const { id } = useParams()


    // const getUserInfo = () => {
    //     let result = store[user].find((item) => item.id === id)
    //     setUserInfo(result)
    //     console.log(result)
    // }

    // useEffect(() => { getUserInfo() })

    return (


        <>
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-pills card-header-pills">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Información General</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/user/:userid/following">Intereses</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="/user/:userid/background" >Antecedentes y Certificaciones</a>
                        </li>
                    </ul>
                </div>
                <div className="container">
                    <div className="container m-3 d-flex justify-content-center">
                        <img src="https://picsum.photos/50/50" className=" my-profile-img d-flex justify-content-center" alt="..." />
                        <div className="card-body">
                            <p className="card-text">Aqui va una breve descripcion de si mismo hecha por el usuario (About me)</p>
                            <p className="card-text">Espacio para que la ciudad donde vive el usuario</p>
                            <p className="card-text">Espacio opcional para link con otras redes sociales personales o profesionales</p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Nombre Completo o nombre de usuario</h5>
                    <p className="card-text">Una invitacion a seguir al usuario sea como estudiante o como profesor</p>
                    <a href="#" className="btn btn-primary">Contactame (aqui iria el link para mandar un correo electronico)</a>
                </div>
            </div>







        </>
    );
};
