import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
//import "/workspaces/jjjo-final-project/src/front/styles/index.css"

export const Subject = () => {
    const { store, actions } = useContext(Context)
    const { nature } = useParams()


    return (

        <>
            {
                nature == "chemistry" ?
                    <div className="container">
                        <div className="row col-12 md-6">
                            <div className="card mb-3">
                                <img src="https://www.cees-silicates.org/images/headers/Banner-630.jpg" className=" subject-img img-thumbnail card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Química</h5>
                                    <p className="card-text">Aqui encontraras los mejores mentores sobre química</p>

                                </div>
                            </div>
                            
                            <ul className="list-group list-group-flush">
                                <li className=" d-flex justify-content-between list-group-item">Primer profesor <button className="btn bg-info"><i onClick={() => actions.addFavorite()} className="fa-solid fa-star"></i></button></li>
                                <li className="d-flex justify-content-between list-group-item">Segundo profesor <button className="btn bg-info"><i onClick={() => actions.addFavorite()} className="fa-solid fa-star"></i></button></li>
                                <li className="d-flex justify-content-between list-group-item">Tercer profesor <button className="btn bg-info"><i onClick={() => actions.addFavorite()} className="fa-solid fa-star"></i></button></li>
                                <li className="d-flex justify-content-between list-group-item">Cuarto profesor <button className="btn bg-info"><i onClick={() => actions.addFavorite()} className="fa-solid fa-star"></i></button></li>
                                <li className="d-flex justify-content-between list-group-item">Quinto profesor <button className="btn bg-info"><i onClick={() => actions.addFavorite()} className="fa-solid fa-star"></i></button></li>
                            </ul>
                        </div>
                        <Link className="d-flex justify-content-center" to="/">
                            <button className="mt-2 btn btn-primary">Volver al Inicio</button>
                        </Link>

                    </div> :
                    nature == "physics" ?
                        <div className="container">
                            <div className="row col-12 md-6">
                                <div className="card mb-3">
                                    <img src="https://www.umsl.edu/degrees/bachelors/images/physics-banner.jpg" className=" subject-img img-thumbnail card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Física</h5>
                                        <p className="card-text">Aqui encontraras los mejores mentores sobre Física</p>
                                    </div>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className=" d-flex justify-content-between list-group-item">Primer profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                    <li className="d-flex justify-content-between list-group-item">Segundo profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                    <li className="d-flex justify-content-between list-group-item">Tercer profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                    <li className="d-flex justify-content-between list-group-item">Cuarto profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                    <li className="d-flex justify-content-between list-group-item">Quinto profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                </ul>
                            </div>
                            <Link className="d-flex justify-content-center" to="/">
                                <button className="mt-2 btn btn-primary">Volver al Inicio</button>
                            </Link>

                        </div> :
                        nature == "biology" ?
                            <div className="container">
                                <div className="row col-12 md-6">
                                    <div className="card mb-3">
                                        <img src="https://www.biologycorner.com/wp-content/uploads/google-classroom-banner-green.png" className=" subject-img img-thumbnail card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">Biología</h5>
                                            <p className="card-text">Aqui encontraras los mejores mentores sobre Biología</p>
                                        </div>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className=" d-flex justify-content-between list-group-item">Primer profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                        <li className="d-flex justify-content-between list-group-item">Segundo profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                        <li className="d-flex justify-content-between list-group-item">Tercer profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                        <li className="d-flex justify-content-between list-group-item">Cuarto profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                        <li className="d-flex justify-content-between list-group-item">Quinto profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                    </ul>
                                </div>
                                <Link className="d-flex justify-content-center" to="/">
                                    <button className="mt-2 btn btn-primary">Volver al Inicio</button>
                                </Link>

                            </div> :
                            nature == "math" ?
                                <div className="container">
                                    <div className="row col-12 md-6">
                                        <div className="card mb-3">
                                            <img src="https://as2.ftcdn.net/v2/jpg/05/08/10/35/1000_F_508103535_BvW4uJs6MKlAVrRPSwGJ1Y36t5pw0EvD.jpg" className=" subject-img img-thumbnail card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">Matemáticas</h5>
                                                <p className="card-text">Aqui encontraras los mejores mentores sobre Matemáticas</p>
                                            </div>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className=" d-flex justify-content-between list-group-item">Primer profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                            <li className="d-flex justify-content-between list-group-item">Segundo profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                            <li className="d-flex justify-content-between list-group-item">Tercer profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                            <li className="d-flex justify-content-between list-group-item">Cuarto profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                            <li className="d-flex justify-content-between list-group-item">Quinto profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                        </ul>
                                    </div>
                                    <Link className="d-flex justify-content-center" to="/">
                                        <button className="mt-2 btn btn-primary">Volver al Inicio</button>
                                    </Link>

                                </div> :
                                //                 
                                <div className="container">
                                    <div className="row col-12 md-6">
                                        <div className="card mb-3">
                                            <img src="https://sonomacounty.ca.gov/Ektron%20Images/uploadedImages/Sonoma/ISD/_Images/_carousel/ISD_System_Banner_750.jpg" className=" subject-img img-thumbnail card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">Programación</h5>
                                                <p className="card-text">Aqui encontraras los mejores mentores sobre Programación</p>
                                            </div>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className=" d-flex justify-content-between list-group-item">Primer profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                            <li className="d-flex justify-content-between list-group-item">Segundo profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                            <li className="d-flex justify-content-between list-group-item">Tercer profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                            <li className="d-flex justify-content-between list-group-item">Cuarto profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                            <li className="d-flex justify-content-between list-group-item">Quinto profesor <button className="btn bg-info"><i className="fa-solid fa-star"></i></button></li>
                                        </ul>
                                    </div>
                                    <Link className="d-flex justify-content-center" to="/">
                                        <button className="mt-2 btn btn-primary">Volver al Inicio</button>
                                    </Link>

                                </div>







            }
        </>
    );
};
