import React, { useState, useEffect } from 'react';

const EmpleadoComboBox = ({ onChange }) => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    // Primero obtenemos los empleados
    fetch('http://localhost:8080/api/empleado')
      .then((response) => response.json())
      .then((empleadosData) => {
        // Luego, por cada empleado, hacemos la llamada a la API de persona
        const empleadosConNombre = empleadosData.map(async (empleado) => {
          const personaResponse = await fetch(`http://localhost:8080/api/persona/${empleado.codigoPersona}`);
          const personaData = await personaResponse.json();
          return {
            codigoEmpleado: empleado.codigoEmpleado,
            nombreCompleto: `${personaData.primerNombre} ${personaData.primerApellido}`,
          };
        });

        Promise.all(empleadosConNombre).then(setEmpleados);
      })
      .catch((error) => console.error('Error fetching empleados:', error));
  }, []);

  return (
    <select onChange={(e) => onChange(e.target.value)}>
      <option value="">Seleccione un empleado</option>
      {empleados.map((empleado) => (
        <option key={empleado.codigoEmpleado} value={empleado.codigoEmpleado}>
          {empleado.nombreCompleto}
        </option>
      ))}
    </select>
  );
};

export default EmpleadoComboBox;
