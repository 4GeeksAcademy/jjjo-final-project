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
						<img className="my-img p-2" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Fman-pictogram&psig=AOvVaw2jmh94r2WoYwLwBQyPspnl&ust=1700948680537000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLCR5-HN3YIDFQAAAAAdAAAAABAJ" alt="A person studying"></img>
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
									<li><a className="dropdown-item" href="/math">Matemáticas</a></li>
									<li><a className="dropdown-item" href="/chemistry">Química</a></li>
									<li><a className="dropdown-item" href="/physics">Física</a></li>
									<li><a className="dropdown-item" href="/biology">Biologia</a></li>
									<li><a className="dropdown-item" href="/coding">Programación</a></li>
									<li><hr className="dropdown-divider" /></li>
									<li><a className="dropdown-item" href="#">¿Buscas un tema diferente?</a></li>
								</ul>
							</li>
						</ul>
						{/* <form className="d-flex">
						<input className="form-control me-2" type="search" placeholder="¿Qué buscas?" aria-label="Search" />
						<button className="btn btn-outline-dark" type="submit">Buscar</button>
					</form> */}
						<div className="ml-auto">
							<button className="btn btn-secondary dropdown-toggle bg-primary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
								Favoritos ({store.favorites.length})
							</button>
							<ul className="dropdown dropdown-menu dropdown-menu-end bg-warning">
								{
									store.favorites.map((item) => {
										return (
											<li key={item._id} className="d-flex justify-content-between align-items-center">
												<p className="dropdown-item my-1">{item.properties.name}</p><i onClick={() => actions.deleteFavorite(item)} className="fa-solid fa-trash mx-2"></i>
											</li>
										)
									})
								}
							</ul>
						</div>
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
						<img className="my-img p-2" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Fman-pictogram&psig=AOvVaw2jmh94r2WoYwLwBQyPspnl&ust=1700948680537000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLCR5-HN3YIDFQAAAAAdAAAAABAJ" alt="A person studying"></img>
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
									<li><a className="dropdown-item" href="/math">Matemáticas</a></li>
									<li><a className="dropdown-item" href="/chemistry">Química</a></li>
									<li><a className="dropdown-item" href="/physics">Física</a></li>
									<li><a className="dropdown-item" href="/biology">Biologia</a></li>
									<li><a className="dropdown-item" href="/coding">Programación</a></li>
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
