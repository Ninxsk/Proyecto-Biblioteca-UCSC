import React from 'react';

const EliminarAsistente = ({ visible, onHide, onConfirm, asistente }) => {
    if (!asistente) return null;

    return (
        <div className={`modal fade ${visible ? 'show d-block' : 'd-none'}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmar Eliminación</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onHide}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>¿Estás seguro de que deseas eliminar a {asistente.nombre || 'este asistente'}?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EliminarAsistente;
