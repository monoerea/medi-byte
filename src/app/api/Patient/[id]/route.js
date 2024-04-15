import { get } from 'http';
import {Patient} from '../../../(models)/Patient';
import { NextResponse } from 'next/server';
import { error } from 'console';

export async function GET(req, { params }) {
  const { id } = params;

  const foundPatient = await Patient.findOne({ _id: id });
  return NextResponse.json({ foundPatient }, { status: 200 });
}


export async function PUT(req, { params })  {
    try {
        console.log('Updating patient');
        const { id } = params;
        const body = await req.json(); // Extracting the entire request body

        // Check if the request body contains the necessary data
        if (!body) {
            return NextResponse.json({ message: "Request body is empty" }, { status: 400 });
        }

        // Find the patient by ID
        const patient = await Patient.findById(id);

        // Check if the patient exists
        if (!patient) {
            return NextResponse.json({ message: "Patient not found" }, { status: 404 });
        }

        // Update the patient fields with the provided data
        const updatedPatient = await Patient.findByIdAndUpdate(id, body, { new: true });
        console.log('Updated patient',updatedPatient);

        // Respond with the updated patient
        return NextResponse.json({ patient: updatedPatient }, { status: 200 });
    } catch (error) {
        // If an error occurs during patient update, respond with an error message
        console.error("Error updating patient:", error);
        return NextResponse.json({ message: "Error updating patient", error }, { status: 500 });
    }
}


export async function DELETE(req, { params }) {
    try {
      const { id } = params;
      
      const patient = await Patient.findById(id);

      if (!patient) {
        return NextResponse.json({ message: "Patient not found" }, { status: 404 });
    }
      await Person.findByIdAndDelete(id);
      return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
  }