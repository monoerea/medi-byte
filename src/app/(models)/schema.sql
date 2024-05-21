



CREATE TABLE IF NOT EXISTS Patient (
    PatientID VARCHAR(30) PRIMARY KEY UNIQUE NOT NULL,
    Prefix VARCHAR(4),
    PatientName VARCHAR(50),
    PreviousNames VARCHAR(50),
    EmailAddress VARCHAR(100) CHECK (EmailAddress REGEXP "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@([a-z0-9]+[a-z0-9-]*)*[a-z0-9]+(\.([a-z0-9]+[a-z0-9-]*)*[a-z0-9]+)*\.[a-z]{2,6}$"),
    MailingAddress VARCHAR(255) NOT NULL,
    MaritalStatus VARCHAR(20) CHECK (MaritalStatus IN ('Single', 'Married', 'Partner', 'Divorced', 'Widowed', 'Legally Separated')),
    HomeAddress VARCHAR(255) NOT NULL,
    ResidenceType VARCHAR(35) CHECK (ResidenceType IN ('Skilled Nursing Home', 'Nursing Home', 'Residential Home', 'Private Home')),
    PrimaryCarePhysician VARCHAR(50),
    DateOfBirth DATE,
    Gender VARCHAR(15) CHECK (Gender IN ('Male', 'Female', 'Transgender')),
    SSN VARCHAR(30) UNIQUE NOT NULL,
    HomePhone INT(11),
    CellPhone INT(11),
    WorkPhone INT(11),
    PreferredContact VARCHAR(4) CHECK (PreferredContact IN ('Home', 'Cell', 'Work')),
    StudentStatus VARCHAR(14) CHECK (StudentStatus IN ('Full-time', 'Part-time', 'Not-a-Student')),
    EmployerName VARCHAR(50),
    EmployerAddress VARCHAR(255),
    EmployerPhone VARCHAR(11),
    EmploymentStatus VARCHAR(20) CHECK (EmploymentStatus IN ('Full-time', 'Part-time', 'Not employed', 'Self-employed', 'Retired', 'Active-Military-Duty')),
    EmergencyName VARCHAR(50),
    RelationshipToPatient VARCHAR(50),
    EmergencyCellPhone INT(11),
    EmergencyWorkPhone VARCHAR(10),
    EmergencyDateOfBirth DATE
    );
CREATE TABLE IF NOT EXISTS Insurance (
    InsuranceID VARCHAR(30) PRIMARY KEY UNIQUE NOT NULL,
    InsuranceCompanyName VARCHAR(100),
    SubscriberNo VARCHAR(30),
    GroupNo VARCHAR(30),
    PolicyHolderName VARCHAR(50),
    SameAsPatient BOOLEAN,
    InsuranceName VARCHAR(50),
    InsuranceDateOfBirth DATE,
    InsuranceSSN VARCHAR(30),
    InsuranceTelephone Int(11),
    InsuranceGender VARCHAR(15) CHECK (InsuranceGender IN ('Male', 'Female', 'Transgender')),
    InsuranceHomeAddress VARCHAR(255),
    InsuranceEmployer VARCHAR(50),
    PatientRelationshipToInsured VARCHAR(50)
);
CREATE TABLE IF NOT EXISTS PatientInsurance (
    PatientInsuranceID VARCHAR(30) PRIMARY KEY,
    PatientID VARCHAR(30),
    InsuranceID VARCHAR(30),
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID),
    FOREIGN KEY (InsuranceID) REFERENCES Insurance(InsuranceID)
);