import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import CrearTaller from './crearTaller';
import DetalleTaller from './tallerDetail';
import '../styles/datatable.css';
import { useNavigate } from 'react-router-dom';

const Taller = ({ isNavbarExpanded }) => {
    const navigate = useNavigate();
    const [capacitaciones, setCapacitaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [detalleTaller, setDetalleTaller] = useState(null);
    const [displayDetailDialog, setDisplayDetailDialog] = useState(false);
    const [displayCreateDialog, setDisplayCreateDialog] = useState(false);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' },
        id: { value: null, matchMode: 'equals' },
        nombre: { value: null, matchMode: 'contains' },
        fecha: { value: null, matchMode: 'contains' },
        solicitud: { value: null, matchMode: 'equals' },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const API_URL = process.env.REACT_APP_API_URL;

    const fetchCapacitaciones = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/talleres/`);
            setCapacitaciones(response.data);
        } catch (err) {
            setError('No se pudieron cargar los talleres.');
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchCapacitaciones();
    }, [fetchCapacitaciones]);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const openDetalleModal = async (tallerId) => {
        try {
            const response = await axios.get(`${API_URL}/talleres/${tallerId}/`);
            setDetalleTaller(response.data);
            setDisplayDetailDialog(true);
        } catch (err) {
            console.error('Error al cargar detalles del taller:', err);
        }
    };

    const renderHeader = () => (
        <div className="flex-header">
            <h2 className="taller-title">Lista de Talleres</h2>
            <div className="flex-tools">
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '600px',
                    }}
                >
                    <i
                        className="pi pi-search"
                        style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '1rem',
                            color: '#6c757d',
                        }}
                    />
                    <input
                        type="text"
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Buscar en todos los campos"
                        className="p-inputtext p-component"
                        style={{
                            width: '100%',
                            padding: '0.5rem 1rem 0.5rem 2.5rem',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
                <Button
                    icon="pi pi-plus"
                    label="Crear Taller"
                    style={{
                        backgroundColor: '#697588',
                        borderColor: '#697588',
                        color: 'white',
                        whiteSpace: 'nowrap',
                        borderRadius: '20px',
                    }}
                    onClick={() => setDisplayCreateDialog(true)}
                />
            </div>
        </div>
    );

    const header = renderHeader();

    return (
        <div className={`datatable-container ${isNavbarExpanded ? 'expanded' : 'collapsed'}`}>
            {error && (
                <div className="alert alert-danger mt-2">
                    <strong>Error:</strong> {error}
                </div>
            )}
            <div className="card">
                <DataTable
                    value={capacitaciones}
                    paginator
                    rows={5}
                    loading={loading}
                    filters={filters}
                    filterDisplay="row"
                    globalFilterFields={['id', 'nombre', 'fecha', 'solicitud']}
                    header={header}
                    emptyMessage="No se encontraron talleres."
                    className="p-datatable-sm"
                >
                    <Column
                        field="id"
                        header="ID"
                        sortable
                        filter
                        filterPlaceholder="Buscar por ID"
                        style={{ minWidth: '12rem' }}
                    />
                    <Column
                        field="nombre"
                        header="Nombre"
                        sortable
                        filter
                        filterPlaceholder="Buscar por Nombre"
                        style={{ minWidth: '12rem' }}
                    />
                    <Column
                        field="fecha"
                        header="Fecha"
                        sortable
                        filter
                        filterPlaceholder="Buscar por Fecha"
                        style={{ minWidth: '12rem' }}
                    />
                    <Column
                        field="solicitud"
                        header="Solicitud"
                        sortable
                        filter
                        filterPlaceholder="Buscar por Solicitud"
                        style={{ minWidth: '12rem' }}
                    />
                    <Column
                        header="Acciones"
                        body={(rowData) => (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Button
                                    label="Detalle"
                                    style={{
                                        backgroundColor: '#697588',
                                        borderColor: '#697588',
                                        color: 'white',
                                        borderRadius: '20px',
                                    }}
                                    onClick={() => openDetalleModal(rowData.id)}
                                />
                                <Button
                                    label="Lista de Asistencia"
                                    style={{
                                        backgroundColor: '#0a65b5 ',
                                        borderColor: '#0a65b5 ',
                                        color: 'white',
                                        borderRadius: '20px',
                                    }}
                                    onClick={() => navigate(`/talleres/${rowData.id}/asistencia`)}
                                />
                            </div>
                        )}
                        style={{ minWidth: '12rem' }}
                    />
                </DataTable>
            </div>

            {/* Modal Crear Taller */}
            <Dialog
                visible={displayCreateDialog}
                style={{ width: '50vw',
                    marginTop: '0',
                    padding: '0', 
                }}
                modal
                onHide={() => setDisplayCreateDialog(false)}
            >
                <CrearTaller
                    onSuccess={() => {
                        fetchCapacitaciones();
                        setDisplayCreateDialog(false);
                    }}
                />
            </Dialog>

            {/* Modal Detalle Taller */}
            <Dialog
                visible={displayDetailDialog}
                style={{ width: '60vw' }}
                modal
                onHide={() => setDisplayDetailDialog(false)}
            >
                {detalleTaller && <DetalleTaller detalle={detalleTaller} />}
            </Dialog>
        </div>
    );
};

export default Taller;
