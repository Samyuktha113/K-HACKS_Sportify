// import React, { useState } from 'react';

// const MotorSimulation = () => {
//   const [simulationResults, setSimulationResults] = useState(null);

//   const predictValues = (
//     averageFuelConsumption,
//     oilHealthAffectedPerPercentage,
//     initialFuelLevel,
//     initialEngineTemperature,
//     rateOfChangeOfEngineTemperature,
//     timePoint,
//     fuelSamplingFrequency,
//     temperatureSamplingFrequency,
//     tireSamplingFrequency,
//     seatBeltSamplingFrequency,
//     speed,
//     initialBrakeWear,
//     brakeWearChangeRate
//   ) => {
//     let currentFuelLevel = initialFuelLevel;
//     let currentEngineTemperature = initialEngineTemperature;
//     let currentBrakeWear = initialBrakeWear;

//     let fuelLevels = [];
//     let engineTemperatures = [];
//     let tireStatuses = [];
//     let seatBeltStatuses = [];
//     let brakeWearRates = [];

//     for (let t = 0; t < timePoint; t++) {
//       if (t % fuelSamplingFrequency === 0) {
//         const fuelConsumed = averageFuelConsumption * (t / fuelSamplingFrequency);
//         currentFuelLevel -= fuelConsumed;
//         fuelLevels.push({ time: t, fuelLevel: currentFuelLevel });
//       }

//       if (t % temperatureSamplingFrequency === 0) {
//         currentEngineTemperature += rateOfChangeOfEngineTemperature * (t / temperatureSamplingFrequency);
//         engineTemperatures.push({ time: t, temperature: currentEngineTemperature });
//       }

//       if (t % tireSamplingFrequency === 0) {
//         const isNormal = Math.random() < 0.95;
//         tireStatuses.push({ time: t, normal: isNormal });
//       }

//       if (t % seatBeltSamplingFrequency === 0) {
//         const isLatched = Math.random() < 0.9;
//         seatBeltStatuses.push({ time: t, latched: isLatched });
//       }

//       const distanceTraveled = speed * (1 / 3600);
//       const bearing = 0;

//       currentBrakeWear += brakeWearChangeRate;
//       brakeWearRates.push({ time: t, wearRate: currentBrakeWear });
//     }

//     return { fuelLevels, engineTemperatures, tireStatuses, seatBeltStatuses, brakeWearRates };
//   };

//   const calculate = () => {
//     const averageFuelConsumption = parseFloat(document.getElementById('averageFuelConsumption').value);
//     const oilHealthAffectedPerPercentage = parseFloat(document.getElementById('oilHealthAffectedPerPercentage').value);
//     const initialFuelLevel = parseFloat(document.getElementById('initialFuelLevel').value);
//     const initialEngineTemperature = parseFloat(document.getElementById('initialEngineTemperature').value);
//     const rateOfChangeOfEngineTemperature = parseFloat(document.getElementById('rateOfChangeOfEngineTemperature').value);
//     const timePoint = parseInt(document.getElementById('timePoint').value);
//     const fuelSamplingFrequency = parseInt(document.getElementById('fuelSamplingFrequency').value);
//     const temperatureSamplingFrequency = parseInt(document.getElementById('temperatureSamplingFrequency').value);
//     const tireSamplingFrequency = parseInt(document.getElementById('tireSamplingFrequency').value);
//     const seatBeltSamplingFrequency = parseInt(document.getElementById('seatBeltSamplingFrequency').value);
//     const speed = parseFloat(document.getElementById('speed').value);
//     const initialBrakeWear = parseFloat(document.getElementById('initialBrakeWear').value);
//     const brakeWearChangeRate = parseFloat(document.getElementById('brakeWearChangeRate').value);

//     const result = predictValues(
//       averageFuelConsumption, oilHealthAffectedPerPercentage, initialFuelLevel, initialEngineTemperature,
//       rateOfChangeOfEngineTemperature, timePoint, fuelSamplingFrequency, temperatureSamplingFrequency,
//       tireSamplingFrequency, seatBeltSamplingFrequency, speed, initialBrakeWear, brakeWearChangeRate
//     );

//     setSimulationResults(result);
//   };

//   return (
//     <div>
//       <h1>Vehicle Simulation</h1>
//       <form>
//         <label htmlFor="averageFuelConsumption">Average Fuel Consumption:</label>
//         <input type="number" id="averageFuelConsumption" required step="any"/><br/>

//         <label htmlFor="oilHealthAffectedPerPercentage">Oil Health Affected Per Percentage:</label>
//         <input type="number" id="oilHealthAffectedPerPercentage" required step="any"/><br/>

