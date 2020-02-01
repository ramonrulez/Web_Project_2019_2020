-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 01, 2020 at 07:45 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(3) NOT NULL,
  `username` text NOT NULL,
  `passcode` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `username`, `passcode`) VALUES
(1, 'admin', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `user_id` varchar(44) NOT NULL,
  `filename` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`user_id`, `filename`) VALUES
('Lu8cEMjJ95zdqczymfBkFw==', '../uploads/setA.json'),
('Lu8cEMjJ95zdqczymfBkFw==', '../uploads/setB.json');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(44) NOT NULL,
  `username` varchar(100) NOT NULL,
  `passcode` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `passcode`, `email`) VALUES
('1ibTwRcsqd9MlL2EkjNGN987Md54gbYA6dDS5N37fP8=', 'user_1', '81dc9bdb52d04dc20036dbd8313ed055', 'user_1@gmail.com'),
('bngLxdqe+Z9SI2PcCOmT34bPYt3YKnE5SdutFyrze2s=', 'user_4', 'fcea920f7412b5da7be0cf42b8c93759', 'user_4@gmail.com'),
('fsAA4rACTQbf/83p8whVKDIj1OIGhsU+TuuGdyNJM6U=', 'user_5', '25d55ad283aa400af464c76d713c07ad', 'user_5@gmail.com'),
('gm8K9bfvT4mG3D8d/IyTrE+QNZQMZM4GlHxwprhvygs=', 'user_2', '827ccb0eea8a706c4c34a16891f84e7b', 'user_2@gmail.com'),
('Lu8cEMjJ95zdqczymfBkFw==', 'test_user', '14ab1a23c2c2dd3210dd54d7ed55eb5f', 'test@gmail.com'),
('u4WjGbccO5MCDy2tH9fJjG1PYwmwNpOg6znEjuczzy8=', 'user_3', 'e10adc3949ba59abbe56e057f20f883e', 'user_3@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
