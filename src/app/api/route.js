
import Patient from '../(models)/Patient';
import {NextResponse} from 'next/server';

export async function POST(req){
    try{
        const body = await req.json()
        const patientData = body.formData
        await Patient.create(patientData)

        return NextResponse.json({ message: "Patient Created"}, {status:201});
    } catch(error){
        return NextResponse.json({ message: "Error", error},{status:500});
    }
}