import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRightSquare } from 'react-bootstrap-icons';

import CarruselDestacados from '../componentes/CarruselDestacados';
import CarruselTarjetas from '../componentes/CarruselTarjetas';
import Categorias from '../componentes/Categorias';

const Inicio = () => {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    const obtenerJuegos = async () => {
      setCargando(true);
      try {
        const url = categoria ? `/api/games?category=${categoria}` : '/api/games';
        const respuesta = await axios.get(url);
        setJuegos(respuesta.data);
      } catch (error) {
        setError('Error al obtener los juegos. Por favor, inténtalo de nuevo más tarde.');
        console.error('Error al obtener los juegos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerJuegos();
  }, [categoria]);

  const juegosFiltrados = juegos.filter((juego) =>
    juego.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  const juegosPopulares = juegos.slice(0, 10);

  if (cargando) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <CarruselDestacados />
      <div className="container mt-4">
        <div className="mb-4 mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar juegos por título..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <Categorias onSelectCategory={setCategoria} />
        <CarruselTarjetas juegos={juegosPopulares} />
        <h2 className="mb-4 mt-5">{categoria ? `Juegos de ${categoria}` : 'Todos los juegos'}</h2>
        <div className="row">
          {juegosFiltrados.map((juego) => (
            <div className="col-md-4 mb-4" key={juego.id}>
              <div className="card h-100 shadow-sm">
                <img src={juego.thumbnail} className="card-img-top" alt={juego.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{juego.title}</h5>
                  <p className="card-text text-muted">{juego.short_description}</p>
                  <a href={juego.game_url} className="btn btn-outline-primary mt-auto" target="_blank" rel="noopener noreferrer">
                    Jugar ahora <ArrowRightSquare className="ms-2" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;

