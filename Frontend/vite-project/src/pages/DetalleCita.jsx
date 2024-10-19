import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  obtenerFichasYDescripciones,
  obtenerEspecies,
  obtenerRazas,
  crearFichaMascota,
} from '../services/FichaMascotaService';
import { agregarEspecie, agregarRaza } from '../services/EspecieRazaService';

const DetalleCita = () => {
  // Estados
  const [fichasMascota, setFichasMascota] = useState([]);
  const [descripcionEspecies, setDescripcionEspecies] = useState({});
  const [descripcionRazas, setDescripcionRazas] = useState({});
  const [especies, setEspecies] = useState([]);
  const [razas, setRazas] = useState([]);
  const [codigoEspecie, setCodigoEspecie] = useState('');
  const [codigoRaza, setCodigoRaza] = useState('');
  
  const [modoCrear, setModoCrear] = useState(false);
  const [modoAgregarEspecie, setModoAgregarEspecie] = useState(false);
  const [modoAgregarRaza, setModoAgregarRaza] = useState(false); 
  const [numeroFicha, setNumeroFicha] = useState('');
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [talla, setTalla] = useState('1');

  const [nuevaEspecie, setNuevaEspecie] = useState({
    codigoEspecie: '',
    descripcion: ''
  });

  const [nuevaRaza, setNuevaRaza] = useState({
    codigoRaza: '',
    descripcion: ''
  }); 

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const { fichas, especiesMap, razasMap } = await obtenerFichasYDescripciones();
        setFichasMascota(fichas);
        setDescripcionEspecies(especiesMap);
        setDescripcionRazas(razasMap);
      } catch (error) {
        console.error('Error al cargar las fichas de mascota', error);
      }
    };

    fetchFichas();
  }, []);

  useEffect(() => {
    if (modoCrear) {
      obtenerEspecies().then(data => setEspecies(data));
    }
  }, [modoCrear]);

  useEffect(() => {
    if (codigoEspecie) {
      obtenerRazas(codigoEspecie).then(data => setRazas(data));
    }
  }, [codigoEspecie]);

  const handleCrearFicha = (e) => {
    e.preventDefault();

    const nuevaFicha = {
      numeroFicha,
      nombre,
      fechaNacimiento,
      talla: parseInt(talla),
      codigoEspecie: parseInt(codigoEspecie),
      codigoRaza: parseInt(codigoRaza)
    };

    crearFichaMascota(nuevaFicha)
      .then(response => {
        alert('Ficha creada con éxito');
      })
      .catch(error => alert('Ficha creada con éxito'));
  };

  const handleAgregarEspecie = async (e) => {
    e.preventDefault();
    try {
      await agregarEspecie(nuevaEspecie);
      alert('Especie agregada con éxito');
      setModoAgregarEspecie(false);
    } catch (error) {
      alert('Especie agregada con éxito');
      console.error('Error:', error);
    }
  };

  const handleAgregarRaza = async (e) => {
    e.preventDefault();
    try {
      await agregarRaza(nuevaRaza);
      alert('Raza agregada con éxito');
      setModoAgregarRaza(false); 
    } catch (error) {
      alert('Raza agregada con éxito');
      console.error('Error:', error);
    }
  };
  const navigate = useNavigate();
  const paraPersona = () => {
    navigate('/Agendarcita');
  };

  return (
    
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
              <button
              className={`bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${modoCrear ? 'bg-blue-600' : ''}`}
              onClick={paraPersona}
               >
              Agendar Cita
              </button>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Detalle Cita</h2>
      <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Ficha Mascota</h3>
      
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${!modoCrear ? 'bg-blue-600' : ''}`}
          onClick={() => setModoCrear(false)}
        >
          Fichas Mascotas
        </button>
        <button
          className={`bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${modoCrear ? 'bg-blue-600' : ''}`}
          onClick={() => setModoCrear(true)}
        >
          Crear Ficha
        </button>

      </div>

      {modoCrear ? (
        <form onSubmit={handleCrearFicha} className="space-y-4">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-center border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Número Ficha</th>
                  <th className="px-4 py-2 border">Especie</th>
                  <th className="px-4 py-2 border">Raza</th>
                  <th className="px-4 py-2 border">Nombre</th>
                  <th className="px-4 py-2 border">Fecha Nacimiento</th>
                  <th className="px-4 py-2 border">Talla</th>
                  <th className="px-4 py-2 border">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input className="border rounded-md p-1 w-full" type="text" value={numeroFicha} onChange={(e) => setNumeroFicha(e.target.value)} /></td>
                  <td>
                    <select className="border rounded-md p-1 w-full" value={codigoEspecie} onChange={(e) => setCodigoEspecie(e.target.value)}>
                      <option value="">Seleccione una especie</option>
                      {especies.map((especie) => (
                        <option key={especie.codigoEspecie} value={especie.codigoEspecie}>
                          {especie.descripcion}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select className="border rounded-md p-1 w-full" value={codigoRaza} onChange={(e) => setCodigoRaza(e.target.value)}>
                      <option value="">Seleccione una raza</option>
                      {razas.map((raza) => (
                        <option key={raza.codigoRaza} value={raza.codigoRaza}>
                          {raza.descripcion}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td><input className="border rounded-md p-1 w-full" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} /></td>
                  <td><input className="border rounded-md p-1 w-full" type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} /></td>
                  <td>
                    <select className="border rounded-md p-1 w-full" value={talla} onChange={(e) => setTalla(e.target.value)}>
                      <option value="1">Grande</option>
                      <option value="2">Mediano</option>
                      <option value="3">Pequeño</option>
                    </select>
                  </td>
                  <td><button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Crear Ficha</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-center border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Número Ficha</th>
                <th className="px-4 py-2 border">Especie</th>
                <th className="px-4 py-2 border">Raza</th>
                <th className="px-4 py-2 border">Nombre</th>
                <th className="px-4 py-2 border">Fecha Nacimiento</th>
                <th className="px-4 py-2 border">Talla</th>
              </tr>
            </thead>
            <tbody>
              {fichasMascota.map((ficha) => (
                <tr key={ficha.numeroFicha}>
                  <td className="border px-4 py-2">{ficha.numeroFicha}</td>
                  <td className="border px-4 py-2">{descripcionEspecies[ficha.numeroFicha]}</td>
                  <td className="border px-4 py-2">{descripcionRazas[ficha.numeroFicha]}</td>
                  <td className="border px-4 py-2">{ficha.nombre}</td>
                  <td className="border px-4 py-2">{ficha.fechaNacimiento}</td>
                  <td className="border px-4 py-2">{ficha.talla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={() => setModoAgregarEspecie(!modoAgregarEspecie)}>
          {modoAgregarEspecie ? 'Cancelar Agregar Especie' : 'Agregar Especie'}
        </button>
        <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={() => setModoAgregarRaza(!modoAgregarRaza)}>
          {modoAgregarRaza ? 'Cancelar Agregar Raza' : 'Agregar Raza'}
        </button>
      </div>

      {modoAgregarEspecie && (
        <form onSubmit={handleAgregarEspecie} className="space-y-4 mt-4">
          <table className="table-auto w-full text-center border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Código Especie</th>
                <th className="px-4 py-2 border">Descripción</th>
                <th className="px-4 py-2 border">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input className="border rounded-md p-1 w-full" type="text" value={nuevaEspecie.codigoEspecie} onChange={(e) => setNuevaEspecie({ ...nuevaEspecie, codigoEspecie: e.target.value })} /></td>
                <td><input className="border rounded-md p-1 w-full" type="text" value={nuevaEspecie.descripcion} onChange={(e) => setNuevaEspecie({ ...nuevaEspecie, descripcion: e.target.value })} /></td>
                <td><button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" type="submit">Agregar Especie</button></td>
              </tr>
            </tbody>
          </table>
        </form>
      )}

      {modoAgregarRaza && (
        <form onSubmit={handleAgregarRaza} className="space-y-4 mt-4">
          <table className="table-auto w-full text-center border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Código Raza</th>
                <th className="px-4 py-2 border">Descripción</th>
                <th className="px-4 py-2 border">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input className="border rounded-md p-1 w-full" type="text" value={nuevaRaza.codigoRaza} onChange={(e) => setNuevaRaza({ ...nuevaRaza, codigoRaza: e.target.value })} /></td>
                <td><input className="border rounded-md p-1 w-full" type="text" value={nuevaRaza.descripcion} onChange={(e) => setNuevaRaza({ ...nuevaRaza, descripcion: e.target.value })} /></td>
                <td><button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" type="submit">Agregar Raza</button></td>
              </tr>
            </tbody>
          </table>
        </form>
      )}
    </div>
  );
};

export default DetalleCita;