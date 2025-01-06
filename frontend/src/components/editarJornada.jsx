import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const EditarJornada = ({ visible, onHide, jornada, onSave }) => {
    const [editedJornada, setEditedJornada] = useState(jornada || {});

    useEffect(() => {
        setEditedJornada(jornada || {}); 
    }, [jornada]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedJornada({ ...editedJornada, [name]: value });
    };

    const validateForm = () => {
        const { inicio, termino } = editedJornada;

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

    const handleSave = () => {
        if (validateForm()) {
            Swal.fire({
                title: '¿Guardar cambios?',
                text: '¿Estás seguro de que deseas guardar los cambios?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#697588',
                cancelButtonColor: '#dc3545',
                confirmButtonText: 'Sí, guardar',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    onSave(editedJornada); 
                }
            });
        }
    };

    return (
        <Modal show={visible} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Jornada</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={editedJornada?.nombre || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha Inicio</Form.Label>
                        <Form.Control
                            type="date"
                            name="inicio"
                            value={editedJornada?.inicio || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control
                            type="date"
                            name="termino"
                            value={editedJornada?.termino || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditarJornada;
