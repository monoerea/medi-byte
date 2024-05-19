import Card from '../ui/Card';
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DataCard = ({ card, chartType }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Set isLoading to true if card.sectionID is empty when component mounts
        console.log('CHECKER',!(card.sectionID === ''))
        if (!(card.sectionID === '')) {
            setIsLoading(false);
        }
    }, [card]);

    const renderContent = () => {
        const { type, result } = card.data;

        if (type === 'average') {
            return renderAverage(result);
        }

        if (type === 'distribution' && typeof result === 'object') {
            const chartData = createChartData(result);
            return renderChart(chartData, chartType);
        }

        return <p>No data available</p>;
    };

    const renderAverage = (result) => {
        return <p>{result}</p>;
    };

    const createChartData = (result) => {
        return {
            labels: Object.keys(result),
            datasets: [
                {
                    data: Object.values(result),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        // Add more colors as needed
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };

    const renderChart = (chartData, chartType) => {
        let ChartComponent;
    
        switch (chartType) {
            case 'doughnut':
                ChartComponent = Doughnut;
                break;
            case 'bar':
                ChartComponent = Bar;
                break;
            case 'line':
                ChartComponent = Line;
                break;
            default:
                ChartComponent = Doughnut;
                break;
        }
    
        return (
            <div className="w-28 h-28">
                <ChartComponent  data={chartData} />
                {/* height={'40px'} width={'40px'} */}
            </div>
        );
    };
    

    return (
        <Card>
            <div className="flex items-center justify-start mb-1">
                <div>
                    <label className="block text-sm font-semibold mb-1 text-center">{card.data.req}</label>
                    <div className='text-center'>
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-900"></div>
                        ) : (
                            renderContent()
                        )}
                    </div>
                    
                </div>
            </div>
        </Card>
    );
};
