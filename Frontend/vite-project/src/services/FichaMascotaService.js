export const obtenerFichasMascota = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/fichamascota');
      if (!response.ok) {
        throw new Error('Error al obtener las fichas de mascota');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerFichasMascota:', error);
      throw error;
    }
  };
  
  export const obtenerDescripcionEspecie = async (codigoEspecie) => {
    try {
      const response = await fetch(`http://localhost:8080/api/especie/${codigoEspecie}`);
      if (!response.ok) {
        throw new Error('Error al obtener la descripción de la especie');
      }
      const data = await response.json();
      return data.descripcion;
    } catch (error) {
      console.error('Error en obtenerDescripcionEspecie:', error);
      throw error;
    }
  };
  
  export const obtenerDescripcionRaza = async (codigoRaza) => {
    try {
      const response = await fetch(`http://localhost:8080/api/raza/${codigoRaza}`);
      if (!response.ok) {
        throw new Error('Error al obtener la descripción de la raza');
      }
      const data = await response.json();
      return data.descripcion;
    } catch (error) {
      console.error('Error en obtenerDescripcionRaza:', error);
      throw error;
    }
  };
  
  export const obtenerEspecies = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/especie');
      if (!response.ok) {
        throw new Error('Error al obtener las especies');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerEspecies:', error);
      throw error;
    }
  };
  
  export const obtenerRazas = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/raza');
      if (!response.ok) {
        throw new Error('Error al obtener las razas');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerRazas:', error);
      throw error;
    }
  };
  
  // Nueva función que agrupa la lógica para obtener fichas y sus descripciones
  export const obtenerFichasYDescripciones = async () => {
    try {
      const fichas = await obtenerFichasMascota();
  
      const especiesPromises = fichas.map(ficha => obtenerDescripcionEspecie(ficha.codigoEspecie));
      const razasPromises = fichas.map(ficha => obtenerDescripcionRaza(ficha.codigoRaza));
  
      const especiesDescriptions = await Promise.all(especiesPromises);
      const razasDescriptions = await Promise.all(razasPromises);
  
      const especiesMap = fichas.reduce((acc, ficha, index) => {
        acc[ficha.numeroFicha] = especiesDescriptions[index];
        return acc;
      }, {});
  
      const razasMap = fichas.reduce((acc, ficha, index) => {
        acc[ficha.numeroFicha] = razasDescriptions[index];
        return acc;
      }, {});
  
      return { fichas, especiesMap, razasMap };
    } catch (error) {
      console.error('Error en obtenerFichasYDescripciones:', error);
      throw error;
    }
  };
  
  export const crearFichaMascota = async (ficha) => {
    try {
      const response = await fetch('http://localhost:8080/api/fichamascota', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ficha)
      });
      if (!response.ok) {
        throw new Error('Error al crear la ficha de mascota');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en crearFichaMascota:', error);
      throw error;
    }
  };  