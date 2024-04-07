'use client'

import React, { useState } from 'react';

import ProgressTracker from './MultiStepForm/ProgressTracker';
import PatientInfoStep from './MultiStepForm/PatientInfoStep';
import AddressStep from './MultiStepForm/AddressStep';

import {useFormData} from './FormDataContext';
import {steps} from './constants'

const PatientForm = () => {
    const { formData, handleFormDataChange } = useFormData();
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const delta = currentStep - previousStep

    const onNext = (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log(formData);
        setCurrentStep(currentStep + 1);
    };

    const onPrevious = () => {
        setCurrentStep(currentStep - 1);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(e)
        console.log('Form data submitted:', formData);
        
    };
    return (
        <section className='absolute inset-0 flex flex-col max-w-screen-lg max-h-screen mt-20 bg-white rounded-2xl shadow-md px-24  py-3 mx-auto overflow-auto' >
            <ProgressTracker currentStep={currentStep} />
            <form className="justify-around" onSubmit={handleSubmit}>
                {currentStep == 0 && 
                <PatientInfoStep formData={formData} handleFormDataChange={handleFormDataChange}   />
                } 
                {currentStep == 1 && 
                <AddressStep formData={formData} handleFormDataChange={handleFormDataChange}   />
                } 

                {/* Navigation buttons */}
                <div className="flex justify-between">
                    <button type="button" disabled={currentStep === 0} onClick={onPrevious} className="bg-white text-sky-900 py-2 px-4 rounded focus:outline-none focus:bg-gray-400
                    text-sm font-semibold shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                    ">Previous</button>
                    <button type="submit" disabled={currentStep === steps.length - 1} className='rounded bg-gray-300 py-2 px-4  text-sm font-semibold  text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50'
                    >Next</button>
                </div>
            </form>
        </section>

    );
}

export default PatientForm;
