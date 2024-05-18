import { computeDistAge, computeDistGender, computeDistMarital } from './computeDistribution.js';
import { computeAverageAge } from './computeAverage.js';

// Define a function to get the total length of data
export const getTotalLength = async (data) => {
    return data.length;
};

// Define a function to handle average age computation
export const handleAverage = async (data) => {
    if (data.req === 'age') {
        return await computeAverageAge(data.patients);
    }
};

// Define a function to handle distribution computation
export const handleDistribution = async (data) => {
    if (data.req === 'age') {
        return await computeDistAge(data);
    }
    if (data.req === 'gender') {
        return await computeDistGender(data);
    }
    if (data.req === 'marital') {
        return await computeDistMarital(data);
    }
};

// Define a function to handle data based on its type
export const handler = async (data) => {
    console.log('Passed Data:',Object.keys(data), data.type, data.req, data.patients.length);
    switch (data.type) {
        case 'total':
            return await getTotalLength(data.patients);
        case 'distribution':
            return await handleDistribution(data);
        case 'average':
            return await handleAverage(data);
        default:
            throw new Error('Invalid data type');
    }
};
