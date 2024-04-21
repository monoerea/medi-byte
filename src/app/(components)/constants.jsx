export const initData = {
      PatientID: Math.floor(Math.random() * 1000000),
      Prefix: "Ms.",
      PatientName: "Senorin, Sheen S.",
      PreviousNames: "Alice March",
      EmailAddress: "sheen@gmail.com",
      MailingAddress:"5209 Kawit, Gloria, Oriental Mindoro",
      MaritalStatus:'Single',
      Gender: "Female",
      CellPhone: "1",//(63)091-123-4567
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
      EmergencyWorkphone:'09876543211',
      EmergencyDateOfBirth: new Date('03-24-1973'),
  
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
          { name: 'Prefix', group: 1, type:'radio',options:prefixOptions },
          { name: 'PatientName', group: 2 },
          { name: 'PrevNames', group: 3 },
          { name: 'EmailAddress', group: 4 },
          { name: 'MailingAddress', group: 4 },
          { name: 'MaritalStatus', group: 5 },
          { name: 'Gender', group: 5 },
          { name: 'CellPhone', group: 5 },
          { name: 'HomeAddress', group: 6 },
          { name: 'ResidenceType', group: 6 },
          { name: 'PrimaryCarePhysician', group: 7 },
          { name: 'DateOfBirth', group: 8 },
          { name: 'SSN', group: 8 },
          { name: 'HomePhone', group: 9 },
          { name: 'WorkPhone', group: 9 },
          { name: 'PreferredContact', group: 9 },
          { name: 'StudentStatus', group: 9 },
          { name: 'EmployerName', group: 10 },
          { name: 'EmployerAddress', group: 11 },
          { name: 'EmployerPhone', group: 12 },
          { name: 'EmploymentStatus', group: 12 }
        ]
      },
      {
        id: 'Step 2',
        name: 'Emergency Contact',
        fields: [
          { name: 'EmergencyName', group: 1 },
          { name: 'RelationshipToPatient', group: 1 },
          { name: 'EmergencyCellphone', group: 2 },
          { name: 'EmergencyWorkphone', group: 2 },
          { name: 'EmergencyDateOfBirth', group: 3 }
        ]
      },
      {
        id: 'Step 3',
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
         id: 'Step 4',
         name: 'Complete',
       }
    ];
    