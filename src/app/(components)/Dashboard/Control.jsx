'use client';

import React, {useState, useEffect } from 'react';
import ControlPage from '../../(components)/ControlPage';
import SideMenu from '../../(components)/ui/SideMenu';
import { itemList } from '../../(components)/constants';
import { getItems } from '../../(components)/utils';

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [items, setItems] = useState([]); // Initialize items state with an empty array
    const [selectedItem, setSelectedItem] = useState('Patient'); // Initialize selectedItem state with 'Patient'
  
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };
  
    useEffect(() => {
      // Fetch patient data when the component mounts
      const fetchDefaultData = async () => {
        try {
          const patientsData = await getItems('Patient');
          setItems(patientsData);
          console.log('Fetched patients:', patientsData);
        } catch (error) {
          console.error('Error fetching patient data:', error);
        }
      };
  
      fetchDefaultData(); // Call the function to fetch patient data
    }, []); // Empty dependency array to ensure this effect runs only once on mount
  
    const handleLinkClick = async (item) => {
      setSelectedItem(item); // Update the selected item state
      console.log(selectedItem);
      try {
        if (item === 'Patient') {
          const patientsData = await getItems('Patient');
          setItems(patientsData);
          console.log('Fetched patients:', patientsData);
        } else if (item === 'Insurance') {
          const insuranceData = await getItems('Insurance');
          setItems(insuranceData);
          // Set insurance data in state or handle it as needed
          console.log('Fetched insurances:', insuranceData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    return (
      <div className="flex flex-row max-w-screen-2xl">
        <div className={`text-gray-700 ${collapsed ? 'w-16' : 'w-64'}`}>
          <SideMenu items={itemList} toggleCollapsed={toggleCollapsed} onLinkClick={handleLinkClick} />
        </div>
  
        <div className="overflow-auto max-w-screen min-h-[calc(100vh-84px)]">
          {/* Render ControlPage component with the selected item passed as prop */}
          {selectedItem && items && <ControlPage selectedItem={items} table={selectedItem} />}
        </div>
      </div>
    );
  };

export default Dashboard;
