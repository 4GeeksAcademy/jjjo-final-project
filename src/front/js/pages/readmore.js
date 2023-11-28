import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Readmore = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container d-flex flex-column">
      <div className="row">
        <div className="col-6">
          <h1 className="display-2">Que es (Nombre de la app)?</h1>
        </div>
        <div className="row">
          <div className="col-12 border border-primary rounder">(Nombre de la aplicacion) es una aplicacion con el fin de hacer mucho mas sencillo encontrar
          profesores u alumnos, esta aplicacion funciona de manera que permite un contacto directo entre mentores y estufiantes de diferentes partes del mundo. <br></br></div>
        </div>
      </div>
    </div>
   
    );        
};
