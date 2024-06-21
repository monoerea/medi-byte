import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faSearch, faEnvelope, faHome, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import Percentage from './Percentage';

const Nav = () => {

    const navItems = [
        { name: "Home", icon: faHome, link: "/" },
        { name: "Patient", icon: faPerson, link: "/PatientPage/1" },
        { name:'Dashboard', icon: faChartSimple, link:'/Dashboard/1'}
    ];
    return (
        <nav className="flex justify-between items-center bg-nav pr-4 pl-4">
            
            <div className="flex justify-between items-center font-bold">
            <div className="pr-8">
                <a href="/">
                    <Image src="/icon.svg" width={35} height={35} className="hover:animate-spin" alt="MediByte" />
                </a>
            </div>

                {navItems.map((item, index) => (
                    <div key={index} className="flex justify-center py-2 pr-2">
                        <Link href={item.link}>
                            <div className="flex justify-center flex-row p-1 hover:text-blue-400">
                                <FontAwesomeIcon icon={item.icon} className="text-sm mb-1" style={{ width: '1.5rem', height: '1.5rem' }} />
                                <span className="text-sm p-1">{item.name}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="items-center px-4 flex justify-center" >
                <Image src="/medibyte-white.png" width={100} height={100} alt="Placeholder" />
                
            </div>
        </nav>
    );
};

export default Nav;
