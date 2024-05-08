import { type } from 'os';
import { validateCellPhone, validateEmail, validateName } from './utils';
import { faMoneyBill, faPerson, faCog } from '@fortawesome/free-solid-svg-icons';

export const itemList = [
  { icon: <faPerson className="w-6 h-6 mr-2" />, label: 'Patient' },
  { icon: <faMoneyBill className="w-6 h-6 mr-2" />, label: 'Insurance' },
  { icon: <faCog className="w-6 h-6 mr-2" />, label: 'Settings' },
];


export const initData = {
  PatientID: Math.floor(Math.random() * 10000),
  Prefix: "Ms.",
  PatientName: "Senorin, Sheen S.",
  PreviousNames: "Alice March",
  EmailAddress: "sheen@gmail.com",
  MailingAddress:"5209 Kawit, Gloria, Oriental Mindoro",
  MaritalStatus:'Single',
  Gender: "Female",
  CellPhone: "911234567",
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

  InsuranceID: [],
  InsuranceCompanyName: ['HYBE Insurances'],
  SubscriberNo: ['10000'],
  GroupNo: ['20000'],
  PolicyHolderName: ['Jocelyn S. Senorin'],
  SameAsPatient: ['False'],
  InsuranceName: ['Jocelyn S. Senorin'],
  InsuranceDateOfBirth: ['1973-03-24'],
  InsuranceSSN: ['2134567890'],
  InsuranceTelephone: ['5678904321'],
  InsuranceGender: ['Female'],
  InsuranceHomeAddress: ["5209 Kawit, Gloria, Oriental Mindoro"],
  InsuranceEmployer: ['Kim Namjoon'],
  PatientRelationshipToInsured: [''],
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
      { option: 'False' },
      { option: 'True' }
    ];
    
    

    export const steps = [
      {
        id: 'Step1',
        name: 'Patient Information',
        fields:[
          { id: 'Prefix', name: 'Prefix', group: 1, type: 'radio', options: prefixOptions, placeholder: 'Select Prefix' },
          { id: 'PatientName', name: 'Patient Name', group: 2, type: 'input', placeholder: 'Enter Patient Name' },
          { id: 'PreviousNames', name: 'Previous Names', group: 3, type: 'input', placeholder: 'Enter Previous Names' },
          { id: 'EmailAddress', name: 'Email Address', group: 4, type: 'input', validate: validateEmail, placeholder: 'Enter Email Address' },
          { id: 'MailingAddress', name: 'Mailing Address', group: 4, type: 'input', placeholder: 'Enter Mailing Address' },
          { id: 'MaritalStatus', name: 'Marital Status', group: 5, type: 'select', options: maritalOptions, placeholder: 'Select Marital Status' },
          { id: 'Gender', name: 'Gender', group: 5, type: 'select', options: genderOptions, placeholder: 'Select Gender' },
          { id: 'CellPhone', name: 'Cell Phone', group: 5, type: 'input', validate: validateCellPhone, placeholder: 'Enter Cell Phone' },
          { id: 'HomeAddress', name: 'Home Address', group: 6, type: 'input', placeholder: 'Enter Home Address' },
          { id: 'ResidenceType', name: 'Residence Type', group: 6, type: 'select', options: residenceTypeOptions, placeholder: 'Select Residence Type' },
          { id: 'PrimaryCarePhysician', name: 'Primary Care Physician', group: 7, type: 'input', placeholder: 'Enter Primary Care Physician' },
          { id: 'DateOfBirth', name: 'Date of Birth', group: 8, type: 'input', placeholder: 'Enter Date of Birth' },
          { id: 'SSN', name: 'SSN', group: 8, type: 'input', placeholder: 'Enter SSN' },
          { id: 'HomePhone', name: 'Home Phone', group: 9, type: 'input', validate: validateCellPhone, placeholder: 'Enter Home Phone' },
          { id: 'WorkPhone', name: 'Work Phone', group: 9, type: 'input', validate: validateCellPhone, placeholder: 'Enter Work Phone' },
          { id: 'PreferredContact', name: 'Preferred Contact', group: 9, type: 'select', options: preferredContactOptions, placeholder: 'Select Preferred Contact' },
          { id: 'StudentStatus', name: 'Student Status', group: 10, type: 'select', options: studentStatusOptions, placeholder: 'Select Student Status' },
          { id: 'EmployerName', name: 'Employer Name', group: 11, type: 'input', placeholder: 'Enter Employer Name' },
          { id: 'EmployerAddress', name: 'Employer Address', group: 12, type: 'input', placeholder: 'Enter Employer Address' },
          { id: 'EmployerPhone', name: 'Employer Phone', group: 13, type: 'input', placeholder: 'Enter Employer Phone' },
          { id: 'EmploymentStatus', name: 'Employment Status', group: 13, type: 'select', options: employmentStatusOptions, placeholder: 'Select Employment Status' },
          { id: 'EmergencyName', name: 'Emergency Name', group: 14, type: 'input', placeholder: 'Enter Emergency Name' },
          { id: 'RelationshipToPatient', name: 'Relationship to Patient', group: 15, type: 'input', placeholder: 'Enter Relationship to Patient' },
          { id: 'EmergencyCellphone', name: 'Emergency Cellphone', group: 15, type: 'input', placeholder: 'Enter Emergency Cellphone' },
          { id: 'EmergencyWorkphone', name: 'Emergency Workphone', group: 15, type: 'input', placeholder: 'Enter Emergency Workphone' },
          { id: 'EmergencyDateOfBirth', name: 'Emergency Date of Birth', group: 16, type: 'input', placeholder: 'Enter Emergency Date of Birth' },
        ]
      },
      {
        id: 'Step2',
        name: 'Insurance',
        fields: [
          { id: 'InsuranceCompanyName', name: 'Insurance Company Name', group: 1, type:'input', placeholder: 'Enter Insurance Company Name' },
          { id: 'SubscriberNo', name: 'Subscriber No', group: 2 , type:'input', placeholder: 'Enter Subscriber Number'},
          { id: 'GroupNo', name: 'Group No', group: 2, type:'input', placeholder: 'Enter Group Number' },
          { id: 'PolicyHolderName', name: 'Policy Holder Name', group: 3, type:'input', placeholder: 'Enter Policy Holder Name' },
          { id: 'SameAsPatient', name: 'Same as Patient', group: 4 , type:'select', options:isPatientOptions, placeholder: 'Select Same as Patient' },
          { id: 'InsuranceName', name: 'Insurance Name', group: 5, type:'input', placeholder: 'Enter Insurance Name' },
          { id: 'InsuranceDateOfBirth', name: 'Insurance Date of Birth', group: 6, type:'input', placeholder: 'Enter Insurance Date of Birth' },
          { id: 'InsuranceSSN', name: 'Insurance SSN', group: 6, type:'input', placeholder: 'Enter Insurance SSN' },
          { id: 'InsuranceTelephone', name: 'Insurance Telephone', group: 6, type:'input', placeholder: 'Enter Insurance Telephone' },
          { id: 'InsuranceGender', name: 'Insurance Gender', group: 7, type:'select', options: genderOptions, placeholder: 'Select Insurance Gender' },
          { id: 'InsuranceHomeAddress', name: 'Insurance Home Address', group: 8, type:'input', placeholder: 'Enter Insurance Home Address' },
          { id: 'InsuranceEmployer', name: 'Insurance Employer', group: 9, type:'input', placeholder: 'Enter Insurance Employer' },
          { id: 'PatientRelationshipToInsured', name: 'Patient Relationship to Insured', group: 10, type:'input', placeholder: 'Enter Patient Relationship to Insured' }
        ]
      },
      {
        id: 'Step3',
        name: 'Complete',
        fields:[]
      }
    ];
    
    
    