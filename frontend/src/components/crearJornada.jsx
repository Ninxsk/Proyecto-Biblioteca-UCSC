import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const CrearJornada = ({ visible, onHide, onCreate }) => {
    const [newJornada, setNewJornada] = useState({
        nombre: '',
        inicio: '',
        termino: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJornada({ ...newJornada, [name]: value });
    };

    const validateForm = () => {
        const { nombre, inicio, termino } = newJornada;

        if (!nombre || !inicio || !termino) {
            Swal.fire({
                title: 'Campos incompletos',
                text: 'Todos los campos son obligatorios.',
                icon: 'error',
                confirmButtonColor: '#697588',
            });
            return false;
        }

        if (new Date(inicio) >= new Date(termino)) {
            Swal.fire({
                title: 'Fechas inválidas',
                text: 'La fecha de inicio debe ser anterior a la fecha de término.',
                icon: 'error',
                confirmButtonColor: '#697588',
            });
            return false;
        }

        return true;
    };

    const handleCreate = async () => {
        if (!validateForm()) return;

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/jornada/`, newJornada);

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'La jornada se creó correctamente.',
                confirmButtonColor: '#697588',
            });

            onCreate(response.data); 

            setNewJornada({ nombre: '', inicio: '', termino: '' });
            onHide();
        } catch (error) {
            const errorMessage = error.response?.data?.detalle
                ? typeof error.response.data.detalle === 'string'
                    ? error.response.data.detalle
                    : Object.values(error.response.data.detalle).join(', ')
                : 'No se pudo crear la jornada. Verifica los datos ingresados.';

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonColor: '#697588',
            });
        }
    };

    return (
        <Modal show={visible} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Crear Jornada</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={newJornada.nombre}
                            onChange={handleInputChange}
                            placeholder="Ingrese el nombre de la jornada"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha Inicio</Form.Label>
                        <Form.Control
                            type="date"
                            name="inicio"
                            value={newJornada.inicio}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control
                            type="date"
                            name="termino"
                            value={newJornada.termino}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="dark" onClick={handleCreate}>
                    Crear
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CrearJornada;