//         <label htmlFor="initialFuelLevel">Initial Fuel Level:</label>
//         <input type="number" id="initialFuelLevel" required step="any"/><br/>

//         <label htmlFor="initialEngineTemperature">Initial Engine Temperature:</label>
//         <input type="number" id="initialEngineTemperature" required step="any"/><br/>

//         <label htmlFor="rateOfChangeOfEngineTemperature">Rate of Change of Engine Temperature:</label>
//         <input type="number" id="rateOfChangeOfEngineTemperature" required step="any"/><br/>

//         <label htmlFor="timePoint">Time Point:</label>
//         <input type="number" id="timePoint" required step="1"/><br/>

//         <label htmlFor="fuelSamplingFrequency">Fuel Sampling Frequency:</label>
//         <input type="number" id="fuelSamplingFrequency" required step="1"/><br/>

//         <label htmlFor="temperatureSamplingFrequency">Temperature Sampling Frequency:</label>
//         <input type="number" id="temperatureSamplingFrequency" required step="1"/><br/>

//         <label htmlFor="tireSamplingFrequency">Tire Sampling Frequency:</label>
//         <input type="number" id="tireSamplingFrequency" required step="1"/><br/>

//         <label htmlFor="seatBeltSamplingFrequency">Seat Belt Sampling Frequency:</label>
//         <input type="number" id="seatBeltSamplingFrequency" required step="1"/><br/>

//         <label htmlFor="speed">Speed:</label>
//         <input type="number" id="speed" required step="any"/><br/>

//         <label htmlFor="initialBrakeWear">Initial Brake Wear:</label>
//         <input type="number" id="initialBrakeWear" required step="any"/><br/>

//         <label htmlFor="brakeWearChangeRate">Brake Wear Change Rate:</label>
//         <input type="number" id="brakeWearChangeRate" required step="any"/><br/>

//         <button type="button" onClick={calculate}>Calculate</button>
//       </form>

//       {simulationResults && (
//         <div>
//           <h2>Simulation Results</h2>
//           {Object.keys(simulationResults).map((key) => (
//             <div key={key}>
//               <h3>{key}</h3>
//               <pre>{JSON.stringify(simulationResults[key], null, 2)}</pre>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MotorSimulation;


// Motor.js

import React, { useState } from 'react';

