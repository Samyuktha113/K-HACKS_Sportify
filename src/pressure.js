import React, { useState } from 'react';
import './index.css';

const AMBIENT_TEMPERATURE = 25.0;
const TEMPERATURE_CHANGE_RATE = 0.1;
const DRIVING_CONDITIONS = 0.05;
const SECONDS_IN_MONTH = 30 * 24 * 60 * 60;

function TirePressureSimulator() {
    const [initialPressure, setInitialPressure] = useState(30.0);
    const [simulationDurationMonths, setSimulationDurationMonths] = useState('');
    const [displayFrequencyMonths, setDisplayFrequencyMonths] = useState('');
    const [tirePressureResults, setTirePressureResults] = useState([]);

    const initializeTire = () => {
        return {
            initialPressure: initialPressure,
            currentPressure: initialPressure,
        };
    };

    const simulateTirePressure = () => {
        if (isNaN(simulationDurationMonths) || isNaN(displayFrequencyMonths)) {
            alert('Please enter valid numeric values for simulation duration and display frequency.');
            return;
        }

        const frontLeftTire = initializeTire();
        const frontRightTire = initializeTire();
        const rearLeftTire = initializeTire();
        const rearRightTire = initializeTire();

        const tirePressureResults = [];

        let timeElapsedSeconds = 0;
        const displayFrequencySeconds = displayFrequencyMonths * SECONDS_IN_MONTH;

        console.log('\nTire Pressure Simulation:');

        for (let month = 1; timeElapsedSeconds <= simulationDurationMonths * SECONDS_IN_MONTH; month++) {
            // Simulate temperature changes
            const temperature = AMBIENT_TEMPERATURE + TEMPERATURE_CHANGE_RATE;

            // Simulate driving conditions
            const drivingInfluence = (Math.random() * 101) / 100.0 * DRIVING_CONDITIONS;

            // Update tire pressure based on temperature and driving conditions
            frontLeftTire.currentPressure = frontLeftTire.initialPressure + temperature + drivingInfluence;
            frontRightTire.currentPressure = frontRightTire.initialPressure + temperature + drivingInfluence;
            rearLeftTire.currentPressure = rearLeftTire.initialPressure + temperature + drivingInfluence;
            rearRightTire.currentPressure = rearRightTire.initialPressure + temperature + drivingInfluence;

            // Display the current tire pressure at each time step
            console.log(`Month: ${month}, Front Left Tire Pressure: ${frontLeftTire.currentPressure.toFixed(2)} PSI`);
            console.log(`Month: ${month}, Front Right Tire Pressure: ${frontRightTire.currentPressure.toFixed(2)} PSI`);
            console.log(`Month: ${month}, Rear Left Tire Pressure: ${rearLeftTire.currentPressure.toFixed(2)} PSI`);
            console.log(`Month: ${month}, Rear Right Tire Pressure: ${rearRightTire.currentPressure.toFixed(2)} PSI`);

            // Add the results to the state
            tirePressureResults.push({
                month,
                frontLeftPressure: frontLeftTire.currentPressure,
                frontRightPressure: frontRightTire.currentPressure,
                rearLeftPressure: rearLeftTire.currentPressure,
                rearRightPressure: rearRightTire.currentPressure,
            });

            // Adjust the time delay based on your simulation requirements
            timeElapsedSeconds += displayFrequencySeconds;
        }

        setTirePressureResults(tirePressureResults);
    };

    return (
        <div>
            <h2>Tire Pressure Simulator</h2>
            <label>
                Enter the initial tire pressure:
                <input type="number" value={initialPressure} onChange={(e) => setInitialPressure(e.target.value)} />
            </label>
            <br />
            <label>
                Enter the simulation duration in months:
                <input
                    type="number"
                    value={simulationDurationMonths}
                    onChange={(e) => setSimulationDurationMonths(e.target.value)}
                />
            </label>
            <br />
            <label>
                Enter the display frequency in months:
                <input
                    type="number"
                    value={displayFrequencyMonths}
                    onChange={(e) => setDisplayFrequencyMonths(e.target.value)}
                />
            </label>
            <br />
            <button onClick={simulateTirePressure}>Simulate Tire Pressure</button>
            <br />
            <h3>Results:</h3>
            <ul>
                {tirePressureResults.map((result, index) => (
                    <li key={index}>
                        Month: {result.month}, Front Left: {result.frontLeftPressure.toFixed(2)} PSI,
                        Front Right: {result.frontRightPressure.toFixed(2)} PSI, Rear Left: {result.rearLeftPressure.toFixed(2)} PSI,
                        Rear Right: {result.rearRightPressure.toFixed(2)} PSI
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TirePressureSimulator;
