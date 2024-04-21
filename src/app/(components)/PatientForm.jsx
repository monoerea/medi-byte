'use client'

import React, { useState } from 'react';

import ProgressTracker from './MultiStepForm/ProgressTracker';
import PatientInfoStep from './MultiStepForm/PatientInfoStep';
import DynamicForm from './MultiStepForm/DynamicForm';

import {useFormData} from './ui/FormDataContext';
import {steps} from './constants';


const PatientForm = (router) => {
    
    const { formData, handleFormDataChange } = useFormData();
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [error, setError] = useState('');
    
    const delta = currentStep - previousStep
    
    const onNext = (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log(formData);
        setCurrentStep(currentStep + 1);
    };

    const connect = (e) =>{
        const res = fetch('/api/Patient',{
            method: POST,
            body: JSON.stringify({formData}),
            "content-type": "application/json"
        })

        if (!res.ok){
            throw new Error('Failed to create Patient.')
        }
        router.refresh()
        router.push("/")
    }

    const onPrevious = () => {
        setCurrentStep(currentStep - 1);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Perform validation
        const isValid = Object.values(formData).every(value => value !== '');
    
        if (!isValid) {
            setError('Not all fields have been filled.');
            console.log('Form validation failed. Please check your input.',formData);
        } else {
            setError('');
            console.log('Form data submitted:', formData);
            
            try {
                await createPatient(formData);
                router.refresh();
                router.push("/");
            } catch (error) {
                console.error("Error creating patient:", error);
                setError("Failed to create patient. Please try again.");
            }
        }
    
        onNext(event);
    };
    
    const createPatient = async (formData) => {
        try {
            const res = await fetch('/api/Patient', {
                method: "POST",
                body: JSON.stringify({ formData }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (!res.ok) {
                throw new Error('Failed to create Patient.');
            }
        } catch (error) {
            throw error;
        }
    };
    
    return (
        <section className='absolute inset-0 flex flex-col max-w-screen-lg max-h-screen mt-20 bg-white rounded-2xl shadow-md px-24  py-3 mx-auto overflow-auto' >
            <ProgressTracker currentStep={currentStep} />
            <form className="justify-around" onSubmit={handleSubmit} method='post'>
                {currentStep == 1 && 
                <PatientInfoStep formData={formData} handleFormDataChange={handleFormDataChange}   />
                } 
                {currentStep == 0 && 
                <DynamicForm fields={ steps[0]} formData={formData} handleFormDataChange={handleFormDataChange}   />
                } 
                {/* {currentStep == 1 && 
                <AddressStep fields={ steps[1]} formData={formData} handleFormDataChange={handleFormDataChange}   />
                } 
                {currentStep == 2 && 
                <AddressStep fields={ steps[2]} formData={formData} handleFormDataChange={handleFormDataChange}   />
                }  */}
                {error && (
                <p className='mt-2 text-sm text-red-400 text-center'>{error}</p>
                )}

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