const MotorSimulation = () => {
    const [simulationResults, setSimulationResults] = useState(null);

    const predictValues = (
        averageFuelConsumption,
        oilHealthAffectedPerPercentage,
        initialFuelLevel,
        initialEngineTemperature,
        rateOfChangeOfEngineTemperature,
        timePoint,
        fuelSamplingFrequency,
        temperatureSamplingFrequency,
        tireSamplingFrequency,
        seatBeltSamplingFrequency,
        speed,
        initialBrakeWear,
        brakeWearChangeRate
    ) => {
        let currentFuelLevel = initialFuelLevel;
        let currentEngineTemperature = initialEngineTemperature;
        let currentBrakeWear = initialBrakeWear;

        let fuelLevels = [];
        let engineTemperatures = [];
        let tireStatuses = [];
        let seatBeltStatuses = [];
        let brakeWearRates = [];

        for (let t = 0; t < timePoint; t++) {
            if (t % fuelSamplingFrequency === 0) {
                const fuelConsumed = averageFuelConsumption * (t / fuelSamplingFrequency);
                currentFuelLevel -= fuelConsumed;
                fuelLevels.push({ time: t, fuelLevel: currentFuelLevel });
            }

            if (t % temperatureSamplingFrequency === 0) {
                currentEngineTemperature += rateOfChangeOfEngineTemperature * (t / temperatureSamplingFrequency);
                engineTemperatures.push({ time: t, temperature: currentEngineTemperature });
            }

            if (t % tireSamplingFrequency === 0) {
                const isNormal = Math.random() < 0.95;
                tireStatuses.push({ time: t, normal: isNormal });
            }

            if (t % seatBeltSamplingFrequency === 0) {
                const isLatched = Math.random() < 0.9;
                seatBeltStatuses.push({ time: t, latched: isLatched });
            }

            const distanceTraveled = speed * (1 / 3600);
            const bearing = 0;

            currentBrakeWear += brakeWearChangeRate;
            brakeWearRates.push({ time: t, wearRate: currentBrakeWear });
        }

        return { fuelLevels, engineTemperatures, tireStatuses, seatBeltStatuses, brakeWearRates };
    };

    const calculate = () => {
        const averageFuelConsumption = parseFloat(document.getElementById('averageFuelConsumption').value);
        const oilHealthAffectedPerPercentage = parseFloat(document.getElementById('oilHealthAffectedPerPercentage').value);
        const initialFuelLevel = parseFloat(document.getElementById('initialFuelLevel').value);
        const initialEngineTemperature = parseFloat(document.getElementById('initialEngineTemperature').value);
        const rateOfChangeOfEngineTemperature = parseFloat(document.getElementById('rateOfChangeOfEngineTemperature').value);
        const timePoint = parseInt(document.getElementById('timePoint').value);
        const fuelSamplingFrequency = parseInt(document.getElementById('fuelSamplingFrequency').value);
        const temperatureSamplingFrequency = parseInt(document.getElementById('temperatureSamplingFrequency').value);
        const tireSamplingFrequency = parseInt(document.getElementById('tireSamplingFrequency').value);
        const seatBeltSamplingFrequency = parseInt(document.getElementById('seatBeltSamplingFrequency').value);
        const speed = parseFloat(document.getElementById('speed').value);
        const initialBrakeWear = parseFloat(document.getElementById('initialBrakeWear').value);
        const brakeWearChangeRate = parseFloat(document.getElementById('brakeWearChangeRate').value);

        const result = predictValues(
            averageFuelConsumption, oilHealthAffectedPerPercentage, initialFuelLevel, initialEngineTemperature,
            rateOfChangeOfEngineTemperature, timePoint, fuelSamplingFrequency, temperatureSamplingFrequency,
            tireSamplingFrequency, seatBeltSamplingFrequency, speed, initialBrakeWear, brakeWearChangeRate
        );

        setSimulationResults(result);
    };

    return (
        <div>
            <h1>Vehicle Simulation</h1>
            <form>
                <label htmlFor="averageFuelConsumption">Average Fuel Consumption:</label>
                <input type="number" id="averageFuelConsumption" required step="any" /><br />

                <label htmlFor="oilHealthAffectedPerPercentage">Oil Health Affected Per Percentage:</label>
                <input type="number" id="oilHealthAffectedPerPercentage" required step="any" /><br />

                <label htmlFor="initialFuelLevel">Initial Fuel Level:</label>
                <input type="number" id="initialFuelLevel" required step="any" /><br />

                <label htmlFor="initialEngineTemperature">Initial Engine Temperature:</label>
                <input type="number" id="initialEngineTemperature" required step="any" /><br />

                <label htmlFor="rateOfChangeOfEngineTemperature">Rate of Change of Engine Temperature:</label>
                <input type="number" id="rateOfChangeOfEngineTemperature" required step="any" /><br />

                <label htmlFor="timePoint">Time Point:</label>
                <input type="number" id="timePoint" required step="1" /><br />

                <label htmlFor="fuelSamplingFrequency">Fuel Sampling Frequency:</label>
                <input type="number" id="fuelSamplingFrequency" required step="1" /><br />

                <label htmlFor="temperatureSamplingFrequency">Temperature Sampling Frequency:</label>
                <input type="number" id="temperatureSamplingFrequency" required step="1" /><br />

                <label htmlFor="tireSamplingFrequency">Tire Sampling Frequency:</label>
                <input type="number" id="tireSamplingFrequency" required step="1" /><br />

                <label htmlFor="seatBeltSamplingFrequency">Seat Belt Sampling Frequency:</label>
                <input type="number" id="seatBeltSamplingFrequency" required step="1" /><br />

                <label htmlFor="speed">Speed:</label>
                <input type="number" id="speed" required step="any" /><br />

                <label htmlFor="initialBrakeWear">Initial Brake Wear:</label>
                <input type="number" id="initialBrakeWear" required step="any" /><br />

                <label htmlFor="brakeWearChangeRate">Brake Wear Change Rate:</label>
                <input type="number" id="brakeWearChangeRate" required step="any" /><br />

                <button type="button" onClick={calculate}>Calculate</button>
            </form>

            {simulationResults && (
                <>
                    <div>
                        <h2>Simulation Results</h2>
                        {Object.keys(simulationResults).map((key) => (
                            <div key={key}>
                                <h3>{key}</h3>
                                <pre>{JSON.stringify(simulationResults[key], null, 2)}</pre>
                            </div>
                        ))}
                    </div>

                    {/* <table>
                        <thead>
                            {Object.keys(simulationResults[key][0]).map((header) => (
                                <th key={header}>{header}</th>
                            ))}
                        </thead>
                        <tbody>
                            {simulationResults[key].map((item, index) => (
                                <tr key={index}>
                                    {Object.values(item).map((value, index) => (
                                        <td key={index}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                </>

            )}
        </div>
    );
};

export default MotorSimulation;
