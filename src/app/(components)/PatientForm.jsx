'use client'

import React, { useState } from 'react';

import ProgressTracker from './MultiStepForm/ProgressTracker';
import PatientInfoStep from './MultiStepForm/PatientInfoStep';
import DynamicForm from './MultiStepForm/DynamicForm';

import { useRouter } from 'next/navigation';
import {createObject, isValid} from './utils'
import {useFormData} from './ui/FormDataContext';
import {steps} from './constants';


const PatientForm = () => {

    const router = useRouter();

    const { formData, handleFormDataChange, setFormData } = useFormData();
    const [currentStep, setCurrentStep] = useState(0)
    const [error, setError] = useState('');
    const [add, setAdd] = useState([]);
    
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
    
    const handleAdd = () => {
        formData.InsuranceID.push(Math.floor(Math.random() * 10000));
        setAdd([...add, {}]); 
    };  
    
    const renderMultiForm = () => {
        return add.map((_, index) => {
            console.log('Index in renderMultiForm:', index);
            return (
                <div key={index}>
                    <DynamicForm
                        index={index}
                        fields={steps[1]} 
                        formData={formData} // Pass the entire formData object
                        handleFormDataChange={(id, value) => {

                            const isInsuranceField = Object.keys(formData).indexOf(id) > Object.keys(formData).indexOf('InsuranceID');
                            console.log(`isInsuranceField for index ${index}:`, isInsuranceField, Object.keys(formData).indexOf(id), Object.keys(formData).indexOf('InsuranceID')); 

                            handleFormDataChange(id, value, index);
                        }}
                    />
                    {index < add.length - 1 && (
                        <hr className="my-12 h-px border-t-0 bg-gradient-to-r from-transparent via-blue-700 to-transparent" style={{ backgroundImage: 'linear-gradient(to right, transparent, blue, transparent)', opacity: 0.7 }} />
                    )}
                </div>
            );
        });
    };
    
    
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const valid = isValid(formData);
    
        if (!valid) {
            setError('Not all fields have been filled.');
            console.log('Form validation failed. Please check your input.',formData);
        } else {
            setError('');
            console.log('Form data submitted:', formData);
            
            try {
                await createObject(formData,'Patient');
                await createObject(formData,'Insurance');
                await createObject(formData, 'PatientInsurance');
                router.refresh();
                router.push("/Dashboard/1");
            } catch (error) {
                console.error("Error creating patient:", error);
                setError("Failed to create patient. Please try again.");
                setCurrentStep(0);
            }
        }
    
        onNext(event);
    };
    
    
    return (
        <section className='absolute inset-0 flex flex-col max-w-screen-lg max-h-screen mt-20 bg-white rounded-2xl shadow-md px-24  py-3 mx-auto overflow-auto' >
            <ProgressTracker currentStep={currentStep} />
            <form className="justify-around" onSubmit={handleSubmit} method='post'>
                {currentStep == 0 && 
                <DynamicForm fields={ steps[0]} formData={formData} handleFormDataChange={handleFormDataChange}   />
                } 
                {currentStep === 1 && (
                    <div>
                        <button type="button" onClick={handleAdd} className="rounded bg-gray-300 py-2 px-4 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-500">
                            Add Form
                        </button>
                        {renderMultiForm()}
                       {/*  TODO: ADD DIVIDER*/}
                    </div>
                )}
                
                {currentStep == 2 && 
                <div>
                    <DynamicForm fields={ steps[2]} formData={formData} handleFormDataChange={handleFormDataChange}   />
                    
                </div>
                
                } 
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
