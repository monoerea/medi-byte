'use client';
import React, { useEffect, useState } from 'react';
import './Percentage.css';

const Percentage = ({ data }) => {
    const [gradientColors, setGradientColors] = useState(['#FF69B4', '#4169E1']);

    const circumference = 2 * Math.PI * 40; 
    const dashOffset = circumference * (1 - data / 100); 

    useEffect(() => {
        // Function to generate smooth gradient colors
        const generateGradientColors = () => {
            const pink = [255, 105, 180]; // RGB values for pink
            const blue = [65, 105, 225]; // RGB values for blue
            const gradientColors = [];
            for (let i = 0; i < 3; i++) {
                const gradientColor = [];
                for (let j = 0; j < 3; j++) {
                    gradientColor.push(Math.round(pink[j] + (blue[j] - pink[j]) * (i / 2)));
                }
                gradientColors.push(`rgb(${gradientColor.join(',')})`);
            }
            return gradientColors;
        };

        const interval = setInterval(() => {
            const smoothColors = generateGradientColors();
            setGradientColors(smoothColors);
        }, 5000);

        return () => clearInterval(interval); 
    }, []);


return (
    <div className="text-center mb-4 relative">
        <svg className="water-circle" viewBox="0 0 100 100">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={gradientColors[0]} />
                    <stop offset="50%" stopColor={gradientColors[1]} />
                    <stop offset="100%" stopColor={gradientColors[2]} />
                </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#ccc" strokeWidth="20" />
            <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={`url(#gradient)`}
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
            >
                <animate attributeName="stroke-dashoffset" from={circumference} to={dashOffset} dur="0.5s" fill="freeze" />
            </circle>
            <text x="50" y="50" textAnchor="middle" alignmentBaseline="middle" className="font-sans text-3xl percentage-text">{data}</text>
        </svg>
    </div>
);

};

export default Percentage;
