CREATE TABLE `Post` (
  `Id` int AUTO_INCREMENT,
  `Description` text,
  `Latitude` varchar(255),
  `Longitutde` varchar(255),
  `Key` varchar(255),
  `CreatedAt` timestamp,
  `UpdatedAt` timestamp,
  PRIMARY KEY (`Id`, `Latitude`, `Longitutde`)
);

CREATE TABLE `Comment` (
  `Id` int PRIMARY KEY AUTO_INCREMENT,
  `PostId` int,
  `Value` text,
  `Key` varchar(255),
  `CreatedAt` timestamp,
  `UpdatedAt` timestamp
);

ALTER TABLE `Comment` ADD FOREIGN KEY (`PostId`) REFERENCES `Post` (`Id`);

