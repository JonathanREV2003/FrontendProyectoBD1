import React, { useState, useEffect } from 'react';

const DiagnosticoComboBox = ({ onChange }) => {
  const [diagnosticos, setDiagnosticos] = useState([]);

  useEffect(() => {
    // Obtenemos los diagnósticos de la API
    fetch('http://localhost:8080/api/diagnostico')
      .then((response) => response.json())
      .then((diagnosticosData) => {
        // Transformamos los datos en el formato necesario para el ComboBox
        const diagnosticosList = diagnosticosData.map((diagnostico) => ({
          codigoDiagnostico: diagnostico.codigoDiagnostico,
          descripcion: diagnostico.descripcion,
        }));
        setDiagnosticos(diagnosticosList);
      })
      .catch((error) => console.error('Error fetching diagnosticos:', error));
  }, []);

  return (
    <select onChange={(e) => onChange(e.target.value)}>
      <option value="">Seleccione diagnósticos</option>
      {diagnosticos.map((diagnostico) => (
        <option key={diagnostico.codigoDiagnostico} value={diagnostico.codigoDiagnostico}>
          {diagnostico.descripcion}
        </option>
      ))}
    </select>
  );
};

export default DiagnosticoComboBox;