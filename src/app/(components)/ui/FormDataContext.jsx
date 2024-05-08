// FormDataContext.js
'use client'
// FormDataContext.js

import React, { createContext, useContext, useState } from 'react';
import { initData } from '../constants';

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(initData);

  const updateFormData = (prevFormData, fieldName, fieldValue, index) => {
    // Create a shallow copy of the previous formData object
    const newFormData = { ...prevFormData };
  
    // If the field is "SameAsPatient", update corresponding insurance fields
    if (fieldName === 'SameAsPatient') {

        console.log('SameAsPatient field detected. Value:', fieldValue);
  
        const sameAsPatientValue = fieldValue === 'True';
        console.log('sameAsPatientValue 1', sameAsPatientValue);
        // Iterate through all formData keys
        Object.keys(newFormData).forEach(key => {
          // Check if the key corresponds to a field in the insurance section
          if (key.startsWith('Insurance')) {
              // Extract the corresponding field name in the patient section
              const patientField = key.replace(/^Insurance/, '');
              console.log('PatientFIeld:', patientField);
              // Check if the patient section has a value for the corresponding field
              if (newFormData[patientField]) {
                  // Log the field and its corresponding patientField for debugging
                  console.log(`Insurance field: ${key}, Corresponding patientField: ${patientField}`);
                  // Copy the patient's value to the insurance section if SameAsPatient is true
                  if (sameAsPatientValue) {
                     console.log('sameAsPatientValue:',sameAsPatientValue )
                      // Assign each individual value from the patient section to the corresponding insurance field
                      newFormData[key][index] = newFormData[patientField];
                  } else {
                      // If SameAsPatient is false, set the insurance field value to an empty string
                      newFormData[key][index] = '';
                  }
                  // Log the updated value of the insurance field
                  console.log(`Updated value of ${key}[${index}]:`, newFormData[key][index]);
              }
          }
        });
        if (sameAsPatientValue) {
          newFormData['InsuranceName'][index] = newFormData['PatientName'];
          newFormData['PolicyHolderName'][index] = newFormData['PatientName'];
          console.log('Updated PolicyHolderName:', newFormData['PolicyHolderName'][index]);
            // Copy employer name same as insurance employer
          newFormData['InsuranceEmployer'][index] = newFormData['EmployerName'];
          console.log('Updated InsuranceEmployer:', newFormData['InsuranceEmployer'][index]);
          // Set Patient Relationship to Insured as self
          newFormData['PatientRelationshipToInsured'][index] = 'Self';
          console.log('Updated PatientRelationshipToInsured:', newFormData['PatientRelationshipToInsured'][index]);
        }
        
    }
  
    // If index is provided, update the fieldValue at the specified index
    if (index !== undefined) {
        // Check if the field already exists in formData
        if (newFormData[fieldName]) {
            // Check if the field value is an array
            if (Array.isArray(newFormData[fieldName])) {
                // Make a shallow copy of the existing array
                const newArray = [...newFormData[fieldName]];
                // Update the value at the specified index
                newArray[index] = fieldValue;
                // Update the formData with the new array
                newFormData[fieldName] = newArray;
            } else {
                // If the field is not an array, create a new array and set the value at the specified index
                newFormData[fieldName] = [fieldValue];
            }
        } else {
            // If the field does not exist in formData, create a new array with the value at the specified index
            newFormData[fieldName] = [fieldValue];
        }
    } else {
        // If index is not provided, update the fieldValue directly in formData
        newFormData[fieldName] = fieldValue;
    }
  
    return newFormData;
  };

  const handleFormDataChange = (fieldName, fieldValue, index) => {
  setFormData(prevFormData => {
    // Log the input parameters for debugging
    console.log('fieldName:', fieldName);
    console.log('fieldValue:', fieldValue);
    console.log('index:', index);

    let updatedFieldValue = fieldValue;
    // Check if fieldValue is an event object, and extract the value if so
    if (typeof fieldValue === 'object' && fieldValue.hasOwnProperty('target')) {
      updatedFieldValue = fieldValue.target.value;
    }
    console.log('updatedFIeldValue',updatedFieldValue);
    // Create a newFormData object using the updateFormData function
    const newFormData = updateFormData(prevFormData, fieldName, updatedFieldValue, index);

    // Log the final formData object after updating
    console.log('Updated formData:', newFormData);

    // Return the updated formData object
    return newFormData;
  });

  };
  

  return (
    <FormDataContext.Provider value={{ formData, handleFormDataChange }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};
