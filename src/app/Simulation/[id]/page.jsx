'use client';
// Import necessary modules and components
import React, { useState } from "react";
import DataTable from "../../(components)/DataTable/DataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faObjectGroup, faPeopleGroup, faGenderless, faMoneyCheck, faBalanceScale } from "@fortawesome/free-solid-svg-icons";

function Simulation() {
  // State to hold the fetched data and search query
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const buttonGroup = [
    {icon: faObjectGroup, value: 'SELECT * from patient'},
    {icon: faPeopleGroup, value: 'SELECT * from insurance'},
    {icon: faGenderless, value: 'SELECT AVG(YEAR(CURDATE())-YEAR(DateofBirth)) as value, Gender as label FROM patient GROUP BY Gender'},
    {icon: faMoneyCheck, value: 'SELECT * from patient'},
    {icon: faBalanceScale,value: 'SELECT * from patient'},
    {icon: faObjectGroup, value: 'SELECT * from patient'},
    {icon: faPeopleGroup, value: 'SELECT * from insurance'},
    {icon: faGenderless, value: 'SELECT AVG(YEAR(CURDATE())-YEAR(DateofBirth)) as value, Gender as label FROM patient GROUP BY Gender'},
    {icon: faMoneyCheck, value: 'SELECT * from patient'},
    {icon: faBalanceScale,value: 'SELECT * from patient'},
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
