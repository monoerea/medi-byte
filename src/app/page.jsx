'use client';

import React, { useEffect, useState } from 'react';
import ControlPage from './(components)/ControlPage';
import SideMenu from '../app/(components)/ui/SideMenu';
import { itemList } from '../app/(components)/constants';
import { getItems } from './(components)/utils';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [items, setItems] = useState([]); // Initialize items state with an empty array
  const [selectedItem, setSelectedItem] = useState(null); // Initialize selectedItem state with null

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLinkClick = async (item) => {
    setSelectedItem(item); // Update the selected item state
    console.log(selectedItem);
    try {
      if (item === 'Patient') { // Use item instead of selectedItem
        const patientsData = await getItems("Patient");
        setItems(patientsData);
        console.log("Fetched patients:", patientsData);
      } else if (item === 'Insurance') { // Use item instead of selectedItem
        const insuranceData = await getItems("Insurance");
        setItems(insuranceData);
        // Set insurance data in state or handle it as needed
        console.log("Fetched insurances:", insuranceData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
};


  return (
    <div className='flex flex-row max-w-screen-2xl'>
      <div className={`text-gray-700 ${collapsed ? 'w-16' : 'w-64'}`}>
        <SideMenu items={itemList} toggleCollapsed={toggleCollapsed} onLinkClick={handleLinkClick} />
      </div>

      <div className='overflow-auto max-w-screen min-h-[calc(100vh-84px)]'>
        {/* Render ControlPage component with the selected item passed as prop */}
        {selectedItem && items && <ControlPage selectedItem={items} table={selectedItem} />}
      </div>
    </div>
  );
};

export default Dashboard;
