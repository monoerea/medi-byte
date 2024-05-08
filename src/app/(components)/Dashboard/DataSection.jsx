import React from 'react';
import Card from '../ui/Card';
import Image from 'next/image';

function DataSection() {
    const data = [
        { label: 'Patient Admission', data: 2400, imgSrc: '/patient_admission.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { label: 'Visit Frequency', data: 117, imgSrc: '/visit_frequency.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { label: 'Patient Acuity', data: '70%', imgSrc: '/patient_acuity.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
    ];

    return (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {data.map((datum, index) => (
                <Card key={index}>
                    <div className="flex items-center justify-start mb-1">
                        <div className="mr-2">
                            <Image src={datum.imgSrc} width={30} height={30} alt={datum.label} className="w-8 h-8 rounded-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">{datum.label}</label>
                            <p className="text-xs text-gray-600">{datum.description}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-bold">{datum.data}</p>
                            {typeof datum.data === 'string' && datum.data.includes('%') && (
                                <span className="text-xs text-gray-600">%</span>
                            )}
                        </div>
                        <div>
                            <button className="text-xs px-1 py-0.5 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default DataSection;
