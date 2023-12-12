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
						<img className="my-img p-2" src="https://thumb.ac-illust.com/95/95047e9694b2c4c9367ad8e73aae7647_w.jpeg" alt="A person studying"></img>
					</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">


							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle btn bg-primary text-white rounded" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" >
									Materias
								</a>
								<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
									<li className="d-flex justify-content-between align-items-center"><Link className="dropdown-item" to="/math/5">Matemáticas </Link><i className="fa-sharp fa-solid fa-square-root-variable mx-2"></i></li>
									<li className="d-flex justify-content-between align-items-center"><Link className="dropdown-item" to="/chemistry/1">Química </Link><i className="fa-solid fa-flask-vial mx-2"></i></li>
									<li className="d-flex justify-content-between align-items-center"><Link className="dropdown-item" to="/physics/2">Física </Link><i className="fa-solid fa-atom mx-2" ></i></li>
									<li className="d-flex justify-content-between align-items-center"><Link className="dropdown-item" to="/biology/3">Biologia </Link><i className="fa-solid fa-dna mx-2"></i></li>
									<li className="d-flex justify-content-between align-items-center"><Link className="dropdown-item" to="/coding/4">Programación </Link><i className="fa-solid fa-code mx-2"></i></li>
									{/* <li><hr className="dropdown-divider" /></li>
									<li><a className="dropdown-item" href="#">¿Buscas un tema diferente?</a></li> */}
								</ul>
							</li>
						</ul>
						{/* <form className="d-flex">
						<input className="form-control me-2" type="search" placeholder="¿Qué buscas?" aria-label="Search" />
						<button className="btn btn-outline-dark" type="submit">Buscar</button>
					</form> */}
						<Link to="/signup">
							<button className="m-2 btn btn-primary">Crea tu cuenta</button>
						</Link>
						<Link to="/login">
							<button className="m-2 btn btn-primary">Ingresa</button>
						</Link>
					</div>
				</div>
			</nav>
			:

			<nav className="navbar navbar-expand-lg navbar-light bg-secondary">
				<div className="container-fluid">
					<Link to="/">
						<img className="my-img p-2" src="https://thumb.ac-illust.com/95/95047e9694b2c4c9367ad8e73aae7647_w.jpeg" alt="A person studying"></img>
					</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">

							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle bg-primary text-white rounded" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" >
									Materias
								</a>
								<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
									<li className="d-flex justify-content-between align-items-center"><Link className="dropdown-item" to="/math/5">Matemáticas </Link><i className="fa-sharp fa-solid fa-square-root-variable mx-2"></i></li>
									<li className="d-flex justify-content-between align-items-center"><Link className="dropdown-item" to="/chemistry/1">Química </Link><i className="fa-solid fa-flask-vial mx-2"></i></li>
									<li className="d-flex justify-content-between align-items-center"><Link className="dropdown-item" to="/physics/2">Física </Link><i className="fa-solid fa-atom mx-2" ></i></li>
									<li className="d-flex justify-content-between align-items-center"><Link className="dropdown-item" to="/biology/3">Biologia </Link><i className="fa-solid fa-dna mx-2"></i></li>
									<li className="d-flex justify-content-between align-items-center"><Link className="dropdown-item" to="/coding/4">Programación </Link><i className="fa-solid fa-code mx-2"></i></li>
									{/* <li><hr className="dropdown-divider" /></li> */}
									{/* <li><a className="dropdown-item" href="#">¿Buscas un tema diferente?</a></li> */}
								</ul>
							</li>

						</ul>
						{/* <form className="d-flex">
						<input className="form-control me-2" type="search" placeholder="¿Qué buscas?" aria-label="Search" />
						<button className="btn btn-outline-dark" type="submit">Buscar</button>
					</form> */}
						<Link to="/user">
							<h5 className="text-white mx-3"> Hola, {`${store.user.name}`}</h5>
						</Link>
						<div className="ml-auto">
							<button className="btn btn-secondary dropdown-toggle bg-primary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
								Favoritos ({store.favorites.length})
							</button>
							<ul className="dropdown dropdown-menu dropdown-menu-end bg-warning">
								{
									store.favorites.map((item) => {
										return (
											<li key={item.instructor_id?.id} className="d-flex justify-content-between align-items-center">
												<p className="dropdown-item my-1">{`${item.instructor_id?.name} ${item.instructor_id?.last_name}`}</p><i onClick={() => actions.deleteFavorite(item)} className="fa-solid fa-trash mx-2"></i>
											</li>
										)
									})
								}
							</ul>
						</div>
						<Link to="/">
							<button onClick={() => { actions.logout() }} className="m-2 btn btn-primary">Cerrar sesión</button>
						</Link>
					</div>
				</div>
			</nav>
		}
		</>
	);

};
