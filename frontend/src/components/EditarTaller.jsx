import React, { useState } from "react";
import Swal from "sweetalert2";

const EditarTaller = ({ detalle, onSave, onCancel }) => {
  const [formValues, setFormValues] = useState({
    relator: detalle.relator || "",
    fecha: detalle.fecha || "",
    inicio: detalle.inicio || "",
    fin: detalle.fin || "",
    modalidad: detalle.modalidad ? "Presencial" : "Online",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "modalidad" ? value === "Presencial" : value;
    setFormValues({ ...formValues, [name]: updatedValue });
  };

  const handleSaveChanges = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas realizar estos cambios?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar cambios",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "swal-popup", 
      },
      backdrop: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const dataToSend = {
          ...formValues,
          modalidad: formValues.modalidad === "Presencial",
        };
        console.log("Datos enviados al backend:", dataToSend);
        onSave(dataToSend);
      }
    });
  };

  return (
    <>
      {/* Estilos globales de z-index */}
      <style>{`
        .swal-popup {
          z-index: 9999 !important; /* Asegura que quede al frente */
        }
        .swal2-container {
          z-index: 9999 !important;
        }
      `}</style>

      <form>
        <div className="row">
          <div className="col-md-6 mb-3">
            <strong>Relator:</strong>
            <input
              type="text"
              name="relator"
              value={formValues.relator}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <strong>Fecha:</strong>
            <input
              type="date"
              name="fecha"
              value={formValues.fecha}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <strong>Hora Inicio:</strong>
            <input
              type="time"
              name="inicio"
              value={formValues.inicio}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <strong>Hora Fin:</strong>
            <input
              type="time"
              name="fin"
              value={formValues.fin}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <strong>Modalidad:</strong>
            <select
              name="modalidad"
              value={formValues.modalidad}
              className="form-select"
              onChange={handleInputChange}
            >
              <option value="Presencial">Presencial</option>
              <option value="Online">Online</option>
            </select>
          </div>
          <div className="col-md-12 d-flex justify-content-end">
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: "#0a65b5",
                color: "white",
                borderRadius: "5px",
                border: "none",
                marginRight: "10px",
              }}
              onClick={handleSaveChanges}
            >
              Guardar
            </button>
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                borderRadius: "5px",
                border: "none",
              }}
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditarTaller;
