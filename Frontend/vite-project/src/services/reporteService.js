export const obtenerReporteCitas = async (fechaInicio, fechaFin) => {
    const url = `http://localhost:8080/api/reporte-citas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerReporteCitas:', error);
      throw error;
    }
  };