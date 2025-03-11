// src/components/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la ruta no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}