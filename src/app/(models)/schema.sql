CREATE TABLE IF NOT EXISTS Patient (
    PatientID INT(5) PRIMARY KEY UNIQUE NOT NULL,
    Prefix VARCHAR(4),
    PatientName VARCHAR(50),
    PreviousNames VARCHAR(50),
    EmailAddress VARCHAR(30) CHECK (EmailAddress REGEXP "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@([a-z0-9]+[a-z0-9-]*)*[a-z0-9]+(\.([a-z0-9]+[a-z0-9-]*)*[a-z0-9]+)*\.[a-z]{2,6}$"),
    MailingAddress VARCHAR(50) NOT NULL,
    MaritalStatus VARCHAR(17) CHECK (MaritalStatus IN ('Single', 'Married', 'Partner', 'Divorced', 'Widowed', 'Legally Separated')),
    HomeAddress VARCHAR(50) NOT NULL,
    ResidenceType VARCHAR(30) CHECK (ResidenceType IN ('Skilled Nursing Home', 'Nursing Home', 'Residential Home', 'Private Home')),
    PrimaryCarePhysician VARCHAR(30),
    DateOfBirth DATE,
    Gender VARCHAR(15) CHECK (Gender IN ('Male', 'Female', 'Transgender')),
    SSN INT(9) UNIQUE NOT NULL,
    HomePhone INT(8),
    CellPhone INT(11),
    WorkPhone INT(10),
    PreferredContact VARCHAR(10) CHECK (PreferredContact IN ('Home', 'Cell', 'Work')),
    StudentStatus VARCHAR(15) CHECK (StudentStatus IN ('Full-time', 'Part-time', 'Not-a-Student')),
    EmployerName VARCHAR(20),
    EmployerAddress VARCHAR(30),
    EmployerPhone INT(11),
    EmploymentStatus VARCHAR(20) CHECK (EmploymentStatus IN ('Full-time', 'Part-time', 'Not employed', 'Self-employed', 'Retired', 'Active-Military-Duty')),
    EmergencyName VARCHAR(20),
    RelationshipToPatient VARCHAR(20),
    EmergencyCellPhone INT(11),
    EmergencyWorkPhone INT(11),
    EmergencyDateOfBirth DATE
    );
CREATE TABLE IF NOT EXISTS Insurance (
    InsuranceID INT(5) PRIMARY KEY UNIQUE NOT NULL,
    InsuranceCompanyName VARCHAR(30),
    SubscriberNo INT(8),
    GroupNo INT(8),
    PolicyHolderName VARCHAR(30),
    SameAsPatient BOOLEAN,
    InsuranceName VARCHAR(30),
    DateOfBirth DATE,
    SSN INT(9),
    Telephone INT(8),
    Gender VARCHAR(15) CHECK (Gender IN ('Male', 'Female', 'Transgender')),
    HomeAddress VARCHAR(50),
    Employer VARCHAR(30),
    PatientRelationshipToInsured VARCHAR(15)
);
CREATE TABLE IF NOT EXISTS PatientInsurance (
    PatientInsuranceID INT(5) PRIMARY KEY,
    PatientID INT(5),
    InsuranceID INT(5),
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID),
    FOREIGN KEY (InsuranceID) REFERENCES Insurance(InsuranceID)
);