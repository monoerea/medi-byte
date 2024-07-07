import { calculateAge } from './utils.js';

export const computeAverageAge = async (patients) => {
    const ages = patients.map(patient => {
        const age = calculateAge(patient.DateOfBirth);
        return age;
    });
    
    const sumOfAges = ages.reduce((total, age) => total + age, 0);

    const averageAge = sumOfAges / ages.length;

    return Math.round(averageAge * 100) / 100;
};
