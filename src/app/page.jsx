
'use client'
import React, { useState, useEffect } from 'react';
import ControlPage from './(components)/ControlPage';
import SideMenu from '../app/(components)/ui/SideMenu';
import { itemList } from '../app/(components)/constants';
import { getPatients } from './(components)/utils';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [patients, setPatients] = useState();

  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const patientsData = await getPatients();
        console.log("Fetched patients:", patientsData);
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatientsData();
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div className='flex flex-row max-w-screen-2xl'>
      <div className={`text-gray-700 ${collapsed ? 'w-16' : 'w-64'}`}>
        <SideMenu items={itemList} toggleCollapsed={toggleCollapsed} />
      </div>
      
      <div className='overflow-auto max-w-screen min-h-[calc(100vh-84px)]'>
        {/* Pass fetched patients data as prop to ControlPage component */}
        <ControlPage items={patients}/>
      </div>
    </div>
  );
};

export default Dashboard;
