import React, { useState, useEffect } from 'react';

const MascotaComboBox = ({ onChange }) => {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener las fichas de mascotas
    fetch('http://localhost:8080/api/fichamascota')
      .then((response) => response.json())
      .then((mascotasData) => {
        // Mapear los datos de las mascotas
        const mascotasConNombre = mascotasData.map((mascota) => ({
          numeroFicha: mascota.numeroFicha,
          nombreMascota: mascota.nombre,
        }));
        setMascotas(mascotasConNombre);
      })
      .catch((error) => console.error('Error fetching mascotas:', error));
  }, []);

  return (
    <select onChange={(e) => onChange(e.target.value)}>
      <option value="">Seleccione una mascota</option>
      {mascotas.map((mascota) => (
        <option key={mascota.numeroFicha} value={mascota.numeroFicha}>
          {mascota.nombreMascota}
        </option>
      ))}
    </select>
  );
};

export default MascotaComboBox;
