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
export const createObject = async (formData, table) => {
  try {
      const res = await fetch(`/api/${table}`, {
          method: "POST",
          body: JSON.stringify({ formData }),
          headers: {
              "Content-Type": "application/json"
          }
      });

      if (!res.ok) {
          throw new Error('Failed to create Patient.');
      }
  } catch (error) {
      throw error;
  }
};
export const getItems = async (table) => {
  try {
    const res = await fetch(`http://localhost:3000/api/${table}`,{
      cache: "no-store"
    })
    return res.json()
  } catch (error) {
    console.log(`Failed to get ${table}.`, error);
  }

}
export async function updateItems(id, data, table) {
  console.log('id',id, data, table);
  const reqBody ={
    id:id,
    body:data
  }
  try {
      const response = await fetch(`/api/${table}/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(reqBody)
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

export async function deleteItem(id, table) {
  try {
    const response = await fetch(`/api/${table}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    if (!response.ok) {
      throw new Error('Failed to delete patient');
    }
    
    return response.status;
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw new Error('Failed to delete patient');
  }
}


