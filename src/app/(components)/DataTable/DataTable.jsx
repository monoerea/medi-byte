import React, { useState } from "react";
import DataTableHeader from './DataTableHeader';
import { updatePatient } from "../../utils";

const DataTable = ({ patients, onDelete }) => {
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editableRows, setEditableRows] = useState({});

  if (!Array.isArray(patients) || patients.length === 0) {
    return <div>No patients available</div>;
  }

  const keys = Object.keys(patients[0]);

  const handleFilter = (filters) => {
    const filteredData = patients.filter((patient) => {
      return Object.keys(filters).every((key) => patient[key] === filters[key]);
    });
    setFilteredPatients(filteredData);
  };

  const handleToggleAll = (event) => {
    const isChecked = event.target.checked;
    const selected = isChecked ? filteredPatients.map(patient => patient._id) : [];
    setSelectedRows(selected);
  };

  const handleRowSelect = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleEdit = (id) => {
    const editedRow = { ...patients.find(patient => patient._id === id) };
    setEditableRows(prevState => ({
      ...prevState,
      [id]: editedRow
    }));
  };
  
  const handleSave = async (id) => {
    try {
      const editedRow = editableRows[id];
      // Here you can implement the logic to save the edited data
      // For demonstration purposes, we'll just remove the row from editableRows
      const { [id]: _, ...remainingEditableRows } = editableRows;
      console.log(id, editedRow);
      setEditableRows(remainingEditableRows);
      await updatePatient(id, editedRow);
  
      // Update patients array with the edited data directly (without using setPatients)
      patients.forEach((patient, index) => {
        if (patient._id === id) {
          patients[index] = { ...patient, ...editedRow };
        }
      });
      // Update filteredPatients array with the edited data
    const updatedFilteredPatients = filteredPatients.map(patient => {
      if (patient._id === id) {
        return { ...patient, ...editedRow };
      } else {
        return patient;
      }
    });
    setFilteredPatients(updatedFilteredPatients);
    
      console.log('Editable rows after save:', editableRows); // Add this line
    } catch (error) {
      console.error('Error saving patient:', error);
      // Handle error
    }
  };
  
  
  
  return (
    <div className="max-w-full mx-auto max-h-screen overflow-x-scroll">
      
      <table className="w-full divide-y divide-gray-200">
      <DataTableHeader keys={keys} onFilter={handleFilter} />
        <thead className="bg-gray-50">
          <tr>
            <th className="px-1 py-1 sm:px-2 sm:py-1 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
              <input type="checkbox" onChange={handleToggleAll} />
            </th>
            {keys.map((key) => (
              <th key={key} className="px-1 py-1 sm:px-2 sm:py-1 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                {key}
              </th>
            ))}
            <th className="px-1 py-1 sm:px-2 sm:py-1 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPatients.map((patient) => (
            <tr key={patient._id}>
              <td className="px-1 py-1 sm:px-2 sm:py-1 whitespace-nowrap">
                <input type="checkbox" onChange={(event) => handleRowSelect(event, patient._id)} checked={selectedRows.includes(patient._id)} />
              </td>
              {keys.map((key) => (
                <td key={key} className="px-1 py-1 sm:px-2 sm:py-1 whitespace-nowrap text-xxs sm:text-xs text-gray-700">
                  {editableRows[patient._id] ? (
                    <input type="text" value={editableRows[patient._id][key]} onChange={(e) => {
                      const value = e.target.value;
                      setEditableRows({
                        ...editableRows,
                        [patient._id]: {
                          ...editableRows[patient._id],
                          [key]: value
                        }
                      });
                    }} />
                  ) : (
                    typeof patient[key] === 'object' ? JSON.stringify(patient[key]) : patient[key]
                  )}
                </td>
              ))}
              <td className="px-1 py-1 sm:px-2 sm:py-1 whitespace-nowrap">
                {editableRows[patient._id] ? (
                  <>
                    <button onClick={() => handleSave(patient._id)} className="text-blue-500">
                      Save
                    </button>
                    <button onClick={() => setEditableRows({ ...editableRows, [patient._id]: null })} className="text-gray-500">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(patient._id)} className='text-blue-500 hover:text-blue-900' >Edit</button>
                )}
                <button onClick={() => onDelete(patient._id)} className="text-red-600 hover:text-red-900">
                  Delete
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
