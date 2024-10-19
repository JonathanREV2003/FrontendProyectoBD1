  import { useState, useEffect } from 'react';
  import axios from 'axios';

  export const usePersonas = () => {
    const [personas, setPersonas] = useState([]); // Lista de personas
    const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
    const [newPersona, setNewPersona] = useState({
      codigoPersona: '',
      primerNombre: '',
      segundoNombre: '',
      tercerNombre: '',
      primerApellido: '',
      segundoApellido: '',
      tercerApellido: '',
      tipoPersona: '',
      razonSocial: '',
      fechaNacimiento: '',
    }); // Estado del formulario para agregar/editar
    const [showForm, setShowForm] = useState(false); // Mostrar/ocultar formulario
    const [isEditing, setIsEditing] = useState(false); // Modo edición
    const [editPersonaId, setEditPersonaId] = useState(null); // ID de la persona a editar

    // Obtener todas las personas de la API
    useEffect(() => {
      const fetchPersonas = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/persona');
          setPersonas(response.data);
        } catch (err) {
          console.error('Error al obtener personas:', err);
        }
      };

      fetchPersonas();
    }, []);

    // Manejar cambios en los inputs del formulario
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewPersona({ ...newPersona, [name]: value });
    };

    // Manejar el clic en el botón de Agregar/Editar
    const handleAddClick = () => {
      setShowForm(!showForm);
      if (!showForm) {
        setIsEditing(false);
        setNewPersona({
          codigoPersona: '',
          primerNombre: '',
          segundoNombre: '',
          tercerNombre: '',
          primerApellido: '',
          segundoApellido: '',
          tercerApellido: '',
          tipoPersona: '',
          razonSocial: '',
          fechaNacimiento: '',
        });
      }
    };

    // Manejar el clic en el botón de Editar
    const handleEditClick = (persona) => {
      setNewPersona({
        codigoPersona: persona.codigoPersona,
        primerNombre: persona.primerNombre,
        segundoNombre: persona.segundoNombre,
        tercerNombre: persona.tercerNombre,
        primerApellido: persona.primerApellido,
        segundoApellido: persona.segundoApellido,
        tercerApellido: persona.tercerApellido,
        tipoPersona: persona.tipoPersona,
        razonSocial: persona.razonSocial,
        fechaNacimiento: persona.fechaNacimiento,
      });
      setIsEditing(true);
      setEditPersonaId(persona.codigoPersona);
      setShowForm(true);
    };

    // Manejar el envío del formulario
    const handleFormSubmit = async (e) => {
      e.preventDefault();

      if (isEditing) {
        // Editar persona existente (PUT)
        try {
          const response = await axios.get(`http://localhost:8080/api/persona/${editPersonaId}`);
          if (response.data) {
            await axios.put(`http://localhost:8080/api/persona/${editPersonaId}`, newPersona);
            setPersonas(personas.map((persona) =>
              persona.codigoPersona === editPersonaId ? newPersona : persona
            ));
            setIsEditing(false);
            setEditPersonaId(null);
            setShowForm(false);
          }
        } catch (err) {
          console.error('Error al editar persona:', err);
          alert('No se encontró a la persona con ese código.');
        }
      } else {
        // Agregar nueva persona (POST)
        try {
          await axios.post('http://localhost:8080/api/persona', newPersona);
          setPersonas([...personas, newPersona]);
          setNewPersona({
            codigoPersona: '',
            primerNombre: '',
            segundoNombre: '',
            tercerNombre: '',
            primerApellido: '',
            segundoApellido: '',
            tercerApellido: '',
            tipoPersona: '',
            razonSocial: '',
            fechaNacimiento: '',
          });
          setShowForm(false);
        } catch (err) {
          console.error('Error al agregar nueva persona:', err);
        }
      }
    };

    // Manejar la eliminación de una persona
    const handleDeleteClick = async (persona) => {
      const confirmation = window.confirm(
        `¿Está seguro de eliminar a la persona: ${persona.primerNombre} ${persona.primerApellido}?`
      );

      if (confirmation) {
        try {
          await axios.delete(`http://localhost:8080/api/persona/${persona.codigoPersona}`);
          setPersonas(personas.filter(p => p.codigoPersona !== persona.codigoPersona));
        } catch (err) {
          console.error('Error al eliminar persona:', err);
          alert('Hubo un error al intentar eliminar a la persona.');
        }
      }
    };

    // Manejar el cambio del término de búsqueda
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    // Filtrar personas según el término de búsqueda
    const filteredPersonas = personas.filter((persona) =>
      persona.primerNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.primerApellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.fechaNacimiento.includes(searchTerm)
    );

    return {
      personas: filteredPersonas,
      newPersona,
      showForm,
      isEditing,
      handleInputChange,
      handleAddClick,
      handleEditClick,
      handleDeleteClick, // Agregado para la eliminación
      handleFormSubmit,
      handleSearchChange,
      searchTerm,
    };
  };