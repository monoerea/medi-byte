import { getRandomId, fetchRawDataFromServer } from '../../../(components)/utils';
import {processData} from '../../../lib/process';

export async function POST(req, res) {
    try {
        console.log('POST request received:', req.url);

        // Extract endpoints and sectionMappings from the request body
        const { endpoints, sectionMappings } = req.body;

        // Fetch raw data from the specified endpoints
        const rawData = await fetchRawDataFromServer(endpoints);
        console.log('Raw data:', rawData);

        // Process each section and generate processed data
        const processedData = await Promise.all(rawData.map(async (data, index) => {
            const sectionId = getRandomId();
            const sectionKey = Object.keys(sectionMappings)[index];
            const sectionRequest = sectionMappings[sectionKey];

            // Process data for the current section
            const processedCardData = await processData({
                ...sectionRequest,
                patients: data,
            });

            // Generate a random card ID and construct the card object
            const cards = [{ cardId: getRandomId(), data: processedCardData }];

            return { sectionId, cards };
        }));

        console.log('Processed data:', processedData);
        res.status(200).json(processedData);
        
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ error: error.message });
    }
}
