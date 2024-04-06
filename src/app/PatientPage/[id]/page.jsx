import PatientForm from '../../(components)/PatientForm'
import React from 'react'
import { FormDataProvider } from '../../(components)/FormDataContext';

const PatientPage = ({params}) => {
  return (
    <div>
      <div>
        PatientPage {params.id}
      </div>
      <FormDataProvider> {/* Wrap your components with FormDataProvider */}
        <PatientForm /> {/* Render your PatientForm component */}
      </FormDataProvider>

      
    </div>
  )
}

export default PatientPage