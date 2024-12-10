import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FilterMatchMode } from 'primereact/api';
import CrearTaller from './crearTaller';
import '../styles/taller.css';

const Taller = ({ isNavbarExpanded }) => {
    const [capacitaciones, setCapacitaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [detalleTaller, setDetalleTaller] = useState(null);
    const [displayDetailDialog, setDisplayDetailDialog] = useState(false);
    const [displayCreateDialog, setDisplayCreateDialog] = useState(false);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
        fecha: { value: null, matchMode: FilterMatchMode.CONTAINS },
        solicitud: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        fetchCapacitaciones();
    }, []);

    const fetchCapacitaciones = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://10.1.0.74/api/talleres/');
            setCapacitaciones(response.data);
        } catch (err) {
            setError('No se pudieron cargar los talleres.');
        } finally {
            setLoading(false);
        }
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
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
                    className="p-button-success p-button-rounded"
                    onClick={() => setDisplayCreateDialog(true)}
                    style={{
                        whiteSpace: 'nowrap',
                    }}
                />
            </div>
        </div>
    );

    const header = renderHeader();

    return (
        <div className={`taller-container ${isNavbarExpanded ? 'expanded' : 'collapsed'}`}>
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
                                    className="p-button-rounded p-button-info"
                                    onClick={() => {
                                        setDetalleTaller(rowData);
                                        setDisplayDetailDialog(true);
                                    }}
                                />
                                <Button
                                    label="Lista de Asistencia"
                                    className="p-button-rounded p-button-secondary"
                                />
                            </div>
                        )}
                        style={{ minWidth: '12rem' }}
                    />
                </DataTable>
            </div>
            <Dialog
                visible={displayCreateDialog}
                style={{ width: '50vw' }}
                header="Crear Nuevo Taller"
                modal
                onHide={() => setDisplayCreateDialog(false)}
            >
                <CrearTaller onSuccess={fetchCapacitaciones} />
            </Dialog>
            <Dialog
                visible={displayDetailDialog}
                style={{ width: '50vw' }}
                header="Detalle del Taller"
                modal
                onHide={() => setDisplayDetailDialog(false)}
            >
                {detalleTaller ? (
                    <div>
                        <h3>{detalleTaller.nombre}</h3>
                        <p><strong>Fecha:</strong> {detalleTaller.fecha}</p>
                        <p><strong>Relator:</strong> {detalleTaller.relator}</p>
                        <p><strong>Modalidad:</strong> {detalleTaller.modalidad}</p>
                        <p><strong>Lugar:</strong> {detalleTaller.lugar}</p>
                    </div>
                ) : (
                    <p>Cargando detalles...</p>
                )}
            </Dialog>
        </div>
    );
};

export default Taller;
