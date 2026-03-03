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

-- Tábla adatainak mentése 2021SZ_barabas_gergo.Betegsegek: ~20 rows (hozzávetőleg)
/*!40000 ALTER TABLE `Betegsegek` DISABLE KEYS */;
INSERT INTO `Betegsegek` (`B_ID`, `NEV`, `BNO`) VALUES
	(1, 'Magas vérnyomás betegség', 'I10'),
	(2, 'Inzulin-függő cukorbetegség', 'E10.9'),
	(3, 'Akut mandulagyulladás', 'J03.90'),
	(4, 'Krónikus bronchitis', 'J42'),
	(5, 'Allergiás rhinitis', 'J30.4'),
	(6, 'Visszatérő depressziós zavar', 'F33.1'),
	(7, 'Migrénes fejfájás görcsökkel', 'G43.0'),
	(8, 'Asztma bronchiale', 'J45.0'),
	(9, 'Pikkelysömör plakkos típus', 'L40.0'),
	(10, 'Gyomorfekély vérzés nélkül', 'K25.9'),
	(11, 'Epehólyag-gyulladás akut', 'K81.0'),
	(12, 'Derékfájás és lumbágó', 'M54.5'),
	(13, 'Pajzsmirigy túlműködés', 'E05.9'),
	(14, 'Kötőhártya-gyulladás fertőző', 'H10.9'),
	(15, 'Középfülgyulladás akut', 'H66.0'),
	(16, 'Csalánkiütés allergiás', 'L50.0'),
	(17, 'Vashiányos vérszegénység', 'D50.9'),
	(18, 'Pánikzavar agorafóbiával', 'F41.0'),
	(19, 'Csípőízületi kopás', 'M16.9'),
	(20, 'Orbánc fertőzés', 'A46');
/*!40000 ALTER TABLE `Betegsegek` ENABLE KEYS */;

