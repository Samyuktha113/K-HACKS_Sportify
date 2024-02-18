import React, { useState } from 'react';
import './index.css';
function EnergySimulator() {
    const [oilLifeResults, setOilLifeResults] = useState([]);
    const [initialMileage, setInitialMileage] = useState('');
    const [initialTime, setInitialTime] = useState('');
    const [simulationDuration, setSimulationDuration] = useState('');
    const [displayFrequency, setDisplayFrequency] = useState('');

    const calculateOilLifePercentage = (mileage, time) => {
        const mileageWeight = 0.8;
        const timeWeight = 0.2;

        const maxMileage = 100000; // Adjust based on your vehicle's recommended oil change interval
        const maxTime = 12; // 1 year in months, adjust based on your vehicle's recommended oil change interval

        const normalizedMileage = Math.min(mileage / maxMileage, 1.0);
        const normalizedTime = Math.min(time / maxTime, 1.0);

        const weightedAverage = mileageWeight * normalizedMileage + timeWeight * normalizedTime;

        const oilLifePercentage = (1 - weightedAverage) * 100;

        return Math.max(oilLifePercentage, 0); // Ensure the percentage is not negative
    };

    const simulateEngineOilLife = () => {
        if (isNaN(initialMileage) || isNaN(initialTime) || isNaN(simulationDuration) || isNaN(displayFrequency)) {
            alert('Please enter valid numeric values.');
            return;
        }

        const initialData = {
            mileage: parseFloat(initialMileage),
            timeSinceLastChangeMonths: parseFloat(initialTime),
        };

        const oilLifeResults = [];

        console.log('Simulating engine oil life...');

        for (let timeElapsed = 0; timeElapsed <= simulationDuration; timeElapsed++) {
            const oilLifePercentage = calculateOilLifePercentage(initialData.mileage, initialData.timeSinceLastChangeMonths);

            if (timeElapsed % displayFrequency === 0) {
                oilLifeResults.push({ timeElapsed, oilLifePercentage });
            }

            // Simulate a month passing
            initialData.timeSinceLastChangeMonths += 1;
        }

        setOilLifeResults(oilLifeResults);
    };

    return (
        <div>
            <h2>Energy Simulator</h2>
            <label>
                Enter the mileage since the last oil change:
                <input type="number" value={initialMileage} onChange={(e) => setInitialMileage(e.target.value)} />
            </label>
            <br />
            <label>
                Enter the time since the last oil change (in months):
                <input type="number" value={initialTime} onChange={(e) => setInitialTime(e.target.value)} />
            </label>
            <br />
            <label>
                Enter the simulation duration (in months):
                <input type="number" value={simulationDuration} onChange={(e) => setSimulationDuration(e.target.value)} />
            </label>
            <br />
            <label>
                Enter the display frequency (in months):
                <input type="number" value={displayFrequency} onChange={(e) => setDisplayFrequency(e.target.value)} />
            </label>
            <br />
            <button onClick={simulateEngineOilLife}>Simulate Engine Oil Life</button>
            <br />
            <h3>Results:</h3>
            <ul>
                {oilLifeResults.map((result, index) => (
                    <li key={index}>
                        At {result.timeElapsed} months, Engine Oil Life Percentage: {result.oilLifePercentage.toFixed(2)}%
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EnergySimulator;
