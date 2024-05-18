import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Image from 'next/image';
import { stringify } from 'querystring';

function DataSection() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/DataAnalysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    endpoints: ['Patient', 'Insurance', 'Patient'],
                    sectionMappings: {
                        1: { type: 'distribution', req: 'age' },
                        2: { type: 'distribution', req: 'gender' },
                        3: { type: 'average', req: 'age' },
                    }
                })
            });
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // console.log(data, data.cards[1].data);
    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {data.cards.map((card, index) => (
                <Card key={card.cardId}>
                    <div className="flex items-center justify-start mb-1">
                        <div className="mr-2">
                            {/* Assuming imgSrc and label are part of the card.data */}
                            <Image src={card.data.imgSrc || '/default.jpg'} width={30} height={30} alt={card.data.label || 'Card'} className="w-8 h-8 rounded-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">{card.data.label || `Card ${index + 1}`}</label>
                            <p className="text-xs text-gray-600">{card.data.description || 'No description available'}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-bold">{JSON.stringify(card.data)}</p>
                            {typeof card.data.value === 'number' && (
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
