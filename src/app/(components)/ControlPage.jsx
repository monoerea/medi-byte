import React, { useEffect, useState } from "react";
import { getPatients } from "./utils";
import Pagination from "./ui/Pagination";
import SearchBar from "./ui/SearchBar";
import DataTable from "./DataTable/DataTable";

const ControlPage = ({item, table}) => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showEntries, setShowEntries] = useState(10);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [filteredItems, setFilteredItems] = useState([]);
    const [paginatedItems, setPaginatedItems] = useState([]);

    
    useEffect(() => {
        // Check if item is an array before setting the items state
        if (Array.isArray(item)) {
            const newItems = [...item];
            setItems(newItems);
            setTotalPages(Math.ceil(item.length / showEntries));
        }
    }, [item, showEntries]);
    
    
    console.log('item',item,items, totalPages, showEntries, paginatedItems, table);
    
    useEffect(() => {
        const filtered = items.filter((patient) =>
            Object.values(patient).some(
                (value) =>
                    String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setFilteredItems(filtered);
        setTotalPages(Math.ceil(filtered.length / showEntries));
    }, [searchQuery, items, showEntries]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * showEntries;
        const endIndex = startIndex + showEntries;
        const paginatedData = searchQuery ? filteredItems.slice(startIndex, endIndex) : items.slice(startIndex, endIndex);
        setPaginatedItems(paginatedData);
    }, [currentPage, showEntries, searchQuery, filteredItems, items]);

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
        <div className="bg-gray-100 p-4 rounded-lg max-w-screen-l mx-auto min-h-[calc(100vh-300px)]">
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

            {paginatedItems.length > 0 && <DataTable items={paginatedItems} table={table}/>}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} showEntries={showEntries}totalEntries={items.length} />
        </div>
    );
};

export default ControlPage;
