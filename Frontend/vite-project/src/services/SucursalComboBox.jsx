// Supuesto código de SucursalComboBox
import React, { useEffect, useState } from 'react';

const SucursalComboBox = ({ onChange }) => {
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    // Cargar sucursales desde la API
    fetch('http://localhost:8080/api/sucursal')
      .then((response) => response.json())
      .then((data) => setSucursales(data))
      .catch((error) => console.error('Error al cargar sucursales:', error));
  }, []);

  const handleSelectChange = (e) => {
    const selectedCodigo = e.target.value;
    onChange(selectedCodigo); // Pasar el código seleccionado al padre
  };

  return (
    <select onChange={handleSelectChange}>
      <option value="">Seleccione una sucursal</option>
      {sucursales.map((sucursal) => (
        <option key={sucursal.codigoSucursal} value={sucursal.codigoSucursal}>
          {sucursal.nombreSucursal}
        </option>
      ))}
    </select>
  );
};

export default SucursalComboBox;