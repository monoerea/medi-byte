import Card from '../ui/Card';
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PieController } from "chart.js";
import { Doughnut, Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PieController);

export const DataCard = ({ card }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('CHECKER',!(card.sectionID === ''))
        if (!(card.sectionID === '')) {
            setIsLoading(false);
        }
    }, [card]);

    const getChartOptions = (chartType) => {
        const baseOptions = { 
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    titleFont: {
                        size: 10
                    },
                    bodyFont: {
                        size: 10,
                        color: 'white'
                    },
                },
                legend: {
                    display: true,
                    position: "right",
                    labels: {
                        boxWidth: 10,
                        padding: 7,
                        font: {
                            size: 10,
                            color: "white", // Change the font color here
                        },
                        color: "white", // Change the color of the legend text
                    },
                    align: "right",
                },
            }
        };
    
        if (chartType === 'bar') {
            baseOptions.scales = {
                x: {
                    ticks: {
                        color: 'white' // Change the color of the x-axis labels
                    }
                },
                y: {
                    ticks: {
                        color: 'white' // Change the color of the y-axis labels
                    }
                }
            };
        }
    
        return baseOptions;
    };

    const renderChart = (chartData, chartType, options) => {
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
            case 'pie':
                ChartComponent = Pie;
                break;
            default:
                ChartComponent = Doughnut;
                break;
        }

        const option = getChartOptions(chartType);
    
        return (
            <div className="h-40 w-full">
                <ChartComponent options={option} data={chartData} />
            </div>
        );
    };
    
    

    return (
        <Card>
            <div className="items-center mb-1  bg-slate-500 border-r-slate-500 rounded-md  p-5 max-h-50  hover:bg-gray-700">
                <label className="block text-sm font-semibold mb-1 text-center">{card.data.req.toUpperCase() +' '+ card.data.type.toUpperCase() }</label>
                <div className=' flex justify-around'>
                    <div className='text-center'>
                        {isLoading ? (
                            <div className="animate-spin rounded-full border-b-2 border-blue-900 "></div>
                        ) : (
                            renderChart(card.data.result, card.data.chartType)
                        )}
                    </div>
                </div>
                
            </div>
        </Card>
    );
};
