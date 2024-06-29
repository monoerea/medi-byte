import { NextResponse } from 'next/server';
import { createItem, getAllItems } from '../controller';
import { getRandomId } from '../../(components)/utils';

const table = 'patientinsurance';

export async function POST(req) {
  try {
    const formData = await req.json();
    const keys = ['PatientInsuranceID', 'PatientID', 'InsuranceID'];
    const TOSLICE = 3;
    console.log('PI:', formData);
    const responses = await Promise.all(Object.values(formData).flatMap(async (data) => {
      if (Array.isArray(data['InsuranceID'])) {
        return await Promise.all(data['InsuranceID'].map(async (element) => {
          console.log(getRandomId(),data.PatientID, element)
          return createItem([getRandomId(),data.PatientID, element], keys, table, TOSLICE);
        }));
      }
    }));

    return NextResponse.json(responses.flat(), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



export async function GET(req) {
  try {
    const items = await getAllItems(table);
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}