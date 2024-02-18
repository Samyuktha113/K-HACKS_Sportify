import React, { useState } from 'react';
import './App.css';
import './index.css';
import { calculateFuelLevel, FuelLevel } from './FuelLevel';
import Odometer from './Odometer';
import SpeedSimulator from './Speed';
import EnergySimulator from './Energy';
import TirePressureSimulator from './pressure';
// import MotorSimulation from './Motor';
import SimpleMap from './Map';

function App() {
  const [fuelLevels, setFuelLevels] = useState([]);
  const [timeUnit, setTimeUnit] = useState('');
  const [time, setTime] = useState('');
  const [displayFrequency, setDisplayFrequency] = useState('');
  
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  
  const handleCalculateFuelLevel = () => {
    const initialFuelVolume = 30;
    const totalFuelCapacity = 50;
    const fuelConsumptionRate = 0.1;

    if (!timeUnit || !time || !displayFrequency) {
      alert('Please enter time unit, time, and display frequency.');
      return;
    }

    const simulationDuration = convertToSeconds(timeUnit, parseInt(time, 10));
    const frequency = parseInt(displayFrequency, 10);
    const calculatedFuelLevels = calculateFuelLevel(
      initialFuelVolume,
      totalFuelCapacity,
      fuelConsumptionRate,
      simulationDuration,
      frequency
    );
    setFuelLevels(calculatedFuelLevels);
    
  };

  const convertToSeconds = (unit, value) => {
    if (unit === 's') {
      return value;
    } else if (unit === 'm') {
      return value * 60;
    } else {
      alert('Invalid time unit. Please use "s" for seconds or "m" for minutes.');
      return 0;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Vehicle Simulator</h1>
          <h2>Fuel level Calculator </h2>
          <label>
            Choose time unit:
            <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)}>
              <option value="">Select</option>
              <option value="s">Seconds</option>
              <option value="m">Minutes</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Enter the time:
            <input type="number" value={time} onChange={(e) => setTime(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Enter display frequency:
            <input type="number" value={displayFrequency} onChange={(e) => setDisplayFrequency(e.target.value)} />
          </label>
        </div>
        <div>
          {/* <label>
            Start Location:
            <input
              type="text"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
          </label>
          <label>
            End Location:
            <input
              type="text"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
            />
          </label> */}
        </div>


        <button onClick={handleCalculateFuelLevel}>Calculate Fuel Level</button>
        <ul>
          {fuelLevels.map((level, index) => (
            <li key={index}>{`At ${level.timeElapsed} seconds, fuel level is ${level.fuelLevelPercent.toFixed(2)}%`}</li>
          ))}
        </ul>
        <div>
          <Odometer />
          <SpeedSimulator />
          <EnergySimulator />
          <TirePressureSimulator />

          <br>
          
          </br>
          {/* //<MotorSimulation /> */}
          <SimpleMap origin={startLocation} destination={endLocation} />
        </div>
      </header>
    </div>
  );
}

export default App;













// import React, { useState } from 'react';
// import './App.css';
// import './index.css';
// import { calculateFuelLevel } from './FuelLevel';
// import Odometer from './Odometer';
// import SpeedSimulator from './Speed';
// import EnergySimulator from './Energy';
// import TirePressureSimulator from './pressure';
// import MotorSimulation from './Motor';
// import SimpleMap from './Map';

// function App() {
//   const [fuelLevels, setFuelLevels] = useState([]);
//   const [timeUnit, setTimeUnit] = useState('');
//   const [time, setTime] = useState('');
//   const [displayFrequency, setDisplayFrequency] = useState('');

//   const [startLocation, setStartLocation] = useState('');
//   const [endLocation, setEndLocation] = useState('');

//   const handleCalculateFuelLevel = () => {
//     const initialFuelVolume = 30;
//     const totalFuelCapacity = 50;
//     const fuelConsumptionRate = 0.1;

//     if (!timeUnit || !time || !displayFrequency) {
//       alert('Please enter time unit, time, and display frequency.');
//       return;
//     }

//     const simulationDuration = convertToSeconds(timeUnit, parseInt(time, 10));
//     const frequency = parseInt(displayFrequency, 10);
//     const calculatedFuelLevels = calculateFuelLevel(
//       initialFuelVolume,
//       totalFuelCapacity,
//       fuelConsumptionRate,
//       simulationDuration,
//       frequency
//     );
//     setFuelLevels(calculatedFuelLevels);

//     // Assuming you have these values available in your component state
//     const dataToSend = {
//       averageFuelConsumption: /* value */,
//       oilHealthAffected: /* value */,
//       initialFuelLevel: /* value */,
//       initialEngineTemperature: /* value */,
//       rateOfChangeOfEngineTemperature: /* value */,
//       timePoint: /* value */,
//       fuelSamplingFrequency: /* value */,
//       temperatureSamplingFrequency: /* value */,
//       tireSamplingFrequency: /* value */,
//       seatBeltSamplingFrequency: /* value */,
//       speed: /* value */,
//       initialBrakeWear: /* value */,
//       brakeWearChangeRate: /* value */,
//     };

//     // Make a POST request to the server to insert the data into the MySQL database
//     fetch('http://localhost:3001/insertData', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(dataToSend),
//     })
//       .then((response) => {
//         if (response.ok) {
//           console.log('Data inserted successfully');
//         } else {
//           console.error('Failed to insert data');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   const convertToSeconds = (unit, value) => {
//     if (unit === 's') {
//       return value;
//     } else if (unit === 'm') {
//       return value * 60;
//     } else {
//       alert('Invalid time unit. Please use "s" for seconds or "m" for minutes.');
//       return 0;
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <div>
//           <h1>Fuel level Calculator </h1>
//           <label>
//             Choose time unit:
//             <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)}>
//               <option value="">Select</option>
//               <option value="s">Seconds</option>
//               <option value="m">Minutes</option>
//             </select>
//           </label>
//         </div>
//         <div>
//           <label>
//             Enter the time:
//             <input type="number" value={time} onChange={(e) => setTime(e.target.value)} />
//           </label>
//         </div>
//         <div>
//           <label>
//             Enter display frequency:
//             <input type="number" value={displayFrequency} onChange={(e) => setDisplayFrequency(e.target.value)} />
//           </label>
//         </div>
//         <div>
//           <label>
//             Start Location:
//             <input
//               type="text"
//               value={startLocation}
//               onChange={(e) => setStartLocation(e.target.value)}
//             />
//           </label>
//           <label>
//             End Location:
//             <input
//               type="text"
//               value={endLocation}
//               onChange={(e) => setEndLocation(e.target.value)}
//             />
//           </label>
//         </div>

//         <button onClick={handleCalculateFuelLevel}>Calculate Fuel Level</button>
//         <ul>
//           {fuelLevels.map((level, index) => (
//             <li key={index}>{`At ${level.timeElapsed} seconds, fuel level is ${level.fuelLevelPercent.toFixed(2)}%`}</li>
//           ))}
//         </ul>
//         <div>
//           <Odometer />
//           <SpeedSimulator />
//           <EnergySimulator />
//           <TirePressureSimulator />
//           <MotorSimulation />
//           <SimpleMap origin={startLocation} destination={endLocation} />
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;
