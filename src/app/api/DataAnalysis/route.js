import { getRandomId, fetchRawDataFromServer } from '../../(components)/utils';
import { processData } from '../../lib/process';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        console.log('POST request received:', req.url);

        // Extract endpoints and sectionMappings from the request body
        const body = await req.json();

        console.log('Endpoints:', body.endpoints, 'Mappings:', body.sectionMappings);

        // Fetch raw data from the specified endpoints
        const rawData = await fetchRawDataFromServer(body.endpoints);
        console.log('Raw data:', rawData.length);

        const sectionId = getRandomId();
        
        // Process each section and generate processed data
        const cards = await Promise.all(rawData.map(async (data, index) => {
            const sectionKey = Object.keys(body.sectionMappings)[index];
            const sectionRequest = body.sectionMappings[sectionKey];
            console.log('Data:', data.length, index, sectionRequest, sectionKey);

            // Process data for the current section
            const processedCardData = await processData({
                ...sectionRequest,
                patients: data,
            });

            console.log('processedCardData:', typeof processedCardData);

            // Generate a random card ID and construct the card object
            return {
                cardId: getRandomId(),
                data: processedCardData,
            };
        }));

        // Wrap the cards in a single object with the sectionId
        const processedData = { sectionId, cards };

        console.log('Processed data:', processedData);

        // Return the processed data using NextResponse
        return NextResponse.json(processedData, { status: 200 });

    } catch (error) {
        console.error('Error processing data:', error);

        // Handle errors and return an appropriate response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
