import React, { useEffect, useState } from "react";
import { getPatients } from "./utils";
import Pagination from "./ui/Pagination";
import SearchBar from "./ui/SearchBar";
import DataTable from "./DataTable/DataTable";

const PatientControlPage = () => {
    const [patients, setPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showEntries, setShowEntries] = useState(10);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [paginatedPatients, setPaginatedPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const patientsData = await getPatients();
                console.log("Fetched patients:", patientsData); // Log fetched patients
                setPatients(patientsData);
                setTotalPages(Math.ceil(patientsData.length / 10)); // Assuming 10 patients per page
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchPatients();
    }, []);

    useEffect(() => {
      if (filteredPatients && filteredPatients.length > 0) {
        const startIndex = (currentPage - 1) * showEntries;
        const endIndex = startIndex + showEntries;
        const paginatedData = filteredPatients.slice(startIndex, endIndex);
        setPaginatedPatients(paginatedData);
      } else {
        const startIndex = (currentPage - 1) * showEntries;
        const endIndex = startIndex + showEntries;
        const paginatedData = patients.slice(startIndex, endIndex);
        setPaginatedPatients(paginatedData);
      }
    }, [currentPage, showEntries, filteredPatients, patients, paginatedPatients]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (query) => {
        setSearchQuery(query); // Update search query state

        // Filter patients based on search query
        const updatedFilteredPatients = patients.filter((patient) =>
            Object.values(patient).some(
                (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(query.toLowerCase())
            )
        );
        setFilteredPatients(updatedFilteredPatients);
        console.log('FilteredPatients', filteredPatients);
    };

    const handleShowEntriesChange = (value) => {
        setShowEntries(value);
    };

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

            {paginatedPatients.length > 0 && <DataTable patients={paginatedPatients} />}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default PatientControlPage;
