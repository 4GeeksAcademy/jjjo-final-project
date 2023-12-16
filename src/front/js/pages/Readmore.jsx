import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Readmore = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className=" container d-flex justify-content-between align-items-center">
      <img className="readmore-img mx-3" src="https://img.freepik.com/premium-photo/happy-teacher-using-her-tablet-pc_13339-165643.jpg" alt="woman teacher" />
      <div className="row">
        <div className="col-12">
          <h1 className="m-5">¿Qué es <strong>TuMentorEnLínea</strong>?</h1>
        </div>
        <div className="row">
          <div className="col-12 border border-secondary rounder mb-4">
            <h4>Objetivo de <strong>TuMentorEnLínea</strong></h4>
            <p className="mt-3"><strong>TuMentorEnLínea</strong> es una aplicacion que busca facilitar el proceso de encontrar
              profesores sobre temas específicos o alumnos potenciales para diferentes temas o materias. Esta aplicacion permite un contacto directo entre mentores y estudiantes de diferentes partes del mundo.</p> <br></br>
          </div>
          <div className="col-12 border border-secondary rounder mb-4">
            <h4 className=" m-3">¿Cómo funciona?</h4>

            <p>Al registrate como usuario podras ver los perfiles de otros usuarios, dichos perfiles pueden pertenecer a profesores o estudiantes.
              Los estudiantes tan solo necesitan un nombre de usuario, mail y su contraseña. Por otro lado, los profesores deberán proporcionar unos datos extra, esta informacion adicional
              tan solo es para verificar en que materias o áreas tienen conocimiento, certificacciones o cualquier otro método que demuestre su conocimiento. <br></br>
              Una vez completado tu registro como usurio puedes empezar a conectar con otros usuarios dentro de la página, sea como estudiante contactando a los profesores o como
              profesor recibiendo solicitudes de estudiantes para recibir mentorías.
            </p>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Readmore
