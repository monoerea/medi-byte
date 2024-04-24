// Dashboard.js
'use client';
import React, { useState } from 'react';
import PatientControlPage from './(components)/PatientControlPage';
import SideMenu from '../app/(components)/ui/SideMenu';
import { itemList } from '../app/(components)/constants';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className='flex flex-row max-w-screen-2xl'>
      <div className={`text-gray-700 ${collapsed ? 'w-16' : 'w-64'}`}>
        <SideMenu items={itemList} toggleCollapsed={toggleCollapsed} />
      </div>
      
      <div className='overflow-auto max-w-screen min-h-[calc(100vh-84px)]'>
        {/* add section headers */}
        <PatientControlPage />
      </div>
    </div>
  );
};

export default Dashboard;
