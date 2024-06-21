import { getRandomId, fetchRawDataFromServer } from '../../(components)/utils';
import { processData } from '../../lib/process';
import { NextResponse } from 'next/server';
import {getCompanyFreq} from './sql';
import {prepareGroupedBarChartData} from '../../lib/utils';
import { handler } from './handler';

export async function  GET(){
    try {
        console.log('getCompanyFreq');
        const result = prepareGroupedBarChartData( await getCompanyFreq());
        console.log(result);
        const cards = [{cardId: getRandomId(), data: {result: result, type: 'frequency', req: 'company'} }];
        const res = {sectionId:getRandomId(), cards}

        console.log("RESULT",res.cards.result);

        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Request failed', error });
    }
}

export async function POST(req, res) {
    try {
        console.log('POST request received:', req.url);
        const body = await req.json();
        console.log('BODY', body);

        // Process each sectionMapping asynchronously
        const cards = await Promise.all(Object.keys(body.sectionMappings).map(async key => {
            const sectionRequest = body.sectionMappings[key];
            console.log('Section Request:', sectionRequest);

            const result = await handler(sectionRequest);
            console.log('RESULT', result);

            return { cardId: getRandomId(), data: {result, ...sectionRequest} };
        }));
        console.log('CARDS', cards);

        // Send response with cards and a unique sectionId using NextResponse
        return NextResponse.json({ sectionId: getRandomId(), cards }, { status: 200 });
    } catch (error) {
        console.error('Error processing data:', error);
        // Handle errors and return an appropriate response using NextResponse
        return NextResponse.json(res, { error: error.message }, { status: 500 });
    }
}

// export async function POST(req) {
//     try {
//         console.log('POST request received:', req.url);

//         // Extract endpoints and sectionMappings from the request body
//         const body = await req.json();

//         console.log('Endpoints:', body.endpoints, 'Mappings:', body.sectionMappings);

//         // Fetch raw data from the specified endpoints
//         const rawData = await fetchRawDataFromServer(body.endpoints);
//         console.log('Raw data:', rawData.length);

//         const sectionId = getRandomId();
        
//         // Process each section and generate processed data
//         const cards = await Promise.all(rawData.map(async (data, index) => {
//             const sectionKey = Object.keys(body.sectionMappings)[index];
//             const sectionRequest = body.sectionMappings[sectionKey];
//             console.log('Data:', data.length, index, sectionRequest, sectionKey);

//             // Process data for the current section
//             const processedCardData = {
//                 ...sectionRequest,
//                 patients: data,
//             };
//             console.log('processedCardData:', processedCardData.sectionKey);
//             // Generate a random card ID and construct the card object
//             return {
//                 cardId: getRandomId(),
//                 data: await processData(processedCardData),
//             };
//         }));

//         // Wrap the cards in a single object with the sectionId
//         const processedData = { sectionId, cards };

//         console.log('Processed data:', processedData);

//         // Return the processed data using NextResponse
//         return NextResponse.json(processedData, { status: 200 });

//     } catch (error) {
//         console.error('Error processing data:', error);

//         // Handle errors and return an appropriate response
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }
