import { useState, useEffect } from 'react';
import axios from 'axios';

export const useServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newServicio, setNewServicio] = useState({
    codigoServicio: '',
    descripcion: '',
    tipo: '',
    precio: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editServicioId, setEditServicioId] = useState(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/servicio');
        setServicios(response.data);
      } catch (err) {
        console.error('Error al obtener servicios:', err);
      }
    };

    fetchServicios();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewServicio({ ...newServicio, [name]: value });
  };

  const handleAddClick = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setIsEditing(false);
      setNewServicio({
        codigoServicio: '',
        descripcion: '',
        tipo: '',
        precio: ''
      });
    }
  };

  const handleEditClick = (servicio) => {
    setNewServicio({
      codigoServicio: servicio.codigoServicio,
      descripcion: servicio.descripcion,
      tipo: servicio.tipo,
      precio: servicio.precio
    });
    setIsEditing(true);
    setEditServicioId(servicio.codigoServicio);
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      try {
        const response = await axios.get(`http://localhost:8080/api/servicio/${editServicioId}`);
        if (response.data) {
          await axios.put(`http://localhost:8080/api/servicio/${editServicioId}`, newServicio);
          setServicios(servicios.map((servicio) =>
            servicio.codigoServicio === editServicioId ? newServicio : servicio
          ));
          setIsEditing(false);
          setEditServicioId(null);
          setShowForm(false);
        }
      } catch (err) {
        console.error('Error al editar servicio:', err);
        alert('No se encontró el servicio con ese código.');
      }
    } else {
      try {
        await axios.post('http://localhost:8080/api/servicio', newServicio);
        setServicios([...servicios, newServicio]);
        setNewServicio({
          codigoServicio: '',
          descripcion: '',
          tipo: '',
          precio: ''
        });
        setShowForm(false);
      } catch (err) {
        console.error('Error al agregar nuevo servicio:', err);
      }
    }
  };

  const handleDeleteClick = async (servicio) => {
    const confirmation = window.confirm(`¿Está seguro de eliminar el servicio: ${servicio.descripcion}?`);

    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8080/api/servicio/${servicio.codigoServicio}`);
        setServicios(servicios.filter(s => s.codigoServicio !== servicio.codigoServicio));
      } catch (err) {
        console.error('Error al eliminar servicio:', err);
        alert('Hubo un error al intentar eliminar el servicio.');
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredServicios = servicios.filter((servicio) =>
    servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.tipo.toString().includes(searchTerm) ||
    servicio.precio.toString().includes(searchTerm)
  );

  return {
    servicios: filteredServicios,
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
  };
};