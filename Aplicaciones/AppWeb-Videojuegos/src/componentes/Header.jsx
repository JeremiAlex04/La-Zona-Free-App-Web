import React from 'react';

const Header = () => {
  return (
    <header className="bg-dark bg-gradient text-white text-center py-5 mb-4 shadow-lg border-bottom border-4 border-primary">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <h1 className="display-3 fw-bold mb-3 text-primary">
              <i className="bi bi-joystick me-3"></i>
              La Zona Free
            </h1>
            <p className="lead fs-4 mb-4 text-light opacity-90">
              Catálogo de juegos 100% gratuitos para PC y navegador
            </p>
            
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
              <div className="d-flex align-items-center bg-primary bg-opacity-25 rounded-pill px-4 py-2 border border-primary">
                <i className="bi bi-windows text-primary me-2 fs-5"></i>
                <span className="text-white fw-medium">Descargables PC</span>
              </div>
              
              <div className="d-flex align-items-center bg-success bg-opacity-25 rounded-pill px-4 py-2 border border-success">
                <i className="bi bi-browser-chrome text-success me-2 fs-5"></i>
                <span className="text-white fw-medium">Jugar en Navegador</span>
              </div>
              
              <div className="d-flex align-items-center bg-warning bg-opacity-25 rounded-pill px-4 py-2 border border-warning">
                <i className="bi bi-tags text-warning me-2 fs-5"></i>
                <span className="text-white fw-medium">Todos los Géneros</span>
              </div>
            </div>

            <div className="mt-5">
              <div className="bg-secondary bg-opacity-10 rounded p-4 border border-secondary">
                <h5 className="text-warning mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  Sobre nuestro catálogo
                </h5>
                <div className="row text-center">
                  <div className="col-md-4 mb-3">
                    <i className="bi bi-arrow-clockwise text-success fs-4"></i>
                    <p className="text-light mb-0 mt-2">Catálogo actualizado</p>
                  </div>
                  <div className="col-md-4 mb-3">
                    <i className="bi bi-currency-dollar text-primary fs-4"></i>
                    <p className="text-light mb-0 mt-2">Solo juegos gratis</p>
                  </div>
                  <div className="col-md-4 mb-3">
                    <i className="bi bi-play-circle text-info fs-4"></i>
                    <p className="text-light mb-0 mt-2">Juega instantáneamente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
