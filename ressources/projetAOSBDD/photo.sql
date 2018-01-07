-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:8889
-- Généré le :  Mar 12 Décembre 2017 à 22:14
-- Version du serveur :  5.6.35
-- Version de PHP :  7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `aos`
--

-- --------------------------------------------------------

--
-- Structure de la table `photo`
--

CREATE TABLE `photo` (
  `image_id` int(11) NOT NULL,
  `image_nom` varchar(50) NOT NULL,
  `image_taille` varchar(25) NOT NULL,
  `image_type` varchar(25) NOT NULL,
  `image_desc` varchar(100) NOT NULL,
  `image_url` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `photo`
--

INSERT INTO `photo` (`image_id`, `image_nom`, `image_taille`, `image_type`, `image_desc`, `image_url`) VALUES
(1, 'test', '60mo', 'test', 'kqskjqskfgk', 'uploads/myImage-1513065907929.png'),
(2, 'ezfezf', 'sdfvsds', 'efzefrzferfg', 'ffsdezfezhfie', 'uploads/myImage-1513065907929.png'),
(3, 'zfrftezrtfregyrer', 'gtertretreer', 'ygreyeryre', 'uerhiheuthiuerht', 'uploads/myImage-1513007169021.png');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`image_id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `photo`
--
ALTER TABLE `photo`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
