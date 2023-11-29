import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Readmore = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container d-flex flex-column">
      <div className="row">
        <div className="col-6">
          <h1 className="display-2 mb-5">Que es (Nombre de la app)?</h1>
        </div>
        <div className="row">
          <div className="col-12 border border-primary rounder m-3"><p className="m-3">
            <h3>Objetivo de (Nombre de la App)</h3><p className="mt-3">(Nombre de la aplicacion) es una aplicacion con el fin de hacer mucho mas sencillo encontrar
            profesores u alumnos, esta aplicacion funciona de manera que permite un contacto directo entre mentores y estufiantes de diferentes partes del mundo.</p> <br></br>
            <h3 className="mt-3">Como funciona?</h3><br></br>
            Al registrate como usuario podras ver los perfiles de otros dentro de la página web, dichos perfiles pueden pertenecer a profesores o estudiantes.
            Los estudiantes tan solo necesitan un nombre de usuario, mail y su contraseña, por otro lado los profesores deberian proporcionar unos datos extra, esta informacion adicional
            tan solo es para verificar en que materias tienen conocimiento, certificacciones o cualquier otro metodo que demuestre tu conocimiento y pueda dar una sensación de seguridad a los estudiantes.
            <br></br>
            Una vez completado tu registro como usurio puedes empezar a conectar con otros dentro de la página, sea como estudiante agendando sesiones con los profesores o como
            profesor recibiendo solicitudes de estudiantes para recibir mentorias.</p></div>
        </div>
      </div>
    </div>


  );
};

export default Readmore
