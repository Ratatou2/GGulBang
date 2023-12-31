-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: happyhouse
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `userId` varchar(20) NOT NULL,
  `aptCode` bigint NOT NULL,
  `price` bigint DEFAULT NULL,
  PRIMARY KEY (`userId`,`aptCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('temp01',50130000000074,10000),('temp01',50130000000075,10000),('temp01',50130000000076,10000),('temp01',50130000000077,10000),('temp01',50130000000078,10000),('temp01',50130000000079,10000),('temp01',50130000000080,10000),('temp01',50130000000081,10000),('temp01',50130000000082,10000),('temp01',50130000000083,10000),('temp01',50130000000084,10000),('temp01',50130000000085,10000),('temp01',50130000000086,10000),('temp01',50130000000087,10000),('temp01',50130000000088,10000),('temp01',50130000000089,10000),('temp01',50130000000090,10000),('temp02',50130000000194,20000),('temp02',50130000000195,20000),('temp02',50130000000196,20000),('temp02',50130000000197,20000),('temp02',50130000000198,20000),('temp02',50130000000199,20000),('temp02',50130000000200,20000),('temp02',50130000000201,20000),('temp02',50130000000202,20000),('temp02',50130000000203,20000),('temp02',50130000000204,20000),('temp02',50130000000205,20000),('temp02',50130000000206,20000),('temp02',50130000000207,20000),('temp02',50130000000208,20000),('temp02',50130000000209,20000),('temp02',50130000000210,20000),('temp02',50130000000211,20000),('temp02',50130000000212,20000),('temp02',50130000000213,20000),('temp02',50130000000214,20000),('temp02',50130000000215,20000),('temp02',50130000000216,20000),('temp02',50130000000217,20000),('temp02',50130000000218,20000),('temp02',50130000000219,20000),('temp02',50130000000220,20000),('temp02',50130000000221,20000),('temp02',50130000000222,20000),('temp02',50130000000223,20000);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-18 12:51:49
