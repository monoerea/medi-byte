import React from 'react';
import RadioButton from '../ui/RadioButton';
import AbstractInput from '../ui/AbstractInput';
import Select from '../ui/Select';

const DynamicForm = ({ fields, formData, handleFormDataChange, index }) => {
    console.log('Index:', index);
    
    const groupNumbers = [...new Set(fields.fields.map(field => field.group))];

    const maxNumberOfFieldsInEachGroup = (groupNumber) => {

        const fieldsInGroup = fields.fields.filter(field => field.group === groupNumber);
        
        return fieldsInGroup.length;
    };
    
    const renderFieldsByGroup = (groupNumber) => {

        const fieldsInGroup = fields.fields.filter(field => field.group === groupNumber);
        const numberOfFieldsInGroup = fieldsInGroup.length;

        const maxColumns = 3;
        const columns = Math.min(numberOfFieldsInGroup, maxColumns);
    
        return fieldsInGroup.map((field, idx) => (
            
            <div className={`mb-4 md:w-${columns} md:gap-4`} key={idx}>
                
                <label className="block text-gray-700 font-bold mb-2" htmlFor={field.name}>{field.name}</label>
                {field.type === 'radio' &&
                    <RadioButton
                        id={field.id}
                        options={field.options}
                        value={index !== undefined ? formData[field.id][index] : formData[field.id]}
                        onSelect={(e) => { handleFormDataChange(field.id, e, index) }}
                    />
                }
                {field.type === 'input' &&
                    <AbstractInput
                    type={field.type}
                    id={field.id}
                    value={index !== undefined ? formData[field.id][index] : formData[field.id]
                    }                                
                    placeholder={field.placeholder}
                    validate={field.validate}
                    onChange={handleFormDataChange} 
                    />
                }
                {field.type === 'select' &&
                    <Select
                        id={field.id}
                        value={index !== undefined ? formData[field.id][index] : formData[field.id]}
                        options={field.options}
                        onChange={handleFormDataChange}
                    />
                }
            </div>
        ));
    };
    

    return (
        <div className='grid grid-cols-1'>
            <h2 className="text-xl text-center font-semibold text-black">{fields.name}</h2>
            {groupNumbers.map((groupNumber, idx) => (
                <div key={idx}>
                    <div className={`grid md:grid-cols-${maxNumberOfFieldsInEachGroup(groupNumber)} md:gap-4 mb-4 xs:grid-cols-1`}>
                        {renderFieldsByGroup(groupNumber)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DynamicForm;
