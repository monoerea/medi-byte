import { NextResponse } from 'next/server';
import { createItem, getAllItems, updateItem, deleteItem, getItem } from '../controller';

const table = 'Insurance';
export async function POST(req) {
  try {
    const formData = await req.json();

    const formDataArray = Object.values(formData);
    const TOSLICE = 27

    const responses = await Promise.all(formDataArray.map(async (data) => {
      const items = Object.keys(data).slice(TOSLICE, data.length);
      const keys = items.map((item, index) => {
        if (index > 3 && item.startsWith('Insurance') && !(item.includes('InsuranceName'))) {
          return item.replace('Insurance', '');
        }
        return item;
      }).join(', ');
      console.log('KEYS', keys);
      const objects = [];


      const maxItems = Math.max(...Object.values(data).filter(Array.isArray).map(arr => arr.length));

    for (let i = 0; i < maxItems; i++) {
        const obj = {};
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

        objects.push(obj);
    }
      objects.forEach(obj => {
        const relevantValues = Object.values(obj).slice(TOSLICE, obj.length);
        console.log('Insurance', relevantValues, keys);
        return createItem(relevantValues, keys, table, (Object.values(data).length - TOSLICE));
      });
    }));

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
    const body = await req.json()
    console.log('DELETE',body);
    await deletePatient(req.query.id,);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
