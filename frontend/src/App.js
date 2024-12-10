import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Taller from './components/taller';
import Home from './components/home';

const App = () => {
    const [isNavbarExpanded, setIsNavbarExpanded] = useState(true);

    const toggleNavbar = () => {
        setIsNavbarExpanded((prevState) => !prevState);
    };

    return (
        <Router>
            <div
                style={{
                    display: 'flex', // Configura un contenedor flex
                    height: '100vh', // Asegura que ocupe toda la altura de la pantalla
                }}
            >
                {/* Navbar */}
                <Navbar toggleNavbar={toggleNavbar} isNavbarExpanded={isNavbarExpanded} />

                {/* Contenido principal */}
                <div
                    style={{
                        flexGrow: 1, // El contenido principal ocupa el espacio restante
                        padding: '20px',
                        boxSizing: 'border-box', // Incluye el padding en el tamaño total
                        backgroundColor: '#f8f9fa',
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/talleres" element={<Taller isNavbarExpanded={isNavbarExpanded} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
