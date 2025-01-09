import React, { useState, useEffect, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import Swal from 'sweetalert2';
import DetalleJornada from './detalleJornada';
import EditarJornada from './editarJornada';
import CrearJornada from './crearJornada';
import '../styles/datatable.css';


const ListaJornadas = ({isNavbarExpanded}) => {
    
    const [jornadas, setJornadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJornada, setSelectedJornada] = useState(null);
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [filters, setFilters] = useState({
        id_jornada: { value: null, matchMode: 'contains' },
        nombre: { value: null, matchMode: 'contains' },
        inicio: { value: null, matchMode: 'contains' },
        termino: { value: null, matchMode: 'contains' },
    });

    const API_URL = process.env.REACT_APP_API_URL;

    
    const fetchJornadas = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/jornada/`);
            setJornadas(response.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar las jornadas.',
            });
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchJornadas();
    }, [fetchJornadas]);

    // Crear nueva jornada
    const handleCreate = async (newJornada) => {
        try {
            await axios.post(`${API_URL}/jornada/`, newJornada);
            fetchJornadas();
            setShowCreateDialog(false);
            Swal.fire({
                icon: 'success',
                title: 'Jornada creada',
                text: 'La jornada se creó correctamente.',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo crear la jornada. Verifica los datos ingresados.',
            });
        }
    };

    
    const handleEditSave = async (editedJornada) => {
        try {
            await axios.put(`${API_URL}/jornada/${editedJornada.id_jornada}/`, editedJornada);
            fetchJornadas();
            setShowEditDialog(false);
            Swal.fire({
                icon: 'success',
                title: 'Jornada actualizada',
                text: 'La jornada se actualizó correctamente.',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar la jornada.',
            });
        }
    };

    // Renderizar filtro
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
        <div className={`datatable-container ${isNavbarExpanded ? 'expanded' : 'collapsed'}`}>
            <div className="flex-header">
                <h2 className="datatable-title">Lista de Jornadas</h2>
                <div className="flex-tools">
                    <InputText
                        value={filters.global?.value || ''}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                global: { value: e.target.value, matchMode: 'contains' },
                            })
                        }
                        placeholder="Buscar en todos los campos"
                        className="p-inputtext p-component"
                    />
                    <Button
                        label="Crear Jornada"
                        icon="pi pi-plus"
                        className="p-button-rounded"
                        style={{
                            backgroundColor: '#697588',
                            borderColor: '#697588',
                            color: 'white',
                        }}
                        onClick={() => setShowCreateDialog(true)}
                    />
                </div>
            </div>
            <div className="card">
                <DataTable
                    value={jornadas}
                    paginator
                    rows={5}
                    loading={loading}
                    filters={filters}
                    globalFilterFields={['id_jornada', 'nombre', 'inicio', 'termino']}
                    className="p-datatable-sm"
                    emptyMessage="No se encontraron jornadas."
                >
                    <Column
                        field="id_jornada"
                        header="ID"
                        sortable
                        filter
                        filterElement={renderFilterInput('id_jornada', 'Buscar por ID')}
                    />
                    <Column
                        field="nombre"
                        header="Nombre"
                        sortable
                        filter
                        filterElement={renderFilterInput('nombre', 'Buscar por Nombre')}
                    />
                    <Column
                        field="inicio"
                        header="Fecha Inicio"
                        sortable
                        filter
                        filterElement={renderFilterInput('inicio', 'Buscar por Fecha Inicio')}
                    />
                    <Column
                        field="termino"
                        header="Fecha Fin"
                        sortable
                        filter
                        filterElement={renderFilterInput('termino', 'Buscar por Fecha Fin')}
                    />
                    <Column
                        header="Acciones"
                        body={(rowData) => (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Button
                                    label="Detalle"
                                    className="p-button-rounded"
                                    style={{
                                        backgroundColor: '#697588',
                                        borderColor: '#697588',
                                        color: 'white',
                                    }}
                                    onClick={() => {
                                        setSelectedJornada(rowData);
                                        setShowDetailDialog(true);
                                    }}
                                />
                                <Button
                                    label="Editar"
                                    className="p-button-rounded"
                                    style={{
                                        backgroundColor: '#0a65b5',
                                        borderColor: '#0a65b5',
                                        color: 'white',
                                    }}
                                    onClick={() => {
                                        setSelectedJornada(rowData);
                                        setShowEditDialog(true);
                                    }}
                                />
                            </div>
                        )}
                    />
                </DataTable>
            </div>

            {/* Modal Detalle Jornada */}
            <DetalleJornada
                visible={showDetailDialog}
                onHide={() => setShowDetailDialog(false)}
                jornada={selectedJornada}
            />

            {/* Modal Editar Jornada */}
            <EditarJornada
                visible={showEditDialog}
                onHide={() => setShowEditDialog(false)}
                jornada={selectedJornada}
                onSave={handleEditSave}
            />

            {/* Modal Crear Jornada */}
            <CrearJornada
                visible={showCreateDialog}
                onHide={() => setShowCreateDialog(false)}
                onCreate={handleCreate}
            />
        </div>
    );
};

export default ListaJornadas;
