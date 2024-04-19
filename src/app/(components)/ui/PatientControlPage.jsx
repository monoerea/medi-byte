import DataTable from './DataTable/DataTable';
import React, { useEffect, useState } from "react";
import { getPatients } from "../utils";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

const PatientControlPage = () => {
    const [patients, setPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showEntries, setShowEntries] = useState(10);

    useEffect(() => {
      const fetchPatients = async () => {
        try {
          const patientsData = await getPatients();
          const patientsArray = patientsData ? Object.values(patientsData)[0] : [];
          setPatients(patientsArray);
          setTotalPages(Math.ceil(patientsArray.length / 10)); // Assuming 10 patients per page
        } catch (error) {
          console.error("Error fetching patients:", error);
        }
      };
  
      fetchPatients();
    }, []);

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const handleSearch = (query) => {
      // Implement search functionality
      console.log("Search query:", query);
    };

    const handleShowEntriesChange = (value) => {
      setShowEntries(value);
    };
  

    const paginatedPatients = patients.slice((currentPage - 1) * 10, currentPage * 10);

    return (
      <div className="bg-gray-100 p-4 rounded-lg max-w-screen-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <SearchBar onSearch={handleSearch} />
          <div className="text-gray-500"> {/* Apply text-gray-500 for gray color */}
            Show{" "}
            <select
              value={showEntries}
              onChange={(e) => setShowEntries(parseInt(e.target.value))}
              className="px-2 py-1 border border-gray-300 rounded ml-2"
            >
              {[5, 10, 15, 20].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>{" "}
            entries
          </div>
        </div>

        {patients.length > 0 && <DataTable patients={paginatedPatients}/>}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

    );
};

export default PatientControlPage;
