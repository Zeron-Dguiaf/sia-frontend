// src/components/pages/Home.jsx
import React, { useState } from 'react';

export default function Home() {
  const [proceso, setProceso] = useState("");
  const [ejercicio, setEjercicio] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [result, setResult] = useState(null);

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = 2010; y <= currentYear; y++) {
    years.push(y);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    try {
      const resp = await fetch("http://localhost:8000/procesar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proceso,
          ejercicio,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
        }),
      });
      const data = await resp.json();
      console.log("Respuesta del backend:", data);
      setResult(data); // puedes mostrarlo en pantalla
    } catch (err) {
      console.error("Error al procesar:", err);
    } finally {
      setSpinner(false);
    }
  };

  const toggleQFields = (value) => {
    setProceso(value);
    // si Q1/Q2 => mostrar 3 campos extra
  };

  return (
    <div>
      <h2 className="mb-4">Sistema de Conciliación</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="proceso" className="form-label">
            Seleccione un proceso:
          </label>
          <select
            name="proceso"
            id="proceso"
            className="form-select mb-3"
            value={proceso}
            onChange={(e) => toggleQFields(e.target.value)}
          >
            <option value="">Seleccionar...</option>
            <option value="Q1">Totalizador Q1</option>
            <option value="Q2">Totalizador Q2</option>
            <option value="BANCO">Banco</option>
            <option value="NOTA">Nota</option>
            <option value="CHEQUE">Cheque</option>
            <option value="CHEQUE_DIF">Cheque ≠</option>
            <option value="C10">C-10</option>
          </select>
        </div>

        {(proceso === "Q1" || proceso === "Q2") && (
          <div>
            <div className="mb-2">
              <label htmlFor="ejercicio">Ejercicio (Año)</label>
              <select
                id="ejercicio"
                className="form-select"
                value={ejercicio}
                onChange={(e) => setEjercicio(e.target.value)}
              >
                <option value="">Seleccionar año...</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="fecha_inicio" className="form-label">
                Fecha Inicio
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha_inicio"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="fecha_fin" className="form-label">
                Fecha Fin
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha_fin"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Ejecutar
        </button>
      </form>

      <hr />
      <a href="/files" className="btn btn-secondary">
        Ver archivos generados
      </a>

      {spinner && (
        <div className="text-center mt-4">
          <div className="spinner-border spinner" role="status">
            <span className="visually-hidden">Procesando...</span>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-3">
          <h4>Resultado:</h4>
          {result.ok ? (
            <pre>{JSON.stringify(result.data, null, 2)}</pre>
          ) : (
            <p>Error: {result.error}</p>
          )}
        </div>
      )}
    </div>
  );
}