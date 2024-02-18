
import './index.css';
import React, { useState } from 'react';

function SpeedSimulator() {
    const [speedResults, setSpeedResults] = useState([]);
    const [initialSpeed, setInitialSpeed] = useState('');
    const [simulationDuration, setSimulationDuration] = useState('');
    const [durationUnit, setDurationUnit] = useState('s');
    const [displayFrequency, setDisplayFrequency] = useState('');
    const [frequencyUnit, setFrequencyUnit] = useState('s');

    const accelerate = (speed) => {
        const MAX_SPEED = 120.0;
        const ACCELERATION = 2.0;

        return speed < MAX_SPEED ? speed + ACCELERATION : MAX_SPEED;
    };

    const decelerate = (speed) => {
        const DECELERATION = 2.0;

        return speed > 0 ? speed - DECELERATION : 0;
    };

    const generateRandomEvent = () => {
        return Math.random() < 0.5 ? 2.0 : -2.0;
    };

    const convertToSeconds = (time, unit) => {
        return unit === 'm' || unit === 'M' ? time * 60 : time;
    };

    const simulateSpeed = () => {
        if (isNaN(initialSpeed) || isNaN(simulationDuration) || isNaN(displayFrequency)) {
            alert('Please enter valid numeric values.');
            return;
        }

        const simulationDurationInSeconds = convertToSeconds(simulationDuration, durationUnit);
        const displayFrequencyInSeconds = convertToSeconds(displayFrequency, frequencyUnit);

        let speed = parseFloat(initialSpeed);
        let distance = 0.0;
        const speeds = [];

        console.log('Simulating car speed...');

        for (let i = 0; i <= simulationDurationInSeconds; i += 1) {
            if (i % 5 === 0) {
                const randomEvent = generateRandomEvent();
                speed += randomEvent;
            } else {
                speed = accelerate(speed);
            }

            distance += (speed * 1000 / 3600); // Convert speed from km/h to m/s

            if (i % displayFrequencyInSeconds === 0) {
                speeds.push({ timeElapsed: i, currentSpeed: speed, distance });
            }
        }

        setSpeedResults(speeds);
    };

    return (
        <div>
            <h2>Speed Simulator</h2>
            <label>
                Enter the initial speed of the car in km/h:
                <input type="number" value={initialSpeed} onChange={(e) => setInitialSpeed(e.target.value)} />
            </label>
            <br />
            <label>
                Enter the simulation duration (e.g., 10s or 5m):
                <input type="text" value={simulationDuration} onChange={(e) => setSimulationDuration(e.target.value)} />
                <select value={durationUnit} onChange={(e) => setDurationUnit(e.target.value)}>
                    <option value="s">Seconds</option>
                    <option value="m">Minutes</option>
                </select>
            </label>
            <br />
            <label>
                Enter the display frequency (e.g., 1s or 2m):
                <input type="text" value={displayFrequency} onChange={(e) => setDisplayFrequency(e.target.value)} />
                <select value={frequencyUnit} onChange={(e) => setFrequencyUnit(e.target.value)}>
                    <option value="s">Seconds</option>
                    <option value="m">Minutes</option>
                </select>
            </label>
            <br />
            <button onClick={simulateSpeed}>Simulate Speed</button>
            <br />
            <h3>Results:</h3>
            <ul>
                {speedResults.map((result, index) => (
                    <li key={index}>
                        At {result.timeElapsed} seconds, speed: {result.currentSpeed.toFixed(2)} km/h, distance: {result.distance.toFixed(2)} meters
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SpeedSimulator;
