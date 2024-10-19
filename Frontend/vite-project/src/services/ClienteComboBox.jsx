import React, { useState, useEffect } from 'react';

const ClienteComboBox = ({ onChange }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Primero obtenemos los clientes
    fetch('http://localhost:8080/api/cliente')
      .then((response) => response.json())
      .then((clientesData) => {
        // Luego, por cada cliente, hacemos la llamada a la API de persona
        const clientesConNombre = clientesData.map(async (cliente) => {
          const personaResponse = await fetch(`http://localhost:8080/api/persona/${cliente.codigoPersona}`);
          const personaData = await personaResponse.json();
          return {
            codigoCliente: cliente.codigoCliente,
            nombreCompleto: `${personaData.primerNombre} ${personaData.primerApellido}`,
          };
        });

        Promise.all(clientesConNombre).then(setClientes);
      })
      .catch((error) => console.error('Error fetching clientes:', error));
  }, []);

  return (
    <select onChange={(e) => onChange(e.target.value)}>
      <option value="">Seleccione un cliente</option>
      {clientes.map((cliente) => (
        <option key={cliente.codigoCliente} value={cliente.codigoCliente}>
          {cliente.nombreCompleto}
        </option>
      ))}
    </select>
  );
};

export default ClienteComboBox;
