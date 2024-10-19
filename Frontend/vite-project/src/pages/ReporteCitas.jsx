import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { obtenerReporteCitas } from '../services/reporteService';

const ReporteCitas = () => {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [reporte, setReporte] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fechaInicio || !fechaFin) {
      alert("Por favor selecciona ambas fechas.");
      return;
    }

    const fechaInicioFormatted = `${fechaInicio.toISOString().split('T')[0]}T00:00:00`;
    const fechaFinFormatted = `${fechaFin.toISOString().split('T')[0]}T23:59:59`;

    try {
      const data = await obtenerReporteCitas(fechaInicioFormatted, fechaFinFormatted);
      setReporte(data);
      setError(null);
    } catch (error) {
      setError('Error al obtener el reporte. Inténtalo de nuevo.');
      setReporte([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Reporte de Citas</h1>
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => navigate('/')}
      >
        Volver
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Fecha de Inicio:</label>
          <DatePicker
            selected={fechaInicio}
            onChange={(date) => setFechaInicio(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Selecciona fecha de inicio"
            className="border rounded-md p-2 w-full focus:ring focus:ring-gray-200"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Fecha de Fin:</label>
          <DatePicker
            selected={fechaFin}
            onChange={(date) => setFechaFin(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Selecciona fecha de fin"
            className="border rounded-md p-2 w-full focus:ring focus:ring-gray-200"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Obtener Reporte
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {reporte.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Datos del Reporte:</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">Nombre Sucursal</th>
                  <th className="px-4 py-2 border">Total de Citas</th>
                  <th className="px-4 py-2 border">Primera Cita</th>
                  <th className="px-4 py-2 border">Última Cita</th>
                </tr>
              </thead>
              <tbody>
                {reporte.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-2 border">{item.nombreSucursal}</td>
                    <td className="px-4 py-2 border">{item.totalDeCitas}</td>
                    <td className="px-4 py-2 border">{item.primeraCita}</td>
                    <td className="px-4 py-2 border">{item.ultimaCita}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReporteCitas;