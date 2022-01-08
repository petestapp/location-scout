import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    GoogleMap, LoadScript,
    // DrawingManager,
    Data
} from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

function AddNewLocationMap() {
    const dispatch = useDispatch();

    const [clickedCoordinates, setClickedCoordinates] = useState({
        latitude: 0,
        longitude: 0
    });


    const handleMapClick = (event) => {
        setClickedCoordinates({
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng()
        });
        sendCoordinates();
    }

    const sendCoordinates = (event) => {
        dispatch({
            type: 'SET_CLICKED_COORDINATES',
            payload: {
                latitude: event.latLng.lat(),
                longitude: event.latLng.lng()
            }
        })
    }

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBpo6Q4DczOsVdDNje6c90zj-QmEsE-fY4"
        >
            {JSON.stringify(clickedCoordinates)}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={event => {
                    sendCoordinates(event)
                }}
            >
                { /* Child components, such as markers, info windows, etc. */}
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(AddNewLocationMap)