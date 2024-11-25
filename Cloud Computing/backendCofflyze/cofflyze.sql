-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2024 at 05:55 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cofflyze`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_deteksi`
--

CREATE TABLE `tbl_deteksi` (
  `idDeteksi` int(11) NOT NULL,
  `gambar` varchar(45) DEFAULT NULL,
  `akurasi` char(5) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `idPohon` int(11) NOT NULL,
  `idInformasi` int(11) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_informasi`
--

CREATE TABLE `tbl_informasi` (
  `idInformasi` int(11) NOT NULL,
  `namaPenyakit` varchar(20) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `solusi` text DEFAULT NULL,
  `artikel` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pohon`
--

CREATE TABLE `tbl_pohon` (
  `idPohon` int(11) NOT NULL,
  `labelPohon` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `idUser` int(11) NOT NULL,
  `namaLengkap` varchar(50) DEFAULT NULL,
  `fotoProfile` varchar(45) DEFAULT NULL,
  `nomorHp` varchar(15) DEFAULT NULL,
  `alamat` varchar(45) DEFAULT NULL,
  `tokenFirebase` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`idUser`, `namaLengkap`, `fotoProfile`, `nomorHp`, `alamat`, `tokenFirebase`) VALUES
(2, 'Jane Doe', 'profile_updated.jpg', '0987654321', '456 New Coffee Avenue', 'updated_firebase_token_example');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_deteksi`
--
ALTER TABLE `tbl_deteksi`
  ADD PRIMARY KEY (`idDeteksi`),
  ADD KEY `fk_deteksi_pohon_idx` (`idPohon`),
  ADD KEY `fk_deteksi_informasi1_idx` (`idInformasi`),
  ADD KEY `fk_deteksi_user1_idx` (`idUser`);

--
-- Indexes for table `tbl_informasi`
--
ALTER TABLE `tbl_informasi`
  ADD PRIMARY KEY (`idInformasi`);

--
-- Indexes for table `tbl_pohon`
--
ALTER TABLE `tbl_pohon`
  ADD PRIMARY KEY (`idPohon`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_deteksi`
--
ALTER TABLE `tbl_deteksi`
  MODIFY `idDeteksi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_informasi`
--
ALTER TABLE `tbl_informasi`
  MODIFY `idInformasi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_pohon`
--
ALTER TABLE `tbl_pohon`
  MODIFY `idPohon` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_deteksi`
--
ALTER TABLE `tbl_deteksi`
  ADD CONSTRAINT `fk_deteksi_informasi1` FOREIGN KEY (`idInformasi`) REFERENCES `tbl_informasi` (`idInformasi`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_deteksi_pohon` FOREIGN KEY (`idPohon`) REFERENCES `tbl_pohon` (`idPohon`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_deteksi_user1` FOREIGN KEY (`idUser`) REFERENCES `tbl_user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
