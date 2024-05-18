import { calculateAge } from './utils.js';

// Define a function to compute the average age of admitted patients
export const computeAverageAge = async (patients) => {
    // Extract birth dates from admittedPatients and calculate ages
    const ages = patients.map(patient => {
        const age = calculateAge(patient.DateOfBirth);
        return age;
    });
    
    // Calculate the sum of ages
    const sumOfAges = ages.reduce((total, age) => total + age, 0);
    
    // Compute the average age
    const averageAge = sumOfAges / ages.length;
    
    // Round average age to two decimal places
    return Math.round(averageAge * 100) / 100;
};
