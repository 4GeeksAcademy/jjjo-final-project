import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (

    <div className="container">
      <div className="my-3 m-b2"><h2 className="display-2">TuMentorEnLinea</h2></div>
      <div className="col-12 md-6">
        <div className="d-flex">
          <div className="">
            <div className="boder border-danger d-flex flex-column">
              <div className="border border-secondary p-3 mb-2"><p>TuMentorEnLinea es una plataforma pensada para maestros y estudiantes que necesiten ayuda.
                Funciona de manera que los usuarios puedan encontrar la mentoría particular de profesores para diversas materias. De la misma manera, facilita a los mentores
                un medio para contactar estudiantes potenciales online de manera sencilla y directa...</p></div>
              <div className="mb-3 d-flex justify-content-around">
                <Link to="/readmore">
                  <button className="p-2 rounded mx-2">Leer más</button>
                </Link>
                <Link to="/aboutus">
                  <button className="p-2 rounded mx-2">Sobre Nosotros</button>
                </Link>
              </div>

            </div>
          </div>
        </div>

        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://www.freewebheaders.com/gc-mathematics-1600x400/white-mathematical-equations-black-banner_gc-banner-1600x400_249136.jpg" className="carousel-img d-block w-100" alt="baner de física" />
              <div className="carousel-caption d-md-block bg-secondary p-2 text-white bg-opacity-75">
                {/* <Link to="/subject/2">
                  <h5 className="text-white">Física</h5>
                </Link> */}
                <h5 className="text-white">Física</h5>
                <p>Todo es relativo</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://www.cees-silicates.org/images/headers/Banner-630.jpg" className="carousel-img d-block w-100" alt="baner de química" />
              <div className="carousel-caption d-none d-md-block bg-secondary p-2 text-white bg-opacity-75">
                {/* <Link to="/subject/1">
                  <h5 className="text-white">Química</h5>
                </Link> */}
                <h5 className="text-white">Química</h5>
                <p>Encuentra tu mentor de Química.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://www.biologycorner.com/wp-content/uploads/google-classroom-banner-green.png" className="carousel-img d-block w-100" alt="baner de biología" />
              <div className="carousel-caption d-none d-md-block bg-secondary p-2 text-white bg-opacity-75">
                {/* <Link to="/subject/3">
                  <h5 className="text-white">Biología</h5>
                </Link> */}
                <h5 className="text-white">Biología</h5>
                <p>¿Olvidaste el ciclo de Krebs?</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://sonomacounty.ca.gov/Ektron%20Images/uploadedImages/Sonoma/ISD/_Images/_carousel/ISD_System_Banner_750.jpg" className="carousel-img d-block w-100" alt="baner de programación" />
              <div className="carousel-caption d-none d-md-block bg-secondary p-2 text-white bg-opacity-75">
                {/* <Link to="/subject/4">
                  <h5 className="text-white">Programación</h5> 
                </Link>*/}
                <h5 className="text-white">Programación</h5>
                <p>Aprendimos mucho en 4Geeks</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://as2.ftcdn.net/v2/jpg/05/08/10/35/1000_F_508103535_BvW4uJs6MKlAVrRPSwGJ1Y36t5pw0EvD.jpg" className="carousel-img d-block w-100" alt="baner de matemáticas" />
              <div className="carousel-caption d-none d-md-block bg-secondary p-2 text-white bg-opacity-75">
                {/* <Link to="/subject/5">
                  <h5 className="text-white">Matemáticas</h5>
              </Link> */}
                <h5 className="text-white">Matemáticas</h5>
                <p>¿Problemas con alguna ecuación?</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>


        {/* <div id="carouselExampleControls" className=" carousel slide d-flex center" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="col-6 md-4 carousel-item active">
              <img src="https://www.umsl.edu/degrees/bachelors/images/physics-banner.jpg" className="d-block " alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://www.cees-silicates.org/images/headers/Banner-630.jpg" className="d-block " alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://www.biologycorner.com/wp-content/uploads/google-classroom-banner-green.png" className="d-block " alt="..." />
            </div>
            <div className="carousel-item ">
              <img src="https://sonomacounty.ca.gov/Ektron%20Images/uploadedImages/Sonoma/ISD/_Images/_carousel/ISD_System_Banner_750.jpg" className="d-block " alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://as2.ftcdn.net/v2/jpg/05/08/10/35/1000_F_508103535_BvW4uJs6MKlAVrRPSwGJ1Y36t5pw0EvD.jpg" className="d-block " alt="..." />
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
        </div> */}
      </div>
    </div >
  );
};

export default Home