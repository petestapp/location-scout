import React, { useEffect } from 'react'
import { GoogleMap, LoadScript, Marker, StreetViewService } from '@react-google-maps/api';

function LocationDetailsMap(props) {

  useEffect(() => {
    console.log(center);
  }, []);

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const onLoadMarker = marker => {
    console.log('marker: ', marker)
  }

  const onLoadStreetView = (streetViewService) => {
    streetViewService.getPanorama({
      location: center,
      radius: 50
    }, (data, status) => console.log(
      "StreetViewService results",
      { data, status }
    ))
  };

  const latitude = Number(props.lat);
  const longitude = Number(props.lng);

  const center = {
    lat: latitude,
    lng: longitude
  };

  const position = {
    lat: latitude,
    lng: longitude
  }

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBpo6Q4DczOsVdDNje6c90zj-QmEsE-fY4"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker
          onLoad={onLoadMarker}
          position={position}
        />
        <StreetViewService
          onLoad={onLoadStreetView}
        />
      </GoogleMap>
    </LoadScript >
  )
}

export default React.memo(LocationDetailsMap)