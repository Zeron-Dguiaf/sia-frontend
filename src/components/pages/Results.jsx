// src/components/pages/Results.jsx

import React, { useState, useEffect } from "react";
import ResultsTable from "../common/ResultsTable";

export default function Results() {
  const [dfData, setDfData] = useState([]);     // array de objetos
  const [loading, setLoading] = useState(true); // para mostrar "cargando"
  const [error, setError] = useState(null);     // para mostrar errores

  // 1) Cargar datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ajusta la URL a tu endpoint real, por ejemplo:
        // http://localhost:8000/procesar  (si devuelves array) o
        // http://localhost:8000/files, etc.
        const resp = await fetch("http://localhost:8000/api/resultados");
        if (!resp.ok) {
          throw new Error(`HTTP error, status = ${resp.status}`);
        }
        const result = await resp.json();
        // Asumiendo que 'result' es un array de objetos como:
        // [
        //   { TIPO: "PAGO", SALDO_CONTABLE: "...", SALDO_BANCARIO: "...", DIFERENCIA: "..." },
        //   ...
        // ]
        setDfData(result);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2) Callback al hacer click en "Ver"
  const handleView = (row) => {
    alert(`Ver fila:\n${JSON.stringify(row, null, 2)}`);
  };

  // 3) Callback al hacer click en "Borrar"
  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      `¿Está seguro de borrar TIPO=${row.TIPO}?`
    );
    if (!confirmDelete) return;

    // Ejemplo: si tu backend soporta DELETE en /api/resultados/:tipo
    // Nota: esto depende de que tengas un ID único, o uses row.TIPO, etc.
    /*
    try {
      const resp = await fetch(`http://localhost:8000/api/resultados/${row.id}`, {
        method: "DELETE"
      });
      if (resp.ok) {
        setDfData((prev) => prev.filter((item) => item !== row));
      } else {
        throw new Error(`Error al borrar. status=${resp.status}`);
      }
    } catch (err) {
      alert(`Error: ${err}`);
    }
    */

    // Si no tienes endpoint delete, sólo quitas la fila localmente (demo):
    setDfData((prev) => prev.filter((item) => item !== row));
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  // 4) Render
  return (
    <div>
      <h2>Resultados</h2>
      <ResultsTable data={dfData} onView={handleView} onDelete={handleDelete} />

      <hr />
      <a href="/" className="btn btn-link mt-3">
        <i className="fa fa-arrow-circle-left"></i> Volver al inicio
      </a>
    </div>
  );
}