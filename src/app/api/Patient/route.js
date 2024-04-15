import { get } from 'http';
import {Patient} from '../../(models)/Patient';
import {Address} from '../../(models)/Patient'; // Import Address model if needed
import { NextResponse } from 'next/server';
import { error } from 'console';

export async function POST(req) {
    try {
        // Parse the request body
        const { formData } = await req.json();

        // Extract firstName, lastName, and middleInitial from formData
        const { mailAddress, ...rest } = formData;

        // Create a new address based on the formData
        const newAddress = new Address(mailAddress);

        // Save the address to the database
        const savedAddress = await newAddress.save();

        // Create the patient using the extracted fields and additional data from formData
        const newPatient = await Patient.create({
            mailAddress: savedAddress, // Pass the saved address object
            ...rest // Include any additional fields in formData
        });

        console.log('Saved Patient:', newPatient);
        // Respond with a success message
        return NextResponse.json({ message: "Patient Created", patient: newPatient }, { status: 201 });
    } catch (error) {
        // If an error occurs during patient creation, respond with an error message
        console.error("Error creating patient:", error);
        return NextResponse.json({ message: "Error creating patient", error }, { status: 500 });
    }
}



export async function GET(req) {
    try {
        console.log("Fetching patients...");
        // Retrieve patients from the database
        const patients = await Patient.find();
        
        console.log("Patients fetched successfully:", patients);

        // Check if patients are retrieved successfully
        if (!patients) {
            // If no patients found, return an appropriate message
            return NextResponse.json({ message: 'No patients found' }, { status: 404 });
        }

        // If patients are found, return them in the response
        return NextResponse.json({ patients }, { status: 200 });
    } catch (error) {
        // If an error occurs during retrieval, handle it and return an error response
        console.error('Error fetching patients:', error);
        return NextResponse.json({ message: 'Error fetching patients', error }, { status: 500 });
    }
}

