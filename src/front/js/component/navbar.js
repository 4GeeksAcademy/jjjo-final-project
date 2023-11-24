import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"

export const Navbar = () => {
	const { actions } = useContext(Context)
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">Logo</a>
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
								<li><a className="dropdown-item" href="#">Encuentra otras materias</a></li>
							</ul>
						</li>
					</ul>
					<form className="d-flex">
						<input className="form-control me-2" type="search" placeholder="¿Qué buscas?" aria-label="Search" />
						<button className="btn btn-outline-success" type="submit">Buscar</button>
					</form>
					<Link to="/signup">
						<button className="m-2 btn btn-secondary">Crea tu cuenta</button>
					</Link>
					<Link to="/login">
						<button className="m-2 btn btn-secondary">Ingresa</button>
					</Link>
				</div>
			</div>
		</nav>





		// <nav className="navbar navbar-light bg-light">
		// 	<div className="container">

		// 		<div className="ml-auto">
		// 			<Link to="/private">
		// 				<button className="btn btn-primary">Lista de Usuarios Privada</button>
		// 			</Link>
		// 			<Link to="/login">
		// 				<button onClick={() => { actions.logout() }} className="m-2 btn btn-primary">Logout</button>
		// 			</Link>

		// 		</div>
		// 	</div>
		// </nav>
	);
};
