// pages/api/patients.js

import { NextResponse } from 'next/server';
import { createItem, getAllItems, updateItem, deleteItem, getItem } from '../controller';

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
      const items = Object.keys(data).slice(TOSLICE, -1);
      const keys = items.map((item, index) => {
        if (index > 3 && item.startsWith('Insurance') && !(item.includes('InsuranceName'))) {
          return item.replace('Insurance', '');
        }
        return item;
      }).join(', ');
      console.log('KEYS', keys);
      const objects = [];

      // Iterate over each key-value pair in the original object
      const maxItems = Math.max(...Object.values(data).filter(Array.isArray).map(arr => arr.length));

    // Iterate up to the maximum number of items
    for (let i = 0; i < maxItems; i++) {
        const obj = {};
        // Iterate over the entries of the data object
        for (const [key, value] of Object.entries(data)) {
            if (key === 'SameAsPatient') {
                if (Array.isArray(value)) {
                    const currentValue = value[i];
                    console.log('SameAsPatient', currentValue, currentValue === 'True');
                    obj[key] = currentValue === 'True' ? 1 : 0;
                }
            } else {
                obj[key] = Array.isArray(value) ? value[i] : value;
            }
        }
        // Push the created object into the array
        objects.push(obj);
    }
      // Log the single value objects
      objects.forEach(obj => {
        const relevantValues = Object.values(obj).slice(TOSLICE, -1);
        console.log('Insurance', relevantValues, keys);
        // Assuming createItem returns a promise, await its execution
        return createItem(relevantValues, keys, table, (Object.values(data).length - TOSLICE) - 1);
      });
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
    const insurances = await getAllItems(table);
    return NextResponse.json(insurances, { status: 200 });
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
