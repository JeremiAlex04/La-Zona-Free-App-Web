import React from 'react';

const Navbar = ({ setVista }) => {
  return (
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow py-3">
      <div className="container">
        <a className="navbar-brand fw-bold text-uppercase" href="#" onClick={() => setVista('inicio')}>LA ZONA FREE</a>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active px-3" aria-current="page" href="#" onClick={() => setVista('inicio')}>Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#" onClick={() => setVista('verificarPC')}>Verificar PC</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
