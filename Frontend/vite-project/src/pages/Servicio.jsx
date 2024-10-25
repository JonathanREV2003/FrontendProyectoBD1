import React from 'react';
import { useServicios } from '../services/useServicio';
import { useNavigate } from 'react-router-dom';

const Servicio = () => {
  const {
    servicios,
    newServicio,
    showForm,
    isEditing,
    handleInputChange,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleFormSubmit,
    handleSearchChange,
    searchTerm,
  } = useServicios();

  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Servicios</h1>

      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded"
          onClick={handleAddClick}
        >
          {showForm ? 'Cancelar' : 'Agregar'}
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/')}
        >
          Volver
        </button>
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar por descripción, tipo o precio"
        className="border p-2 mb-4 w-full"
      />

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Código Servicio</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Tipo</th>
            <th className="border px-4 py-2">Precio</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio) => (
            <tr key={servicio.codigoServicio}>
              <td className="border px-4 py-2">{servicio.codigoServicio}</td>
              <td className="border px-4 py-2">{servicio.descripcion}</td>
              <td className="border px-4 py-2">{servicio.tipo}</td>
              <td className="border px-4 py-2">{servicio.precio}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleEditClick(servicio)}
                >
                  Modificar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDeleteClick(servicio)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="mt-4">
          <h2 className="text-lg font-bold mb-2">
            {isEditing ? 'Editar Servicio' : 'Agregar Nuevo Servicio'}
          </h2>
          <table className="table-auto w-full border-collapse mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Código Servicio</th>
                <th className="border px-4 py-2">Descripción</th>
                <th className="border px-4 py-2">Tipo</th>
                <th className="border px-4 py-2">Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="codigoServicio"
                    value={newServicio.codigoServicio}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="descripcion"
                    value={newServicio.descripcion}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    name="tipo"
                    value={newServicio.tipo}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    name="precio"
                    value={newServicio.precio}
                    onChange={handleInputChange}
                    className="border p-1"
                    step="0.01"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            {isEditing ? 'Editar Servicio' : 'Agregar Nuevo Servicio'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Servicio;