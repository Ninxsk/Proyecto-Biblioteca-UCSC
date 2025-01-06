import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating-stars-component'; 
import Swal from 'sweetalert2'; 
import axios from 'axios';

const DetalleAsistente = ({ visible, asistente, onHide, onSave }) => {
    const [editMode, setEditMode] = useState(false); 
    const [formData, setFormData] = useState({}); 
    const [carreras, setCarreras] = useState([]); 


    const fetchCarreras = async () => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${API_URL}/carreras/`);
            setCarreras(response.data);
        } catch (error) {
            console.error('Error al cargar las carreras:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar las carreras. Intenta nuevamente.',
            });
        }
    };


    useEffect(() => {
        if (asistente) {
            setFormData({ ...asistente });
            setEditMode(false); 
        }
    }, [asistente]);

    useEffect(() => {
        fetchCarreras();
    }, []);

    if (!asistente) return null;

    const esInterno = !!asistente.rut; 

   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

   
    const handleRatingChange = (newRating) => {
        setFormData({ ...formData, satisfaccion: newRating });
    };

    const handleSave = async () => {
        if (!formData.correo) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El correo es obligatorio.',
            });
            return;
        }

        Swal.fire({
            title: '¿Guardar cambios?',
            text: '¿Estás seguro de que deseas guardar los cambios?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const tipo = esInterno ? 'interno' : 'externo';
                    const identificador = esInterno ? formData.rut : formData.num_documento;

                    const datos = {
                        tipo,
                        identificador,
                        datos: {
                            correo: formData.correo,
                            comentario: formData.comentario,
                            satisfaccion: formData.satisfaccion,
                            ...(esInterno
                                ? { carrera: formData.carrera }
                                : { pais: formData.pais, institucion: formData.institucion }),
                        },
                    };

                    await onSave(datos); 

                    Swal.fire({
                        icon: 'success',
                        title: 'Guardado',
                        text: 'Los cambios se guardaron con éxito.',
                    });

                    setEditMode(false); 
                } catch (error) {
                    console.error('Error al guardar los cambios:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo actualizar el asistente.',
                    });
                }
            }
        });
    };

    // Cerrar el modal y reiniciar el estado
    const handleClose = () => {
        setEditMode(false); 
        setFormData({}); 
        onHide(); 
    };

    return (
        <div className={`modal fade ${visible ? 'show d-block' : 'd-none'}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalle del Asistente</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={handleClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {editMode ? (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        value={formData.nombre || ''}
                                        disabled 
                                    />
                                </div>
                                {esInterno ? (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label">RUT</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="rut"
                                                value={formData.rut || ''}
                                                disabled 
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Carrera</label>
                                            <select
                                                className="form-select"
                                                name="carrera"
                                                value={formData.carrera || ''}
                                                onChange={handleChange}
                                            >
                                                <option value="">Seleccione una carrera</option>
                                                {carreras.map((carrera) => (
                                                    <option key={carrera.id} value={carrera.nombre}>
                                                        {carrera.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label">Número de Documento</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="num_documento"
                                                value={formData.num_documento || ''}
                                                disabled // Deshabilitado para evitar edición
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">País</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="pais"
                                                value={formData.pais || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Institución</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="institucion"
                                                value={formData.institucion || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="mb-3">
                                    <label className="form-label">Correo</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="correo"
                                        value={formData.correo || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Comentario</label>
                                    <textarea
                                        className="form-control"
                                        name="comentario"
                                        value={formData.comentario || ''}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Satisfacción</label>
                                    <Rating
                                        count={5}
                                        size={24}
                                        value={formData.satisfaccion || 0}
                                        onChange={handleRatingChange}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <p><strong>Nombre:</strong> {asistente.nombre}</p>
                                {esInterno ? (
                                    <>
                                        <p><strong>RUT:</strong> {asistente.rut}</p>
                                        <p><strong>Carrera:</strong> {asistente.carrera}</p>
                                    </>
                                ) : (
                                    <>
                                        <p><strong>Número de Documento:</strong> {asistente.num_documento}</p>
                                        <p><strong>País:</strong> {asistente.pais}</p>
                                        <p><strong>Institución:</strong> {asistente.institucion}</p>
                                    </>
                                )}
                                <p><strong>Correo:</strong> {asistente.correo}</p>
                                <p><strong>Comentario:</strong> {asistente.comentario}</p>
                                <p><strong>Satisfacción:</strong></p>
                                <Rating
                                    count={5}
                                    size={24}
                                    value={asistente.satisfaccion || 0}
                                    edit={false}
                                    activeColor="#ffd700"
                                />
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        {editMode ? (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => setEditMode(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSave}
                                >
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() => setEditMode(true)}
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={onHide}
                                >
                                    Cerrar
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

DetalleAsistente.propTypes = {
    visible: PropTypes.bool.isRequired,
    asistente: PropTypes.object,
    onHide: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default DetalleAsistente;
