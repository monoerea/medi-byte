

CREATE TABLE IF NOT EXISTS EmergencyContact (
    EmergencyContactID VARCHAR(20) PRIMARY KEY,
    EmergencyName VARCHAR(50),
    RelationshipToPatient VARCHAR(50),
    EmergencyCellPhone VARCHAR(11) CHECK (EmergencyCellPhone REGEXP '^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$'),
    EmergencyWorkPhone VARCHAR(10),
    DateOfBirth DATE
);

CREATE TABLE IF NOT EXISTS Patient (
    PatientID VARCHAR(20) PRIMARY KEY,
    Prefix VARCHAR(4),
    PatientName VARCHAR(50),
    PreviousNames VARCHAR(50),
    EmailAddress VARCHAR(100) CHECK (EmailAddress REGEXP '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'),
    MailingAddress VARCHAR(255) NOT NULL,
    MaritalStatus VARCHAR(20) CHECK (MaritalStatus IN ('Single', 'Married', 'Partner', 'Divorced', 'Widowed', 'Legally Separated')),
    HomeAddress VARCHAR(255) NOT NULL,
    ResidenceType VARCHAR(35) CHECK (ResidenceType IN ('Skilled Nursing Home', 'Nursing Home', 'Residential Home (Assisted Living)', 'Private Home')),
    PrimaryCarePhysician VARCHAR(50),
    DateOfBirth DATE,
    Gender VARCHAR(15) CHECK (Gender IN ('Male', 'Female', 'Transgender')),
    SSN VARCHAR(20) UNIQUE NOT NULL,
    HomePhone VARCHAR(10),
    CellPhone VARCHAR(11) CHECK (CellPhone REGEXP '^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$'),
    WorkPhone VARCHAR(10),
    PreferredContact VARCHAR(4) CHECK (PreferredContact IN ('Home', 'Cell', 'Work')),
    StudentStatus VARCHAR(14) CHECK (StudentStatus IN ('Full-time', 'Part-time', 'Not-a-Student')),
    EmployerName VARCHAR(50),
    EmployerAddress VARCHAR(255),
    EmployerPhone VARCHAR(11),
    EmploymentStatus VARCHAR(20) CHECK (EmploymentStatus IN ('Full-time', 'Part-time', 'Not employed', 'Self-employed', 'Retired', 'Active-Military-Duty')),
    EmergencyContactID VARCHAR(20),
    FOREIGN KEY (EmergencyContactID) REFERENCES EmergencyContact(EmergencyContactID)
);

CREATE TABLE IF NOT EXISTS Insurance (
    InsuranceID VARCHAR(20) PRIMARY KEY,
    InsuranceCompanyName VARCHAR(100),
    SubscriberNo VARCHAR(20),
    GroupNo VARCHAR(20),
    PolicyHolderName VARCHAR(50),
    SameAsPatient BOOLEAN,
    InsuranceName VARCHAR(50),
    DateOfBirth DATE,
    SSN VARCHAR(20),
    Telephone VARCHAR(20),
    Gender VARCHAR(10) CHECK (Gender IN ('Male', 'Female', 'Transgender')),
    HomeAddress VARCHAR(255),
    Employer VARCHAR(50),
    PatientRelationshipToInsured VARCHAR(50)
);
CREATE TABLE IF NOT EXISTS PatientInsurance (
    PatientInsuranceID VARCHAR(20) PRIMARY KEY,
    PatientID VARCHAR(20),
    InsuranceID VARCHAR(20),
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID),
    FOREIGN KEY (InsuranceID) REFERENCES Insurance(InsuranceID)
);