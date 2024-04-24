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
                setTotalPages(Math.ceil(patientsData.length / showEntries)); // Assuming 10 patients per page
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchPatients();
    }, [showEntries]);

    useEffect(() => {
        const filtered = patients.filter((patient) =>
            Object.values(patient).some(
                (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setFilteredPatients(filtered);
        setTotalPages(Math.ceil(filtered.length / showEntries));
    }, [searchQuery, patients, showEntries]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * showEntries;
        const endIndex = startIndex + showEntries;
        const paginatedData = searchQuery ? filteredPatients.slice(startIndex, endIndex) : patients.slice(startIndex, endIndex);
        setPaginatedPatients(paginatedData);
    }, [currentPage, showEntries, searchQuery, filteredPatients, patients]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase()); // Update search query state
        setCurrentPage(1); // Reset to the first page
    };

    const handleShowEntriesChange = (value) => {
        setShowEntries(value);
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg max-w-screen-l mx-auto min-h-[calc(100vh-84px)]">
            <div className="flex justify-between items-center mb-4">
                <SearchBar onSearch={handleSearch} />
                <div className="text-gray-500"> {/* Apply text-gray-500 for gray color */}
                Show{" "}
                    <select
                        value={showEntries}
                        onChange={(e) => handleShowEntriesChange(parseInt(e.target.value))}
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
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} showEntries={showEntries}totalEntries={patients.length} />
        </div>
    );
};

export default PatientControlPage;
