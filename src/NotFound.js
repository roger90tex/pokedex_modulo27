import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, no pudimos encontrar lo que buscabas.</p>
      <Link to="/" style={{ color: '#4CAF50', textDecoration: 'none' }}>
        Regresar a la página principal
      </Link>
    </div>
  );
};

export default NotFound;