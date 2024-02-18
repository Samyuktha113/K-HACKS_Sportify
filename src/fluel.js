import React from 'react';
import './index.css';
const FuelLevel = ({ level }) => {

  const validatedLevel = Math.min(Math.max(level, 0), 100);

  return (
    <div>
      <h2>Fuel Level</h2>
      <div className="fuel-container">
        <div
          className="fuel-level"
          style={{ width: `${validatedLevel}%` }}
        ></div>
      </div>
      <p>{`${validatedLevel}%`}</p>
    </div>
  );
};

export default FuelLevel;
