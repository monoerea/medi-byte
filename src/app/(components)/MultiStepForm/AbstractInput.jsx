import React, { useState } from 'react';

const AbstractInput = ({ type, id, value, placeholder, validate, onChange }) => {
  const [val, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setValue(val);
    onChange(event.target.id, event.target.value);

    // Validate the input value if the validate function is provided
    if (validate && !validate(val)) {
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
            required
            value = {value}
            autoComplete={id}
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
