-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: timeTracker
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4800 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (4732,'task3',16,'2025-05-10 10:30:14','2025-05-10 13:10:17'),(4756,'task1',16,'2025-05-10 08:58:43','2025-05-10 08:58:55'),(4757,'task2',16,'2025-05-09 09:15:21','2025-05-09 09:15:24'),(4758,'task4',16,'2025-05-09 09:15:29','2025-05-09 09:29:56'),(4759,'タスク4',16,'2025-05-09 09:31:46','2025-05-09 09:32:04'),(4760,'task5',16,'2025-05-09 09:32:13','2025-05-09 09:32:17'),(4765,'tanakaのtask',34,'2025-05-09 21:22:53','2025-05-09 21:22:59'),(4769,'task1',16,'2025-05-13 06:59:13','2025-05-13 10:02:37'),(4770,'test',16,'2025-05-13 08:14:45','2025-05-13 08:15:06'),(4771,'task',16,'2025-05-14 13:29:16','2025-05-14 14:29:49'),(4772,'task1',36,'2025-05-16 04:15:29','2025-05-16 05:15:50'),(4773,'task1',36,'2025-05-16 18:40:23','2025-05-16 19:40:30'),(4776,'test',37,'2025-05-17 01:00:16','2025-05-17 02:00:18'),(4777,'task2',37,'2025-05-17 05:00:32','2025-05-17 07:00:34'),(4781,'task1',NULL,'2025-05-17 02:28:29','2025-05-17 02:28:32'),(4782,'task',NULL,'2025-05-17 02:29:16','2025-05-17 02:29:18'),(4783,'task',36,'2025-05-17 03:36:19','2025-05-17 05:38:45'),(4784,'task1',36,'2025-05-17 17:37:59','2025-05-17 17:38:01'),(4785,'task1',36,'2025-05-18 10:48:16','2025-05-18 10:48:22'),(4786,'task2',36,'2025-05-18 13:35:15','2025-05-18 13:45:33'),(4787,'task',36,'2025-05-18 13:58:43','2025-05-18 13:59:25'),(4796,'newTask2',36,'2025-05-18 23:57:46','2025-05-18 23:57:49');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` int NOT NULL DEFAULT '1',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `login_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_fields` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` int NOT NULL DEFAULT '0',
  `update_at` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (30,'ikkei','EbwzpQKkUGUmBRs4itdv1zIejC5Suohx1hyC05lPeTE=',1,'ikkei@email.com','1746808485','31c35f88988a5f890889c93b590c5830b6f0dbba','a:0:{}',1746808434,0),(34,'tanaka','txQIg4J0tbxK+kepZgwPjve6LPsWbYq6sVAxfVz3dtk=',1,'tanaka@email.com','1746824829','6a2cf75540c43e0b825096bc97e80cc000381169','a:0:{}',1746824615,0),(36,'test','+R7FGDNLCM7Yld6LguiCG+HvlRxjSmF53U8/IS4W8ao=',1,'test@email.com','1747611957','42831dd5998cc57915d542cdf031c5a0659babcd','a:0:{}',1747376065,0),(38,'test2','IK00MAzQzzxv9ziiOtI9Pfgis3+efgP8RfAPFoiUKJQ=',1,'test2@email.com','1747613478','673522cdb0448cee6f5754c48029a5ca8bf049db','a:0:{}',1747613478,0),(39,'test3','KnNTVz2Gf7Nvt5zSvM6FAO3VYu6YMPo5/OB6ULOHwPg=',1,'test3@email.com','1747613910','dce2165f72fe0bd2f7e3c04a2c866268140d0aff','a:0:{}',1747613910,0),(40,'test4','PVdhX2pJt74z16h/U11tQrGUucXo3dLwyJ6nNLKmcN0=',1,'test4@email.com','1747613975','a949d692a6b50050eaeb95a1c69c015775deff3b','a:0:{}',1747613975,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-19  0:40:39
