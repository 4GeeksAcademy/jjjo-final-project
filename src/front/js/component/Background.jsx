import React, { useState, useContext } from "react"
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";


const Background = () => {

    return (

        <div className="card text-center">
            <div className="card-header">
                <ul className="nav nav-pills card-header-pills">
                    <Link className="nav-item" to="/user">
                        <button className="nav-link active p-2 m-2"> Informacion general </button>
                    </Link>
                    <Link to="/user/background">
                        <button className="nav-link active p-2 m-2" > Antecedentes y Experiencia </button>
                    </Link>
                </ul>
            </div>
            <div className="container">
                <div className="row col-12 md-6">

                    <div className="mb-3">
                        <label for="formFile" className="form-label">Sube uno de tus certificados</label>
                        <input className="form-control" type="file" id="formFile" />
                    </div>
                    <div className="mb-3">
                        <label for="formFileMultiple" className="form-label">Sube un diploma universitario</label>
                        <input className="form-control" type="file" id="formFileMultiple" multiple />
                    </div>
                    <div className="mb-3">
                        <label for="formFileDisabled" className="form-label">Sube un video explicando un tema cualquiera</label>
                        <input className="form-control" type="file" id="formFileDisabled" disabled />
                    </div>
                </div>

            </div>
        </div>


    )
}



export default Background