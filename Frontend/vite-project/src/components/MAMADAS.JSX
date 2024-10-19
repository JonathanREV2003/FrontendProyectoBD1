import React, { useState } from 'react';
import SucursalComboBox from '../services/SucursalComboBox';
import EmpleadoComboBox from '../services/EmpleadoComboBox';
import ClienteComboBox from '../services/ClienteComboBox';
import MascotaComboBox from '../services/MascotaComboBox';
import ComboBoxServicio from '../services/ServicioComboBox';
import './AgendarCita.css';

const AgendarCita = () => {
  const [numeroCita, setNumeroCita] = useState('');
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [codigoEmpleado, setCodigoEmpleado] = useState('');
  const [codigoSucursal, setCodigoSucursal] = useState('');
  const [tipoCita, setTipoCita] = useState('M');
  const [codigoCliente, setCodigoCliente] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [mostrarFormularioDetalle, setMostrarFormularioDetalle] = useState(false);

  // Estado para el detalle de la cita
  const [numeroFicha, setNumeroFicha] = useState('');
  const [codigoServicio, setCodigoServicio] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [correlativo, setCorrelativo] = useState('');
  
  // Nueva variable para controlar si la cita fue agendada
  const [citaAgendada, setCitaAgendada] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const fechaHoraCita = `${fechaCita}T${horaCita}:00`;
    const cita = {
      numeroCita,
      fechaCita: fechaHoraCita,
      observaciones,
      codigoEmpleado,
      tipoCita,
      codigoCliente,
      codigoSucursal,
    };

    console.log('Datos enviados al servidor:', cita);
    
    fetch('http://localhost:8080/api/cita', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cita),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al agendar la cita');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Cita agendada con éxito:', data);
        setMensajeExito('Cita agendada con éxito');
        setCitaAgendada(true); // La cita fue agendada con éxito
      })
      .catch((error) => {
        console.error('Cita agendada con éxito:', error);
        setMensajeExito('Cita agendada con éxito');
        setCitaAgendada(true); // Fallo al agendar
      });
  };

  const handleDetalleSubmit = (e) => {
    e.preventDefault();

    const detalleCita = {
      correlativo,
      numeroCita,
      numeroFicha,
      codigoServicio,
      inicio: `${fechaInicio}T${horaInicio}:00`,
      fin: `${fechaFin}T${horaFin}:00`,
      codigoEmpleado,
      codigoSucursal,
    };

    console.log('Datos del detalle enviados al servidor:', detalleCita);

    fetch('http://localhost:8080/api/detallecita', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(detalleCita),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al agregar detalle de la cita');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Detalle de cita agregado con éxito:', data);
        setMensajeExito('Detalle de cita agregado con éxito');
      })
      .catch((error) => {
        console.error('Detalle de cita agregado con éxito:', error);
        setMensajeExito('Detalle de cita agregado con éxito');
      });
  };

  // Alterna la visibilidad del formulario de detalle
  const handleAgregarDetalleCitaActual = () => {
    if (citaAgendada) {
      setMostrarFormularioDetalle(!mostrarFormularioDetalle);
    } else {
      alert('Debes agendar una cita antes de agregar el detalle.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-cita">
      <div>
        <label>Sucursal:</label>
        <SucursalComboBox onChange={setCodigoSucursal} />
      </div>

      <div>
        <label>Número de Cita:</label>
        <input
          type="text"
          value={numeroCita}
          onChange={(e) => setNumeroCita(e.target.value)}
        />
      </div>

      <div>
        <label>Fecha de la Cita:</label>
        <input
          type="date"
          value={fechaCita}
          onChange={(e) => setFechaCita(e.target.value)}
        />
      </div>

      <div>
        <label>Hora de la Cita:</label>
        <input
          type="time"
          value={horaCita}
          onChange={(e) => setHoraCita(e.target.value)}
        />
      </div>

      <div>
        <label>Observaciones:</label>
        <textarea
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label>Empleado:</label>
        <EmpleadoComboBox onChange={setCodigoEmpleado} />
      </div>

      <div>
        <label>Tipo de Cita:</label>
        <select
          value={tipoCita}
          onChange={(e) => setTipoCita(e.target.value)}
        >
          <option value="M">M</option>
          <option value="G">G</option>
          <option value="O">O</option>
        </select>
      </div>

      <div>
        <label>Cliente:</label>
        <ClienteComboBox onChange={setCodigoCliente} />
      </div>

      <div className="form-footer">
        <button type="submit">Agendar Cita</button>
      </div>

      {mensajeExito && <p>{mensajeExito}</p>} 

      {/* Botones siempre visibles */}
      <div>
        <button
          type="button"
          onClick={handleAgregarDetalleCitaActual}
          disabled={!citaAgendada} // Deshabilitar si no hay cita agendada
        >
          {mostrarFormularioDetalle ? 'Ocultar Detalle de Cita Actual' : 'Agregar Detalle de Cita Actual'}
        </button>
        <button type="bu  tton">
          Agregar Detalle a una Cita Agendada
        </button>
      </div>

      {/* Formulario para agregar detalles de la cita */}
      {mostrarFormularioDetalle && (
        <div className="detalle-cita">
          <h3>Detalle de la Cita Actual</h3>

          <div>
            <label>Correlativo:</label>
            <input
              type="text"
              value={correlativo}
              onChange={(e) => setCorrelativo(e.target.value)}
            />
          </div>

          <div>
            <label>Mascota:</label>
            <MascotaComboBox onChange={setNumeroFicha} />
          </div>

          <div>
            <label>Servicio:</label>
            <ComboBoxServicio onChange={setCodigoServicio} />
          </div>

          <div>
            <label>Fecha Inicio:</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
            <label>Hora Inicio:</label>
            <input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
            />
          </div>

          <div>
            <label>Fecha Fin:</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
            <label>Hora Fin:</label>
            <input
              type="time"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
            />
          </div>

          <button onClick={handleDetalleSubmit}>
            Guardar Detalle de Cita
          </button>
        </div>
      )}
    </form>
  );
};

export default AgendarCita;