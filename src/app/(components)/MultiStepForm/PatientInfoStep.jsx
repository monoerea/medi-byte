'use client'
import React from 'react';
import RadioButton from '../ui/RadioButton';
import AbstractInput from '../ui/AbstractInput';
import { prefixOptions } from '../constants';
import { validateCellPhone, validateEmail, validateMiddleInitial, validateName } from '../utils';

const PatientInfoStep = ({formData, handleFormDataChange}) => {
    return (
        <div className='grid sm:grid-cols-1'>
            <h2 className="text-xl text-center font-semibold text-black">Patient Information Form</h2>
            {/* Prefix */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="prefix">Prefix</label>
                <RadioButton 
                id = 'prefix'
                options={prefixOptions} 
                value ={formData.prefix}
                onSelect={(e)=> {handleFormDataChange('prefix',e)}} />
            </div>

            {/* Name */}
            <div className="grid mb-4 xs:grid-cols-1">
                <div className="w-full">
                    <label
                        htmlFor='firstName'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                    >
                        First Name
                    </label>
                    <AbstractInput
                        type='text'
                        id='PatientName'
                        validate={validateName}
                        value ={formData.PatientName}
                        placeholder='Enter your name'
                        onChange={handleFormDataChange}
                        //
                    />
                </div>
            </div>
            {/* Gender & DoB */}
            <div className="grid md:grid-cols-2 md:gap-4 mb-4 xs:grid-cols-1">
                <div className="w-full md:w-1/10">
                    <label
                        htmlFor='gender'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                    >
                        Gender
                    </label>
                    <select
                        id="gender"
                        required
                        value ={formData.gender}
                        className=" w-full py-2.5 px-3 border border-gray-500 text-gray-700 leading-tight block rounded-md focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        onChange={(e)=>handleFormDataChange('gender',e.target.value)}
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
                        value ={formData.dateOfBirth}
                        onChange={handleFormDataChange}
                    />
                </div>
            </div>
            {/* Cell & Email & SSN*/}
            <div className="grid md:grid-cols-3 md:gap-4 mb-4 xs:grid-cols-1">
                <div className="w-full md:w-1/10">
                    <label
                        htmlFor='SSN'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                    >
                        SSN
                    </label>
                    <AbstractInput
                        type='number'
                        id='SSN'
                        value ={formData.SSN}
                        placeholder='123-456-789'
                        // validate={validateSSN}
                        onChange={handleFormDataChange}
                    />
                </div>
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
                        value ={formData.cellPhone}
                        placeholder='123-456-789'
                        validate={validateCellPhone}
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                        onChange={handleFormDataChange}
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
                            value ={formData.email}
                            placeholder='Enter your email'
                            validate={validateEmail}
                            onChange={handleFormDataChange}
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
                            value ={formData.prevNames}
                            placeholder='Enter your name'
                            onChange={handleFormDataChange}
                        />
                    </div>
                </div>
            </div>
            {/* Marital Status & ResidenceType & SSN */}
            <div className="grid md:grid-cols-2 md:gap-4 mb-4 xs:grid-cols-1">
                <div className="w-full md:w-1/10">
                    <label
                        htmlFor='MaritalStatus'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                    >
                        Marital Status
                    </label>
                    <select
                        id="MaritalStatus"
                        required
                        value ={formData.MaritalStatus}
                        className=" w-full py-2.5 px-3 border border-gray-500 text-gray-700 leading-tight block rounded-md focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        onChange={(e)=>handleFormDataChange('gender',e.target.value)}
                    >
                        {/* Single, Married, Partner, Divorced, Widowed, Legally Separated */}
                        <option value="">Select Status</option>
                        <option value="male">Single</option>
                        <option value="female">Married</option>
                        <option value="other">Partner</option>
                        <option value="other">Divorced</option>
                        <option value="other">Widowed</option>
                        <option value="other">Legally Separated</option>
                    </select>
                </div>
                <div className="w-full md:w-1/10">
                    <label
                        htmlFor='ResidenceType'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                    >
                        Residence Type
                    </label>
                    <select
                        id="ResidenceType"
                        required
                        value ={formData.ResidenceType}
                        className=" w-full py-2.5 px-3 border border-gray-500 text-gray-700 leading-tight block rounded-md focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        onChange={(e)=>handleFormDataChange('ResidenceType',e.target.value)}
                    >
                        {/* Skilled Nursing Home, Nursing Home, Residential Home (Assisted Living), Private Home */}
                        <option value="">Select Type</option>
                        <option value="male">Skilled Nursing Home</option>
                        <option value="female">Nursing Home</option>
                        <option value="other">Residential Home</option>
                        <option value="other">Private Home</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PatientInfoStep;
