import React, { useEffect } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '450px',
  height: '400px'
};

function LocationDetailsMap(props) {

  useEffect(() => {
    console.log(center);
  }, []);

  const latitude = Number(props.lat);
  const longitude = Number(props.lng);

  const center = {
    lat: latitude,
    lng: longitude
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBpo6Q4DczOsVdDNje6c90zj-QmEsE-fY4"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript >
  )
}

export default React.memo(LocationDetailsMap)