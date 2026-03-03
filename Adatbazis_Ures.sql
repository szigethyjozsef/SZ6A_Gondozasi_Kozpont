-- --------------------------------------------------------
-- Host:                         193.227.198.214
-- Szerver verzió:               10.11.13-MariaDB-0ubuntu0.24.04.1 - Ubuntu 24.04
-- Szerver OS:                   debian-linux-gnu
-- HeidiSQL Verzió:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Adatbázis struktúra mentése a 2021SZ_barabas_gergo.
CREATE DATABASE IF NOT EXISTS `2021SZ_barabas_gergo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `2021SZ_barabas_gergo`;

-- Struktúra mentése tábla 2021SZ_barabas_gergo. Betegsegek
CREATE TABLE IF NOT EXISTS `Betegsegek` (
  `B_ID` int(11) NOT NULL AUTO_INCREMENT,
  `NEV` varchar(50) DEFAULT NULL,
  `BNO` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`B_ID`),
  UNIQUE KEY `BNO` (`BNO`),
  UNIQUE KEY `NEV` (`NEV`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla 2021SZ_barabas_gergo. Config
CREATE TABLE IF NOT EXISTS `Config` (
  `C_ID` int(11) NOT NULL AUTO_INCREMENT,
  `FIELD` varchar(50) DEFAULT NULL,
  `VALUE` varchar(50) DEFAULT NULL,
  `DESCRIPTION` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`C_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=307 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla 2021SZ_barabas_gergo. Gyogyszerek
