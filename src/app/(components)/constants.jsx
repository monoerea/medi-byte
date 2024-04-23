import { validateCellPhone, validateEmail, validateName } from './utils';

export const initData = {
      PatientID: Math.floor(Math.random() * 10000),
      Prefix: "Ms.",
      PatientName: "Senorin, Sheen S.",
      PreviousNames: "Alice March",
      EmailAddress: "sheen@gmail.com",
      MailingAddress:"5209 Kawit, Gloria, Oriental Mindoro",
      MaritalStatus:'Single',
      Gender: "Female",
      CellPhone: "911234567",//
      HomeAddress:"5209 Kawit, Gloria, Oriental Mindoro",
      ResidenceType:"Private Home",
      PrimaryCarePhysician:"Dr. Kim Taehyung",
      DateOfBirth: '2001-03-21',
      SSN:'123123423',
      HomePhone:'1234123',
      WorkPhone:"1234123",
      PreferredContact:"Home",
      StudentStatus:'Full-time',
      EmployerName:'Kim Taehyung',
      EmployerAddress:'Korea',
      EmployerPhone:'1234123',
      EmploymentStatus:'Retired',
      EmergencyName: "Jocelyn S. Senorin",
      RelationshipToPatient: "Mother",
      EmergencyCellphone:'12345678900',
      EmergencyWorkphone:'9876543211',
      EmergencyDateOfBirth: new Date('03-24-1973'),

      InsuranceID: Math.floor(Math.random() * 10000),
      InsuranceCompanyName:'HYBE Insurances',
      SubscriberNo:'10000',
      GroupNo:'20000',
      PolicyHolderName:'Jocelyn S. Senorin',
      SameAsPatient:false,
      InsuranceName:'Jocelyn S. Senorin',
      InsuranceDateOfBirth: new Date('03-24-1973'),
      InsuranceSSN:'2134567890',
      InsuranceTelephone:'5678904321',
      InsuranceGender:'Female',
      InsuranceHomeAddress:"5209 Kawit, Gloria, Oriental Mindoro",
      InsuranceEmployer:'Kim Namjoon',
      PatientRelationshipToInsired:'Daughter'
   
};

export const prefixOptions = [ // Corrected variable name to prefixOptions
        { label: 'Mr.', value: 'Mr.' },
        { label: 'Mrs.', value: 'Mrs.' }, 
        { label: 'Ms.', value: 'Ms.' },
        { label: 'Sir', value: 'Sir' }
    ];

    export const steps = [
      {
        id: 'Step 1',
        name: 'Patient Information',
        fields: [
          { name: 'Prefix', group: 1, section: 'Patient Information', type: 'radio', options: prefixOptions },
          { name: 'PatientName', group: 2, section: 'Patient Information' },
          { name: 'PreviousNames', group: 3, section: 'Patient Information' },
          { name: 'EmailAddress', group: 4, section: 'Patient Information', validate: validateEmail },
          { name: 'MailingAddress', group: 4, section: 'Patient Information' },
          { name: 'MaritalStatus', group: 5, section: 'Patient Information' },
          { name: 'Gender', group: 5, section: 'Patient Information' },
          { name: 'CellPhone', group: 5, section: 'Patient Information', validate: validateCellPhone },
          { name: 'HomeAddress', group: 6, section: 'Patient Information' },
          { name: 'ResidenceType', group: 6, section: 'Patient Information' },
          { name: 'PrimaryCarePhysician', group: 7, section: 'Patient Information' },
          { name: 'DateOfBirth', group: 8, section: 'Patient Information' },
          { name: 'SSN', group: 8, section: 'Patient Information' },
          { name: 'HomePhone', group: 9, section: 'Patient Information', validate: validateCellPhone },
          { name: 'WorkPhone', group: 9, section: 'Patient Information', validate: validateCellPhone },
          { name: 'PreferredContact', group: 9, section: 'Patient Information' },
          { name: 'StudentStatus', group: 10, section: 'Patient Information' },
          { name: 'EmployerName', group: 11, section: 'Employer Information' },
          { name: 'EmployerAddress', group: 12, section: 'Employer Information' },
          { name: 'EmployerPhone', group: 13, section: 'Employer Information' },
          { name: 'EmploymentStatus', group: 13, section: 'Employer Information' },
          { name: 'EmergencyName', group: 14, section: 'Emergency Information' },
          { name: 'RelationshipToPatient', group: 15, section: 'Emergency Information' },
          { name: 'EmergencyCellphone', group: 15, section: 'Emergency Information' },
          { name: 'EmergencyWorkphone', group: 15, section: 'Emergency Information' },
          { name: 'EmergencyDateOfBirth', group: 16, section: 'Emergency Information' },
        ]
      },
      {
        id: 'Step 2',
        name: 'Insurance',
        fields: [
          { name: 'InsuranceCompanyName', group: 1 },
          { name: 'SubscriberNo', group: 1 },
          { name: 'GroupNo', group: 1 },
          { name: 'PolicyHolderName', group: 2 },
          { name: 'SameAsPatient', group: 2 },
          { name: 'InsuranceName', group: 3 },
          { name: 'InsuranceDateOfBirth', group: 3 },
          { name: 'InsuranceSSN', group: 3 },
          { name: 'InsuranceTelephone', group: 4 },
          { name: 'InsuranceGender', group: 4 },
          { name: 'InsuranceHomeAddress', group: 4 },
          { name: 'InsuranceEmployer', group: 5 },
          { name: 'PatientRelationshipToInsured', group: 5 }
        ]
      },
      {
        id: 'Step 3',
        name: 'Complete',
      }
    ];