-- Struktúra mentése tábla 2021SZ_barabas_gergo. Config
CREATE TABLE IF NOT EXISTS `Config` (
  `C_ID` int(11) NOT NULL AUTO_INCREMENT,
  `FIELD` varchar(50) DEFAULT NULL,
  `VALUE` varchar(50) DEFAULT NULL,
  `DESCRIPTION` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`C_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=307 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tábla adatainak mentése 2021SZ_barabas_gergo.Config: ~59 rows (hozzávetőleg)
/*!40000 ALTER TABLE `Config` DISABLE KEYS */;
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
/*!40000 ALTER TABLE `Config` ENABLE KEYS */;

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

-- Tábla adatainak mentése 2021SZ_barabas_gergo.Gyogyszerek: ~20 rows (hozzávetőleg)
/*!40000 ALTER TABLE `Gyogyszerek` DISABLE KEYS */;
INSERT INTO `Gyogyszerek` (`G_ID`, `NEV`, `HATOANYAG`, `MENNYISEG`, `MERTEKEGYSEG`) VALUES
	(1, 'Algopyrin', 'Metamizol-nátrium', '500', 'mg'),
	(2, 'Cataflam Dolo', 'Diklofenák-kálium', '25', 'mg'),
	(3, 'Quamatel', 'Famotidin', '40', 'mg'),
	(4, 'No-Spa', 'Drotaverin-hidroklorid', '40', 'mg'),
	(5, 'Xyzal', 'Levocetirizin-dihidroklorid', '5', 'mg'),
	(6, 'Augmentin Duo', 'Amoxicillin-klavulánsav', '875', 'mg'),
	(7, 'Zinnat', 'Cefuroxim-axetil', '500', 'mg'),
	(8, 'Frontin', 'Alprazolam', '0.5', 'mg'),
	(9, 'Concor', 'Bizoprolol-fumarát', '5', 'mg'),
	(10, 'L-Thyroxin', 'Levotiroxin-nátrium', '100', 'mcg'),
	(11, 'Calcimusc', 'Kalcium-glukonát', '5', 'ml'),
	(12, 'Vigantol', 'Kolecalciferol', '500', 'IU'),
	(13, 'Advil Ultra', 'Ibuprofén', '400', 'mg'),
	(14, 'Normix', 'Rifaximin', '200', 'mg'),
	(15, 'Milgamma N', 'B-vitamin komplex', '1', 'kapszula'),
	(16, 'Linex Forte', 'Probiotikum', '1', 'kapszula'),
	(17, 'Fenistil', 'Dimetindén-maleát', '20', 'ml'),
	(18, 'Nasivin', 'Oximetazolin-hidroklorid', '10', 'ml'),
	(19, 'Betadine', 'Povidon-jód', '30', 'ml'),
	(20, 'Supradyn', 'Multivitamin', '1', 'tabletta');
/*!40000 ALTER TABLE `Gyogyszerek` ENABLE KEYS */;

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

-- Tábla adatainak mentése 2021SZ_barabas_gergo.Korlap: ~2 rows (hozzávetőleg)
/*!40000 ALTER TABLE `Korlap` DISABLE KEYS */;
INSERT INTO `Korlap` (`K_ID`, `PACIENS_ID`, `OPERATOR_ID`, `LEIRAS`, `DATUM`) VALUES
	(1, 1, 1, 'korlap/korlap_1_2026-02-28_15-41-24.pdf', '2026-02-28'),
	(2, 1, 1, 'korlap/korlap_1_2026-03-02_08-16-16.pdf', '2026-03-02');
/*!40000 ALTER TABLE `Korlap` ENABLE KEYS */;

-- Struktúra mentése tábla 2021SZ_barabas_gergo. Naplo
CREATE TABLE IF NOT EXISTS `Naplo` (
  `N_ID` int(11) NOT NULL AUTO_INCREMENT,
  `OP_NEV` varchar(50) DEFAULT NULL,
  `SQLX` varchar(200) DEFAULT NULL,
  `DATUMIDO` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`N_ID`),
  KEY `FK_Naplo_Operatorok` (`OP_NEV`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tábla adatainak mentése 2021SZ_barabas_gergo.Naplo: ~112 rows (hozzávetőleg)
/*!40000 ALTER TABLE `Naplo` DISABLE KEYS */;
INSERT INTO `Naplo` (`N_ID`, `OP_NEV`, `SQLX`, `DATUMIDO`) VALUES
	(1, 'admin', 'Módosította a(z) 13 azonosítójú adatot a(z) Betegsegek táblában.', '2026-02-28 15:16:26'),
	(2, 'admin', 'Hozzáadott egy adatot a(z) 123456789 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:16:38'),
	(3, 'admin', 'Hozzáadott egy adatot a(z) 123456789 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:16:40'),
	(4, 'admin', 'Hozzáadott egy adatot a(z) 123456789 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:16:43'),
	(5, 'admin', 'Hozzáadott egy adatot a(z) 987654321 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:16:52'),
	(6, 'admin', 'Hozzáadott egy adatot a(z) 987654321 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:16:55'),
	(7, 'admin', 'Hozzáadott egy adatot a(z) 987654321 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:16:59'),
	(8, 'admin', 'Módosította a 987654321 tajszámú páciens Augmentin Duo gyógyszerének adagolását.', '2026-02-28 15:17:04'),
	(9, 'admin', 'Módosította a 987654321 tajszámú páciens Betadine gyógyszerének adagolását.', '2026-02-28 15:17:08'),
	(10, 'admin', 'Módosította a 987654321 tajszámú páciens Calcimusc gyógyszerének adagolását.', '2026-02-28 15:17:12'),
	(11, 'admin', 'Módosította a 987654321 tajszámú páciens személyes adatait.', '2026-02-28 15:17:17'),
	(12, 'admin', 'Hozzáadott egy adatot a(z) 456123789 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:17:26'),
	(13, 'admin', 'Hozzáadott egy adatot a(z) 456123789 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:17:29'),
	(14, 'admin', 'Hozzáadott egy adatot a(z) 456123789 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:17:32'),
	(15, 'admin', 'Hozzáadott egy adatot a(z) 321654987 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:17:43'),
	(16, 'admin', 'Hozzáadott egy adatot a(z) 321654987 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:17:46'),
	(17, 'admin', 'Hozzáadott egy adatot a(z) 789456123 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:17:55'),
	(18, 'admin', 'Hozzáadott egy adatot a(z) 789456123 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:17:58'),
	(19, 'admin', 'Hozzáadott egy adatot a(z) 789456123 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:18:01'),
	(20, 'admin', 'Hozzáadott egy adatot a(z) 654789321 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:18:06'),
	(21, 'admin', 'Hozzáadott egy adatot a(z) 654789321 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:18:07'),
	(22, 'admin', 'Hozzáadott egy adatot a(z) 654789321 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:18:10'),
	(23, 'admin', 'Hozzáadott egy adatot a(z) 654789321 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:18:14'),
	(24, 'admin', 'Hozzáadott egy adatot a(z) 147258369 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:18:19'),
	(25, 'admin', 'Hozzáadott egy adatot a(z) 147258369 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:18:23'),
	(26, 'admin', 'Hozzáadott egy adatot a(z) 147258369 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:18:26'),
	(27, 'admin', 'Hozzáadott egy adatot a(z) 369258147 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:18:31'),
	(28, 'admin', 'Hozzáadott egy adatot a(z) 369258147 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:18:33'),
	(29, 'admin', 'Hozzáadott egy adatot a(z) 369258147 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:18:36'),
	(30, 'admin', 'Hozzáadott egy adatot a(z) 258369147 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:18:43'),
	(31, 'admin', 'Hozzáadott egy adatot a(z) 258369147 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:18:46'),
	(32, 'admin', 'Hozzáadott egy adatot a(z) 852963741 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:18:52'),
	(33, 'admin', 'Hozzáadott egy adatot a(z) 852963741 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:18:54'),
	(34, 'admin', 'Hozzáadott egy adatot a(z) 159357482 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:19:04'),
	(35, 'admin', 'Hozzáadott egy adatot a(z) 159357482 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:19:07'),
	(36, 'admin', 'Hozzáadott egy adatot a(z) 159357482 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:19:10'),
	(37, 'admin', 'Hozzáadott egy adatot a(z) 753159486 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:19:20'),
	(38, 'admin', 'Hozzáadott egy adatot a(z) 753159486 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:19:23'),
	(39, 'admin', 'Hozzáadott egy adatot a(z) 753159486 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:19:27'),
	(40, 'admin', 'Hozzáadott egy adatot a(z) 951753468 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:19:34'),
	(41, 'admin', 'Hozzáadott egy adatot a(z) 951753468 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:19:37'),
	(42, 'admin', 'Hozzáadott egy adatot a(z) 951753468 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:19:41'),
	(43, 'admin', 'Hozzáadott egy adatot a(z) 486257139 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:19:53'),
	(44, 'admin', 'Hozzáadott egy adatot a(z) 486257139 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:19:56'),
	(45, 'admin', 'Hozzáadott egy adatot a(z) 486257139 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:19:59'),
	(46, 'admin', 'Hozzáadott egy adatot a(z) 319246578 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:20:07'),
	(47, 'admin', 'Hozzáadott egy adatot a(z) 319246578 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:20:10'),
	(48, 'admin', 'Hozzáadott egy adatot a(z) 319246578 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:20:16'),
	(49, 'admin', 'Hozzáadott egy adatot a(z) 987123654 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:20:29'),
	(50, 'admin', 'Hozzáadott egy adatot a(z) 987123654 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:20:32'),
	(51, 'admin', 'Hozzáadott egy adatot a(z) 987123654 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:20:35'),
	(52, 'admin', 'Módosította a 456789123 tajszámú páciens személyes adatait.', '2026-02-28 15:20:56'),
	(53, 'admin', 'Módosította a 123456789 tajszámú páciens személyes adatait.', '2026-02-28 15:21:04'),
	(54, 'admin', 'Módosította a 456123789 tajszámú páciens személyes adatait.', '2026-02-28 15:21:14'),
	(55, 'admin', 'Módosította a 321654987 tajszámú páciens személyes adatait.', '2026-02-28 15:21:19'),
	(56, 'admin', 'Módosította a 789456123 tajszámú páciens személyes adatait.', '2026-02-28 15:21:25'),
	(57, 'admin', 'Módosította a 147258369 tajszámú páciens személyes adatait.', '2026-02-28 15:21:35'),
	(58, 'admin', 'Módosította a 369258147 tajszámú páciens személyes adatait.', '2026-02-28 15:21:40'),
	(59, 'admin', 'Módosította a 258369147 tajszámú páciens személyes adatait.', '2026-02-28 15:21:45'),
	(60, 'admin', 'Módosította a 159357482 tajszámú páciens személyes adatait.', '2026-02-28 15:21:56'),
	(61, 'admin', 'Módosította a 753159486 tajszámú páciens személyes adatait.', '2026-02-28 15:22:01'),
	(62, 'admin', 'Módosította a 951753468 tajszámú páciens személyes adatait.', '2026-02-28 15:22:07'),
	(63, 'admin', 'Módosította a 486257139 tajszámú páciens személyes adatait.', '2026-02-28 15:22:12'),
	(64, 'admin', 'Módosította a 319246578 tajszámú páciens személyes adatait.', '2026-02-28 15:22:17'),
	(65, 'admin', 'Módosította a 123987456 tajszámú páciens személyes adatait.', '2026-02-28 15:22:23'),
	(66, 'admin', 'Módosította a 987123654 tajszámú páciens személyes adatait.', '2026-02-28 15:22:28'),
	(67, 'admin', 'Hozzáadott egy adatot a(z) 456789123 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:22:33'),
	(68, 'admin', 'Hozzáadott egy adatot a(z) 456789123 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:22:36'),
	(69, 'admin', 'Hozzáadott egy adatot a(z) 456789123 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:22:39'),
	(70, 'admin', 'Módosította a 741852963 tajszámú páciens személyes adatait.', '2026-02-28 15:22:48'),
	(71, 'admin', 'Módosította a 369147258 tajszámú páciens személyes adatait.', '2026-02-28 15:22:56'),
	(72, 'admin', 'Hozzáadott egy adatot a(z) 741852963 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:23:01'),
	(73, 'admin', 'Hozzáadott egy adatot a(z) 741852963 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:23:04'),
	(74, 'admin', 'Hozzáadott egy adatot a(z) 741852963 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:23:07'),
	(75, 'admin', 'Hozzáadott egy adatot a(z) 369147258 tajszámú páciens Betegsegek adataihoz.', '2026-02-28 15:23:15'),
	(76, 'admin', 'Hozzáadott egy adatot a(z) 369147258 tajszámú páciens Gyogyszerek adataihoz.', '2026-02-28 15:23:18'),
	(77, 'admin', 'Hozzáadott egy adatot a(z) 369147258 tajszámú páciens Rokonok adataihoz.', '2026-02-28 15:23:21'),
	(78, 'admin', 'Módosította a(z) 11 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:00'),
	(79, 'admin', 'Módosította a(z) 20 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:10'),
	(80, 'admin', 'Módosította a(z) 19 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:12'),
	(81, 'admin', 'Módosította a(z) 18 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:15'),
	(82, 'admin', 'Módosította a(z) 17 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:18'),
	(83, 'admin', 'Módosította a(z) 16 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:21'),
	(84, 'admin', 'Módosította a(z) 15 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:24'),
	(85, 'admin', 'Módosította a(z) 14 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:26'),
	(86, 'admin', 'Módosította a(z) 13 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:29'),
	(87, 'admin', 'Módosította a(z) 12 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:31'),
	(88, 'admin', 'Módosította a(z) 10 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:36'),
	(89, 'admin', 'Módosította a(z) 8 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:39'),
	(90, 'admin', 'Módosította a(z) 9 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:42'),
	(91, 'admin', 'Módosította a(z) 7 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:44'),
	(92, 'admin', 'Módosította a(z) 6 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:47'),
	(93, 'admin', 'Módosította a(z) 5 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:51'),
	(94, 'admin', 'Módosította a(z) 4 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:53'),
	(95, 'admin', 'Módosította a(z) 3 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:24:58'),
	(96, 'admin', 'Módosította a(z) 2 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:25:01'),
	(97, 'admin', 'Módosította a(z) 1 azonosítójú adatot a(z) Rokonok táblában.', '2026-02-28 15:25:42'),
	(98, 'admin', 'Módosította a(z) 20 azonosítójú adatot a(z) Gyogyszerek táblában.', '2026-02-28 15:26:00'),
	(99, 'admin', 'Módosította a(z) 14 azonosítójú adatot a(z) Gyogyszerek táblában.', '2026-02-28 15:26:02'),
	(100, 'admin', 'Módosította a(z) 6 azonosítójú adatot a(z) Gyogyszerek táblában.', '2026-02-28 15:26:04'),
	(101, 'admin', 'Létrehozott egy új kórlapot a 123456789 tajszámú páciensnek.', '2026-02-28 15:38:08'),
	(102, 'admin', 'Létrehozott egy új kórlapot a 123456789 tajszámú páciensnek.', '2026-02-28 15:41:25'),
	(103, 'admin', 'Új adatot hozott létre a(z) Operatorok táblában.', '2026-02-28 17:56:45'),
	(104, 'akos', 'Módosította a 123456789 tajszámú páciens személyes adatait.', '2026-02-28 17:57:03'),
	(105, 'admin', 'Új adatot hozott létre a(z) Paciensek táblában.', '2026-03-02 07:01:23'),
	(106, 'akos', 'Új adatot hozott létre a(z) Operatorok táblában.', '2026-03-02 07:03:42'),
	(107, 'admin', 'Hozzáadott egy adatot a(z) 123456789 tajszámú páciens Betegsegek adataihoz.', '2026-03-02 07:05:02'),
	(108, 'admin', 'Törölt egy adatot a(z) 123456789 tajszámú páciens Gyogyszerek adataiból.', '2026-03-02 07:05:07'),
	(109, 'admin', 'Hozzáadott egy adatot a(z) 123456789 tajszámú páciens Gyogyszerek adataihoz.', '2026-03-02 07:05:11'),
	(110, 'admin', 'Módosította a 123456789 tajszámú páciens Algopyrin gyógyszerének adagolását.', '2026-03-02 07:05:25'),
	(111, 'admin', 'Létrehozott egy új kórlapot a 123456789 tajszámú páciensnek.', '2026-03-02 07:16:18'),
	(112, 'admin', 'Módosította a 123456789 tajszámú páciens Algopyrin gyógyszerének adagolását.', '2026-03-02 07:18:05');
/*!40000 ALTER TABLE `Naplo` ENABLE KEYS */;

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

-- Tábla adatainak mentése 2021SZ_barabas_gergo.Operatorok: ~3 rows (hozzávetőleg)
/*!40000 ALTER TABLE `Operatorok` DISABLE KEYS */;
INSERT INTO `Operatorok` (`O_ID`, `NEV`, `EMAIL`, `FELHASZNALONEV`, `PASSWORD`, `JOGOSULTSAG`) VALUES
	(1, 'admin', 'admin', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin'),
	(2, 'Boncz Ákos', 'bonczakos6@gmail.com', 'akos', 'dad0870d0f72054882990a7cd027bd94', 'admin'),
	(3, 'Jhoni Sin', 'asdasd@gmail.com', 'SINS', 'bfd59291e825b5f2bbf1eb76569f8fe7', 'apolo');
/*!40000 ALTER TABLE `Operatorok` ENABLE KEYS */;

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

-- Tábla adatainak mentése 2021SZ_barabas_gergo.Paciensek: ~21 rows (hozzávetőleg)
/*!40000 ALTER TABLE `Paciensek` DISABLE KEYS */;
INSERT INTO `Paciensek` (`P_ID`, `NEV`, `NEM`, `SZUL_NEV`, `ANYA_NEV`, `SZUL_HELY`, `SZUL_IDO`, `TAJ`, `ALLAPOT`, `ELLAT_IDO`, `TAVOZ_IDO`, `IRANYITOSZAM`, `TELEPULES`, `CIM`, `TELEFON`, `EMAIL`, `NYUGDIJ`) VALUES
	(1, 'Kovács János', 'Férfi', 'Kovács János', 'Nagy Erzsébet', 'Budapest', '1975-05-12', '123456789', 'Járóbeteg', '2024-02-10', '2024-02-10', '1115', 'Budapest', 'Bartók Béla út 12.', '06301234567', 'kovacs.janos@email.hu', '125000'),
	(2, 'Nagy Ilona', 'Nő', 'Szabó Ilona', 'Kis Mária', 'Debrecen', '1958-11-20', '987654321', 'Fekvőbeteg', '2024-02-15', NULL, '4024', 'Debrecen', 'Piac utca 5.', '36209876543', 'nagy.ilona@freemail.hu', '185000'),
	(3, 'Tóth Gellért', 'Férfi', 'Tóth Gellért', 'Horváth Anna', 'Szeged', '1990-03-05', '456123789', 'Kontrollvizsgálat', '2024-02-20', '2024-02-20', '6720', 'Szeged', 'Tisza Lajos körút 10.', '06704561234', 'toth.gellert@gmail.com', '10000'),
	(4, 'Szabó Beatrix', 'Nő', 'Szabó Beatrix', 'Molnár Éva', 'Győr', '1982-08-14', '321654987', 'Járóbeteg', '2024-02-21', '2024-02-21', '9022', 'Győr', 'Árpád út 3.', '06305556677', 'szabo.bea@citromail.hu', '50000'),
	(5, 'Varga László', 'Férfi', 'Varga László', 'Balogh Judit', 'Pécs', '1965-01-30', '789456123', 'Fekvőbeteg', '2024-02-22', NULL, '7621', 'Pécs', 'Király utca 15.', '3612345678', 'varga.laci@t-online.hu', '210000'),
	(6, 'Molnár Anikó', 'Nő', 'Kiss Anikó', 'Fekete Klára', 'Miskolc', '1977-06-25', '654789321', 'Járóbeteg', '2024-02-23', '2024-02-23', '3525', 'Miskolc', 'Városház tér 2.', '06203334455', 'molnar.aniko@indamail.hu', '140000'),
	(7, 'Farkas Péter', 'Férfi', 'Farkas Péter', 'Vincze Márta', 'Kecskemét', '2005-10-10', '147258369', 'Kontrollvizsgálat', '2024-02-24', '2024-02-24', '6000', 'Kecskemét', 'Nagykőrösi utca 8.', '06708889900', 'farkas.peter@email.com', '5000'),
	(8, 'Balogh Zsófia', 'Nő', 'Balogh Zsófia', 'Szőke Piroska', 'Eger', '1995-12-01', '369258147', 'Járóbeteg', '2024-02-24', '2024-02-24', '3300', 'Eger', 'Dobó tér 1.', '36301112233', 'balogh.zsofia@gmail.com', '95000'),
	(9, 'Papp András', 'Férfi', 'Papp András', 'Takács Gizella', 'Székesfehérvár', '1952-04-18', '258369147', 'Fekvőbeteg', '2024-02-25', NULL, '8000', 'Székesfehérvár', 'Fő utca 20.', '06207778899', 'papp.andras@upcmail.hu', '230000'),
	(10, 'Németh Katalin', 'Nő', 'Fehér Katalin', 'Rácz Ibolya', 'Szombathely', '1988-07-07', '852963741', 'Járóbeteg', '2024-02-26', '2024-02-26', '9700', 'Szombathely', 'Kőszegi utca 5.', '06304445566', 'nemeth.kata@citromail.hu', '110000'),
	(11, 'Balla István', 'Férfi', 'Balla István', 'Gál Teréz', 'Veszprém', '1970-09-12', '159357482', 'Kontrollvizsgálat', '2024-02-26', '2024-02-26', '8200', 'Veszprém', 'Óváros tér 4.', '36701239876', 'balla.istvan@gmail.com', '160000'),
	(12, 'Kiss Melinda', 'Nő', 'Kiss Melinda', 'Kerekes Dóra', 'Sopron', '1992-02-28', '753159486', 'Járóbeteg', '2024-02-27', '2024-02-27', '9400', 'Sopron', 'Várkerület 12.', '06306667788', 'kiss.melinda@freemail.hu', '88000'),
	(13, 'Lakatos Tibor', 'Férfi', 'Lakatos Tibor', 'Oláh Mária', 'Nyíregyháza', '1962-11-05', '951753468', 'Fekvőbeteg', '2024-02-27', NULL, '4400', 'Nyíregyháza', 'Kossuth tér 1.', '06201114477', 'lakatos.tibor@indamail.hu', '195000'),
	(14, 'Simon Eszter', 'Nő', 'Simon Eszter', 'Juhász Ágnes', 'Kaposvár', '2001-05-19', '486257139', 'Járóbeteg', '2024-02-27', '2024-02-27', '7400', 'Kaposvár', 'Teleki utca 2.', '36309990011', 'simon.eszter@gmail.com', '45000'),
	(15, 'Kovács Attila', 'Férfi', 'Kovács Attila', 'Varga Edit', 'Zalaegerszeg', '1984-08-22', '319246578', 'Kontrollvizsgálat', '2024-02-28', '2024-02-28', '8900', 'Zalaegerszeg', 'Göcseji út 14.', '06705553311', 'kovacs.attila@email.hu', '135000'),
	(16, 'Fekete Borbála', 'Nő', 'Fekete Borbála', 'Major Jolán', 'Békéscsaba', '1955-03-15', '123987456', 'Fekvőbeteg', '2024-02-28', NULL, '5600', 'Békéscsaba', 'Andrássy út 5.', '06208882244', 'fekete.bori@t-online.hu', '178000'),
	(17, 'Herczeg Ferenc', 'Férfi', 'Herczeg Ferenc', 'Szűcs Irén', 'Szekszárd', '1998-12-30', '987123654', 'Járóbeteg', '2024-02-28', '2024-02-28', '7100', 'Szekszárd', 'Garay tér 3.', '36302228855', 'herczeg.f@gmail.com', '72000'),
	(18, 'Vass Adrienn', 'Nő', 'Vass Adrienn', 'Biró Magdolna', 'Tatabánya', '1980-06-08', '456789123', 'Járóbeteg', '2024-02-28', '2024-02-28', '2800', 'Tatabánya', 'Fő tér 1.', '06703339966', 'vass.adri@citromail.hu', '115000'),
	(19, 'Gál Sándor', 'Férfi', 'Gál Sándor', 'Kovács Paula', 'Dunaújváros', '1973-10-24', '741852963', 'Kontrollvizsgálat', '2024-02-28', '2024-02-28', '2400', 'Dunaújváros', 'Vasmű út 18.', '06204441122', 'gal.sandor@email.hu', '155000'),
	(20, 'Major Klára', 'Nő', 'Major Klára', 'Sallai Zita', 'Salgótarján', '1994-01-14', '369147258', 'Fekvőbeteg', '2024-02-28', NULL, '3100', 'Salgótarján', 'Rákóczi út 2.', '36307773388', 'major.klara@gmail.com', '98000'),
	(21, 'Szakács Zsófia', 'Nő', 'Szakács Zsófia', 'Kovács Éva', 'Zalaegerszeg', '2007-08-23', '123259456', 'Fekvőbeteg', '2007-08-23', '2027-01-01', '8900', 'Zalaegerszeg', 'Hegyalja utca 9.', '36303339129', 'szakacs.zsofia@csany-zeg.hu', '9999999');
/*!40000 ALTER TABLE `Paciensek` ENABLE KEYS */;

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

-- Tábla adatainak mentése 2021SZ_barabas_gergo.Paciens_Betegseg: ~98 rows (hozzávetőleg)
/*!40000 ALTER TABLE `Paciens_Betegseg` DISABLE KEYS */;
INSERT INTO `Paciens_Betegseg` (`PB_ID`, `PACIENS_ID`, `BETEGSEG_ID`, `OPERATOR_ID`) VALUES
	(1, 1, 3, 1),
	(2, 1, 5, 1),
	(3, 1, 8, 1),
	(4, 1, 16, 1),
	(5, 1, 19, 1),
	(6, 1, 12, 1),
	(7, 1, 11, 1),
	(8, 2, 9, 1),
	(9, 3, 16, 1),
	(10, 3, 19, 1),
	(11, 3, 12, 1),
	(12, 4, 3, 1),
	(13, 5, 11, 1),
	(14, 5, 10, 1),
	(15, 6, 15, 1),
	(16, 6, 4, 1),
	(17, 6, 1, 1),
	(18, 6, 7, 1),
	(19, 6, 20, 1),
	(20, 6, 15, 1),
	(21, 6, 4, 1),
	(22, 6, 1, 1),
	(23, 6, 7, 1),
	(24, 6, 20, 1),
	(25, 7, 3, 1),
	(26, 7, 5, 1),
	(27, 7, 8, 1),
	(28, 7, 16, 1),
	(29, 7, 19, 1),
	(30, 7, 12, 1),
	(31, 7, 11, 1),
	(32, 7, 10, 1),
	(33, 7, 2, 1),
	(34, 8, 8, 1),
	(35, 9, 11, 1),
	(36, 10, 1, 1),
	(37, 10, 7, 1),
	(38, 10, 20, 1),
	(39, 10, 13, 1),
	(40, 10, 18, 1),
	(41, 10, 9, 1),
	(42, 11, 16, 1),
	(43, 11, 19, 1),
	(44, 11, 12, 1),
	(45, 11, 11, 1),
	(46, 11, 10, 1),
	(47, 12, 11, 1),
	(48, 13, 8, 1),
	(49, 13, 16, 1),
	(50, 13, 19, 1),
	(51, 13, 12, 1),
	(52, 13, 11, 1),
	(53, 13, 10, 1),
	(54, 13, 2, 1),
	(55, 14, 15, 1),
	(56, 15, 5, 1),
	(57, 15, 8, 1),
	(58, 15, 16, 1),
	(59, 15, 19, 1),
	(60, 15, 12, 1),
	(61, 15, 11, 1),
	(62, 17, 5, 1),
	(63, 17, 8, 1),
	(64, 17, 16, 1),
	(65, 17, 19, 1),
	(66, 17, 12, 1),
	(67, 17, 11, 1),
	(68, 17, 10, 1),
	(69, 18, 3, 1),
	(70, 18, 5, 1),
	(71, 18, 8, 1),
	(72, 18, 16, 1),
	(73, 18, 19, 1),
	(74, 18, 12, 1),
	(75, 18, 11, 1),
	(76, 18, 10, 1),
	(77, 18, 2, 1),
	(78, 18, 14, 1),
	(79, 18, 15, 1),
	(80, 18, 4, 1),
	(81, 18, 1, 1),
	(82, 19, 3, 1),
	(83, 20, 19, 1),
	(84, 20, 12, 1),
	(85, 20, 11, 1),
	(86, 1, 10, 1),
	(87, 1, 2, 1),
	(88, 1, 14, 1),
	(89, 1, 15, 1),
	(90, 1, 4, 1),
	(91, 1, 1, 1),
	(92, 1, 7, 1),
	(93, 1, 20, 1),
	(94, 1, 13, 1),
	(95, 1, 18, 1),
	(96, 1, 9, 1),
	(97, 1, 17, 1),
	(98, 1, 6, 1);
/*!40000 ALTER TABLE `Paciens_Betegseg` ENABLE KEYS */;

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

-- Tábla adatainak mentése 2021SZ_barabas_gergo.Paciens_Gyogyszer: ~58 rows (hozzávetőleg)
/*!40000 ALTER TABLE `Paciens_Gyogyszer` DISABLE KEYS */;
INSERT INTO `Paciens_Gyogyszer` (`PGY_ID`, `PACIENS_ID`, `GYOGYSZER_ID`, `OPERATOR_ID`, `ADAGOLAS`) VALUES
	(4, 2, 6, 1, '100 mg'),
	(5, 2, 19, 1, '100 mg'),
	(6, 2, 11, 1, '100 mg'),
	(7, 3, 5, 1, 'üres'),
	(8, 3, 7, 1, 'üres'),
	(9, 4, 5, 1, 'üres'),
	(10, 5, 11, 1, 'üres'),
	(11, 6, 4, 1, 'üres'),
	(12, 6, 14, 1, 'üres'),
	(13, 6, 3, 1, 'üres'),
	(14, 6, 20, 1, 'üres'),
	(15, 7, 4, 1, 'üres'),
	(16, 7, 14, 1, 'üres'),
	(17, 7, 3, 1, 'üres'),
	(18, 7, 20, 1, 'üres'),
	(19, 7, 12, 1, 'üres'),
	(20, 8, 6, 1, 'üres'),
	(21, 9, 6, 1, 'üres'),
	(22, 10, 2, 1, 'üres'),
	(23, 11, 19, 1, 'üres'),
	(24, 12, 13, 1, 'üres'),
	(25, 12, 1, 1, 'üres'),
	(26, 12, 6, 1, 'üres'),
	(27, 12, 19, 1, 'üres'),
	(28, 12, 11, 1, 'üres'),
	(29, 12, 2, 1, 'üres'),
	(30, 12, 9, 1, 'üres'),
	(31, 12, 17, 1, 'üres'),
	(32, 12, 8, 1, 'üres'),
	(33, 12, 10, 1, 'üres'),
	(34, 13, 4, 1, 'üres'),
	(35, 13, 14, 1, 'üres'),
	(36, 13, 3, 1, 'üres'),
	(37, 13, 20, 1, 'üres'),
	(38, 13, 12, 1, 'üres'),
	(39, 13, 5, 1, 'üres'),
	(40, 14, 19, 1, 'üres'),
	(41, 14, 11, 1, 'üres'),
	(42, 14, 2, 1, 'üres'),
	(43, 14, 9, 1, 'üres'),
	(44, 14, 17, 1, 'üres'),
	(45, 15, 6, 1, 'üres'),
	(46, 15, 19, 1, 'üres'),
	(47, 15, 11, 1, 'üres'),
	(48, 15, 2, 1, 'üres'),
	(49, 15, 9, 1, 'üres'),
	(50, 17, 6, 1, 'üres'),
	(51, 17, 19, 1, 'üres'),
	(52, 17, 11, 1, 'üres'),
	(53, 17, 2, 1, 'üres'),
	(54, 18, 11, 1, 'üres'),
	(55, 19, 2, 1, 'üres'),
	(56, 19, 9, 1, 'üres'),
	(57, 19, 17, 1, 'üres'),
	(58, 20, 11, 1, 'üres'),
	(59, 20, 2, 1, 'üres'),
	(60, 20, 9, 1, 'üres'),
	(61, 1, 1, 1, '10 KG/óra');
/*!40000 ALTER TABLE `Paciens_Gyogyszer` ENABLE KEYS */;

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

-- Tábla adatainak mentése 2021SZ_barabas_gergo.Paciens_Rokon: ~47 rows (hozzávetőleg)
/*!40000 ALTER TABLE `Paciens_Rokon` DISABLE KEYS */;
INSERT INTO `Paciens_Rokon` (`PR_ID`, `PACIENS_ID`, `ROKON_ID`) VALUES
	(1, 1, 7),
	(2, 1, 18),
	(3, 1, 13),
	(4, 2, 1),
	(5, 2, 14),
	(6, 3, 16),
	(7, 3, 15),
	(8, 3, 11),
	(9, 5, 8),
	(10, 6, 20),
	(11, 6, 1),
	(12, 6, 14),
	(13, 6, 3),
	(14, 7, 11),
	(15, 7, 7),
	(16, 7, 18),
	(17, 7, 13),
	(18, 8, 1),
	(19, 11, 20),
	(20, 11, 1),
	(21, 11, 14),
	(22, 12, 11),
	(23, 12, 7),
	(24, 12, 18),
	(25, 12, 13),
	(26, 12, 20),
	(27, 12, 1),
	(28, 13, 12),
	(29, 13, 8),
	(30, 13, 5),
	(31, 14, 7),
	(32, 14, 18),
	(33, 14, 13),
	(34, 14, 20),
	(35, 15, 7),
	(36, 17, 14),
	(37, 18, 10),
	(38, 18, 9),
	(39, 18, 17),
	(40, 18, 2),
	(41, 18, 12),
	(42, 18, 8),
	(43, 18, 5),
	(44, 18, 19),
	(45, 19, 18),
	(46, 19, 13),
	(47, 20, 11);
/*!40000 ALTER TABLE `Paciens_Rokon` ENABLE KEYS */;

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

-- Tábla adatainak mentése 2021SZ_barabas_gergo.Rokonok: ~20 rows (hozzávetőleg)
/*!40000 ALTER TABLE `Rokonok` DISABLE KEYS */;
INSERT INTO `Rokonok` (`R_ID`, `NEV`, `EMAIL`, `FELHASZNALONEV`, `PASSWORD`, `IRANYITOSZAM`, `TELEPULES`, `CIM`, `TELEFON`) VALUES
	(1, 'Horváth Tamás', 'horvath.tamas@freemail.hu', 'tamas', '3d80e188734b78a93c6c986b57d3a075', '1145', 'Budapest', 'Róna utca 12.', '06301112233'),
	(2, 'Szabó Zoltán', 'szabo.zoltan@gmail.com', 'zoltan', 'abd386bdcd3ee1d32be07aed1bcbe3df', '4032', 'Debrecen', 'Egyetem sugárút 5.', '36204445566'),
	(3, 'Kiss Éva', 'kiss.eva@citromail.hu', 'evike', 'ba3018312d198b3f2fb870e4a7524234', '6724', 'Szeged', 'Kálvária sugárút 10.', '06707778899'),
	(4, 'Nagy Gergő', 'nagy.gergo@email.hu', 'gergo', '4fa3f40663b2e8a108074b00d3390196', '9024', 'Győr', 'Baross Gábor út 20.', '36309990011'),
	(5, 'Varga Petra', 'varga.petra@gmail.com', 'petra', 'be65eed17b755927e27c7b258f97fef0', '7632', 'Pécs', 'Aidinger János út 3.', '06203334455'),
	(6, 'Molnár Márk', 'molnar.mark@indamail.hu', 'markus', 'adbeb0637d1fd0d1778a689ab0b44b1d', '3530', 'Miskolc', 'Széchenyi utca 15.', '06706667788'),
	(7, 'Farkas Luca', 'farkas.luca@t-online.hu', 'lucus', '8ef76893158d27a1105aeb90c29e6135', '6000', 'Kecskemét', 'Batthyány utca 2.', '36302221100'),
	(8, 'Tóth Balázs', 'toth.balazs@gmail.com', 'balazs', 'a95bdde90a84e778fba842d8e11dadd7', '3300', 'Eger', 'Széchenyi utca 8.', '06205556677'),
	(9, 'Papp Krisztina', 'papp.krisz@email.com', 'kriszti', '238ecf0acdc5cc29cfac4a7567ec1627', '8000', 'Székesfehérvár', 'Budai út 12.', '06308889900'),
	(10, 'Németh Ádám', 'nemeth.adam@freemail.hu', 'adamos', '3860112b9e08b7382a6a44ba662a3265', '9700', 'Szombathely', 'Thököly utca 4.', '36701234567'),
	(11, 'Balla Dániel', 'balla.dani@gmail.com', 'danika', '740f101d4aabf9b2d0c7391d7f9589f7', '8200', 'Veszprém', 'Kossuth utca 1.', '06304449988'),
	(12, 'Szalai Nóra', 'szalai.nora@citromail.hu', 'norika', '8760ed494c1dbd9615607c079523d75b', '9400', 'Sopron', 'Lackner Kristóf utca 5.', '06201112233'),
	(13, 'Gál József', 'gal.jozsef@indamail.hu', 'jozsika', '729528e2be3fce888d2e5ac2cd82e8f0', '4400', 'Nyíregyháza', 'Sóstói út 10.', '36705556644'),
	(14, 'Kerekes Rita', 'kerekes.rita@email.hu', 'rituka', '0cd649c760b8c8d87811b7bf858abd10', '7400', 'Kaposvár', 'Fő utca 25.', '06306664422'),
	(15, 'Bakos Bence', 'bakos.bence@gmail.com', 'bencus', '2ac9bcc1872ce98ebde50a519ab6d1ee', '8900', 'Zalaegerszeg', 'Kossuth Lajos utca 14.', '06209998877'),
	(16, 'Antal Judit', 'antal.judit@t-online.hu', 'juditka', '6fc16cdd62ed4fd8dc52711f31743a86', '5600', 'Békéscsaba', 'Kazinczy utca 3.', '36301237845'),
	(17, 'Somogyi Péter', 'somogyi.p@gmail.com', 'petike', '798983cf3e345a19e0390a632ebb0a6a', '7100', 'Szekszárd', 'Táncsics Mihály utca 6.', '06704445566'),
	(18, 'Fekete Gábor', 'fekete.gabor@email.com', 'gabor', 'ab4592388264e178f1abc0f8a0bd725f', '2800', 'Tatabánya', 'Győri út 18.', '06303332211'),
	(19, 'Vincze Anna', 'vincze.anna@freemail.hu', 'panka', '04bb4a1b1b80e8bb1462a26f3e3494a1', '2400', 'Dunaújváros', 'Dózsa György út 2.', '36208887766'),
	(20, 'Hajdu Tibor', 'hajdu.tibi@gmail.com', 'tiborco', 'b55857a5a12eefff809c8213faede691', '3100', 'Salgótarján', 'Mártírok útja 10.', '06705554433');
/*!40000 ALTER TABLE `Rokonok` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
