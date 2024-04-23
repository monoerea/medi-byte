import React from 'react';
import RadioButton from '../ui/RadioButton';
import AbstractInput from '../ui/AbstractInput';

const DynamicForm = ({ fields, formData, handleFormDataChange }) => {
    
    // Get unique group numbers
    const groupNumbers = [...new Set(fields.fields.map(field => field.group))];

    // Function to calculate the maximum number of fields in each group
    const maxNumberOfFieldsInEachGroup = (groupNumber) => {
        // Filter fields based on the group number
        const fieldsInGroup = fields.fields.filter(field => field.group === groupNumber);
        // Return the length of the filtered array, which represents the number of fields in the group
        return fieldsInGroup.length;
    };
    

    // Function to render fields by group number
    const renderFieldsByGroup = (groupNumber) => {
        // Filter fields based on the group number
        const fieldsInGroup = fields.fields.filter(field => field.group === groupNumber);
        const numberOfFieldsInGroup = fieldsInGroup.length;
        
        // Set a maximum number of columns
        const maxColumns = 3; // Adjust this value based on your layout requirements
        
        // Determine the number of columns based on the number of fields in the group
        const columns = Math.min(numberOfFieldsInGroup, maxColumns);
    
        // Render each field in the group
        return fieldsInGroup.map((field, index) => (
            
            <div className={`mb-4 md:w-${columns} md:gap-4`} key={index}>
                
                <label className="block text-gray-700 font-bold mb-2" htmlFor={field.name}>{field.name}</label>
                {field.type === 'radio' ? (
                    <RadioButton
                        id={field.name}
                        options={field.options}
                        value={formData[field.name]}
                        onSelect={(e) => { handleFormDataChange(field.name, e) }}
                    />
                ) : (
                    <AbstractInput
                        type={field.type}
                        id={field.name}
                        value={formData[field.name]}
                        placeholder={field.placeholder}
                        validate={field.validate}
                        onChange={handleFormDataChange}
                    />
                )}
            </div>
        ));
    };
    

    return (
        <div className='grid grid-cols-1'>
            <h2 className="text-xl text-center font-semibold text-black">{fields.name}</h2>
            {/* Render fields for each group */}
            {groupNumbers.map((groupNumber, index) => (
                <div key={index}>
                    <div className={`grid md:grid-cols-${maxNumberOfFieldsInEachGroup(groupNumber)} md:gap-4 mb-4 xs:grid-cols-1`}>
                        {renderFieldsByGroup(groupNumber)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DynamicForm;

