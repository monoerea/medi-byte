export const validateEmail = (email) => {
    return email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
  };
// Validate name function: returns true if the name contains only letters and spaces
export const validateName = (name) => {
  return /^[A-Za-z\s]+$/.test(name);
};

// Validate cell phone function: returns true if the cell phone contains only digits and dashes
export const validateCellPhone = (cellPhone) => {
  return /^\d{11}$/.test(cellPhone);
};

// Validate middle initial function: returns true if the input matches the pattern of a single character followed by a period (.)
export const validateMiddleInitial = (middleInitial) => {
  return /^.{1}\.$/.test(middleInitial);
};

export const getPatients = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/Patient',{
      cache: "no-store"
    })
    return res.json()
  } catch (error) {
    console.log('Failed to get Patients.', error);
  }

}
export async function updatePatient(id, data) {
  try {
      const response = await fetch(`/api/Patient/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error('Failed to update patient');
      }

      return response.status;
  } catch (error) {
      console.error('Error updating patient:', error);
      throw new Error('Failed to update patient');
  }
}

