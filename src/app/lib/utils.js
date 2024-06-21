// Helper function to calculate age from birth date
export const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    
    return age;
};

export const transformDataForChart = (originalData) => {
    const groupedData = originalData.reduce((acc, curr) => {
      const { InsuranceCompanyName, PatientRelationshipToInsured, Frequency } = curr;
  
      if (!acc[PatientRelationshipToInsured]) {
        acc[PatientRelationshipToInsured] = {};
      }
  
      acc[PatientRelationshipToInsured][InsuranceCompanyName] = Frequency;
  
      return acc;
    }, {});
  
    const relationshipTypes = Object.keys(groupedData);
    const insuranceCompanies = Object.keys(groupedData[relationshipTypes[0]]); // Assuming all categories have the same companies
  
    const datasets = insuranceCompanies.map((companyName, index) => {
      const data = relationshipTypes.map(relationship => groupedData[relationship][companyName]);
  
      return {
        label: companyName, // Use company name as label for each bar
        data: data,
        backgroundColor: getRandomColor(), // Replace with a function to generate or select colors
        borderWidth: 1
      };
    });
  
    return {
      labels: relationshipTypes,
      datasets: datasets
    };
  };

export const prepareGroupedBarChartData = (data) => {
    // Step 1: Group data by InsuranceCompanyName
    const groupedData = data.reduce((acc, item) => {
        const { InsuranceCompanyName, PatientRelationshipToInsured, Frequency } = item;
        
        if (!acc[InsuranceCompanyName]) {
            acc[InsuranceCompanyName] = {};
        }
        
        acc[InsuranceCompanyName][PatientRelationshipToInsured] = Frequency;
        
        return acc;
    }, {});

    // Step 2: Extract unique PatientRelationshipToInsured categories
    const relationshipTypes = Object.keys(data.reduce((acc, item) => {
        acc[item.PatientRelationshipToInsured] = true;
        return acc;
    }, {}));

    // Step 3: Prepare datasets
    const datasets = Object.keys(groupedData).map(companyName => {
        const data = relationshipTypes.map(type => groupedData[companyName][type] || 0);
        return {
            label: companyName, // Use company name as label for each bar
            data: data,
            backgroundColor: getRandomColor(), // Replace with a function to generate or select colors
            borderWidth: 1
        };
    });

    return {
        labels: relationshipTypes,
        datasets: datasets
    };
};

export const transform = (data, chartType) => {
  if (chartType === 'pie' || chartType === 'doughnut') {
      return {
          labels: data.map(item => `${item.label}`),
          datasets: [{
              data: data.map(item => item.value),
              backgroundColor: getRandomColors(data.length),
              hoverBackgroundColor: getRandomColors(data.length)
          }]
      };
  } else if (chartType === 'bar' || chartType === 'line') {
      return {
          labels: data.map(item => `Label: ${item.label}`),
          datasets: [{
              label: 'Value',
              data: data.map(item => item.value),
              backgroundColor: getRandomColors(data.length),
              borderWidth: 1
          }]
      };
  }
  // Add more chart types as needed
  return {};
};

const getRandomColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
      colors.push(getRandomColor());
  }
  return colors;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
