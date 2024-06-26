import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setQuery(event.target.value);
    onSearch(event.target.value); // Ensure onSearch prop is invoked with the query
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 mb-4 flex items-center text-gray-500">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="px-4 py-2 mr-2 border border-gray-300 rounded"
        placeholder="Search"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchBar;
