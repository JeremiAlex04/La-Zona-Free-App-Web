import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card, Badge } from 'react-bootstrap';
import { ArrowRightSquare, Download, PlayCircle } from 'react-bootstrap-icons';

const CarruselTarjetas = ({ juegos }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const getPlatformInfo = (juego) => {
    const isBrowser = juego.platform?.toLowerCase().includes('browser') ||
      juego.platform === 'Web Browser';

    return {
      isBrowser,
      badgeVariant: isBrowser ? 'success' : 'primary',
      icon: isBrowser ? <PlayCircle className="me-1" /> : <Download className="me-1" />,
      buttonText: isBrowser ? 'Jugar Ahora' : 'Descargar',
      platformName: isBrowser ? 'Navegador' : 'PC'
    };
  };

  const limitarDescripcion = (descripcion, maxLength = 80) => {
    if (descripcion.length <= maxLength) return descripcion;
    return descripcion.substring(0, maxLength) + '...';
  };

  return (
    <div className="mt-5">
      <h2 className="mb-4 text-white">Juegos más populares</h2>
      <Carousel responsive={responsive}>
        {juegos.map((juego) => {
          const platformInfo = getPlatformInfo(juego);

          return (
            <div key={juego.id} className="p-2">
              <Card className="h-100 shadow-sm border-0 d-flex flex-column" style={{ minHeight: '450px' }}>
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <Card.Img
                    variant="top"
                    src={juego.thumbnail}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                <Card.Body className="d-flex flex-column flex-grow-1">
                  <Card.Title
                    className="h6 mb-2"
                    style={{ minHeight: '40px', maxHeight: '40px', overflow: 'hidden' }}
                  >
                    {juego.title}
                  </Card.Title>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge
                      bg={platformInfo.badgeVariant}
                      className="d-flex align-items-center"
                    >
                      {platformInfo.icon}
                      {platformInfo.platformName}
                    </Badge>
                    <Badge bg="secondary" className="text-capitalize">
                      {juego.genre}
                    </Badge>
                  </div>

                  <Card.Text
                    className="text-muted small flex-grow-1"
                    style={{ minHeight: '60px', maxHeight: '60px', overflow: 'hidden' }}
                  >
                    {limitarDescripcion(juego.short_description)}
                  </Card.Text>

                  <div className="mt-auto pt-2">
                    <a
                      href={juego.game_url}
                      className={`btn ${platformInfo.isBrowser ? 'btn-success' : 'btn-primary'} w-100 d-flex align-items-center justify-content-center`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {platformInfo.buttonText}
                      <ArrowRightSquare className="ms-2" />
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarruselTarjetas;