import { useState, useEffect } from 'react';

export const useSucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSucursal, setNewSucursal] = useState({
    codigoSucursal: '',
    nombreSucursal: '',
    direccion: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editSucursalId, setEditSucursalId] = useState(null);

  useEffect(() => {
    fetchSucursales();
  }, []);

  const fetchSucursales = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sucursal');
      const data = await response.json();
      setSucursales(data);
    } catch (err) {
      console.error('Error al obtener sucursales:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSucursal({ ...newSucursal, [name]: value });
  };

  const handleAddClick = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setIsEditing(false);
      setNewSucursal({
        codigoSucursal: '',
        nombreSucursal: '',
        direccion: ''
      });
    }
  };

  const handleEditClick = (sucursal) => {
    setNewSucursal({
      codigoSucursal: sucursal.codigoSucursal,
      nombreSucursal: sucursal.nombreSucursal,
      direccion: sucursal.direccion
    });
    setIsEditing(true);
    setEditSucursalId(sucursal.codigoSucursal);
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      try {
        const response = await fetch(`http://localhost:8080/api/sucursal/${editSucursalId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSucursal),
        });
        if (response.ok) {
          setSucursales(sucursales.map((sucursal) =>
            sucursal.codigoSucursal === editSucursalId ? newSucursal : sucursal
          ));
          setIsEditing(false);
          setEditSucursalId(null);
          setShowForm(false);
        }
      } catch (err) {
        console.error('Error al editar sucursal:', err);
        alert('No se pudo editar la sucursal.');
      }
    } else {
      try {
        const response = await fetch('http://localhost:8080/api/sucursal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSucursal),
        });
        if (response.ok) {
          setSucursales([...sucursales, newSucursal]);
          setNewSucursal({
            codigoSucursal: '',
            nombreSucursal: '',
            direccion: ''
          });
          setShowForm(false);
        }
      } catch (err) {
        console.error('Error al agregar nueva sucursal:', err);
      }
    }
  };

  const handleDeleteClick = async (sucursal) => {
    const confirmation = window.confirm(
      `¿Está seguro de eliminar la sucursal: ${sucursal.nombreSucursal}?`
    );

    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:8080/api/sucursal/${sucursal.codigoSucursal}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setSucursales(sucursales.filter(s => s.codigoSucursal !== sucursal.codigoSucursal));
        }
      } catch (err) {
        console.error('Error al eliminar sucursal:', err);
        alert('Hubo un error al intentar eliminar la sucursal.');
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSucursales = sucursales.filter((sucursal) =>
    sucursal.nombreSucursal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sucursal.direccion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    sucursales: filteredSucursales,
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
  };
};