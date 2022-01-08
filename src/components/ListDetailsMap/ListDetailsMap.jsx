import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    GoogleMap, LoadScript, Marker
    // , DrawingManager, useLoadScript
} from '@react-google-maps/api';


// const libraries = ['drawing'];
// const [libraries] = { ['drawing']}

function ListDetailsMap(props) {

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
    const markers = latitudes.map((latitude, index) =>
        <Marker
            position={{
                lat: latitude,
                lng: longitudes[index]
            }}
        />
    )

    const bounds = {
        // north: Math.min(...longitudes),
        north: -93.268343,
        // south: Math.max(...longitudes),
        south: -92.472042,
        // east: Math.min(...latitudes),
        east: 43.669267,
        // west: Math.max(...latitudes)
        west: 44.294833
    }



    const containerStyle = {
        width: '1116px',
        height: '400px'
    };

    // const latAverage = (latitudes)

    // const latAverage = (Number(listDetails[0].latitude) + Number(listDetails[1].latitude) + Number(listDetails[2].latitude)) / 3;
    // const lngAverage = (Number(listDetails[0].longitude) + Number(listDetails[1].longitude) + Number(listDetails[2].longitude)) / 3;

    const center = {
        lat: 44.294833,
        lng: -93.268343
    };

    // const onLoad = drawingManager => {
    //     console.log(drawingManager);
    // }

    // const onMarkerComplete = marker => {
    //     console.log(marker);
    // }

    // return
    // isLoaded ? <GoogleMap
    //     mapContainerStyle={containerStyle}
    //     center={center}
    //     zoom={9}
    // >
    //     <DrawingManager
    //         onLoad={onLoad}
    //         onMarkerComplete={onMarkerComplete}
    //         libraries
    //     />
    //     {markers}
    // </GoogleMap> : <></>
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBpo6Q4DczOsVdDNje6c90zj-QmEsE-fY4"
        // libraries
        >
            {JSON.stringify(bounds)}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={9}
            >
                {/* <DrawingManager
                    onLoad={onLoad}
                    onMarkerComplete={onMarkerComplete}
                /> */}
                {markers}
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(ListDetailsMap)