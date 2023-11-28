import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (

    <div className="container d-flex flex-column">
      <div className="row mx-2 my-5"><h1 className="display-2">Nombre de la App</h1></div>
      <div className="row mx-2 mt-5">
        <div className="col-6">
          <div className="boder border-danger d-flex flex-column">
            <div className="border border-primary rounded mb-3"><p>(Nombre de la aplicacion) es una plataforma pensada para maestros y estudiantes que necesiten ayuda.
              Funciona de manera que los usurios puedan encontrar la mentoria particular de profesor para diversas materias, de la misma manera facilita a los mentores
              un medio para obtener esdiantes online de manera sencilla y directa...</p></div>
            <div className="mb-5"><button className="p-2 rounded mx-2">Registrate</button><button className="p-2 rounded mx-2">Leer más</button></div>
          </div>
        </div>
      </div>

      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://picsum.photos/300/200" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://picsum.photos/300/201" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://picsum.photos/300/200" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div> 
    );        
};
