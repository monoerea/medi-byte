import React, { useState, useEffect } from 'react';
import { DataCard } from './DataCard';
import { type } from 'os';

function DataSection() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Track overall loading state

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true); // Start loading
        try {
            // Fetch data from first endpoint
            const response1 = await fetch('/api/DataAnalysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sectionMappings: [
                    { type: 'distribution', req: 'insured', chartType: 'pie'},
                    { type: 'average', req: 'age', chartType: 'doughnut' },
                    {type: 'frequency', req: 'company', chartType: 'bar'}
                    ]
                })
            });
    
            if (response1.ok) {
                const data = await response1.json();
                setData([{...data}]);
            } else {
                console.error('Failed to fetch data from /api/DataAnalysis');
            }
        } catch (error) {
            console.error('Error fetching data from /api/DataAnalysis:', error);
        }
        finally {
            setIsLoading(false); // Finish loading regardless of success or failure
        }
    };

    console.log('DATA', data);
    
    return (
        <div className="overflow-x-auto whitespace-nowrap">
        {!isLoading ? (
            <div className="grid grid-flow-col auto-cols-max gap-4 p-1">
                {data.map((sectionData, index) => (
                    <div key={`section-${index}`} className="grid grid-flow-col auto-cols-max gap-1 align-middle">
                        {sectionData.cards.map((card, cardIndex) => (
                            <DataCard key={card.cardId} card={card} />
                        ))}
                    </div>
                ))}
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>

    );
}

export default DataSection;
