import { NextResponse } from 'next/server';
import {deleteItem, updateItem} from '../../controller'
import { query } from '../../../lib/db';
const table = 'PatientInsurance';

export async function DELETE(req){
   const body = await req.json()
   console.log(body);
   const {id} = body
   try {
        await deleteItem(id, table);
        NextResponse.json({message:'Successful deletion of item'});
   } catch (error) {
        console.log('Error deleting PatientInsurance record',error)
   }
}

// TODO: update insurance where patientId, insuranceID is existing
export async function PUT(req) {
    try {
  
      const formData = await req.json();
      console.log('formData', formData);
  
      const {id, body} = formData;
      let data;
      if (body.PatientID !== undefined && body.PatientID !== null) {
        const patientId = body.PatientID;
        console.log('PatientID:', patientId);
        try {
          const result = await query({
            query: `SELECT PatientID FROM Patient WHERE PatientID = ?`,
            values: [patientId]
          });
          console.log('Patient Data:', result);
          data = result[0];
        } catch (error) {
          console.error('Error executing PatientID query:', error);
        }
      }

      if (body.InsuranceID !== undefined && body.InsuranceID !== null) {
        const insuranceID = body.InsuranceID;
        console.log('InsuranceID:', insuranceID);
        try {
          const result = await query({
            query: `SELECT InsuranceID FROM Insurance WHERE InsuranceID = ?`,
            values: [insuranceID]
          });
          console.log('Insurance Data:', result);
          data = result[0];
        } catch (error) {
          console.error('Error executing InsuranceID query:', error);
        }
      }

      if (body.PatientID !== undefined && body.PatientID !== null &&
          body.InsuranceID !== undefined && body.InsuranceID !== null) {
        const patientId = body.PatientID;
        const insuranceID = body.InsuranceID;
        console.log('Both IDs:', patientId, insuranceID);
        try {
          const result = await query({
            query: `SELECT PatientID FROM Patient WHERE PatientID = ?`,
            values: [patientId]
          })[0];
          const res = await query({
            query: `SELECT InsuranceID FROM Insurance WHERE InsuranceID = ?`,
            values: [insuranceID]
          })[0];
          data = body;
        } catch (error) {
          console.error('Error executing combined query:', error);
        }
      }
      
      console.log('Final Data:', id, data, table);

      const updatedPatient = await updateItem(id, data, table);
  
      return NextResponse.json(updatedPatient, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }