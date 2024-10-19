import React, { useState, useEffect } from 'react';

const ComboBoxServicio = ({ onChange }) => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/servicio')
      .then((response) => response.json())
      .then((serviciosData) => {
        // Mapear los datos de los servicios
        const serviciosConDescripcion = serviciosData.map((servicio) => ({
          codigoServicio: servicio.codigoServicio,
          descripcion: servicio.descripcion,
        }));
        setServicios(serviciosConDescripcion);
      })
      .catch((error) => console.error('Error fetching servicios:', error));
  }, []);

  return (
    <select onChange={(e) => onChange(e.target.value)}>
      <option value="">Seleccione un servicio</option>
      {servicios.map((servicio) => (
        <option key={servicio.codigoServicio} value={servicio.codigoServicio}>
          {servicio.descripcion}
        </option>
      ))}
    </select>
  );
};

export default ComboBoxServicio;
