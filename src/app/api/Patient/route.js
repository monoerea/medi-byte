// pages/api/patients.js

import { NextResponse } from 'next/server';
import { createItem, getAllItems, updateItem, deleteItem } from '../controller';

const table = 'Patient'

export async function POST(req) {
  try {
    const formData = await req.json();
    
    // Convert formData object into an array of patient objects
    const formDataArray = Object.values(formData);
    const TOSLICE = 27
    // Iterate over each patient object
    const responses = await Promise.all(formDataArray.map(async (data) => {

      
      const relevantValues = Object.values(data).slice(0, TOSLICE);
      const keys = Object.keys(data).slice(0, TOSLICE).join(', ');
      console.log('relevantValues:', relevantValues, 'keys:', keys);

      // Create a patient for each formData entry
      return createItem(relevantValues, keys, table, TOSLICE);
    }));

    // Return an array of responses
    return NextResponse.json(responses, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}   

export async function GET(req) {
  try {
    const patients = await getAllItems(table);
    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const updatedPatient = await updatePatient(req.query.id, req.body);
    return NextResponse.json(updatedPatient, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await deletePatient(req.query.id);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
