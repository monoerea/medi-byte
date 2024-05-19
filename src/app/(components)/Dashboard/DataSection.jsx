import React, { useState, useEffect } from 'react';
import { DataCard } from './DataCard';

function DataSection() {
    const [data, setData] = useState({ sectionId: '', cards: [] });

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

    console.log('DATA', data);
    const chartType = ['Percent', 'Pie', 'Pie'];
    return (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            { data && data.cards.map((card) => (
                <DataCard key={card.cardId} card={card} chartType={chartType[data.cards.indexOf(card)]} />
            ))}
        </div>
    );
}

export default DataSection;
