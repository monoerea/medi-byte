// SideMenu.js
import React, { useState } from 'react';

const SideMenu = ({ items, toggleCollapsed }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
    toggleCollapsed(); // Call the parent component's toggleCollapsed function
  };

  return (
    <div className={`bg-gray-900 text-white h-full flex flex-col ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <h2 className="text-xl font-bold">Menu</h2>}
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {collapsed ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>
      <ul className="flex flex-col flex-1">
        {items.map((item, index) => (
          <li key={index} className="px-4 py-2 hover:bg-gray-800 flex items-center">
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
