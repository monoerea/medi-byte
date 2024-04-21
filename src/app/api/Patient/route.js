// pages/api/patients.js

import { NextResponse } from 'next/server';
import { createPatient, getPatient, updatePatient, deletePatient } from './controller';

export async function POST(req) {
  try {
    const formData = await req.json();
    
    // Convert formData object into an array of patient objects
    const formDataArray = Object.values(formData);

    // Iterate over each patient object
    const responses = await Promise.all(formDataArray.map(async (data) => {
      // Extract values from each patient object up to EmploymentStatus
      const relevantValues = Object.values(data).slice(0, 22);
      const keys = Object.keys(data).slice(0, 22).join(', ');
      console.log('relevantValues:', relevantValues, 'keys:', keys);

      // Create a patient for each formData entry
      return createPatient(relevantValues, keys);
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
