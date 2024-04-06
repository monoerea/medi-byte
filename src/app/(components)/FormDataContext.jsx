// FormDataContext.js
'use client'
import React, { createContext, useContext, useState } from 'react';
import { initData } from './constants';

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(initData);

  const handleFormDataChange = (fieldName, fieldValue) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [fieldName]: fieldValue
    }));
    console.log(formData);
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
