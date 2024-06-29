'use client';

import React, {useState, useEffect } from 'react';
import ControlPage from '../../(components)/ControlPage';
import SideMenu from '../../(components)/ui/SideMenu';
import { itemList } from '../../(components)/constants';
import { getItems } from '../../(components)/utils';
import DataSection from './DataSection';
const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [items, setItems] = useState([]); // Initialize items state with an empty array
    const [selectedItem, setSelectedItem] = useState('Insurance'); // Initialize selectedItem state with 'Patient'
  
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };

    
    useEffect(() => {
        const fetchDefaultData = async (item) => {if (selectedItem === item) {
            const data = await getItems(item);
            setItems(data);
            // Set insurance data in state or handle it as needed
            console.log(`Fetched ${item}s:`, data);
            }}
        fetchDefaultData(selectedItem);
      // Call the function to fetch patient data
    }, [selectedItem]); // Empty dependency array to ensure this effect runs only once on mount
  
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
        else if (item === 'PatientInsurance') {
          const PatientInsuranceData = await getItems('PatientInsurance');
          setItems(PatientInsuranceData);
          // Set insurance data in state or handle it as needed
          console.log('Fetched insurances:', PatientInsuranceData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    return (
      <div className="flex flex-row max-w-screen-2xl">
        <div className={`text-gray-700 bg-gray-900 ${collapsed ? 'w-16' : 'w-64'}`}>
          <SideMenu items={itemList} toggleCollapsed={toggleCollapsed} onLinkClick={handleLinkClick} />
        </div>
        {/* min-h-[calc(100vh-84px)] */}
        <div className="overflow-auto min-h-[calc(100vh-500px)] flex-grow">

          <DataSection/>

          {selectedItem && items && <ControlPage item={items} table={selectedItem} />}
        </div>
      </div>
    );
  };

export default Dashboard;
