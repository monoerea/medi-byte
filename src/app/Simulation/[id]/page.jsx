'use client';
// Import necessary modules and components
import React, { useState } from "react";
import DataTable from "../../(components)/DataTable/DataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Simulation() {
  // State to hold the fetched data and search query
  const [items, setItems] = useState([{' ':' '}]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
  };

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
    <div className="p-5">
      {/* SearchBar component to handle search queries */}
      <form onSubmit={handleSubmit} className=" flex items-center text-gray-500">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        className="px-4 py-2 mr-2 border border-gray-300 rounded"
        placeholder="Insert SQL Query"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>

      {/* Display the DataTable component with fetched items */}
      <div>
        <DataTable items={items} />
      </div>
    </div>
  );
}

export default Simulation;
