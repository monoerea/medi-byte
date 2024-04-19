'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import PatientForm from '../../(components)/PatientForm';
import { FormDataProvider } from '../../(components)/ui/FormDataContext';

const PatientPage = ({ params }) => {
  const router = useRouter();

  return (
    <div>
      <div>
        PatientPage {params.id}
      </div>
      <FormDataProvider>
        <PatientForm router={router} />
      </FormDataProvider>
    </div>
  );
};

export default PatientPage;
