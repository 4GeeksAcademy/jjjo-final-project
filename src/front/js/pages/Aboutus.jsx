import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Aboutus = () => {
    const {store, actions} = useContext(Context);

    return(
        // 1. Compartir la historia de por qué se fundó la empresa
        // 2. Destaca tu trayectoria y el papel de tu equipo fundador
        // 3. Documenta la evolución de la empresa
        // 4. Documenta la misión y la visión
        <div className="container d-flex flex-column">
            <div className="row">
                <div className="col-12 justify-content-center aling-item-center">
                    <h1 className="display-2 mb-5">Sobre nosotros</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-6 border border-primary rounded m-4">
                    <p className="m-3"><h3>Misión</h3>
                    (Apartado para explicar misión del proyecto</p>
                </div>
                {/* <div className="col-6">posible imagen</div> */}
            </div>
            <div className="row">
                <div className="col-6 border border-primary rounded my-4">
                    <p className="m-3"><h3>Visión</h3>
                    (Apartado para explicar visión del proyecto</p>
                </div>
                {/* <div className="col-6">posible imagen</div> */}
            </div>
            <div className="row">
                {/* <div className="col-6">(posible imagen)</div> */}
                <div className="col-6 border border-primary rounded justify-content-end my-4">
                    <p className="m-3"><h3 className="m-3">Nuestra historia</h3>
                    (Explicar quien es cada paticipante y porque creamos el proyecto)</p>

                    <h4 className="m-3">Omar Ramirez</h4>
                    <p className="mx-3">(Historia de Omar)</p>

                    <h4 className="m-3">Juan Guerrero</h4>
                    <p className="mx-3">(Historia de Juan)</p>

                    <h4 className="m-3">Jose Frómeta</h4>
                    <p className="mx-3">(Historia de Jose)</p>
                </div>
            </div>
        </div>
    );
};

export default Aboutus