import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Collapse } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';

const CrearAsistente = ({ visible, onHide, onSuccess, tallerId }) => {
    const [tipoAsistente, setTipoAsistente] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        rut: '',
        carrera: '',
        correo: '',
        numDocumento: '',
        pais: '',
        institucion: '',
        comentario: '',
        satisfaccion: 0,
    });

    const [carreras, setCarreras] = useState([]);

    useEffect(() => {
        if (visible) {
            const fetchCarreras = async () => {
                try {
                    const API_URL = process.env.REACT_APP_API_URL;
                    const response = await fetch(`${API_URL}/carreras/`);
                    const data = await response.json();
                    setCarreras(data);
                } catch (error) {
                    console.error('Error al cargar las carreras:', error);
                }
            };

            fetchCarreras();
        }
    }, [visible]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRatingChange = (value) => {
        setFormData({ ...formData, satisfaccion: value });
    };

    const handleSubmit = async () => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const url =
                tipoAsistente === 'interno'
                    ? `${API_URL}/talleres/${tallerId}/crear-asistente-interno/`
                    : `${API_URL}/talleres/${tallerId}/crear-asistente-externo/`;

            const payload =
                tipoAsistente === 'interno'
                    ? {
                          asistente: {
                              nombre: formData.nombre,
                              rut: formData.rut.replace(/[.-]/g, ''), 
                          },
                          carrera: formData.carrera,
                          correo: formData.correo,
                          comentario: formData.comentario,
                          satisfaccion: formData.satisfaccion,
                      }
                    : {
                          asistente_externo: {
                              nombre: formData.nombre,
                              num_documento: formData.numDocumento,
                          },
                          pais: formData.pais,
                          institucion: formData.institucion,
                          correo: formData.correo,
                          comentario: formData.comentario,
                          satisfaccion: formData.satisfaccion,
                      };

            console.log('Payload:', payload);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error del backend:', errorData);
                throw new Error('Error al crear el asistente');
            }

            onSuccess();
            handleClose();
        } catch (error) {
            console.error('Error al crear el asistente:', error);
        }
    };

    const handleClose = () => {
        setTipoAsistente('');
        setFormData({
            nombre: '',
            rut: '',
            carrera: '',
            correo: '',
            numDocumento: '',
            pais: '',
            institucion: '',
            comentario: '',
            satisfaccion: 0,
        });
        onHide();
    };

    return (
        <Modal show={visible} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Crear Asistente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Tipo de Asistente</Form.Label>
                    <Form.Select
                        value={tipoAsistente}
                        onChange={(e) => setTipoAsistente(e.target.value)}
                    >
                        <option value="">Seleccione un tipo de asistente</option>
                        <option value="interno">Interno</option>
                        <option value="externo">Externo</option>
                    </Form.Select>
                </Form.Group>

                {/* Formulario para Asistente Interno */}
                <Collapse in={tipoAsistente === 'interno'}>
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                placeholder="Ingrese el nombre"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>RUT</Form.Label>
                            <Form.Control
                                type="text"
                                name="rut"
                                value={formData.rut}
                                onChange={handleInputChange}
                                placeholder="Ingrese el RUT"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Carrera</Form.Label>
                            <Form.Select
                                name="carrera"
                                value={formData.carrera}
                                onChange={handleInputChange}
                            >
                                <option value="">Seleccione una carrera</option>
                                {carreras.map((carrera) => (
                                    <option key={carrera.ua} value={carrera.ua}>
                                        {carrera.nombre}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="email"
                                name="correo"
                                value={formData.correo}
                                onChange={handleInputChange}
                                placeholder="Ingrese el correo electrónico"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Comentario</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="comentario"
                                value={formData.comentario}
                                onChange={handleInputChange}
                                placeholder="Ingrese un comentario"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nivel de Satisfacción</Form.Label>
                            <ReactStars
                                count={5}
                                value={formData.satisfaccion}
                                onChange={handleRatingChange}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </Form.Group>
                    </div>
                </Collapse>

                {/* Formulario para Asistente Externo */}
                <Collapse in={tipoAsistente === 'externo'}>
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                placeholder="Ingrese el nombre"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Número de Documento</Form.Label>
                            <Form.Control
                                type="text"
                                name="numDocumento"
                                value={formData.numDocumento}
                                onChange={handleInputChange}
                                placeholder="Ingrese el número de documento"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>País</Form.Label>
                            <Form.Control
                                type="text"
                                name="pais"
                                value={formData.pais}
                                onChange={handleInputChange}
                                placeholder="Ingrese el país"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Institución</Form.Label>
                            <Form.Control
                                type="text"
                                name="institucion"
                                value={formData.institucion}
                                onChange={handleInputChange}
                                placeholder="Ingrese la institución"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="email"
                                name="correo"
                                value={formData.correo}
                                onChange={handleInputChange}
                                placeholder="Ingrese el correo electrónico"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Comentario</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="comentario"
                                value={formData.comentario}
                                onChange={handleInputChange}
                                placeholder="Ingrese un comentario"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nivel de Satisfacción</Form.Label>
                            <ReactStars
                                count={5}
                                value={formData.satisfaccion}
                                onChange={handleRatingChange}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </Form.Group>
                    </div>
                </Collapse>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={handleSubmit} disabled={!tipoAsistente}>
                    Crear
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CrearAsistente;