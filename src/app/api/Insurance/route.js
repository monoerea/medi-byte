// pages/api/patients.js

import { NextResponse } from 'next/server';
import { createItem, getAllItems, updateItem, deleteItem } from '../controller';

const table = 'insurance';
export async function POST(req) {
  try {
    const formData = await req.json();
    
    // Convert formData object into an array of patient objects
    const formDataArray = Object.values(formData);
    const TOSLICE = 27
    // Iterate over each patient object
    const responses = await Promise.all(formDataArray.map(async (data) => {
      // Extract values from each patient object up to EmploymentStatus
      const relevantValues = Object.values(data).slice(TOSLICE, -1);
      const keys = Object.keys(data).slice(TOSLICE, -1).join(', ');
      console.log('relevantValues:', relevantValues, 'keys:', keys, Object.values(data).length - TOSLICE);
      console.log('Insurance', data.InsuranceDateofBirth);

      // Create a patient for each formData entry
      return createItem(relevantValues, keys, table, (Object.values(data).length - TOSLICE)-1);
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
    const patient = await getPatient(req.query.id);
    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    } else {
      return NextResponse.json(patient, { status: 200 });
    }
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
