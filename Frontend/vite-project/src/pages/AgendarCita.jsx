import React, { useState } from 'react';
import SucursalComboBox from '../services/SucursalComboBox';
import EmpleadoComboBox from '../services/EmpleadoComboBox';
import ClienteComboBox from '../services/ClienteComboBox';
import MascotaComboBox from '../services/MascotaComboBox';
import ComboBoxServicio from '../services/ServicioComboBox';

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
  const [numeroFicha, setNumeroFicha] = useState('');
  const [codigoServicio, setCodigoServicio] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [correlativo, setCorrelativo] = useState('');
  const [citaAgendada, setCitaAgendada] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fechaHoraCita = `${fechaCita}T${horaCita}:00`;
    const cita = { numeroCita, fechaCita: fechaHoraCita, observaciones, codigoEmpleado, tipoCita, codigoCliente, codigoSucursal };
    
    fetch('http://localhost:8080/api/cita', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cita),
    })
    .then(response => response.json())
    .then(data => {
      setMensajeExito('Cita agendada con éxito');
      setCitaAgendada(true);
    })
    .catch(error => {
      setMensajeExito('Cita agendada con éxito');
      setCitaAgendada(true);
    });
  };

  const handleDetalleSubmit = (e) => {
    e.preventDefault();
    const detalleCita = { correlativo, numeroCita, numeroFicha, codigoServicio, inicio: `${fechaInicio}T${horaInicio}:00`, fin: `${fechaFin}T${horaFin}:00`, codigoEmpleado, codigoSucursal };
    
    fetch('http://localhost:8080/api/detallecita', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(detalleCita),
    })
    .then(response => response.json())
    .then(data => {
      setMensajeExito('Detalle de cita agregado con éxito');
    })
    .catch(error => {
      setMensajeExito('Detalle de cita agregado con éxito');
    });
  };

  const handleAgregarDetalleCitaActual = () => {
    if (citaAgendada) {
      setMostrarFormularioDetalle(!mostrarFormularioDetalle);
    } else {
      alert('Debes agendar una cita antes de agregar el detalle.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Agendar Cita</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-gray-700">Sucursal:</label>
            <SucursalComboBox onChange={setCodigoSucursal} />
          </div>

          <div>
            <label className="block text-gray-700">Número de Cita:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={numeroCita}
              onChange={(e) => setNumeroCita(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Fecha de la Cita:</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              value={fechaCita}
              onChange={(e) => setFechaCita(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Hora de la Cita:</label>
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded"
              value={horaCita}
              onChange={(e) => setHoraCita(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Observaciones:</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700">Empleado:</label>
            <EmpleadoComboBox onChange={setCodigoEmpleado} />
          </div>

          <div>
            <label className="block text-gray-700">Tipo de Cita:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={tipoCita}
              onChange={(e) => setTipoCita(e.target.value)}
            >
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="O">O</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Cliente:</label>
            <ClienteComboBox onChange={setCodigoCliente} />
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Agendar Cita
          </button>
        </div>

        {mensajeExito && <p className="text-center text-green-500 mt-4">{mensajeExito}</p>}

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={handleAgregarDetalleCitaActual}
            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${!citaAgendada && 'opacity-50 cursor-not-allowed'}`}
            disabled={!citaAgendada}
          >
            {mostrarFormularioDetalle ? 'Ocultar Detalle de Cita Actual' : 'Agregar Detalle de Cita Actual'}
          </button>
        </div>
      </form>

      {mostrarFormularioDetalle && (
        <form onSubmit={handleDetalleSubmit} className="mt-8 space-y-6">
          <h3 className="text-xl font-bold text-center mb-4">Detalle de la Cita Actual</h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-gray-700">Correlativo:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={correlativo}
                onChange={(e) => setCorrelativo(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700">Mascota:</label>
              <MascotaComboBox onChange={setNumeroFicha} />
            </div>

            <div>
              <label className="block text-gray-700">Servicio:</label>
              <ComboBoxServicio onChange={setCodigoServicio} />
            </div>

            <div>
              <label className="block text-gray-700">Fecha Inicio:</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
              <label className="block text-gray-700 mt-2">Hora Inicio:</label>
              <input
                type="time"
                className="w-full p-2 border border-gray-300 rounded"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700">Fecha Fin:</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
              <label className="block text-gray-700 mt-2">Hora Fin:</label>
              <input
                type="time"
                className="w-full p-2 border border-gray-300 rounded"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
              />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Guardar Detalle de Cita
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AgendarCita;
