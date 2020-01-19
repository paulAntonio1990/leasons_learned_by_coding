-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: ian. 19, 2020 la 09:29 PM
-- Versiune server: 10.4.11-MariaDB
-- Versiune PHP: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `my_datatbase`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `lineNo` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `repoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `comments`
--

INSERT INTO `comments` (`id`, `lineNo`, `text`, `repoId`) VALUES
(2, 99, 'Test de test modificat', 1),
(3, 50, 'Test comment2', 1);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `repos`
--

CREATE TABLE `repos` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `repos`
--

INSERT INTO `repos` (`id`, `name`, `userId`) VALUES
(1, 'dixit', 1),
(2, 'changeit', 1),
(5, 'zuma_modificat', NULL),
(6, 'fifa', NULL);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `userName`) VALUES
(1, 'Ionel', 'Popescu', 'magicMikeTest'),
(4, 'Andrei', 'Minculescu', 'maveric'),
(5, 'Andrei', 'Marcu', 'andreiMarcu'),
(10, 'Andrei', 'Popescu', 'asdas'),
(11, 'Andrei', 'Popescu', 'modificatDedouaori');

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repoId` (`repoId`);

--
-- Indexuri pentru tabele `repos`
--
ALTER TABLE `repos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexuri pentru tabele `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pentru tabele `repos`
--
ALTER TABLE `repos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pentru tabele `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constrângeri pentru tabele eliminate
--

--
-- Constrângeri pentru tabele `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`repoId`) REFERENCES `repos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constrângeri pentru tabele `repos`
--
ALTER TABLE `repos`
  ADD CONSTRAINT `repos_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
