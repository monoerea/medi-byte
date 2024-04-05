'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import RadioButton from './RadioButton';
import AbstractInput from './MultiStepForm/AbstactInput';

import {initData, prefixOptions} from './constants'
import {validateEmail} from './utils'

const PatientForm = () => {

    const [formData, setFormData] = useState(initData);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (value) => {
        setSelectedOption(value);
    };

    const onNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const onPrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleFormDataChange = (newFormData) => {
        setFormData({
            ...formData,
            ...newFormData
        });
    };
    
    return (
        <form className="max-w-screen-lg mx-auto mt-6">
            <h3 className="text-xl text-center font-semibold mb-4 text-black">Patient Information Form</h3>
            {/* Prefix */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="prefix">Prefix</label>
                <RadioButton options={prefixOptions} onSelect={handleOptionSelect} />
            </div>
            {/* Name */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="w-full md:w-1/10">
                        <label
                        htmlFor='firstName'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                        >
                        Fist Name
                        </label>
                        <AbstractInput
                            type='firstName'
                            id='firstName'
                            placeholder='Enter your name'
                            />
                </div>
                <div className="w-full md:w-1/10">
                        <label
                        htmlFor='lastName'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                        >
                        Last Name
                        </label>
                        <AbstractInput
                            type='lastName'
                            id='lastName'
                            placeholder='Enter your name'
                            />
                </div>
                <div className="w-full md:w-1/10">
                        <label
                        htmlFor='midInit'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                        >
                        Middle Initial
                        </label>
                        <AbstractInput
                            type='midInit'
                            id='midInit'
                            placeholder='Enter your name'
                            />
                </div>
            </div>
            {/* Gender & DoB */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="w-full md:w-1/10">
                        <label
                        htmlFor='gender'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                        >
                        Gender
                        </label>
                        <select 
                            id="gender" 
                            className=" w-full py-2.5 px-3 border border-gray-500 text-gray-700 leading-tight block rounded-md focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>   
                            
                        </div>
                <div className="w-full md:w-1/10">
                        <label
                        htmlFor='dateOfBirth'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                        >
                        Date of Birth
                        </label>
                        <AbstractInput
                            type='date'
                            id='dateOfBirth'
                            />
                </div>
            </div>
             {/* Cell & Email */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="w-full md:w-1/10">
                        <label
                        htmlFor='cellPhone'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                        >
                        Cellphone
                        </label>
                        <AbstractInput
                            type='tel'
                            id='cellPhone'
                            placeholder='123-456-789'
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                            />
                </div>
                <div className="w-full md:w-1/10">
                    <div className='sm:col-span-4'>
                    <label
                    htmlFor='email'
                    className='block font-bold mb-2 leading-6 text-gray-500'
                    >
                    Email address
                    </label>
                    <AbstractInput
                        type='email'
                        id='email'
                        placeholder='Enter your email'
                        validate={validateEmail}
                        />
                    
                </div>
                </div>
            </div>
            {/* PrevName */}
            <div className="mb-4">
                <div className="w-full">
                    <div className='sm:col-span-4'>
                    <label
                    htmlFor='prevNames'
                    className='block font-bold mb-2 leading-6 text-gray-500'
                    >
                    Previous Name(s)
                    </label>
                    <AbstractInput
                        type='prevNames'
                        id='prevNames'
                        placeholder='Enter your name'
                        />
                    </div>
                </div>
            </div>
            {/* Navigation buttons */}
            <div className="flex justify-between">
                <button type="button" onClick={onPrevious} className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Previous</button>
                <button type="button" onClick={onNext} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Next</button>
            </div>
        </form>

    );
};

export default PatientForm;
