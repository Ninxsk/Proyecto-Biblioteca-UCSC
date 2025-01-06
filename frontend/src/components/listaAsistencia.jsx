import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import CrearAsistente from './crearAsistente';
import DetalleAsistente from './DetalleAsistente';
import EliminarAsistente from './EliminarAsistente';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/datatable.css';

const ListaAsistencia = () => {
    const { tallerId } = useParams();
    const [asistencias, setAsistencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [crearAsistenteVisible, setCrearAsistenteVisible] = useState(false);
    const [selectedAsistente, setSelectedAsistente] = useState(null);
    const [displayDetailDialog, setDisplayDetailDialog] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' },
        nombre: { value: null, matchMode: 'contains' },
        rut: { value: null, matchMode: 'contains' },
        carrera: { value: null, matchMode: 'contains' },
    });

    const API_URL = process.env.REACT_APP_API_URL;

    
    const fetchAsistencias = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/talleres/${tallerId}/listas-asistencia/`);
            setAsistencias(response.data);
        } catch (error) {
            console.error('Error al cargar la lista de asistencia:', error);
        } finally {
            setLoading(false);
        }
    }, [tallerId, API_URL]);

    useEffect(() => {
        fetchAsistencias();
    }, [fetchAsistencias]);

    const handleSaveAsistente = async (datos) => {
        try {
            await axios.put(`${API_URL}/talleres/${tallerId}/editar-asistente/`, datos);
            Swal.fire({
                icon: 'success',
                title: 'Asistente actualizado',
                text: 'El asistente fue actualizado exitosamente.',
            });
            fetchAsistencias();
            setDisplayDetailDialog(false);
        } catch (error) {
            console.error('Error al guardar los cambios:', error.response?.data || error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el asistente. Verifica los datos ingresados.',
            });
        }
    };

    const handleViewDetail = async (asistente) => {
        try {
            const tipo = asistente.rut ? 'interno' : 'externo';
            const identificador = asistente.rut || asistente.num_documento;

            const response = await axios.get(`${API_URL}/talleres/${tallerId}/detalle-asistente/`, {
                params: { tipo, identificador },
            });

            setSelectedAsistente(response.data);
            setDisplayDetailDialog(true);
        } catch (error) {
            console.error('Error al obtener el detalle del asistente:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cargar el detalle del asistente.',
            });
        }
    };

    const handleDeleteClick = (asistente) => {
        setSelectedAsistente(asistente);
        setDeleteDialogVisible(true);
    };

    const handleDelete = async () => {
        try {
            const tipo = selectedAsistente.rut ? 'interno' : 'externo';
            const identificador = selectedAsistente.rut || selectedAsistente.num_documento;

            await axios.delete(`${API_URL}/talleres/${tallerId}/eliminar-asistente/`, {
                params: { tipo, identificador },
            });

            Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'El asistente fue eliminado con éxito.',
            });
            setDeleteDialogVisible(false);
            fetchAsistencias();
        } catch (error) {
            console.error('Error al eliminar el asistente:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar el asistente.',
            });
        }
    };

    const header = (
        <div
        className="flex-header"
        style={{
            display: 'flex',
            justifyContent: 'space-between', // Alinea el título a la izquierda y el botón a la derecha
            alignItems: 'center', // Centra los elementos verticalmente
            width: '100%', // Asegura que ocupe todo el ancho disponible
        }}
        >
            <h2 className="datatable-title">Lista de Asistencia</h2>
            <Button
                label="Ingresar asistente"
                icon="pi pi-plus"
                className="p-button-rounded"
                style={{
                    backgroundColor: '#697588',
                    borderColor: '#697588',
                    color: 'white',
                }}
                onClick={() => setCrearAsistenteVisible(true)}
            />
        </div>
    );

    const renderFilterInput = (field, placeholder) => (
        <InputText
            value={filters[field]?.value || ''}
            onChange={(e) => {
                const value = e.target.value;
                setFilters((prevFilters) => ({
                    ...prevFilters,
                    [field]: { ...prevFilters[field], value },
                }));
            }}
            placeholder={placeholder}
        />
    );

    return (
        <div className="datatable-container">
            <div className="card">
                <DataTable
                    value={asistencias}
                    paginator
                    rows={10}
                    loading={loading}
                    filters={filters}
                    globalFilterFields={['nombre', 'rut', 'carrera']}
                    header={header}
                    filterDisplay="row"
                    emptyMessage="No se encontraron asistentes."
                    className="p-datatable-sm"
                >
                    <Column
                        field="nombre"
                        header="Nombre"
                        sortable
                        filter
                        filterElement={renderFilterInput('nombre', 'Buscar por nombre')}
                    />
                    <Column
                        header="RUT / Documento"
                        body={(rowData) => rowData.rut || rowData.num_documento || 'N/A'}
                        sortable
                        filter
                        filterElement={renderFilterInput('rut', 'Buscar por RUT/Documento')}
                    />
                    <Column
                        field="carrera"
                        header="Carrera"
                        body={(rowData) => rowData.carrera || 'N/A'}
                        sortable
                        filter
                        filterElement={renderFilterInput('carrera', 'Buscar por carrera')}
                    />
                    <Column
                        header="Acciones"
                        body={(rowData) => (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Button
                                    icon="pi pi-eye"
                                    className='p-button-rounded'
                                    style={{
                                        backgroundColor: '#0a65b5',
                                        borderColor: '#0a65b5',
                                        color: 'white',
                                        borderRadius: '20px',
                                    }}
                                    onClick={() => handleViewDetail(rowData)}
                                />
                                <Button
                                    icon="pi pi-trash"
                                    className='p-button-rounded'
                                    style={{
                                        backgroundColor: '#FF0000',
                                        borderColor: '#FF0000',
                                        color: 'white',
                                        borderRadius: '20px',
                                    }}
                                    onClick={() => handleDeleteClick(rowData)}
                                />
                            </div>
                        )}
                    />
                </DataTable>
            </div>

            <CrearAsistente
                visible={crearAsistenteVisible}
                onHide={() => setCrearAsistenteVisible(false)}
                onSuccess={fetchAsistencias}
                tallerId={tallerId}
            />

            <DetalleAsistente
                visible={displayDetailDialog}
                asistente={selectedAsistente}
                onHide={() => setDisplayDetailDialog(false)}
                onSave={handleSaveAsistente}
                carreras={[]} 
            />

            <EliminarAsistente
                visible={deleteDialogVisible}
                onHide={() => setDeleteDialogVisible(false)}
                onConfirm={handleDelete}
                asistente={selectedAsistente}
            />
        </div>
    );
};

export default ListaAsistencia;
