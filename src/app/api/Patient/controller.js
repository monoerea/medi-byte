// app/api/Patient/controller.js

// Example database connection
import { query } from '../../lib/db';

export async function createPatient(relevantValues, keys) {
  try {
    const placeholders = Array(22).fill('?').join(', ');
    // Construct and execute the SQL query
    const result = await query({
      query: `INSERT INTO patient (${keys}) VALUES (${placeholders})`,
      values: relevantValues,
    });
    // Return the newly created patient
    return { id: result.insertId, ...relevantValues };
  } catch (error) {
    console.log('ERROR', error);
    throw new Error('Failed to create patient');
  }
}



// Function to get a patient by ID
export async function getPatient(patientId) {
  try {
    // Perform database query to retrieve patient by ID
    const result = await query({
      query: 'SELECT * FROM patients WHERE id = ?',
      values: [patientId]
    });

    // Check if patient exists
    if (result.length === 0) {
      return null; // Patient not found
    }

    // Return the patient
    return result[0];
  } catch (error) {
    throw new Error('Failed to get patient');
  }
}

// Function to update a patient by ID
export async function updatePatient(patientId, patientData) {
  try {
    // Perform database query to update patient by ID
    await query({
      query: 'UPDATE patients SET name = ?, age = ?, email = ? WHERE id = ?',
      values: [patientData.name, patientData.age, patientData.email, patientId]
    });

    // Return the updated patient
    return { id: patientId, ...patientData };
  } catch (error) {
    throw new Error('Failed to update patient');
  }
}

// Function to delete a patient by ID
export async function deletePatient(patientId) {
  try {
    // Perform database query to delete patient by ID
    await query({
      query: 'DELETE FROM patients WHERE id = ?',
      values: [patientId]
    });
  } catch (error) {
    throw new Error('Failed to delete patient');
  }
}
