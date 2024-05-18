// Compute the distribution of ages
export const computeDistAge = async (data) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const ageCounts = {};

    data.patients.forEach(patient => {
        const birthYear = new Date(patient.DateOfBirth).getFullYear();
        const age = currentYear - birthYear;

        if (ageCounts[age]) {
            ageCounts[age]++;
        } else {
            ageCounts[age] = 1;
        }
    });

    return ageCounts;
};


// Compute the distribution of genders
export const computeDistGender = async (data) => {
    const genderCounts = {
        'Male': 0,
        'Female': 0,
        'Transgender': 0,
    };

    data.patients.forEach(patient => {
        if (genderCounts[patient.Gender] !== undefined) {
            genderCounts[patient.Gender]++;
        }
    });
    return genderCounts;
}
// Compute the distribution of marital statuses
export const computeDistMarital = async (data) => {
    const maritalCounts = {
      'Single': 0,
      'Married': 0,
      'Partner': 0,
      'Divorced': 0,
      'Widowed': 0,
      'Legally Separated': 0,
    };
  
    data.patients.forEach(patient => {
      if (maritalCounts[patient.MaritalStatus] !== undefined) {
        maritalCounts[patient.MaritalStatus]++;
      }
    });
  
    return maritalCounts;
  };