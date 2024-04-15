CREATE TABLE IF NOT EXISTS Patient(
    PatientID PRIMARY KEY (LastName, CellPhone)
    Prefix VARCHAR(10),
    LastName VARCHAR(50) NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    MI CHAR(1),
    PrevName VARCHAR(100),
    EmailAdd VARCHAR(100),
    MailingStreetAddress VARCHAR(255) NOT NULL,
    MailingCity VARCHAR(100) NOT NULL,
    MailingState CHAR(2) NOT NULL,
    MailingZipCode INT NOT NULL,
    MaritalStatus VARCHAR(20),
    HomeStreetAddress VARCHAR(255) NOT NULL,
    HomeCity VARCHAR(100) NOT NULL,
    HomeState CHAR(2) NOT NULL,
    HomeZipCode INT NOT NULL,
    ResidenceType VARCHAR(50),
    PrimaryCarePhysician VARCHAR(100),
    DateOfBirth DATE,
    Gender ENUM('Male', 'Female', 'Other'),
    SSN VARCHAR(11) UNIQUE NOT NULL,
    HomePhone VARCHAR(15),
    CellPhone VARCHAR(15),
    WorkPhone VARCHAR(15),
    PreferredContact ENUM('HomePhone','CellPhone', 'WorkPhone'),
    StudentStatus ENUM('Full-time Student','Part-time','Employed'),
    CONSTRAINT chk_MaritalStatus CHECK (MaritalStatus IN ('Single', 'Married', 'Divorced', 'Widowed')),
    CONSTRAINT chk_Gender CHECK (Gender IN ('Male', 'Female', 'Other')),
    CONSTRAINT chk_StudentStatus CHECK (StudentStatus IN ('Full-time Student','Part-time','Employed')),
);
