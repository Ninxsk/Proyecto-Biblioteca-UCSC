import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';

const CrearTaller = ({ onSuccess }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [jornadas, setJornadas] = useState([]);
    const [solicitudes, setSolicitudes] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;

    const horaInicio = watch("inicio");
    const horaFin = watch("fin");


    useEffect(() => {
        const fetchJornadas = async () => {
          try {
            const response = await axios.get(`${API_URL}/jornada/`);
            setJornadas(response.data);
          } catch (error) {
            console.error("Error al cargar jornadas:", error);
          }
        };
    
        const fetchSolicitudes = async () => {
          try {
            const response = await axios.get(`${API_URL}/solicitudes/`);
            setSolicitudes(response.data);
          } catch (error) {
            console.error("Error al cargar solicitudes:", error);
          }
        };
    
        fetchJornadas();
        fetchSolicitudes();
      }, [API_URL]);

    const onSubmit = async (data) => {
        if (horaInicio >= horaFin) {
            Swal.fire({
                title: 'Error',
                text: 'La hora de inicio debe ser anterior a la hora de término.',
                icon: 'error',
                customClass: {
                    container: 'swal2-container', 
                },
            });
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/talleres/`, data);

            if (response.status === 201) {
                Swal.fire({
                    title: 'Taller Creado',
                    text: 'El taller ha sido creado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        container: 'swal2-container',
                    },
                });

                if (onSuccess) onSuccess(); // Refrescar lista al cerrar modal
            } else {
                throw new Error('Respuesta inesperada del servidor.');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.detail || 'Hubo un error al crear el taller.';
            Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
                customClass: {
                    container: 'swal2-container',
                },
            });
        }
    };

    const styles = `
        .swal2-container {
            z-index: 2050 !important; /* SweetAlert2 estará por encima de los modales de Bootstrap */
        }
        .modal-backdrop.show {
            z-index: 1049 !important; /* Asegura que el fondo del modal esté detrás de SweetAlert2 */
        }
        .modal-dialog {
            z-index: 1050 !important; /* Mantén el modal visible detrás de SweetAlert2 */
        }
    `;

    return (
        <div>
            <style>{styles}</style>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="crearTallerModalLabel">
                            Crear Nuevo Taller
                        </h5>
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
                                    {errors.nombre && (
                                        <div className="invalid-feedback">{errors.nombre.message}</div>
                                    )}
                                </div>

                                {/* Relator */}
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="relator" className="form-label">Relator</label>
                                    <input
                                        id="relator"
                                        className={`form-control ${errors.relator ? 'is-invalid' : ''}`}
                                        {...register('relator', { required: 'El relator es obligatorio' })}
                                    />
                                    {errors.relator && (
                                        <div className="invalid-feedback">{errors.relator.message}</div>
                                    )}
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
                                    {errors.fecha && (
                                        <div className="invalid-feedback">{errors.fecha.message}</div>
                                    )}
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
                                    {errors.inicio && (
                                        <div className="invalid-feedback">{errors.inicio.message}</div>
                                    )}
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
                                    {errors.fin && (
                                        <div className="invalid-feedback">{errors.fin.message}</div>
                                    )}
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
                                    {errors.modalidad && (
                                        <div className="invalid-feedback d-block">{errors.modalidad.message}</div>
                                    )}
                                </div>

                                {/* Lugar */}
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lugar" className="form-label">Lugar</label>
                                    <input
                                        id="lugar"
                                        className={`form-control ${errors.lugar ? 'is-invalid' : ''}`}
                                        {...register('lugar', { required: 'El lugar es obligatorio' })}
                                    />
                                    {errors.lugar && (
                                        <div className="invalid-feedback">{errors.lugar.message}</div>
                                    )}
                                </div>
                            </div>

                            <div className="row">
                                {/* Jornada */}
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="jornada" className="form-label">Jornada</label>
                                    <select
                                        id="jornada"
                                        className={`form-select ${errors.jornada ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">Seleccione una jornada</option>
                                        {jornadas.map((j) => (
                                            <option key={j.id_jornada} value={j.id_jornada}>
                                                {j.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Solicitud */}
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="solicitud" className="form-label">Solicitud</label>
                                    <select
                                        id="solicitud"
                                        className={`form-select ${errors.solicitud ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">Seleccione una solicitud</option>
                                        {solicitudes.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.id}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-success w-100">Crear Taller</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearTaller;
