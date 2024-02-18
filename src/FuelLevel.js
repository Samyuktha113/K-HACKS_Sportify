
import React from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function FuelLevel({ level }) {
    return (
        <>
       
        <div style={{ width: '100px', margin: '20px' }}>
            <CircularProgressbar
                value={level}
                text={`${level}%`}
                styles={buildStyles({
                    textSize: '16px',
                    pathTransitionDuration: 0.5,
                    textColor: '#fff',
                    pathColor: `rgba(62, 152, 199, ${level / 100})`,
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                })}
            />
        </div>
        </>
    );
}

FuelLevel.propTypes = {
    level: PropTypes.number.isRequired,
};

function calculateFuelLevel(initialFuelVolume, totalFuelCapacity, fuelConsumptionRate, simulationDuration, displayFrequency) {
    let currentFuelVolume = initialFuelVolume;
    const fuelLevels = [];

    for (let timeElapsed = 0; timeElapsed <= simulationDuration; timeElapsed++) {
        // Simulate fuel consumption over time
        currentFuelVolume -= fuelConsumptionRate * timeElapsed;

        // Ensure the fuel level doesn't go below zero
        currentFuelVolume = (currentFuelVolume < 0) ? 0 : currentFuelVolume;

        // Calculate fuel level percentage
        const fuelLevelPercent = (currentFuelVolume / totalFuelCapacity) * 100;

        // Store the fuel level at each time step
        if (timeElapsed % displayFrequency === 0) {
            fuelLevels.push({ timeElapsed, fuelLevelPercent });
        }
    }

    return fuelLevels;
}

export { FuelLevel, calculateFuelLevel };
