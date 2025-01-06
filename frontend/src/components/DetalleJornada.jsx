import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DetalleJornada = ({ visible, onHide, jornada }) => (
    <Modal show={visible} onHide={onHide} centered>
        <Modal.Header closeButton style={{ }}>
            <Modal.Title>Detalle de Jornada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {jornada ? (
                <>
                    <p><strong>ID:</strong> {jornada.id_jornada}</p>
                    <p><strong>Nombre:</strong> {jornada.nombre}</p>
                    <p><strong>Fecha Inicio:</strong> {jornada.inicio}</p>
                    <p><strong>Fecha Fin:</strong> {jornada.termino}</p>
                </>
            ) : (
                <p>No hay información disponible para mostrar.</p>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button
                style={{
                    backgroundColor: '#6c757d',
                    borderColor: '#6c757d',
                    color: 'white',
                }}
                onClick={onHide}
            >
                Cerrar
            </Button>
        </Modal.Footer>
    </Modal>
);

export default DetalleJornada;
