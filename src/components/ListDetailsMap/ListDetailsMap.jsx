import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function ListDetailsMap(props) {

    const latitudes = props.info.map((latty, index) =>
        Number(latty.latitude)
    );
    const longitudes = props.info.map((longy, index) =>
        Number(longy.longitude)
    )
    const getInfo = () => {
        console.log('in getInfo');
    }
    const markers = latitudes.map((latitude, index) =>
        <Marker
            onClick={getInfo}
            position={{
                lat: latitude,
                lng: longitudes[index]
            }}
        />
    );

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: 44.02606410083139,
        lng: -92.92343910969794
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBpo6Q4DczOsVdDNje6c90zj-QmEsE-fY4"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={9}
            >
                {markers}
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(ListDetailsMap)