import React, { useState } from 'react';

const AbstractInput = ({ type, id, placeholder, validate }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);

    // Validate the input value if the validate function is provided
    if (validate && !validate(value)) {
      setError('Invalid input');
    } else {
      setError('');
    }
  };

  return (
    <div className='mt-2'>
        <input
            type={type}
            id={id}
            autoComplete={id}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className=' w-full py-1.5 px-3 border border-gray-500 text-gray-700 leading-tight block rounded-md focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
        />
        {error && (
            <p className='mt-2 text-sm text-red-400'>{error}</p>
        )}
    </div>

  );
};

export default AbstractInput;
