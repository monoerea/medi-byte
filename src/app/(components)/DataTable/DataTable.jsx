import React, { useState } from "react";
import DataTableHeader from './DataTableHeader';
import { deletePatient , updatePatient } from "../utils";

const DataTable = ({ patients }) => {
  const [allPatients, setAllPatients] = useState(patients);
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editableRows, setEditableRows] = useState({});

  const keys = Object.keys(patients[0]);

  const handleFilter = (filters) => {
    const filteredData = allPatients.filter((patient) => {
      return Object.keys(filters).every((key) => patient[key] === filters[key]);
    });
    setFilteredPatients(filteredData);
  };

  const handleToggleAll = (event) => {
    const isChecked = event.target.checked;
    const selected = isChecked ? filteredPatients.map(patient => patient.PatientID) : [];
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
    const editedRow = { ...allPatients.find(patient => patient.PatientID === id) };
    setEditableRows(prevState => ({
      ...prevState,
      [id]: editedRow
    }));
  };
  
  const handleSave = async (id) => {
    try {
      const editedRow = editableRows[id];
      const originalRow = allPatients.find(patient => patient.PatientID === id);
  
      // Determine modified columns
      const modifiedColumns = {};
      Object.keys(editedRow).forEach(key => {
        if (editedRow[key] !== originalRow[key]) {
          modifiedColumns[key] = editedRow[key];
        }
      });
  
      // Update the edited row in the filteredPatients array
      const updatedFilteredPatients = filteredPatients.map(patient => {
        if (patient.PatientID === id) {
          return { ...patient, ...modifiedColumns };
        } else {
          return patient;
        }
      });
  
      // Update the state with the modified data
      setFilteredPatients(updatedFilteredPatients);
  
      // Remove the edited row from editableRows
      const { [id]: _, ...remainingEditableRows } = editableRows;
      setEditableRows(remainingEditableRows);
  
      // Save the modified columns
      await updatePatient(id, modifiedColumns);
  
      console.log('Editable rows after save:', editableRows);
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  const handleDelete = async (id) => {
    try {

      // Filter out the deleted patient from allPatients and filteredPatients
      const updatedAllPatients = allPatients.filter(patient => patient.PatientID !== id);
      const updatedFilteredPatients = filteredPatients.filter(patient => patient.PatientID !== id);
      
      // Update state
      setAllPatients(updatedAllPatients);
      setFilteredPatients(updatedFilteredPatients);
           
  
       // Delete the patient from the server
      await deletePatient(id);
    } catch (error) {
      console.error('Error deleting patient:', error);
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
            <tr key={patient.PatientID}>
              <td className="px-1 py-1 sm:px-2 sm:py-1 whitespace-nowrap">
                <input type="checkbox" onChange={(event) => handleRowSelect(event, patient.PatientID)} checked={selectedRows.includes(patient.PatientID)} />
              </td>
              {keys.map((key) => (
                <td key={key} className="px-1 py-1 sm:px-2 sm:py-1 whitespace-nowrap text-xxs sm:text-xs text-gray-700">
                  {editableRows[patient.PatientID] ? (
                    <input type="text" value={editableRows[patient.PatientID][key]} onChange={(e) => {
                      const value = e.target.value;
                      setEditableRows({
                        ...editableRows,
                        [patient.PatientID]: {
                          ...editableRows[patient.PatientID],
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
                {editableRows[patient.PatientID] ? (
                  <>
                    <button onClick={() => handleSave(patient.PatientID)} className="text-blue-500">
                      Save
                    </button>
                    <button onClick={() => setEditableRows({ ...editableRows, [patient.PatientID]: null })} className="text-gray-500">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(patient.PatientID)} className='text-blue-500 hover:text-blue-900' >Edit</button>
                )}
                <button onClick={() => handleDelete(patient.PatientID)} className="text-red-600 hover:text-red-900">
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
