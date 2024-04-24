import React, { useState } from "react";
import { deletePatient , updatePatient } from "../utils";

const DataTable = ({ patients }) => {
  const [allPatients, setAllPatients] = useState(patients);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editableRows, setEditableRows] = useState({});
  const [ascendingOrder, setAscendingOrder] = useState(true); // State for sorting order
  const [sortedColumn, setSortedColumn] = useState([]);

  if (allPatients !== patients) {
    setAllPatients(patients);
  }

  const keys = Object.keys(patients[0]);

  const handleToggleAll = (event) => {
    const isChecked = event.target.checked;
    const selected = isChecked ? allPatients.map(patient => patient.PatientID) : [];
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
  
      // Remove the edited row from editableRows
      const { [id]: _, ...remainingEditableRows } = editableRows;
      setEditableRows(remainingEditableRows);
      
      // Update the edited row in the filteredPatients array
      const updatedPatients = allPatients.map(patient => {
        if (patient.PatientID === id) {
          return { ...patient, ...modifiedColumns };
        } else {
          return patient;
        }
      });

      // Update the state with the modified data
      setAllPatients(updatedPatients);
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
      
      // Update state
      setAllPatients(updatedAllPatients);
       
       // Delete the patient from the server
      await deletePatient(id);
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleOrderChange = (columnName) => {
    // Implement order change logic here
    // Toggle ascending and descending order for the clicked column
    const sortedData = [...allPatients].sort((a, b) => {
      if (a[columnName] < b[columnName]) {
        return ascendingOrder ? -1 : 1;
      }
      if (a[columnName] > b[columnName]) {
        return ascendingOrder ? 1 : -1;
      }
      return 0;
    });
  
    setAllPatients(sortedData);
    setAscendingOrder(!ascendingOrder); // Toggle ascending/descending order
  
    // Update the state to store the column name for which the order is changed
    setSortedColumn(columnName);
  };
  
  

  return (
    <div className="max-w-full mx-auto max-h-screen overflow-x-scroll">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-1 py-1 sm:px-2 sm:py-1 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
              <input type="checkbox" onChange={handleToggleAll} />
            </th>
            {keys.map((key) => (
              <th key={key} className="px-1 py-1 sm:px-2 sm:py-1 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <span>{key}</span>
                {sortedColumn === key ? (
                  <button className="ml-2" onClick={() => handleOrderChange(key)}>
                    {ascendingOrder ? "↑" : "↓"}
                  </button>
                    ) : <button className="ml-2" onClick={() => handleOrderChange(key)}>
                    { "↑" }
                  </button>}
              </div>
            </th>            
            ))}
            <th className="px-1 py-1 sm:px-2 sm:py-1 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {allPatients.map((patient) => (
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
