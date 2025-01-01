import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import CrearAsistente from './crearAsistente';
import axios from 'axios';

const ListaAsistencia = () => {
    const { tallerId } = useParams();
    const [asistencias, setAsistencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [crearAsistenteVisible, setCrearAsistenteVisible] = useState(false);

    
    const fetchAsistencias = useCallback(async () => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${API_URL}/talleres/${tallerId}/listas-asistencia/`);
            setAsistencias(response.data);
        } catch (error) {
            console.error('Error al cargar la lista de asistencia:', error);
        } finally {
            setLoading(false);
        }
    }, [tallerId]);

    useEffect(() => {
        fetchAsistencias();
    }, [fetchAsistencias]);

    
    const rutColumnTemplate = (rowData) => {
        return rowData.rut || rowData.num_documento || 'N/A';
    };

    return (
        <div className="lista-asistencia-container">
            <div className="lista-asistencia-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className="lista-asistencia-title">Lista de Asistencia</h2>
                    <Button
                        label="Crear Asistente"
                        icon="pi pi-plus"
                        className="p-button-success"
                        onClick={() => setCrearAsistenteVisible(true)}
                    />
                </div>
                <DataTable
                    value={asistencias}
                    paginator
                    rows={10}
                    loading={loading}
                    emptyMessage="No se encontraron asistentes."
                    className="p-datatable-sm"
                >
                    <Column field="nombre" header="Nombre" sortable style={{ minWidth: '12rem' }} />
                    <Column
                        header="RUT / Número de Documento"
                        body={rutColumnTemplate} 
                        style={{ minWidth: '12rem' }}
                    />
                    <Column
                        field='carrera'
                        header="Carrera"
                        sortable
                        style={{ minWidth: '12rem' }}
                    />
                </DataTable>
            </div>

            {/* Modal para Crear Asistente */}
            <CrearAsistente
                visible={crearAsistenteVisible}
                onHide={() => setCrearAsistenteVisible(false)}
                onSuccess={fetchAsistencias}
                tallerId={tallerId}
            />
        </div>
    );
};

export default ListaAsistencia;

<Column field="carrera" header="Carrera" sortable style={{ minWidth: '12rem' }} />
