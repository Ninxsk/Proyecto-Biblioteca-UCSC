import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Taller from './components/taller';
import Home from './components/home';
import ListaAsistencia from './components/listaAsistencia'; 

const App = () => {
    const [isNavbarExpanded, setIsNavbarExpanded] = useState(true);

    const toggleNavbar = () => {
        setIsNavbarExpanded((prevState) => !prevState);
    };

    return (
        <Router>
            <div
                style={{
                    display: 'flex',
                    height: '100vh',
                }}
            >
                <Navbar toggleNavbar={toggleNavbar} isNavbarExpanded={isNavbarExpanded} />
                <div
                    style={{
                        flexGrow: 1,
                        padding: '20px',
                        boxSizing: 'border-box',
                        backgroundColor: '#f8f9fa',
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/talleres" element={<Taller isNavbarExpanded={isNavbarExpanded} />} />
                        <Route path="/talleres/:tallerId/asistencia" element={<ListaAsistencia />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;









