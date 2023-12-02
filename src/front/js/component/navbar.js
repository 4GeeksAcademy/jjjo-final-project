import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"

export const Navbar = () => {
	const { store, actions } = useContext(Context)




	return (
		<>		{store.token == null ?


			<nav className="navbar navbar-expand-lg navbar-light bg-secondary">
				<div className="container-fluid">
					<Link to="/">
						<img className="my-img border rounded" src="https://thumb.ac-illust.com/95/95047e9694b2c4c9367ad8e73aae7647_w.jpeg" alt="A person studying"></img>
					</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">

							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" >
									Materias
								</a>
								<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
									<li><a className="dropdown-item" href="#">Matemáticas</a></li>
									<li><a className="dropdown-item" href="#">Química</a></li>
									<li><a className="dropdown-item" href="#">Física</a></li>
									<li><a className="dropdown-item" href="#">Filosofía</a></li>
									<li><a className="dropdown-item" href="#">Programación</a></li>
									<li><hr className="dropdown-divider" /></li>
									<li><a className="dropdown-item" href="#">¿Buscas un tema diferente?</a></li>
								</ul>
							</li>
						</ul>
						{/* <form className="d-flex">
						<input className="form-control me-2" type="search" placeholder="¿Qué buscas?" aria-label="Search" />
						<button className="btn btn-outline-dark" type="submit">Buscar</button>
					</form> */}
						<Link to="/signup">
							<button className="m-2 btn btn-secondary">Crea tu cuenta</button>
						</Link>
						<Link to="/login">
							<button className="m-2 btn btn-secondary">Ingresa</button>
						</Link>
					</div>
				</div>
			</nav>
			:

			<nav className="navbar navbar-expand-lg navbar-light bg-secondary">
				<div className="container-fluid">
					<Link to="/home">
						<img className="my-img p-2" src="https://banner2.cleanpng.com/20180320/tew/kisspng-computer-icons-student-society-study-skills-icon-study-library-5ab095485d0a20.4953186515215219923811.jpg"></img>
					</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">

							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" >
									Materias
								</a>
								<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
									<li><a className="dropdown-item" href="#">Matemáticas</a></li>
									<li><a className="dropdown-item" href="#">Química</a></li>
									<li><a className="dropdown-item" href="#">Física</a></li>
									<li><a className="dropdown-item" href="#">Filosofía</a></li>
									<li><a className="dropdown-item" href="#">Programación</a></li>
									<li><hr className="dropdown-divider" /></li>
									<li><a className="dropdown-item" href="#">¿Buscas un tema diferente?</a></li>
								</ul>
							</li>
						</ul>
						{/* <form className="d-flex">
						<input className="form-control me-2" type="search" placeholder="¿Qué buscas?" aria-label="Search" />
						<button className="btn btn-outline-dark" type="submit">Buscar</button>
					</form> */}

						<Link to="/home">
							<button onClick={() => { actions.logout() }} className="m-2 btn btn-primary">Logout</button>
						</Link>
					</div>
				</div>
			</nav>
		}
		</>
	);

};
