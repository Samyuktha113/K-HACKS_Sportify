
import React, { useState } from 'react';
import './index.css';

function OdometerSimulator() {
    const [odometerResults, setOdometerResults] = useState([]);
    const [speed, setSpeed] = useState('');
    const [time, setTime] = useState('');
    const [timeUnit, setTimeUnit] = useState('s');
    const [displayFrequency, setDisplayFrequency] = useState('');

    const calculateOdometer = () => {
        if (isNaN(speed) || isNaN(time) || isNaN(displayFrequency)) {
            alert('Please enter valid numeric values.');
            return;
        }

        const timeInSeconds = timeUnit === 's' ? time : time * 60; // Convert minutes to seconds
        const distances = [];

        let currentOdometer = 0;

        for (let timeElapsed = 0; timeElapsed <= timeInSeconds; timeElapsed += parseInt(displayFrequency, 10)) {
            const distanceTraveled = (speed / 3600) * parseInt(displayFrequency, 10);
            currentOdometer += distanceTraveled;

            distances.push({ timeElapsed, currentOdometer });
        }

        setOdometerResults(distances);
    };

    return (
        <div>
            <h2>Odometer Simulator</h2>
            <label>
                Choose time unit:
                <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)}>
                    <option value="s">Seconds</option>
                    <option value="m">Minutes</option>
                </select>
            </label>
            <br />
            <label>
                Enter the time:
                <input type="number" value={time} onChange={(e) => setTime(e.target.value)} />
            </label>
            <br />
            <label>
                Enter display frequency in seconds:
                <input type="number" value={displayFrequency} onChange={(e) => setDisplayFrequency(e.target.value)} />
            </label>
            <br />
            <label>
                Enter the speed of the vehicle in km/h:
                <input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} />
            </label>
            <br />
            <button onClick={calculateOdometer}>Calculate Odometer</button>
            <br />
            <h3>Results:</h3>
            <ul>
                {odometerResults.map((result, index) => (
                    <li key={index}>
                        At {result.timeElapsed} seconds, odometer is {result.currentOdometer.toFixed(2)} km
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OdometerSimulator;
