import React, { useState, useEffect } from "react";
import { deleteItem , updateItems } from "../utils";

const DataTable = ({ items, table }) => {
  const [prevItems, setPrevItems] = useState([]);
  const [allItems, setAllItems] = useState(items);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editableRows, setEditableRows] = useState({});
  const [ascendingOrder, setAscendingOrder] = useState(true); // State for sorting order
  const [sortedColumn, setSortedColumn] = useState([]);

  const keys = Object.keys(allItems[0]);

  useEffect(() => {
    // Check if item is an array before setting the items state
    if (Array.isArray(items)) {
        setPrevItems(items);
        setAllItems(items);
    }
  }, [items]);

  useEffect(() => {
      // Update allItems only when items change
      if (items !== prevItems) {
          setAllItems(items);
          setPrevItems(items);
          console.log("Updated allItems:", items);
          console.log("Table:", table);
      }
  }, [items, prevItems, table]);


  const handleToggleAll = (event) => {
    const isChecked = event.target.checked;
    const selected = isChecked ? allItems.map(item => Object.values(item)[0]) : [];
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
    const editedRow = { ...allItems.find(item => Object.values(item)[0] === id) };
    setEditableRows(prevState => ({
      ...prevState,
      [id]: editedRow
    }));
  };

  const handleSave = async (id) => {
    try {
      const editedRow = editableRows[id];
      const originalRow = allItems.find(item => Object.values(item)[0] === id);

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

      // Update the edited row in the allItems array
      const updatedItems = allItems.map(item => {
        if (Object.values(item)[0] === id) {
          return { ...item, ...modifiedColumns };
        } else {
          return item;
        }
      });

      // Update the state with the modified data
      // console.log(updatedItems, updatedItems === allItems);
      setAllItems(updatedItems);

      // Save the modified columns
      await updateItems(id, modifiedColumns, table);

      console.log('Editable rows after save:', editableRows);
      console.log('All items after save', allItems);
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Filter out the deleted patient from allItems and filteredPatients
      const updatedAllItems = allItems.filter(item => Object.values(item)[0] !== id);

      // Update state
      setAllItems(updatedAllItems);

      console.log('All items after delete', allItems);

      // Delete the patient from the server
      await deleteItem(id, table);
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleOrderChange = (columnName) => {
    // Toggle ascending and descending order for the clicked column
    setAscendingOrder(columnName === sortedColumn ? !ascendingOrder : true);
    setSortedColumn(columnName);

    // Implement sorting logic here
    const sortedData = [...allItems].sort((a, b) => {
      const valueA = a[columnName];
      const valueB = b[columnName];

      // Adjust comparison based on ascending or descending order
      if (valueA < valueB) {
        return ascendingOrder ? -1 : 1;
      }
      if (valueA > valueB) {
        return ascendingOrder ? 1 : -1;
      }
      return 0;
    });

    setAllItems(sortedData);
    console.log('All items after arrange', allItems);
  };  
  

  return (
    <div className="max-w-full mx-auto max-h-80 overflow-x-scroll">
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
          {allItems.map((item) => (
            <tr key={Object.values(item)[0]}>
              <td className="px-1 py-1 sm:px-2 sm:py-1 whitespace-nowrap">
                <input type="checkbox" onChange={(event) => handleRowSelect(event, Object.values(item)[0])} checked={selectedRows.includes(Object.values(item)[0])} />
              </td>
              {keys.map((key) => (
                <td key={key} className="px-1 py-1 sm:px-2 sm:py-1 whitespace-nowrap text-xxs sm:text-xs text-gray-700">
                  {editableRows[Object.values(item)[0]] ? (
                    <input type="text" value={editableRows[Object.values(item)[0]][key]} onChange={(e) => {
                      const value = e.target.value;
                      setEditableRows({
                        ...editableRows,
                        [Object.values(item)[0]]: {
                          ...editableRows[Object.values(item)[0]],
                          [key]: value
                        }
                      });
                    }} />
                  ) : (
                    typeof item[key] === 'object' ? JSON.stringify(item[key]) : item[key]
                  )}
                </td>
              ))}
              <td className="px-1 py-1 sm:px-2 sm:py-1 whitespace-nowrap">
                {editableRows[Object.values(item)[0]] ? (
                  <>
                    <button onClick={() => handleSave(Object.values(item)[0])} className="text-blue-500">
                      Save
                    </button>
                    <button onClick={() => setEditableRows({ ...editableRows, [Object.values(item)[0]]: null })} className="text-gray-500">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(Object.values(item)[0])} className='text-blue-500 hover:text-blue-900' >Edit</button>
                )}
                <button onClick={() => handleDelete(Object.values(item)[0])} className="text-red-600 hover:text-red-900">
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
