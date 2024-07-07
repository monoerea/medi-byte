import { getItem, updateItem, deleteItem } from '../../controller';
import { NextResponse } from 'next/server';

const table = 'patient'
export async function GET(req) {
  try {
    const patient = await getItem(req.query.id, table);
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

    const formData = await req.json();
    console.log('formData', formData);

    const {id, body} = formData;
   
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