import React, { useState, useContext } from "react"
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";


const Background = () => {

    return (
        <>
            <div className="">
                <div className="">
                    <div className="card text-center">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <Link className="nav-item" to="/user">
                                    <button className="nav-link active p-2 m-2"> Informacion general </button>
                                </Link>
                                <Link to="/user/background">
                                    <button className="nav-link active p-2 m-2" > ¿Quieres ser profesor? </button>
                                </Link>
                            </ul>
                        </div>

                        <div className="container">
                            <div className="d-flex justify-content-center m-3 border border-secondary m-3 p-3 ">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                                    <label className="form-check-label" for="flexCheckIndeterminate">
                                        ¿Quieres ser profesor?
                                    </label>
                                </div>
                            </div>
                        </div>




                        <div className="container d-flex justify-content-center">
                            <div className=" col-12 md-6 d-flex justify-content-between align-items-center border border-secondary m-3 p-3">
                                <h3 className="mb-4 p-2">¿Qué materias te gustaría enseñar?</h3>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Matemáticas</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Química</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Física</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Biología</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Programación</label>
                                </div>
                            </div>
                        </div>

                        <div className="container d-flex justify-content-center">
                            <div className="row col-12 md-6 border border-secondary m-3 p-3">

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
                </div>
            </div>
        </>
    )
}



export default Background