import React from 'react';

const Select = ({ id, value, options = [], onChange }) => {
    console.log(options);
    return (
        <select
            id={id}
            required
            value={value}
            className="w-full py-2.5 px-3 border border-gray-500 text-gray-700 leading-tight block rounded-md focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            onChange={onChange}
        >
            {options.map((option, index) => (
                <option key={index} value={option.option}>
                    {option.option}
                </option>
            ))}
        </select>
    );
};

export default Select;
