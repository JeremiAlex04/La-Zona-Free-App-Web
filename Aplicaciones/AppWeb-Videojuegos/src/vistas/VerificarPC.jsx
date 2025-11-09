import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerificarPC = () => {
  const [juegos, setJuegos] = useState([]);
  const [juegosCompatibles, setJuegosCompatibles] = useState([]);
  const [ramUsuario, setRamUsuario] = useState('');
  const [verificado, setVerificado] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerJuegos = async () => {
      try {
        const respuesta = await axios.get('/api/games');
        const juegosConRequisitos = await Promise.all(
          respuesta.data.map(async (juego) => {
            const detalles = await axios.get(`/api/game?id=${juego.id}`);
            return { ...juego, minimum_system_requirements: detalles.data.minimum_system_requirements };
          })
        );
        setJuegos(juegosConRequisitos);
      } catch (error) {
        console.error('Error al obtener los juegos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerJuegos();
  }, []);

  const verificarCompatibilidad = (e) => {
    e.preventDefault();
    setVerificado(true);
    const ramGb = parseInt(ramUsuario);
    if (isNaN(ramGb)) {
      setJuegosCompatibles([]);
      return;
    }

    const juegosFiltrados = juegos.filter((juego) => {
      if (!juego.minimum_system_requirements || !juego.minimum_system_requirements.memory) {
        return false;
      }
      const ramRequerida = parseInt(juego.minimum_system_requirements.memory.replace(/\D/g, ''));
      return !isNaN(ramRequerida) && ramGb >= ramRequerida;
    });

    setJuegosCompatibles(juegosFiltrados);
  };

  return (
    <div className="container mt-4">
      <h2>Verificar compatibilidad de PC</h2>
      <form onSubmit={verificarCompatibilidad}>
        <div className="mb-3">
          <label htmlFor="ram" className="form-label">Memoria RAM (GB)</label>
          <input
            type="number"
            className="form-control"
            id="ram"
            value={ramUsuario}
            onChange={(e) => setRamUsuario(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={cargando}>
          {cargando ? 'Cargando juegos...' : 'Verificar'}
        </button>
      </form>

      {cargando && (
        <div className="text-center mt-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p>Cargando información de los juegos, por favor espere...</p>
        </div>
      )}

      {verificado && !cargando && (
        <div className="mt-4">
          <h3>Juegos Compatibles</h3>
          {juegosCompatibles.length > 0 ? (
            <ul className="list-group">
              {juegosCompatibles.map((juego) => (
                <li className="list-group-item" key={juego.id}>
                  {juego.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron juegos compatibles con la RAM especificada.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VerificarPC;

