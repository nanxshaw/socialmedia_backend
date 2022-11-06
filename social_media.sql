-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 06, 2022 at 06:01 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social_media`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id_comment` int(11) NOT NULL,
  `id_content` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `id_content` int(11) NOT NULL,
  `desc` text NOT NULL,
  `id_users` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id_content`, `desc`, `id_users`, `created_at`, `updated_at`) VALUES
(1, 'postingan pertama ku disini', 1, '2022-11-05 15:06:00', '2022-11-05 15:06:00'),
(2, 'postingan pertama ku disini', 1, '2022-11-05 15:08:46', '2022-11-05 15:08:46'),
(3, 'postingan pertama ku disini', 1, '2022-11-05 15:08:46', '2022-11-05 15:08:46');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id_image` int(11) NOT NULL,
  `image` text NOT NULL,
  `id_content` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id_image`, `image`, `id_content`) VALUES
(1, '1667635780410_600bd4906d1a5de9ae2c11b830602a01.jpeg', 3),
(2, '1667635780411_31633003417tt0ohh5fy7gz2qjj5cz5ghnsfestu4bfjp3cwcqttd9hyqvwkfuzzhctjrlzsyrhb67ftgptvdozxcldauuswxtcurhacmfw3liy.png', 3),
(3, '1667635780420_-21602265893lumslgnfev.png', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_users` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `token` text DEFAULT NULL,
  `status_login` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `username`, `email`, `password`, `image`, `token`, `status_login`, `created_at`, `updated_at`) VALUES
(1, 'nanxshaw', 'nanxshaw@gmail.com', '0192023a7bbd73250516f069df18b500', '1667633423871___o6__yelan_render_by_hwaione_df2malp-fullview.png', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbnhzaGF3IiwiaWF0IjoxNjY3NjMzNDIzfQ.iihs38-TDkLnMEa8MdcjVMpnqPDpIeKNeTadr32O-d0', 'userpass', '2022-11-05 14:30:21', '2022-11-05 14:30:21'),
(6, 'cobacoba123697', 'cobacoba123@gmail.com', NULL, NULL, NULL, 'facebook', '2022-11-05 17:34:39', '2022-11-05 17:34:39'),
(7, 'Coba123', 'Coba@coba.com', '37a6259cc0c1dae299a7866489dff0bd', '1667670570602_4FF3B0D9-1D91-496B-B3EA-41345411188D.jpg', NULL, 'userpass', '2022-11-05 23:38:48', '2022-11-05 23:38:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id_comment`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id_content`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id_image`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `id_content` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id_image` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
