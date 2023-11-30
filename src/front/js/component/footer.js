import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<div className="container">
    <div className="row">
      <div className="col-md-6">
        <p>&copy; 2023 (Nombre de la app). Todos los derechos reservados.</p>
      </div>
      <div className="col-md-6">
        <p className="text-right">Contáctanos: <a href="mailto:maildelaApp@gmail.com">maildelaApp@gmail.com</a></p>
        <p className="">Numero de contacto: +584149286826</p>
      </div>
    </div>
  </div>
	</footer>
);
export default Footer