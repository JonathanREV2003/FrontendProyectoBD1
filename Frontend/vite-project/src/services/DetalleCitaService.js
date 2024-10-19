// DetalleCitaService.js

export const obtenerCitas = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cita');
      if (!response.ok) {
        throw new Error('Error al obtener las citas');
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener citas:', error);
      throw error;
    }
  };
  
  export const obtenerFichasMascota = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/fichamascota');
      if (!response.ok) {
        throw new Error('Error al obtener las fichas de mascotas');
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener fichas de mascota:', error);
      throw error;
    }
  };
  