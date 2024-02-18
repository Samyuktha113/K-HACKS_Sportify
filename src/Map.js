// src/components/SimpleMap.js

import React, { useState } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, LoadScript } from '@react-google-maps/api';

const SimpleMap = ({ origin, destination }) => {
  const [response, setResponse] = useState(null);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 0,
    lng: 0,
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCQR1_NQrVi-hi7wmC_uHsLXqVfollJoQw"
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        options={options}
      >
        <DirectionsService
          options={{
            destination: destination,
            origin: origin,
            travelMode: 'DRIVING',
          }}
          callback={(response) => {
            if (response !== null) {
              setResponse(response);
            }
          }}
        />
        {response && <DirectionsRenderer directions={response} options={{ polylineOptions: { strokeColor: 'red' } }} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default SimpleMap;
