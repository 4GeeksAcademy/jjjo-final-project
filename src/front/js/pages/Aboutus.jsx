import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Aboutus = () => {
    const { store, actions } = useContext(Context);

    return (
        // 1. Compartir la historia de por qué se fundó la empresa
        // 2. Destaca tu trayectoria y el papel de tu equipo fundador
        // 3. Documenta la evolución de la empresa
        // 4. Documenta la misión y la visión
        <div className="container">

            <div className="">
                <div className="col-12 justify-content-center m-3">
                    <h1 className="m-3 p-3">Sobre Nosotros</h1>
                </div>
            </div>
            <div className="row d-flex justify-content-around mb-3">
                <div className="col-6 ">
                    <div className="about-us-text about-us-boxes rounded overflow-auto p-1">
                        <h3 className="p-1">Misión</h3>
                        <p>En <strong>TuMentorEnLínea</strong>, nos esforzamos por facilitar el aprendizaje y la venta de servicios de mentores, así como el contacto y la búsqueda de profesores en diferentes áreas. Además, nuestro objetivo es ayudar a los mentores a encontrar alumnos de manera sencilla, con el fin de otorgar un recurso para expandir la educación y las ayudas académicas sin complicaciones mediante el uso de nuestra aplicación web. Nos comprometemos a proporcionar una plataforma de alta calidad y fácil de usar que permita a los usuarios convertirse en mentores y compartir sus conocimientos con otros. Juntos, podemos hacer que la educación sea más accesible y ayudar a las personas a alcanzar sus objetivos académicos y profesionales</p>
                    </div>
                </div>

                <div className="col-6">
                    <div className="about-us-text about-us-boxes overflow-auto p-1">
                        <h3>Visión</h3>
                        En <strong>TuMentorEnLínea</strong>, nuestra visión es convertirnos en la plataforma líder en educación en línea, ofreciendo una experiencia de aprendizaje de alta calidad a usuarios de todo el mundo. Nos esforzamos por hacer que la educación sea más accesible y asequible para todos, permitiendo que los usuarios se conviertan en mentores y compartan sus conocimientos con otros. Para lograr esto, nos comprometemos a agregar más materias a nuestra plataforma, recibir interacciones, opiniones e ideas de los usuarios y agregar más idiomas para abarcar diferentes partes del mundo. Además, nos esforzamos por mejorar continuamente la eficiencia y el diseño de nuestra plataforma para brindar una experiencia de usuario excepcional. Juntos, podemos hacer que la educación sea más accesible y ayudar a las personas a alcanzar sus objetivos académicos y profesionales.
                    </div>
                </div>
            </div>

            <div className="row d-flex justify-content-around">
                <div className="col-6 md-4">
                    <div className="about-us-boxes rounded p-2">
                        <h3 className="p-3">¿Quienes Somos?</h3>

                        <h4 className="">Omar Ramirez</h4>
                        <p className="">Un dentista colombiano con ganas de aprender de otras áreas</p>

                        <h4 className="">Juan Guerrero</h4>
                        <p className="">(Historia de Juan)</p>

                        <h4 className="">Jose Frómeta</h4>
                        <p className="">(Historia de Jose)</p>
                    </div>
                </div>
                <div className="col-6 md-4">
                    <div>
                        <img className="aboutus-img" src="https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?w=996&t=st=1702354087~exp=1702354687~hmac=a85a329734d5ef226b336ae26ced6e7c1a56c9ceb387467c8b9d8f715ba7a001" alt="coding image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aboutus