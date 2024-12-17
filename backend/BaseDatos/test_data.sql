-- Datos de prueba para 'asistente'
INSERT INTO `asistente` (`id`, `rut`, `nombre`) VALUES 
(1, '123456789', 'Juan Pérez'),
(2, '876543214', 'María González');

-- Datos de prueba para 'asistente_externo'
INSERT INTO `asistente_externo` (`id_externo`, `num_documento`, `nombre`) VALUES 
(1, '12345', 'John Doe'),
(2, '67890', 'Jane Smith');

-- Datos de prueba para 'core_carrera'
INSERT INTO `core_carrera` (`ua`, `nombre`, `cod_jornada`, `jornada`, `cod_facultad`, `facultad`, `cod_sede`, `sede`, `categoria`, `regulares`, `cuenta_anterior`) VALUES 
(1001, 'Ingeniería Informática', 1, 'Diurna', 101, 'Facultad de Ingeniería', 10, 'Sede Central', 'asignar', 50, 10),
(1002, 'Administración de Empresas', 2, 'Vespertina', 102, 'Facultad de Economía', 11, 'Sede Norte', 'asignar', 60, 5);

-- Datos de prueba para 'jornada'
INSERT INTO `jornada` (`id_jornada`, `nombre`, `inicio`, `termino`) VALUES 
(1, 'Jornada Matutina', '2024-01-01', '2024-01-15'),
(2, 'Jornada Vespertina', '2024-02-01', '2024-02-15');

-- Datos de prueba para 'taller'
INSERT INTO `taller` (`id`, `nombre`, `relator`, `fecha`, `inicio`, `fin`, `modalidad`, `id_sol_taller`, `id_jornada`, `Lugar`) VALUES 
(1, 'Introducción a Python', 'Carlos Rivera', '2024-03-01', '09:00:00', '12:00:00', 1, NULL, 1, 'Sala 101'),
(2, 'Desarrollo Web con Django', 'Ana Torres', '2024-03-10', '14:00:00', '18:00:00', 0, NULL, 2, 'Sala Virtual Zoom');

-- Datos de prueba para 'web_dom_talleres'
INSERT INTO `web_dom_talleres` (`id`, `nombre`) VALUES 
(1, 'Talleres de Programación'),
(2, 'Talleres de Gestión');

-- Datos de prueba para 'web_talleres'
INSERT INTO `web_talleres` (`id_taller`, `nombre`, `objetivo`, `contenido`, `categoria`, `activo`) VALUES 
(1, 'Introducción a Bases de Datos', 'Comprender bases relacionales', 'SQL, diseño de ERD', 1, 1),
(2, 'Avanzado en MariaDB', 'Optimización de consultas', 'Claves foráneas, índices', 1, 1);

-- Datos de prueba para 'web_sol_taller'
INSERT INTO `web_sol_taller` (`id`, `rut`, `ua`, `email`, `taller`, `presencial`, `f_taller`, `f_solicitud`, `comentarios`) VALUES 
(1, '12345678K', 1001, 'juan.perez@example.com', 1, 1, '2024-03-01', '2024-02-01', 'Inscripción confirmada'),
(2, '87654321L', 1002, 'maria.gonzalez@example.com', 2, 0, '2024-03-10', '2024-02-05', 'Pendiente de pago');

-- Datos de prueba para 'asiste'
INSERT INTO `asiste` (`id_asiste`, `ua`, `id_asistente`, `id_taller`, `correo`, `comentario`, `satisfaccion`) VALUES 
(1, 1001, 1, 1, 'juan.perez@example.com', 'Excelente taller, muy claro', 10),
(2, 1002, 2, 2, 'maria.gonzalez@example.com', 'Interesante y bien explicado', 9);

-- Datos de prueba para 'asiste_externo'
INSERT INTO `asiste_externo` (`id`, `id_externo`, `id_taller`, `correo`, `pais`, `institucion`, `comentario`, `satisfaccion`) VALUES 
(1, 1, 1, 'john.doe@example.com', 'USA', 'University A', 'Buen nivel de contenido', 10),
(2, 2, 2, 'jane.smith@example.com', 'Canada', 'College B', 'Excelente interacción', 8);



