import { getItem, updateItem, deleteItem } from '../../controller';
import { NextResponse } from 'next/server';

const table = 'insurance'
export async function GET(req) {
  try {
    const item = await getItem(req.query.id, table);
    if (!item) {
      return NextResponse.json({ error: `${table} not found`}, { status: 404 });
    } else {
      return NextResponse.json(item, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const formData = await req.json();
    console.log('formData', formData);

    const {id, body} = formData;
    const relevantValues = Object.values(body);
    const keys = Object.keys(body);
    console.log('relevantValues:', relevantValues, 'keys:', keys);

    const updatedPatient = await updateItem(id, body, table);

    return NextResponse.json(updatedPatient, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const {id} = await req.json();
    console.log(id);
    await deleteItem(id, table);
    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}