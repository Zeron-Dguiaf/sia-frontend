// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav className="app-sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/files">Archivos Generados</Link></li>
        {/* Agrega más links según tu app */}
      </ul>
    </nav>
  );
}