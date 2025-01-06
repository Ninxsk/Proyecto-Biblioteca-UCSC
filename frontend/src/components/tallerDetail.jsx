import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import EditarTaller from "./EditarTaller";

const DetalleTaller = ({ detalle, onTallerUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    relator: detalle.relator,
    fecha: detalle.fecha,
    inicio: detalle.inicio,
    fin: detalle.fin,
    modalidad: detalle.modalidad,
  });

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSaveChanges = async (updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/talleres/${detalle.id}/`, updatedData);
      Swal.fire("Éxito", "El taller ha sido actualizado correctamente.", "success");
      setIsEditing(false);
      if (onTallerUpdated) onTallerUpdated(response.data);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.detail || "Error al actualizar el taller.",
        "error"
      );
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditableData({
      relator: detalle.relator,
      fecha: detalle.fecha,
      inicio: detalle.inicio,
      fin: detalle.fin,
      modalidad: detalle.modalidad,
    });
  };

  return (
    <div className="container mt-4">
      <div className="card mx-auto" style={{ maxWidth: "800px" }}>
        <div
          className="card-header d-flex justify-content-between align-items-center"
          style={{ backgroundColor: "#697588", color: "white" }}
        >
          <h5 className="mb-0">Detalles del Taller</h5>
          {!isEditing && (
            <button
              className="btn btn-sm"
              style={{
                backgroundColor: "#2f3542",
                color: "white",
                border: "none",
              }}
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          )}
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Nombre:</strong>
              <input type="text" className="form-control" value={detalle.nombre || "N/A"} disabled />
            </div>
            <div className="col-md-6 mb-3">
              <strong>Solicitud:</strong>
              <input type="text" className="form-control" value={detalle.solicitud || "N/A"} disabled />
            </div>
            <div className="col-md-6 mb-3">
              <strong>Carrera:</strong>
              <input type="text" className="form-control" value={detalle.carrera || "N/A"} disabled />
            </div>
            <div className="col-md-6 mb-3">
              <strong>Facultad:</strong>
              <input type="text" className="form-control" value={detalle.facultad || "N/A"} disabled />
            </div>
            <div className="col-md-6 mb-3">
              <strong>Jornada:</strong>
              <input type="text" className="form-control" value={detalle.jornada || "N/A"} disabled />
            </div>
            <div className="col-md-6 mb-3">
              <strong>Lugar:</strong>
              <input type="text" className="form-control" value={detalle.lugar || "N/A"} disabled />
            </div>
          </div>

          {isEditing && (
            <EditarTaller
              detalle={editableData}
              onSave={handleSaveChanges}
              onCancel={handleCancelEdit}
            />
          )}

          {!isEditing && (
            <div className="row">
              <div className="col-md-6 mb-3">
                <strong>Relator:</strong>
                <input type="text" className="form-control" value={detalle.relator || "N/A"} disabled />
              </div>
              <div className="col-md-6 mb-3">
                <strong>Fecha:</strong>
                <input type="text" className="form-control" value={detalle.fecha || "N/A"} disabled />
              </div>
              <div className="col-md-6 mb-3">
                <strong>Hora Inicio:</strong>
                <input type="text" className="form-control" value={detalle.inicio || "N/A"} disabled />
              </div>
              <div className="col-md-6 mb-3">
                <strong>Hora Fin:</strong>
                <input type="text" className="form-control" value={detalle.fin || "N/A"} disabled />
              </div>
              <div className="col-md-6 mb-3">
                <strong>Modalidad:</strong>
                <input
                  type="text"
                  className="form-control"
                  value={detalle.modalidad ? "Presencial" : "Online"}
                  disabled
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleTaller;
