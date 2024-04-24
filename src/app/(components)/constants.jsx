import { type } from 'os';
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
    const maritalOptions = [
      { option: 'Single' },
      { option: 'Married' },
      { option: 'Partner' },
      { option: 'Divorced' },
      { option: 'Widowed' },
      { option: 'Legally Separated' }
    ];
    
    const residenceTypeOptions = [
      { option: 'Skilled Nursing Home' },
      { option: 'Nursing Home' },
      { option: 'Residential Home' },
      { option: 'Private Home' }
    ];
    
    const genderOptions = [
      { option: 'Male' },
      { option: 'Female' },
      { option: 'Transgender' }
    ];
    
    const preferredContactOptions = [
      { option: 'Home' },
      { option: 'Cell' },
      { option: 'Work' }
    ];
    
    const studentStatusOptions = [
      { option: 'Full-time' },
      { option: 'Part-time' },
      { option: 'Not a Student' }
    ];
    
    const employmentStatusOptions = [
      { option: 'Full-time' },
      { option: 'Part-time' },
      { option: 'Not employed' },
      { option: 'Self-employed' },
      { option: 'Retired' },
      { option: 'Active Military Duty' }
    ];
    
    const isPatientOptions = [
      { option: 'True' },
      { option: 'False' }
    ];
    
    

    export const steps = [
      {
        id: 'Step 1',
        name: 'Patient Information',
        const fields = [
          { name: 'Prefix', group: 1, type: 'radio', options: prefixOptions },
          { name: 'PatientName', group: 2, type: 'input' },
          { name: 'PreviousNames', group: 3, type: 'input' },
          { name: 'EmailAddress', group: 4, type: 'input', validate: validateEmail },
          { name: 'MailingAddress', group: 4, type: 'input' },
          { name: 'MaritalStatus', group: 5, type: 'select', options: maritalOptions },
          { name: 'Gender', group: 5, type: 'select', options: genderOptions },
          { name: 'CellPhone', group: 5, type: 'input', validate: validateCellPhone },
          { name: 'HomeAddress', group: 6, type: 'input' },
          { name: 'ResidenceType', group: 6, type: 'select', options: residenceTypeOptions },
          { name: 'PrimaryCarePhysician', group: 7, type: 'input' },
          { name: 'DateOfBirth', group: 8, type: 'input' },
          { name: 'SSN', group: 8, type: 'input' },
          { name: 'HomePhone', group: 9, type: 'input', validate: validateCellPhone },
          { name: 'WorkPhone', group: 9, type: 'input', validate: validateCellPhone },
          { name: 'PreferredContact', group: 9, type: 'select', options: preferredContactOptions },
          { name: 'StudentStatus', group: 10, type: 'select', options: studentStatusOptions },
          { name: 'EmployerName', group: 11, type: 'input' },
          { name: 'EmployerAddress', group: 12, type: 'input' },
          { name: 'EmployerPhone', group: 13, type: 'input' },
          { name: 'EmploymentStatus', group: 13, type: 'select', options: employmentStatusOptions },
          { name: 'EmergencyName', group: 14, type: 'input' },
          { name: 'RelationshipToPatient', group: 15, type: 'input' },
          { name: 'EmergencyCellphone', group: 15, type: 'input' },
          { name: 'EmergencyWorkphone', group: 15, type: 'input' },
          { name: 'EmergencyDateOfBirth', group: 16, type: 'input' },
        ]
      },
      {
        id: 'Step 2',
        name: 'Insurance',
        fields: [
          { name: 'InsuranceCompanyName', group: 1, type:'input' },
          { name: 'SubscriberNo', group: 2 , type:'input'},
          { name: 'GroupNo', group: 2, type:'input' },
          { name: 'PolicyHolderName', group: 3, type:'input' },
          { name: 'SameAsPatient', group: 4 , type:'select', options:isPatientOptions},
          { name: 'InsuranceName', group: 5, type:'input' },
          { name: 'InsuranceDateOfBirth', group: 6, type:'input' },
          { name: 'InsuranceSSN', group: 6, type:'input' },
          { name: 'InsuranceTelephone', group: 6, type:'input' },
          { name: 'InsuranceGender', group: 7, type:'select', options: genderOptions },
          { name: 'InsuranceHomeAddress', group: 8, type:'input' },
          { name: 'InsuranceEmployer', group: 9, type:'input' },
          { name: 'PatientRelationshipToInsured', group: 10, type:'input' }
        ]
      },
      {
        id: 'Step 3',
        name: 'Complete',
        fields:[]
      }
    ];
    