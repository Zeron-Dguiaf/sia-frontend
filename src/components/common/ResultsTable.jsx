// src/components/common/ResultsTable.jsx

import React from "react";

export default function ResultsTable({ data, onView, onDelete }) {
  /**
   * data es un array de objetos, p.ej:
   * [
   *   {
   *     "TIPO": "PAGO",
   *     "SALDO_CONTABLE": "$ -8,524,448,338,256.94",
   *     "SALDO_BANCARIO": "$ -8,514,233,385,041.41",
   *     "DIFERENCIA": "$ -10,214,953,215.53"
   *   },
   *   ...
   * ]
   * onView: callback(row) => void
   * onDelete: callback(row) => void
   */

  // 1) Validar si data está vacío
  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar.</p>;
  }

  // 2) Obtener columnas a partir de la primera fila
  const columns = Object.keys(data[0]);

  return (
    <div className="table-responsive mt-3">
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col}>
                  {row[col] !== "NaN" ? row[col] : "NaN"}
                </td>
              ))}
              <td>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => onView(row)}
                >
                  Ver
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(row)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}