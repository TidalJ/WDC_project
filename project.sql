CREATE DATABASE social_media;

USE social_media;

CREATE TABLE Users (
    User_ID INT NOT NULL AUTO_INCREMENT,
    Username VARCHAR(40),
    Email VARCHAR(100),
    Password VARCHAR(256),
    PRIMARY KEY (User_ID)
);

CREATE TABLE Events (
    Event_ID INT NOT NULL AUTO_INCREMENT,
    User_ID INT,
    Event_name VARCHAR(200),
    Start_time DATETIME,
    End_time DATETIME,
    Detail TEXT,
    PRIMARY KEY (Event_ID),
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID) ON DELETE SET NULL
);

INSERT INTO Users (Username, Email, Password)
VALUES ('Tom', 'abc@gmail.com', 'abc');

DELETE FROM Users WHERE Username = 'Lee';

SELECT Username FROM Users WHERE Username = 'Lee';

SELECT Username, Email FROM Users;

DELETE FROM Users WHERE Username = 'Lee' AND Email = 'lee@gmail.com';

INSERT INTO Events (User_ID, Event_name, Start_time, End_time, Detail)
VALUES (?, ?, ?, ?, ?);

DELETE FROM Events WHERE Event_name = ? AND Start_time = ? AND End_time = ?;