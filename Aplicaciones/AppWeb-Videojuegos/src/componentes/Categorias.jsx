import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categorias = ({ onSelectCategory }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('/api/genres');
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return <p>Cargando categorías...</p>;
  }

  return (
    <div className="mb-4">
      <h3 className="mb-3">Categorías</h3>
      <div>
        {genres.map((genre) => (
          <button
            key={genre}
            className="btn btn-outline-secondary me-2 mb-2"
            onClick={() => onSelectCategory(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
