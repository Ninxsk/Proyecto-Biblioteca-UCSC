import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';

const CrearTaller = ({ onSuccess }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [jornadas, setJornadas] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);

  const horaInicio = watch("inicio");
  const horaFin = watch("fin");

  // Cargar jornadas y solicitudes desde el backend
  useEffect(() => {
    const fetchJornadas = async () => {
      try {
        const response = await axios.get('http://10.1.0.74/api/jornada/'); // URL correcta para jornadas
        setJornadas(response.data);
      } catch (error) {
        console.error("Error al cargar jornadas:", error);
      }
    };

    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get('http://10.1.0.74/api/solicitudes/'); // URL correcta para solicitudes
        setSolicitudes(response.data);
      } catch (error) {
        console.error("Error al cargar solicitudes:", error);
      }
    };

    fetchJornadas();
    fetchSolicitudes();
  }, []);

  const onSubmit = async (data) => {
    if (horaInicio >= horaFin) {
      Swal.fire({
        title: 'Error',
        text: 'La hora de inicio debe ser anterior a la hora de término.',
        icon: 'error',
      });
      return;
    }

    try {
      await axios.post('http://10.1.0.74/api/talleres/', data);

      Swal.fire({
        title: 'Taller Creado',
        text: 'El taller ha sido creado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      if (onSuccess) onSuccess(); // Refrescar lista al cerrar modal
      document.getElementById('cerrarModal').click(); // Cerrar el modal automáticamente
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.detail || 'Hubo un error al crear el taller.',
        icon: 'error',
      });
    }
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#crearTallerModal"
      >
        Crear Taller
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="crearTallerModal"
        tabIndex="-1"
        aria-labelledby="crearTallerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="crearTallerModalLabel">Crear Nuevo Taller</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="cerrarModal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  {/* Nombre */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                      id="nombre"
                      className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                      {...register('nombre', { required: 'El nombre es obligatorio' })}
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                  </div>

                  {/* Relator */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="relator" className="form-label">Relator</label>
                    <input
                      id="relator"
                      className={`form-control ${errors.relator ? 'is-invalid' : ''}`}
                      {...register('relator', { required: 'El relator es obligatorio' })}
                    />
                    {errors.relator && <div className="invalid-feedback">{errors.relator.message}</div>}
                  </div>
                </div>

                <div className="row">
                  {/* Fecha */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha</label>
                    <input
                      type="date"
                      id="fecha"
                      className={`form-control ${errors.fecha ? 'is-invalid' : ''}`}
                      {...register('fecha', { required: 'La fecha es obligatoria' })}
                    />
                    {errors.fecha && <div className="invalid-feedback">{errors.fecha.message}</div>}
                  </div>

                  {/* Hora de Inicio */}
                  <div className="col-md-3 mb-3">
                    <label htmlFor="inicio" className="form-label">Hora de Inicio</label>
                    <input
                      type="time"
                      id="inicio"
                      className={`form-control ${errors.inicio ? 'is-invalid' : ''}`}
                      {...register('inicio', { required: 'La hora de inicio es obligatoria' })}
                    />
                    {errors.inicio && <div className="invalid-feedback">{errors.inicio.message}</div>}
                  </div>

                  {/* Hora de Fin */}
                  <div className="col-md-3 mb-3">
                    <label htmlFor="fin" className="form-label">Hora de Fin</label>
                    <input
                      type="time"
                      id="fin"
                      className={`form-control ${errors.fin ? 'is-invalid' : ''}`}
                      {...register('fin', { required: 'La hora de fin es obligatoria' })}
                    />
                    {errors.fin && <div className="invalid-feedback">{errors.fin.message}</div>}
                  </div>
                </div>

                <div className="row">
                  {/* Modalidad */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="modalidad" className="form-label">Modalidad</label>
                    <div>
                      <div className="form-check">
                        <input
                          type="radio"
                          id="presencial"
                          value={true}
                          {...register('modalidad', { required: 'La modalidad es obligatoria' })}
                          className="form-check-input"
                        />
                        <label htmlFor="presencial" className="form-check-label">Presencial</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          id="online"
                          value={false}
                          {...register('modalidad', { required: 'La modalidad es obligatoria' })}
                          className="form-check-input"
                        />
                        <label htmlFor="online" className="form-check-label">Online</label>
                      </div>
                    </div>
                  </div>

                  {/* Lugar */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lugar" className="form-label">Lugar</label>
                    <input
                      id="lugar"
                      className={`form-control ${errors.lugar ? 'is-invalid' : ''}`}
                      {...register('lugar', { required: 'El lugar es obligatorio' })}
                    />
                    {errors.lugar && <div className="invalid-feedback">{errors.lugar.message}</div>}
                  </div>
                </div>

                <div className="row">
                  {/* Jornada */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="jornada" className="form-label">Jornada</label>
                    <select
                      id="jornada"
                      className={`form-select ${errors.jornada ? 'is-invalid' : ''}`}
                      {...register('jornada', { required: 'La jornada es obligatoria' })}
                    >
                      <option value="">Seleccione una jornada</option>
                      {jornadas.map((j) => (
                        <option key={j.id_jornada} value={j.id_jornada}>
                          {j.nombre}
                        </option>
                      ))}
                    </select>
                    {errors.jornada && <div className="invalid-feedback">{errors.jornada.message}</div>}
                  </div>

                  {/* Solicitud */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="solicitud" className="form-label">Solicitud</label>
                    <select
                      id="solicitud"
                      className={`form-select ${errors.solicitud ? 'is-invalid' : ''}`}
                      {...register('solicitud', { required: 'La solicitud es obligatoria' })}
                    >
                      <option value="">Seleccione una solicitud</option>
                      {solicitudes.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.id}
                        </option>
                      ))}
                    </select>
                    {errors.solicitud && <div className="invalid-feedback">{errors.solicitud.message}</div>}
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100">Crear Taller</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearTaller;

