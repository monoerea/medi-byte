import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faSearch, faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Nav = () => {

    const navItems = [
        { name: "Home", icon: faHome, link: "/" },
        { name: "Patient", icon: faPerson, link: "/PatientPage/1" },
        { name: "Messages", icon: faEnvelope, link: "/messages/1" },
        // Add more items as needed
    ];
    return (
        <nav className="flex justify-between items-center bg-nav p-4">
            <div className="flex justify-between">
                {navItems.map((item, index) => (
                    <div key={index} className="flex justify-center space-x-5 p-2">
                        <Link href={item.link}>
                            <div className="flex justify-center flex-row p-1">
                                <FontAwesomeIcon icon={item.icon} className="text-sm mb-1" style={{ width: '1.5rem', height: '1.5rem' }} />
                                <span className="text-sm p-1">{item.name}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="items-center px-4 flex justify-center" >
                <p className="text-default-text">sheensenorin@gmail.com</p>
            </div>
        </nav>
    );
};

export default Nav;
