CREATE TABLE `Post` (
  `Id` int AUTO_INCREMENT,
  `Description` text,
  `Latitude` float,
  `Longitude` float,
  `SecretKey` varchar(255),
  `CreatedAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Votes` int,
  PRIMARY KEY (`Id`, `Latitude`, `Longitude`)
);

CREATE TABLE `Comment` (
  `Id` int PRIMARY KEY AUTO_INCREMENT,
  `PostId` int,
  `Value` text,
  `SecretKey` varchar(255),
  `CreatedAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `Comment` ADD FOREIGN KEY (`PostId`) REFERENCES `Post` (`Id`);