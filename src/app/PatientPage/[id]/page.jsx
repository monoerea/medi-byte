import PatientForm from '../../(components)/PatientForm'
import React from 'react'

const PatientPage = ({params}) => {
  return (
    <div>
      <div>
        PatientPage {params.id}
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 max-w-3xl mx-auto max-h-full overflow-auto">
        <PatientForm/>
      </div>
      
    </div>
  )
}

export default PatientPage