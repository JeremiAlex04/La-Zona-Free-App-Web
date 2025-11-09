import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarruselDestacados = () => {
  // Datos de ejemplo. Más adelante se pueden obtener de la API.
  const juegosDestacados = [
    {
      id: 540,
      title: 'Overwatch 2',
      thumbnail: 'https://www.freetogame.com/g/540/thumbnail.jpg',
      short_description: 'Un shooter en equipo gratuito y en constante evolución de Blizzard.',
    },
    {
      id: 521,
      title: 'Diablo Immortal',
      thumbnail: 'https://www.freetogame.com/g/521/thumbnail.jpg',
      short_description: 'La legendaria saga de rol de acción de Blizzard llega a los dispositivos móviles.',
    },
    {
      id: 517,
      title: 'Lost Ark',
      thumbnail: 'https://www.freetogame.com/g/517/thumbnail.jpg',
      short_description: 'Un MMORPG de acción y fantasía con un vasto mundo por explorar.',
    },
  ];

  return (
   <div className="shadow-lg rounded-4 overflow-hidden mb-5">
      <Carousel fade>
        {juegosDestacados.map((juego) => (
          <Carousel.Item key={juego.id} interval={3000}>
            <img
              className="d-block w-100"
              src={juego.thumbnail}
              alt={juego.title}
              style={{ height: '500px', objectFit: 'cover', filter: 'brightness(0.8)' }} 
            />
            <Carousel.Caption className="bg-dark bg-opacity-75 p-4 rounded-3 mb-4 shadow-sm mx-auto" style={{maxWidth: '80%'}}>
              <h3 className="fw-bold text-uppercase">{juego.title}</h3>
              <p className="lead fs-6 mb-0">{juego.short_description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarruselDestacados;
