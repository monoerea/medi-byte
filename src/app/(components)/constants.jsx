export const initData = {
    patientId: '01',
    prefix: '',
    firstName: '', 
    lastName: '', 
    middleName: '',
    dateOfBirth: '',
    gender: '',
    cellPhone: '',
    prevNames: '',
    email: '',
    mailAddress: {
        street: 'Kawit',
        city: 'Gloria',
        state: 'Oriental Mindoro',
        country: 'Philippines',
        zip: '5209'
    }
};

export const prefixOptions = [ // Corrected variable name to prefixOptions
        { label: 'Mr.', value: 'Mr.' },
        { label: 'Mrs.', value: 'Mrs.' }, 
        { label: 'Ms.', value: 'Ms.' },
        { label: 'Sir', value: 'Sir' }
    ];

 export const steps = [{  id: 'Step 1',
    name: 'Patient Information', 
    fields:['id','prefix','firstName', 'lastName', 'middleInitial', 'gener','dateOfBirth','cellPhone','email','prevNames']},
 {  id: 'Step 2', 
    name:'Address Information',
    fields:['id','prefix','firstName', 'lastName', 'middleInitial', 'gener','dateOfBirth','cellPhone','email','prevNames']},
 {  id: 'Step 3', 
    name:'Employer Information',
    fields:['id','prefix','firstName', 'lastName', 'middleInitial', 'gener','dateOfBirth','cellPhone','email','prevNames']},
 {  id: 'Step 4', 
    name:'Contact Information',
    fields:['id','prefix','firstName', 'lastName', 'middleInitial', 'gener','dateOfBirth','cellPhone','email','prevNames']},
 {  id: 'Step 5', 
    name:'Guarantor Information',
    fields:['id','prefix','firstName', 'lastName', 'middleInitial', 'gener','dateOfBirth','cellPhone','email','prevNames']},
 {  id: 'Step 6', 
    name:'Pharmacy Information',
    fields:['id','prefix','firstName', 'lastName', 'middleInitial', 'gener','dateOfBirth','cellPhone','email','prevNames']},
 {  id: 'Step 7', 
    name:'Insurance Information',
    fields:['id','prefix','firstName', 'lastName', 'middleInitial', 'gener','dateOfBirth','cellPhone','email','prevNames']},
{  id: 'Step 8', 
   name:'Complete',
   fields:['id','prefix','firstName', 'lastName', 'middleInitial', 'gener','dateOfBirth','cellPhone','email','prevNames']}]