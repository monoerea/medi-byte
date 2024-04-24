import React, { useState } from 'react';

const RadioButton = ({ options = [], value: initialValue, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(initialValue);

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        onSelect(value);
    };

    return (
        <div className='flex flex-row xs:flex-col justify-evenly p-1 overflow-x-auto'>
            {options.map((option) => (
                <div key={option.value} className='w-full rounded-lg shadow-md overflow-hidden mr-2 mb-2 xs:mb-0'>
                    <input
                        type="radio"
                        required
                        id={option.value}
                        name="dynamicRadio"
                        value={option.value}
                        checked={selectedOption === option.value}
                        onChange={handleOptionChange}
                        className="sr-only" // Hide the default radio button
                    />
                    <label
                        htmlFor={option.value}
                        className={`block p-4 text-center ${selectedOption === option.value ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                    >
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default RadioButton;
