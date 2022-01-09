import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    GoogleMap, LoadScript, Marker
    // , DrawingManager, useLoadScript
} from '@react-google-maps/api';


// const libraries = ['drawing'];
// const [libraries] = { ['drawing']}

function ListDetailsMap(props) {

    const store = useSelector((store) => store);
    const listDetails = store.listdetails;

    // const [libraries] = useState(['drawing']);

    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: 'AIzaSyBpo6Q4DczOsVdDNje6c90zj-QmEsE-fY4',
    //     libraries
    // });

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
        lat: 44.294833,
        lng: -93.268343
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