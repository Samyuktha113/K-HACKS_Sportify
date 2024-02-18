const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3001; // Change this to your desired port

app.use(bodyParser.json());

// MySQL database connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'khacks',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Endpoint to handle inserting data into the cardata table
app.post('/insertData', (req, res) => {
  const {
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
    brakeWearChangeRate,
  } = req.body;

  const insertQuery = `
    INSERT INTO cardata
    (averageFuelConsumption, oilHealthAffectedPerPercentage, initialFuelLevel, initialEngineTemperature,
     rateOfChangeOfEngineTemperature, timePoint, fuelSamplingFrequency,
     temperatureSamplingFrequency, tireSamplingFrequency, seatBeltSamplingFrequency,
     speed, initialBrakeWear, brakeWearChangeRate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  connection.query(
    insertQuery,
    [
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
      brakeWearChangeRate,
    ],
    (err, results) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Data inserted into cardata table:', results);
        res.status(200).send('Data inserted successfully');
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
