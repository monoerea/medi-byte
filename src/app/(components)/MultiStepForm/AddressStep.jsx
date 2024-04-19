import React from 'react';
import AbstractInput from '../ui/AbstractInput';

const AddressStep = ({formData, handleFormDataChange}) => {
    return (
        <div className='grid sm:grid-cols-1'>
            <h2 className="text-xl text-center font-semibold text-black">Address Information</h2>

            {/* Street */}
            <div className="grid xs:grid-cols-1">
                <div className="w-full">
                    <label
                        htmlFor='firstName'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                    >
                        Street
                    </label>
                    <AbstractInput
                        type='street'
                        id='street'
                        value ={formData.mailAddress.street}
                        placeholder='Enter your street'
                        onChange={handleFormDataChange}
                        //
                    />
                </div>
            </div>
            {/* City */}
            <div className="grid md:grid-cols-2 md:gap-4 mb-4 xs:grid-cols-1">
                <div className="w-full md:w-1/10">
                    <label
                        htmlFor='city'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                    >
                        City
                    </label>
                    <AbstractInput
                        type='text'
                        id='city'
                        value ={formData.mailAddress.city}
                        placeholder='Enter your city'
                        onChange={handleFormDataChange}
                        //
                    />
                </div>
                <div className="w-full md:w-1/10">
                    <label
                        htmlFor='state'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                    >
                        State
                    </label>
                    <AbstractInput
                        type='text'
                        id='state'
                        value ={formData.mailAddress.state}
                        onChange={handleFormDataChange}
                    />
                </div>
            </div>
           {/* Country & Zip */}
            <div className="grid md:grid-cols-2 md:gap-4 mb-4 xs:grid-cols-1">
                <div className="w-full md:w-1/10">
                    <label
                        htmlFor='country'
                        className='block font-bold mb-2 leading-6 text-gray-500'
                    >
                        Country
                    </label>
                    <AbstractInput
                        type='text'
                        id='country'
                        value ={formData.mailAddress.country}
                        placeholder='Enter your country'
                        onChange={handleFormDataChange}
                    />
                </div>
                <div className="w-full md:w-1/10">
                    <div className='sm:col-span-4'>
                        <label
                            htmlFor='zip'
                            className='block font-bold mb-2 leading-6 text-gray-500'
                        >
                            Zip
                        </label>
                        <AbstractInput
                            type='zip'
                            id='zip'
                            value ={formData.mailAddress.zip}
                            placeholder='Enter your zip'
                            onChange={handleFormDataChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddressStep