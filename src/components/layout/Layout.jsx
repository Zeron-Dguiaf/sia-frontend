// src/components/layout/Layout.jsx
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
//import './Layout.css'; // si quieres estilos específicos

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="layout-main">
          { children }
        </main>
      </div>
      <Footer />
    </div>
  );
}