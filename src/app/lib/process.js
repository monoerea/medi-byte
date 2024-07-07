import { handler } from './metricsHandler.js';

export const processData = async (data) => {
    const result = await handler(data);
    return result;
};

