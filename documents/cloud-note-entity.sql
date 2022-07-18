CREATE TABLE User (
  userId uuid NOT NULL,
  email varchar(100) NOT NULL,
  isDeleted int(1),
  insertDate datetime,
  updateDate datetime,
  PRIMARY KEY (userId)
);

CREATE TABLE Post (
  postId uuid NOT NULL,
  userId uuid NOT NULL,
  title varchar(100),
  content varchar(10000),
  folderId int,
  isDeleted int(1),
  insertDate datetime,
  updateDate datetime,
  PRIMARY KEY (postId),
  FOREIGN KEY (userId)
);

CREATE TABLE Folder (
  folderId int NOT NULL,
  userId uuid NOT NULL,
  folderName varchar(100) NOT NULL,
  isDeleted int(1),
  insertDate datetime,
  updateDate datetime,
  PRIMARY KEY (folderId, userId)
);