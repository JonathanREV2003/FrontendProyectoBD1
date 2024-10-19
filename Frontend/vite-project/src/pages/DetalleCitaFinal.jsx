import React, { useEffect, useState } from 'react';
import { obtenerCitas, obtenerFichasMascota } from '../services/DetalleCitaService'; // Importamos los servicios necesarios
import './DetalleCitaFinal.css'; // Importamos el archivo de estilos

const DetalleCitaFinal = () => {
  const [citas, setCitas] = useState([]);
  const [fichasMascota, setFichasMascota] = useState([]);

  // Efecto para cargar los datos de las citas
  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const data = await obtenerCitas();
        setCitas(data);
      } catch (error) {
        console.error('Error al obtener citas:', error);
      }
    };
    fetchCitas();
  }, []);

  // Efecto para cargar los datos de las fichas de mascotas
  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const data = await obtenerFichasMascota();
        setFichasMascota(data);
      } catch (error) {
        console.error('Error al obtener fichas de mascota:', error);
      }
    };
    fetchFichas();
  }, []);

  return (
    <div className="detalle-cita-final">
      <h2 className="titulo">Citas Agendadas</h2>
      <table className="tabla-estilizada">
        <thead>
          <tr>
            <th>Número de Cita</th>
            <th>Observaciones</th>
            <th>Tipo de Cita</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.numeroCita}>
              <td>{cita.numeroCita}</td>
              <td>{cita.observaciones}</td>
              <td>{cita.tipoCita}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="titulo">Fichas de Mascotas</h2>
      <table className="tabla-estilizada">
        <thead>
          <tr>
            <th>Número de Ficha</th>
            <th>Nombre</th>
            <th>Fecha de Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {fichasMascota.map((ficha) => (
            <tr key={ficha.numeroFicha}>
              <td>{ficha.numeroFicha}</td>
              <td>{ficha.nombre}</td>
              <td>{ficha.fechaNacimiento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetalleCitaFinal;
