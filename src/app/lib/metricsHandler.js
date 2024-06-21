import { computeDistAge, computeDistGender, computeDistMarital } from './computeDistribution.js';
import { computeAverageAge } from './computeAverage.js';

// Define a function to get the total length of data
export const getTotalLength = async (data) => {
    if (data.req === 'age'){
        const length = data.patients.length;
    return { type: 'total', req: 'age', result: length };
    }
    
};

// Define a function to handle average age computation
export const handleAverage = async (data) => {
    if (data.req === 'age') {
        const averageAge = await computeAverageAge(data.patients);
        return { type: 'average', req: 'age', result: averageAge };
    }
};

// Define a function to handle distribution computation
export const handleDistribution = async (data) => {
    if (data.req === 'age') {
        const ageDistribution = await computeDistAge(data);
        return { type: 'distribution', req: 'age', result: ageDistribution };
    }
    if (data.req === 'gender') {
        const genderDistribution = await computeDistGender(data);
        return { type: 'distribution', req: 'gender', result: genderDistribution };
    }
    if (data.req === 'marital') {
        const maritalDistribution = await computeDistMarital(data);
        return { type: 'distribution', req: 'marital', result: maritalDistribution };
    }
};

export const handleFrequency = async (data) => {
    if (data.req === 'company'){
        const companyFreq = await getCompanyFreq(data);
        return companyFreq;
    }
}

// Define a function to handle data based on its type
export const handler = async (data) => {
    console.log('Passed Data:', Object.keys(data), data.type, data.req, data.patients.length);
    switch (data.type) {
        case 'total':
            return await getTotalLength(data);
        case 'distribution':
            return await handleDistribution(data);
        case 'average':
            return await handleAverage(data);
        default:
            throw new Error('Invalid data type');
    }
};
