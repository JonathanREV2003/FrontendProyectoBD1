import React from 'react';
import { usePersonas } from '../services/usePersonas';
import { useNavigate } from 'react-router-dom';

const PersonaList = () => {
  const {
    personas,
    newPersona,
    showForm,
    isEditing,
    handleInputChange,
    handleAddClick,
    handleEditClick,
    handleDeleteClick, // Función para eliminar
    handleFormSubmit,
    handleSearchChange,
    searchTerm,
  } = usePersonas();

  const navigate = useNavigate(); 

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Personas</h1>

      {/* Botones de acciones */}
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded"
          onClick={handleAddClick}
        >
          {showForm ? 'Cancel' : 'Add'}
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/')} // Navegar a la página inicial
        >
          Back
        </button>
      </div>

      {/* Buscador */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by first name, last name or date of birth"
        className="border p-2 mb-4 w-full"
      />

      {/* Tabla de personas */}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Código Persona</th>
            <th className="border px-4 py-2">Primer Nombre</th>
            <th className="border px-4 py-2">Primer Apellido</th>
            <th className="border px-4 py-2">Fecha Nacimiento</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.codigoPersona}>
              <td className="border px-4 py-2">{persona.codigoPersona}</td>
              <td className="border px-4 py-2">{persona.primerNombre}</td>
              <td className="border px-4 py-2">{persona.primerApellido}</td>
              <td className="border px-4 py-2">{persona.fechaNacimiento}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleEditClick(persona)}
                >
                  modify
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDeleteClick(persona)}
                >
                  eliminate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario de agregar/editar */}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="mt-4">
          <h2 className="text-lg font-bold mb-2">
            {isEditing ? 'Edit Person' : 'Add New Person'}
          </h2>
          <table className="table-auto w-full border-collapse mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Código Persona</th>
                <th className="border px-4 py-2">Primer Nombre</th>
                <th className="border px-4 py-2">Segundo Nombre</th>
                <th className="border px-4 py-2">Tercer Nombre</th>
                <th className="border px-4 py-2">Primer Apellido</th>
                <th className="border px-4 py-2">Segundo Apellido</th>
                <th className="border px-4 py-2">Tercer Apellido</th>
                <th className="border px-4 py-2">Tipo Persona</th>
                <th className="border px-4 py-2">Razón Social</th>
                <th className="border px-4 py-2">Fecha Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Inputs del formulario */}
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="codigoPersona"
                    value={newPersona.codigoPersona}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="primerNombre"
                    value={newPersona.primerNombre}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="segundoNombre"
                    value={newPersona.segundoNombre}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="tercerNombre"
                    value={newPersona.tercerNombre}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="primerApellido"
                    value={newPersona.primerApellido}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="segundoApellido"
                    value={newPersona.segundoApellido}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="tercerApellido"
                    value={newPersona.tercerApellido}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="tipoPersona"
                    value={newPersona.tipoPersona}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="razonSocial"
                    value={newPersona.razonSocial}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={newPersona.fechaNacimiento}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            {isEditing ? 'Edit Person' : 'Add New Person'}
          </button>
        </form>
      )}
    </div>
  );
};

export default PersonaList;
