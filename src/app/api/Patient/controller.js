
import { query } from '../../lib/db';

export async function createPatient(relevantValues, keys, TOSLICE) {
  try {
    const placeholders = Array(TOSLICE).fill('?').join(', ');
    const result = await query({
      query: `INSERT INTO patient (${keys}) VALUES (${placeholders})`,
      values: relevantValues,
    });
    return { id: result.insertId, ...relevantValues };
  } catch (error) {
    console.log('ERROR', error);
    throw new Error('Failed to create patient');
  }
}


D
export async function getPatient(patientId) {
  try {
    const result = await query({
      query: 'SELECT * FROM patients WHERE id = ?',
      values: [patientId]
    });

    if (result.length === 0) {
      return null;
    }
    return result[0];
  } catch (error) {
    throw new Error('Failed to get patient');
  }
}

export async function updatePatient(patientId, patientData) {
  try {

    await query({
      query: 'UPDATE patients SET name = ?, age = ?, email = ? WHERE id = ?',
      values: [patientData.name, patientData.age, patientData.email, patientId]
    });

    return { id: patientId, ...patientData };
  } catch (error) {
    throw new Error('Failed to update patient');
  }
}

export async function deletePatient(patientId) {
  try {
    await query({
      query: 'DELETE FROM patients WHERE id = ?',
      values: [patientId]
    });
  } catch (error) {
    throw new Error('Failed to delete patient');
  }
}
