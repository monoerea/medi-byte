export const validateEmail = (email) => {
    return email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
  };
// Validate name function: returns true if the name contains only letters and spaces
export const validateName = (name) => {
  return /^[A-Za-z\s]+$/.test(name);
};

// Validate cell phone function: returns true if the cell phone contains only digits and dashes
export const validateCellPhone = (cellPhone) => {
  return /^\d{3}-\d{3}-\d{4}$/.test(cellPhone);
};

// Validate middle initial function: returns true if the input matches the pattern of a single character followed by a period (.)
export const validateMiddleInitial = (middleInitial) => {
  return /^.{1}\.$/.test(middleInitial);
};
