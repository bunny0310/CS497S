CREATE TABLE `Post` (
  `Id` int AUTO_INCREMENT,
  `Description` text,
  `Latitude` float,
  `Longitude` float,
  `SecretKey` varchar(255),
  `CreatedAt` timestamp,
  `UpdatedAt` timestamp,
  PRIMARY KEY (`Id`, `Latitude`, `Longitude`)
);

CREATE TABLE `Comment` (
  `Id` int PRIMARY KEY AUTO_INCREMENT,
  `PostId` int,
  `Value` text,
  `SecretKey` varchar(255),
  `CreatedAt` timestamp,
  `UpdatedAt` timestamp
);

ALTER TABLE `Comment` ADD FOREIGN KEY (`PostId`) REFERENCES `Post` (`Id`);

