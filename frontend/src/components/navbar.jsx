import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ toggleNavbar, isNavbarExpanded }) {
    return (
        <div
            style={{
                width: isNavbarExpanded ? '250px' : '80px',
                backgroundColor: '#242A3C',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                transition: 'width 0.3s ease',
                boxShadow: '2px 0 5px rgba(191, 25, 25, 0.1)',
            }}
        >
            {/* Botón de hamburguesa */}
            <button
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    marginBottom: '20px',
                }}
                onClick={toggleNavbar}
            >
                {isNavbarExpanded ? '⬅️' : '➡️'}
            </button>

            {/* Texto del menú */}
            {isNavbarExpanded && (
                <h2 style={{ margin: '10px 0 20px', fontSize: '20px', textAlign: 'center' }}>
                    Menú
                </h2>
            )}

            {/* Opciones del menú */}
            <ul style={{ listStyleType: 'none', padding: 0, width: '100%' }}>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '18px' }}>
                        Inicio
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/talleres" style={{ textDecoration: 'none', color: 'white', fontSize: '18px' }}>
                        Talleres
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
