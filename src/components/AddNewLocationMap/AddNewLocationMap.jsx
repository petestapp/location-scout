// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
// import Geocode from 'react-geocode';

// Geocode.setApiKey("AIzaSyBpo6Q4DczOsVdDNje6c90zj-QmEsE-fY4");
// Geocode.setLanguage("en");

// const containerStyle = {
//     width: '400px',
//     height: '400px'
// };

// const center = {
//     lat: 44.1,
//     lng: -93.0
// };

// function AddNewLocationMap() {
//     const dispatch = useDispatch();

//     const [clickedLocation, setClickedLocation] = useState({
//         latitude: null,
//         longitude: null,
//         city: null,
//         state: null,
//         zip: null
//     })




//     const sendCoordinates = (event) => {
//         Geocode.fromLatLng(event.latLng.lat(), event.latLng.lng()).then(
//             (response) => {
//                 let city, state, zip;
//                 for (let i = 0; i < response.results[0].address_components.length; i++) {
//                     console.log(response)
//                     for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
//                         switch (response.results[0].address_components[i].types[j]) {
//                             case "locality":
//                                 city = response.results[0].address_components[i].long_name;
//                                 break;
//                             case "administrative_area_level_1":
//                                 state = response.results[0].address_components[i].short_name;
//                                 break;
//                             case "postal_code":
//                                 zip = response.results[0].address_components[i].long_name;
//                                 break;
//                         }
//                     }
//                 }
//                 console.log('city, state, zip', city, state, zip);
//                 dispatch({
//                     type: 'SET_CLICKED_COORDINATES',
//                     payload: {
//                         latitude: event.latLng.lat(),
//                         longitude: event.latLng.lng(),
//                         city: city,
//                         state: state,
//                         zip: zip
//                     }
//                 })
//                 setClickedLocation({
//                     latitude: event.latLng.lat(),
//                     longitude: event.latLng.lng(),
//                     city: city,
//                     state: state,
//                     zip: zip
//                 })
//             },
//             (error) => {
//                 console.error(error);
//             }
//         );

//         dispatch({
//             type: 'SET_CLICKED_COORDINATES',
//             payload: {
//                 latitude: event.latLng.lat(),
//                 longitude: event.latLng.lng()
//             }
//         })
//     }

//     return (
//         <div>
//             <LoadScript
//                 googleMapsApiKey="AIzaSyBpo6Q4DczOsVdDNje6c90zj-QmEsE-fY4"
//             >
//                 <GoogleMap
//                     mapContainerStyle={containerStyle}
//                     center={center}
//                     zoom={10}
//                     onClick={event => {
//                         sendCoordinates(event)
//                     }}
//                 >
//                     { /* Child components, such as markers, info windows, etc. */}
//                 </GoogleMap>
//             </LoadScript>
//             <input class="form-control" type="text" name="city" id="city" placeholder="city" value={clickedLocation.city} />
//         </div>
//     )
// }

// export default React.memo(AddNewLocationMap)