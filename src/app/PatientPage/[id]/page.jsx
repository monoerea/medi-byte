import React from 'react';

import PatientForm from '../../(components)/PatientForm';
import { FormDataProvider } from '../../(components)/ui/FormDataContext';

const PatientPage = () => {
  return (
    <div>
      <FormDataProvider>
        <PatientForm/>
      </FormDataProvider>
    </div>
  );
};

export default PatientPage;
