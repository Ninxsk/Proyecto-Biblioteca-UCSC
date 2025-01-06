import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaHome, FaClipboardList, FaUsers, FaCalendarAlt, FaCaretDown } from 'react-icons/fa';

function Navbar({ toggleNavbar, isNavbarExpanded }) {
    const [isUSPExpanded, setIsUSPExpanded] = useState(false);

    const toggleUSP = () => {
        setIsUSPExpanded((prevState) => !prevState);
    };

    return (
        <div
            style={{
                width: isNavbarExpanded ? '230px' : '80px',
                backgroundColor: '#242A3C',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px 0',
                transition: 'width 0.3s ease',
                boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
                position: 'relative',
                height: '100vh',
            }}
        >
            {/* Logo y Título */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    marginBottom: isNavbarExpanded ? '15px' : '10px',
                }}
            >
                <img
                    src="https://via.placeholder.com/50"
                    alt="Logo"
                    style={{
                        width: isNavbarExpanded ? '70px' : '50px',
                        height: isNavbarExpanded ? '70px' : '50px',
                        marginBottom: '5px',
                    }}
                />
                {isNavbarExpanded && (
                    <h2
                        style={{
                            margin: 0,
                            fontSize: '22px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        Minerva
                    </h2>
                )}
            </div>

            {/* Opciones del menú */}
            <ul
                style={{
                    listStyleType: 'none',
                    padding: 0,
                    width: '100%',
                }}
            >
                {/* Inicio */}
                <li
                    className="nav-item"
                    style={{
                        margin: '10px 0',
                        display: 'flex',
                        alignItems: 'center',
                        padding: isNavbarExpanded ? '15px 20px' : '10px',
                        borderRadius: '5px',
                        fontSize: isNavbarExpanded ? '20px' : '24px',
                    }}
                >
                    <Link
                        to="/"
                        style={{
                            textDecoration: 'none',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <FaHome />
                        {isNavbarExpanded && <span>Inicio</span>}
                    </Link>
                </li>

                {/* USP */}
                <li
                    className="nav-item"
                    style={{
                        margin: '10px 0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isNavbarExpanded ? 'flex-start' : 'center',
                        padding: '5px 0',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            color: 'white',
                            padding: isNavbarExpanded ? '15px 20px' : '10px',
                            borderRadius: '5px',
                            fontSize: isNavbarExpanded ? '20px' : '24px',
                        }}
                        onClick={toggleUSP}
                    >
                        <FaClipboardList />
                        {isNavbarExpanded && (
                            <>
                                <span>USP</span>
                                <FaCaretDown
                                    style={{
                                        transform: isUSPExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s ease',
                                    }}
                                />
                            </>
                        )}
                    </div>

                    {/* Submenú de USP */}
                    {isUSPExpanded && isNavbarExpanded && (
                        <ul
                            style={{
                                listStyleType: 'none',
                                paddingLeft: '30px',
                                margin: 0,
                                marginTop: '5px',
                                fontSize: '18px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            <li>
                                <Link
                                    to="/talleres"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                    }}
                                >
                                    <FaUsers />
                                    <span>Talleres</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/jornadas"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                    }}
                                >
                                    <FaCalendarAlt />
                                    <span>Jornadas</span>
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>

            {/* Botón de alternar */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: isNavbarExpanded ? 'flex-end' : 'center',
                    padding: isNavbarExpanded ? '10px 15px' : '10px',
                }}
            >
                <button
                    style={{
                        backgroundColor: '#fff',
                        border: 'none',
                        color: '#242A3C',
                        fontSize: '16px',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                    }}
                    onClick={toggleNavbar}
                >
                    {isNavbarExpanded ? <FaChevronLeft /> : <FaChevronRight />}
                </button>
            </div>
        </div>
    );
}

export default Navbar;
