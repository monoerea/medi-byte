export const initData = {
    patientId: '01',
    prefix: 'Ms.',
    name: { first: 'Alice', last: 'March', middle: '' },
    dateOfBirth: new Date(),
    gender: 'F',
    cellPhone: '1234567890',
    prev_names: { first: 'Alice', last: 'March', middle: '' },
    email: 'alicemarch@gmail.com',
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