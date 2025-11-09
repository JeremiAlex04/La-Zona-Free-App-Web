import React, { useState } from 'react';
import Navbar from './componentes/Navbar';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Inicio from './vistas/Inicio';
import VerificarPC from './vistas/VerificarPC';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [vista, setVista] = useState('inicio');

  const renderizarVista = () => {
    if (vista === 'inicio') {
      return <Inicio />;
    } else if (vista === 'verificarPC') {
      return <VerificarPC />;
    }
  };

  return (
    <div>
      <Navbar setVista={setVista} />
      <Header />
      <main className="container-fluid mt-4">
        {renderizarVista()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
