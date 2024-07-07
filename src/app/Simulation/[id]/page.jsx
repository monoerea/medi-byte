'use client';
// Import necessary modules and components
import React, { useState } from "react";
import DataTable from "../../(components)/DataTable/DataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faObjectGroup, faPeopleGroup, faGenderless, faMoneyCheck, faBalanceScale, faAd, fa1, fa2,fa3,fa4,fa5,fa6, fa7, fa8, fa9, fa0 } from "@fortawesome/free-solid-svg-icons";

function Simulation() {
  // State to hold the fetched data and search query
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const buttonGroup = [
    {icon: fa1, value: `SELECT PatientID, PatientName,        
                                  MaritalStatus
                                  FROM Patient 
                                  WHERE MaritalStatus IN ('Single', 'Married', 'Divorced''Widowed', 'Legally Separated');
                                  `},
    {icon: fa2, value: `SELECT PatientID, PatientName
                                  FROM patient
                                  WHERE EmploymentStatus = 'Part-time' AND StudentStatus = 'Full-time';
                                  `},
    {icon: fa3, value: ` SELECT PatientID, PatientName, Gender,   
                                  StudentStatus
                                  FROM Patient
                                  WHERE Gender = 'Male' AND StudentStatus =  'Full-time';`
                                },
    {icon: fa4, value: ` SELECT PatientID, PrimaryCarePhysician, 
                                  PatientName
                                  FROM Patient
                                  GROUP BY PrimaryCarePhysician, PatientID, PatientName
                                  ORDER BY PrimaryCarePhysician, PatientName;
                                  `},
    {icon: fa5,value: `SELECT PatientID, StudentStatus, PatientName
                                  FROM Patient
                                  GROUP BY StudentStatus, PatientID, PatientName
                                  ORDER BY StudentStatus, PatientName;
                                  `},
    {icon: fa6, value: `SELECT PatientID, PatientName, Gender,  
                                  EmploymentStatus
                                  FROM Patient
                                  GROUP BY PatientID, PatientName, Gender, EmploymentStatus
                                  ORDER BY PatientName, Gender, EmploymentStatus;
                                  `},
    {icon: fa7, value: ` SELECT PatientID, PatientName, ResidenceType, 
                                  PreferredContact
                                  FROM patient
                                  WHERE PreferredContact = 'Cell'
                                  GROUP BY PatientID, PatientName, ResidenceType, PreferredContact
                                  ORDER BY ResidenceType, PatientName;
                                `},
    {icon: fa8, value:` SELECT p.*, InsuranceName
                                  FROM patient p
                                  JOIN patientinsurance pi on p.PatientID = pi.PatientID
                                  JOIN insurance i  on pi.InsuranceID = i.InsuranceID
                                  WHERE PatientName = PolicyHolderName;`
                                },
    {icon: fa9, value: ` SELECT pd.PatientID, pd.PatientName, 
                                  id.InsuranceCompanyName, id.PolicyHolderName, id.DateOfBirth
                                  FROM patient pd
                                  JOIN PatientInsurance pid ON pd.PatientID = pid.PatientID
                                  JOIN Insurance id ON pid.InsuranceID = id.InsuranceID
                                  WHERE id.DateOfBirth < '2003-01-01';`},
    {icon: fa0 ,value: `SELECT pd.PatientID, pd.PatientName, COUNT
                                  (pid.InsuranceID) AS NumberOfInsurances
                                  FROM Patient pd
                                  JOIN PatientInsurance pid ON pd.PatientID = pid.PatientID
                                  GROUP BY pd.PatientID, pd.PatientName
                                  HAVING COUNT(pid.InsuranceID) > 1;`},
  ]

  const handleChange = (event) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
  };

  const handleButtonClick = (e) =>{
    setSearchQuery(e)
    getQuery(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getQuery(searchQuery);
  };

  // Function to fetch data based on the search query
  const getQuery = async (searchQuery) => {
    console.log('Query',searchQuery);
    try {
      const res = await fetch("/api/DataAnalysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('DATA', data);
        setItems(data); // Update state with fetched data
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-row absolute inset-0 max-w-screen-lg max-h-screen mt-20 rounded-2xl shadow-md px-24  py-3 mx-auto overflow-auto">
      {/* Button Group */}
      <div className="flex flex-col p-4 bg-slate-700 rounded-l-3xl shadow-md justify-evenly">
          {buttonGroup.map((item, key) => (
            <button
              key={key}
              type="button"
              className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${searchQuery === item.value ? 'bg-blue-700' : ''}`}
              onClick={() => handleButtonClick(item.value)}
            >
              <FontAwesomeIcon icon={item.icon} />
            </button>
          ))}
      </div>
      <div className="p-5 gap-2 bg-slate-500 rounded-r-3xl shadow-md min-w-full">
          {/* SearchBar component to handle search queries */}
          <form onSubmit={handleSubmit} className=" flex items-center text-gray-500">
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              className="px-4 py-2 mr-2 border border-gray-300 rounded min-w-72"
              placeholder="Insert SQL Query"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <div className="p-5 bg-slate-100 rounded max-w-screen-md shadow-md mt-2 min-w-full min-h-72">
            {items.length > 0 && <DataTable items={items} />}
          </div>
      </div>
      
    </div>
  );
}

export default Simulation;
