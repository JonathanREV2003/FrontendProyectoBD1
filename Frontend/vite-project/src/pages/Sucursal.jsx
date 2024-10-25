import React from 'react';
import { useSucursales } from '../services/useSucursales';

const Sucursal = () => {
  const {
    sucursales,
    newSucursal,
    showForm,
    isEditing,
    searchTerm,
    handleInputChange,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleFormSubmit,
    handleSearchChange,
  } = useSucursales();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Sucursales</h1>

      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded"
          onClick={handleAddClick}
        >
          {showForm ? 'Cancelar' : 'Agregar'}
        </button>
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar por nombre o dirección"
        className="border p-2 mb-4 w-full"
      />

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Código Sucursal</th>
            <th className="border px-4 py-2">Nombre Sucursal</th>
            <th className="border px-4 py-2">Dirección</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sucursales.map((sucursal) => (
            <tr key={sucursal.codigoSucursal}>
              <td className="border px-4 py-2">{sucursal.codigoSucursal}</td>
              <td className="border px-4 py-2">{sucursal.nombreSucursal}</td>
              <td className="border px-4 py-2">{sucursal.direccion}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleEditClick(sucursal)}
                >
                  Modificar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDeleteClick(sucursal)}
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
            {isEditing ? 'Editar Sucursal' : 'Agregar Nueva Sucursal'}
          </h2>
          <table className="table-auto w-full border-collapse mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Código Sucursal</th>
                <th className="border px-4 py-2">Nombre Sucursal</th>
                <th className="border px-4 py-2">Dirección</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="codigoSucursal"
                    value={newSucursal.codigoSucursal}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="nombreSucursal"
                    value={newSucursal.nombreSucursal}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="direccion"
                    value={newSucursal.direccion}
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
            {isEditing ? 'Editar Sucursal' : 'Agregar Nueva Sucursal'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Sucursal;