import { cleaner } from './cleaner.js';
import { handler } from './metricsHandler.js';

// Define a function to process data
export const processData = async (data) => {
    // Clean the data
    // const cleanedData = await cleaner(data.patients);
    // Call the handler based on data type and request
    const result = await handler(data);
    return result;
};

