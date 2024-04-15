import React from "react";

const DataTableHeader = ({ columnNames, currentOrdering }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
      {Array.isArray(columnNames) && columnNames.map((columnName, index) => (
          <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {columnName}
            {columnName === currentOrdering && (
              <button className="ml-2" onClick={() => handleOrderChange(columnName)}>
                {ascendingOrder ? "↑" : "↓"}
              </button>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default DataTableHeader;
