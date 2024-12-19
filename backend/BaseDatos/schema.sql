/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.6.18-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: minerva
-- ------------------------------------------------------
-- Server version	10.6.18-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asiste`
--

DROP TABLE IF EXISTS `asiste`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asiste` (
  `id_asiste` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `ua` int(4) unsigned NOT NULL,
  `id_asistente` int(5) unsigned DEFAULT NULL,
  `id_taller` int(5) unsigned NOT NULL,
  `correo` varchar(100) NOT NULL,
  `comentario` text DEFAULT NULL,
  `satisfaccion` int(5) NOT NULL,
  PRIMARY KEY (`id_asiste`),
  UNIQUE KEY `asiste_unique` (`id_asistente`,`id_taller`),
  KEY `asiste_core_carrera_FK` (`ua`),
  KEY `asiste_taller_FK` (`id_taller`),
  CONSTRAINT `asiste_asistente_FK` FOREIGN KEY (`id_asistente`) REFERENCES `asistente` (`id`),
  CONSTRAINT `asiste_core_carrera_FK` FOREIGN KEY (`ua`) REFERENCES `core_carrera` (`ua`),
  CONSTRAINT `asiste_taller_FK` FOREIGN KEY (`id_taller`) REFERENCES `taller` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `asiste_externo`
--

DROP TABLE IF EXISTS `asiste_externo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asiste_externo` (
  `id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `id_externo` int(5) unsigned DEFAULT NULL,
  `id_taller` int(5) unsigned NOT NULL,
  `correo` varchar(100) NOT NULL,
  `pais` varchar(30) NOT NULL,
  `institucion` varchar(100) NOT NULL,
  `comentario` text DEFAULT NULL,
  `satisfaccion` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `asiste_externo_unique` (`id_externo`,`id_taller`),
  KEY `asiste_externo_taller_FK` (`id_taller`),
  CONSTRAINT `asiste_externo_asistente_externo_FK` FOREIGN KEY (`id_externo`) REFERENCES `asistente_externo` (`id_externo`),
  CONSTRAINT `asiste_externo_taller_FK` FOREIGN KEY (`id_taller`) REFERENCES `taller` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `asistente`
--

DROP TABLE IF EXISTS `asistente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asistente` (
  `id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `rut` varchar(9) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `asistente_unique` (`rut`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `asistente_externo`
--

DROP TABLE IF EXISTS `asistente_externo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asistente_externo` (
  `id_externo` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `num_documento` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_externo`),
  UNIQUE KEY `asistente_externo_unique` (`num_documento`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--

-- Table structure for table `core_carrera`
--

DROP TABLE IF EXISTS `core_carrera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `core_carrera` (
  `ua` int(4) unsigned NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `cod_jornada` int(2) unsigned DEFAULT NULL,
  `jornada` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `cod_facultad` int(4) unsigned DEFAULT NULL,
  `facultad` varchar(100) DEFAULT NULL,
  `cod_sede` int(2) unsigned DEFAULT NULL,
  `sede` varchar(100) DEFAULT NULL,
  `categoria` varchar(100) DEFAULT 'asignar',
  `regulares` int(10) unsigned NOT NULL DEFAULT 0,
  `cuenta_anterior` int(10) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ua`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `django_admin_log`
--


-- Table structure for table `jornada`
--

DROP TABLE IF EXISTS `jornada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jornada` (
  `id_jornada` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `inicio` date NOT NULL,
  `termino` date NOT NULL,
  UNIQUE KEY `jornada_unique` (`id_jornada`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `taller`
--

DROP TABLE IF EXISTS `taller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taller` (
  `id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `relator` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `inicio` time NOT NULL,
  `fin` time NOT NULL,
  `modalidad` tinyint(1) NOT NULL DEFAULT 1,
  `id_sol_taller` int(5) unsigned DEFAULT NULL,
  `id_jornada` int(5) unsigned DEFAULT NULL,
  `Lugar` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `taller_web_sol_taller_FK` (`id_sol_taller`),
  KEY `taller_jornada_FK` (`id_jornada`),
  CONSTRAINT `taller_jornada_FK` FOREIGN KEY (`id_jornada`) REFERENCES `jornada` (`id_jornada`),
  CONSTRAINT `taller_web_sol_taller_FK` FOREIGN KEY (`id_sol_taller`) REFERENCES `web_sol_taller` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `web_dom_talleres`
--

DROP TABLE IF EXISTS `web_dom_talleres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_dom_talleres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `web_dom_talleres_UN` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=1008 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `web_sol_taller`
--

DROP TABLE IF EXISTS `web_sol_taller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_sol_taller` (
  `id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `rut` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ua` int(4) unsigned NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `taller` int(11) NOT NULL,
  `presencial` tinyint(1) NOT NULL DEFAULT 1,
  `f_taller` date NOT NULL,
  `f_solicitud` date NOT NULL,
  `comentarios` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `web_sol_taller_core_carrera_FK` (`ua`),
  KEY `web_sol_taller_web_talleres_FK` (`taller`),
  CONSTRAINT `web_sol_taller_core_carrera_FK` FOREIGN KEY (`ua`) REFERENCES `core_carrera` (`ua`),
  CONSTRAINT `web_sol_taller_web_talleres_FK` FOREIGN KEY (`taller`) REFERENCES `web_talleres` (`id_taller`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `web_talleres`
--

DROP TABLE IF EXISTS `web_talleres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_talleres` (
  `id_taller` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `objetivo` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contenido` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `categoria` int(11) NOT NULL,
  `activo` int(1) DEFAULT NULL,
  PRIMARY KEY (`id_taller`),
  KEY `web_talleres_FK` (`categoria`),
  CONSTRAINT `web_talleres_FK` FOREIGN KEY (`categoria`) REFERENCES `web_dom_talleres` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-10 12:47:37