CREATE TABLE IF NOT EXISTS `Gyogyszerek` (
  `G_ID` int(11) NOT NULL AUTO_INCREMENT,
  `NEV` varchar(50) DEFAULT NULL,
  `HATOANYAG` varchar(50) DEFAULT NULL,
  `MENNYISEG` varchar(50) DEFAULT NULL,
  `MERTEKEGYSEG` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`G_ID`),
  UNIQUE KEY `NEV` (`NEV`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla 2021SZ_barabas_gergo. Korlap
CREATE TABLE IF NOT EXISTS `Korlap` (
  `K_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PACIENS_ID` int(11) DEFAULT NULL,
  `OPERATOR_ID` int(11) DEFAULT NULL,
  `LEIRAS` text NOT NULL,
  `DATUM` date NOT NULL DEFAULT curdate(),
  PRIMARY KEY (`K_ID`),
  KEY `FK_Korlap_Paciensek` (`PACIENS_ID`),
  KEY `FK_Korlap_Operatorok` (`OPERATOR_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla 2021SZ_barabas_gergo. Naplo
CREATE TABLE IF NOT EXISTS `Naplo` (
  `N_ID` int(11) NOT NULL AUTO_INCREMENT,
  `OP_NEV` varchar(50) DEFAULT NULL,
  `SQLX` varchar(200) DEFAULT NULL,
  `DATUMIDO` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`N_ID`),
  KEY `FK_Naplo_Operatorok` (`OP_NEV`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla 2021SZ_barabas_gergo. Operatorok
CREATE TABLE IF NOT EXISTS `Operatorok` (
  `O_ID` int(11) NOT NULL AUTO_INCREMENT,
  `NEV` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `FELHASZNALONEV` varchar(50) NOT NULL DEFAULT '',
  `PASSWORD` varchar(50) NOT NULL DEFAULT '',
  `JOGOSULTSAG` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`O_ID`),
  UNIQUE KEY `FELHASZNALONEV` (`FELHASZNALONEV`),
  KEY `NEV` (`NEV`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla 2021SZ_barabas_gergo. Paciensek
CREATE TABLE IF NOT EXISTS `Paciensek` (
  `P_ID` int(11) NOT NULL AUTO_INCREMENT,
  `NEV` varchar(50) NOT NULL,
  `NEM` varchar(50) NOT NULL,
  `SZUL_NEV` varchar(50) DEFAULT NULL,
  `ANYA_NEV` varchar(50) NOT NULL,
  `SZUL_HELY` varchar(50) NOT NULL,
  `SZUL_IDO` date NOT NULL,
  `TAJ` varchar(50) NOT NULL,
  `ALLAPOT` varchar(50) NOT NULL,
  `ELLAT_IDO` date NOT NULL,
  `TAVOZ_IDO` date DEFAULT NULL,
  `IRANYITOSZAM` varchar(50) NOT NULL,
  `TELEPULES` varchar(50) NOT NULL,
  `CIM` varchar(50) NOT NULL,
  `TELEFON` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `NYUGDIJ` varchar(50) NOT NULL,
  PRIMARY KEY (`P_ID`),
  UNIQUE KEY `TAJ` (`TAJ`),
  KEY `NEV` (`NEV`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla 2021SZ_barabas_gergo. Paciens_Betegseg
CREATE TABLE IF NOT EXISTS `Paciens_Betegseg` (
  `PB_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PACIENS_ID` int(11) DEFAULT 0,
  `BETEGSEG_ID` int(11) DEFAULT 0,
  `OPERATOR_ID` int(11) DEFAULT 0,
  PRIMARY KEY (`PB_ID`),
  KEY `FK_Paciens_Betegseg_Paciensek` (`PACIENS_ID`),
  KEY `FK_Paciens_Betegseg_Betegsegek` (`BETEGSEG_ID`),
  KEY `FK_Paciens_Betegseg_Operatorok` (`OPERATOR_ID`),
  CONSTRAINT `FK_Paciens_Betegseg_Betegsegek` FOREIGN KEY (`BETEGSEG_ID`) REFERENCES `Betegsegek` (`B_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Paciens_Betegseg_Operatorok` FOREIGN KEY (`OPERATOR_ID`) REFERENCES `Operatorok` (`O_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Paciens_Betegseg_Paciensek` FOREIGN KEY (`PACIENS_ID`) REFERENCES `Paciensek` (`P_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla 2021SZ_barabas_gergo. Paciens_Gyogyszer
CREATE TABLE IF NOT EXISTS `Paciens_Gyogyszer` (
  `PGY_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PACIENS_ID` int(11) DEFAULT NULL,
  `GYOGYSZER_ID` int(11) DEFAULT NULL,
  `OPERATOR_ID` int(11) DEFAULT NULL,
  `ADAGOLAS` varchar(50) NOT NULL DEFAULT 'üres',
  PRIMARY KEY (`PGY_ID`),
  KEY `FK_Paciens_Gyogyszer_Paciensek` (`PACIENS_ID`),
  KEY `FK_Paciens_Gyogyszer_Operatorok` (`OPERATOR_ID`),
  KEY `FK_Paciens_Gyogyszer_Gyogyszerek` (`GYOGYSZER_ID`),
  CONSTRAINT `FK_Paciens_Gyogyszer_Gyogyszerek` FOREIGN KEY (`GYOGYSZER_ID`) REFERENCES `Gyogyszerek` (`G_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Paciens_Gyogyszer_Operatorok` FOREIGN KEY (`OPERATOR_ID`) REFERENCES `Operatorok` (`O_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Paciens_Gyogyszer_Paciensek` FOREIGN KEY (`PACIENS_ID`) REFERENCES `Paciensek` (`P_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla 2021SZ_barabas_gergo. Paciens_Rokon
CREATE TABLE IF NOT EXISTS `Paciens_Rokon` (
  `PR_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PACIENS_ID` int(11) DEFAULT NULL,
  `ROKON_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`PR_ID`),
  KEY `FK_Paciens_Rokon_Paciensek` (`PACIENS_ID`),
  KEY `FK_Paciens_Rokon_Rokonok` (`ROKON_ID`),
  CONSTRAINT `FK_Paciens_Rokon_Paciensek` FOREIGN KEY (`PACIENS_ID`) REFERENCES `Paciensek` (`P_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Paciens_Rokon_Rokonok` FOREIGN KEY (`ROKON_ID`) REFERENCES `Rokonok` (`R_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla 2021SZ_barabas_gergo. Rokonok
CREATE TABLE IF NOT EXISTS `Rokonok` (
  `R_ID` int(11) NOT NULL AUTO_INCREMENT,
  `NEV` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `FELHASZNALONEV` varchar(50) DEFAULT NULL,
  `PASSWORD` varchar(50) DEFAULT NULL,
  `IRANYITOSZAM` varchar(50) NOT NULL DEFAULT '',
  `TELEPULES` varchar(50) NOT NULL,
  `CIM` varchar(50) NOT NULL,
  `TELEFON` varchar(50) NOT NULL,
  PRIMARY KEY (`R_ID`),
  UNIQUE KEY `FELHASZNALONEV` (`FELHASZNALONEV`),
  KEY `NEV` (`NEV`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `Config` (`C_ID`, `FIELD`, `VALUE`, `DESCRIPTION`) VALUES
	(246, 'gyogyi', 'mg', 'Milligramm'),
	(247, 'gyogyi', 'g', 'Gramm'),
	(248, 'gyogyi', 'ml', 'Milliliter'),
	(249, 'gyogyi', 'l', 'Liter'),
	(250, 'gyogyi', 'mcg', 'Mikrogramm'),
	(251, 'gyogyi', 'IU', 'Nemzetközi egység'),
	(252, 'gyogyi', 'tabletta', 'Tabletta egység'),
	(253, 'gyogyi', 'kapszula', 'Kapszula egység'),
	(254, 'gyogyi', 'csepp', 'Csepp egység'),
	(255, 'gyogyi', 'adag', 'Adag, pl. inhalátorhoz'),
	(256, 'Operatorok', 'O_ID', 'Operátor azonosító'),
	(257, 'Operatorok', 'NEV', 'Név'),
	(258, 'Operatorok', 'EMAIL', 'E-mail cím'),
	(259, 'Operatorok', 'FELHASZNALONEV', 'Felhasználónév'),
	(260, 'Operatorok', 'PASSWORD', 'Jelszó'),
	(261, 'Operatorok', 'JOGOSULTSAG', 'Jogosultság'),
	(263, 'Paciensek', 'P_ID', 'Páciens azonosító'),
	(264, 'Paciensek', 'NEV', 'Név'),
	(265, 'Paciensek', 'NEM', 'Neme'),
	(266, 'Paciensek', 'SZUL_NEV', 'Születési név'),
	(267, 'Paciensek', 'ANYA_NEV', 'Anyja neve'),
	(268, 'Paciensek', 'SZUL_HELY', 'Születési hely'),
	(269, 'Paciensek', 'SZUL_IDO', 'Születési idő'),
	(270, 'Paciensek', 'TAJ', 'TAJ szám'),
	(271, 'Paciensek', 'ALLAPOT', 'Állapot'),
	(272, 'Paciensek', 'ELLAT_IDO', 'Ellátás kezdete'),
	(273, 'Paciensek', 'TAVOZ_IDO', 'Távozás ideje'),
	(274, 'Paciensek', 'IRANYITOSZAM', 'Irányítószám'),
	(275, 'Paciensek', 'TELEPULES', 'Település'),
	(276, 'Paciensek', 'CIM', 'Cím'),
	(277, 'Paciensek', 'TELEFON', 'Telefonszám'),
	(278, 'Paciensek', 'EMAIL', 'E-mail cím'),
	(279, 'Paciensek', 'NYUGDIJ', 'Nyugdíjas'),
	(280, 'Rokonok', 'R_ID', 'Rokon azonosító'),
	(281, 'Rokonok', 'NEV', 'Név'),
	(282, 'Rokonok', 'EMAIL', 'E-mail cím'),
	(283, 'Rokonok', 'FELHASZNALONEV', 'Felhasználónév'),
	(284, 'Rokonok', 'PASSWORD', 'Jelszó'),
	(286, 'Rokonok', 'IRANYITOSZAM', 'Irányítószám'),
	(287, 'Rokonok', 'TELEPULES', 'Település'),
	(288, 'Rokonok', 'CIM', 'Cím'),
	(289, 'Rokonok', 'TELEFON', 'Telefonszám'),
	(290, 'Korlap', 'K_ID', 'Korlap azonosító'),
	(291, 'Korlap', 'PACIENS_ID', 'Páciens'),
	(292, 'Korlap', 'OPERATOR_ID', 'Operátor'),
	(293, 'Korlap', 'LEIRAS', 'Leírás'),
	(294, 'Gyogyszerek', 'GY_ID', 'Gyógyszer azonosító'),
	(295, 'Gyogyszerek', 'NEV', 'Gyógyszer neve'),
	(296, 'Gyogyszerek', 'HATOANYAG', 'Hatóanyag'),
	(297, 'Gyogyszerek', 'MENNYISEG', 'Mennyiség'),
	(298, 'Gyogyszerek', 'MERTEKEGYSEG', 'Mértékegység'),
	(299, 'Betegsegek', 'B_ID', 'Betegség azonosító'),
	(300, 'Betegsegek', 'NEV', 'Betegség neve'),
	(301, 'Betegsegek', 'BNO', 'BNO kód'),
	(302, 'Operatorok_JOGOSULTSAG', 'admin', 'Admin'),
	(303, 'Operatorok_JOGOSULTSAG', 'orvos', 'Orvos'),
	(304, 'Operatorok_JOGOSULTSAG', 'apolo', 'Ápoló'),
	(305, 'Operatorok_JOGOSULTSAG', 'rokon', 'Rokon'),
	(306, 'PACIENS_GYOGYSZER', 'ADAGOLAS', 'Adagolás');
/*!40000 ALTER TABLE `Config` ENABLE KEYS */
-- Az adatok exportálása nem lett kiválasztva.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;


-- Tábla adatainak mentése 2021SZ_barabas_gergo.Operatorok: ~3 rows (hozzávetőleg)
/*!40000 ALTER TABLE `Operatorok` DISABLE KEYS */;
INSERT INTO `Operatorok` (`O_ID`, `NEV`, `EMAIL`, `FELHASZNALONEV`, `PASSWORD`, `JOGOSULTSAG`) VALUES
	(1, 'admin', 'admin', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin'),
/*!40000 ALTER TABLE `Operatorok` ENABLE KEYS */;
