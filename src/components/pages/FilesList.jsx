// src/components/pages/FilesList.jsx

import React, { useState, useEffect } from "react";

export default function FilesList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/files")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) setFiles(data.files);
      })
      .catch((err) => console.error("Error loading files:", err));
  }, []);

  // Acción "Ver": abre el CSV en nueva pestaña
  const handleView = (filename) => {
    window.open(`http://localhost:8000/files/view/${filename}`, "_blank");
  };

  // Acción "Descargar": inicia la descarga
  const handleDownload = (filename) => {
    window.location.href = `http://localhost:8000/files/download/${filename}`;
  };

  // Acción "Eliminar": hace fetch para borrar y remueve localmente
  const handleDelete = async (filename) => {
    try {
      const resp = await fetch(`http://localhost:8000/files/delete/${filename}`);
      const data = await resp.json();
      if (data.ok) {
        setFiles((prev) => prev.filter((f) => f !== filename));
      }
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  return (
    <div>
      <h2>Archivos Generados</h2>
      {files.length > 0 ? (
        <table className="table table-bordered table-sm mt-3">
          <thead>
            <tr>
              <th>Archivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f, idx) => (
              <tr key={idx}>
                <td>{f}</td>
                <td>
                  {/* Botón "Ver" */}
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => handleView(f)}
                  >
                    Ver
                  </button>
                  {/* Botón "Descargar" */}
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleDownload(f)}
                  >
                    Descargar
                  </button>
                  {/* Botón "Eliminar" */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(f)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay archivos CSV generados aún.</p>
      )}
    </div>
  );
}