export const agregarEspecie = async (especie) => {
    try {
      const response = await fetch('http://localhost:8080/api/especie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(especie),
      });
      if (!response.ok) {
        throw new Error('Error al agregar la especie');
      }
      return await response.json();
    } catch (error) {
      console.error('Error al agregar la especie:', error);
      throw error;
    }
  };
  
  //agregar raza
  export const agregarRaza = async (raza) => {
    try {
      const response = await fetch('http://localhost:8080/api/raza', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(raza),
      });
      if (!response.ok) {
        throw new Error('Error al agregar la raza');
      }
      return await response.json();
    } catch (error) {
      console.error('Error al agregar la raza:', error);
      throw error;
    }
  };