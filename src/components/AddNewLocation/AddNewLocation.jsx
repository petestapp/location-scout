import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import AddNewLocationMap from '../AddNewLocationMap/AddNewLocationMap';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Geocode from 'react-geocode';

function AddNewLocation(props) {
  const store = useSelector((store) => store);
  const list = store.list;
  const listDetails = store.listdetails;
  const user = store.user;
  const coordinates = store.coordinates;


  Geocode.setApiKey("AIzaSyBpo6Q4DczOsVdDNje6c90zj-QmEsE-fY4");
  Geocode.setLanguage("en");

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const [center, setCenter] = useState({
    lat: 44.02606410083139,
    lng: -92.92343910969794
  })

  // function AddNewLocationMap() {
  const dispatch = useDispatch();

  const [clickedLocation, setClickedLocation] = useState({
    latitude: 0,
    longitude: 0,
    city: '',
    state: '',
    zip: 0
  })




  const sendCoordinates = (event) => {
    Geocode.fromLatLng(event.latLng.lat(), event.latLng.lng()).then(
      (response) => {
        let city, state, zip;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          console.log(response)
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].short_name;
                break;
              case "postal_code":
                zip = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        console.log('city, state, zip', city, state, zip);
        dispatch({
          type: 'SET_CLICKED_COORDINATES',
          payload: {
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng(),
            city: city,
            state: state,
            zip: zip
          }
        })
        // setClickedLocation({
        setNewLocation({
          latitude: event.latLng.lat(),
          longitude: event.latLng.lng(),
          city: city,
          state: state,
          zip: zip,
          name: '',
          rating: '',
          comments: '',
          userID: user.id,
          listID: list.id,
          inputID: listDetails.id,
        });
      },
      (error) => {
        console.error(error);
      }
    );

    dispatch({
      type: 'SET_CLICKED_COORDINATES',
      payload: {
        latitude: event.latLng.lat(),
        longitude: event.latLng.lng()
      }
    })
  }

  // return (
  // <div>
  //   <LoadScript
  //     googleMapsApiKey="AIzaSyBpo6Q4DczOsVdDNje6c90zj-QmEsE-fY4"
  //   >
  //     <GoogleMap
  //       mapContainerStyle={containerStyle}
  //       center={center}
  //       zoom={10}
  //       onClick={event => {
  //         sendCoordinates(event)
  //       }}
  //     >
  //       { /* Child components, such as markers, info windows, etc. */}
  //     </GoogleMap>
  //   </LoadScript>
  //   <input class="form-control" type="text" name="city" id="city" placeholder="city" value={clickedLocation.city} />
  // </div>
  //   )
  // }




  // const [clickedLocation, setClickedLocation] = useState({
  //   latitude: null,
  //   longitude: null,
  //   city: null,
  //   state: null,
  //   zip: null
  // })




  // const sendCoordinates = (event) => {
  //   Geocode.fromLatLng(event.latLng.lat(), event.latLng.lng()).then(
  //     (response) => {
  //       let city, state, zip;
  //       for (let i = 0; i < response.results[0].address_components.length; i++) {
  //         console.log(response)
  //         for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
  //           switch (response.results[0].address_components[i].types[j]) {
  //             case "locality":
  //               city = response.results[0].address_components[i].long_name;
  //               break;
  //             case "administrative_area_level_1":
  //               state = response.results[0].address_components[i].short_name;
  //               break;
  //             case "postal_code":
  //               zip = response.results[0].address_components[i].long_name;
  //               break;
  //           }
  //         }
  //       }
  //       console.log('city, state, zip', city, state, zip);
  //       dispatch({
  //         type: 'SET_CLICKED_COORDINATES',
  //         payload: {
  //           latitude: event.latLng.lat(),
  //           longitude: event.latLng.lng(),
  //           city: city,
  //           state: state,
  //           zip: zip
  //         }
  //       })
  //       setClickedLocation({
  //         latitude: event.latLng.lat(),
  //         longitude: event.latLng.lng(),
  //         city: city,
  //         state: state,
  //         zip: zip
  //       })
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );

  //   dispatch({
  //     type: 'SET_CLICKED_COORDINATES',
  //     payload: {
  //       latitude: event.latLng.lat(),
  //       longitude: event.latLng.lng()
  //     }
  //   })
  // }






  // const dispatch = useDispatch();
  const [newLocation, setNewLocation] = useState({
    name: '',
    city: '',
    state: '',
    zip: 0,
    latitude: 0,
    longitude: 0,
    rating: '',
    comments: '',
    userID: user.id,
    listID: list.id,
    inputID: listDetails.id,
  })

  const handleChangeNewLocation = (event) => {
    setNewLocation({ ...newLocation, [event.target.name]: event.target.value });
  }

  const submitNewLocation = () => {
    event.preventDefault();
    dispatch({
      type: 'ADD_NEW_LOCATION',
      payload: newLocation
    })
    setNewLocation({
      name: '',
      city: '',
      state: '',
      zip: 0,
      latitude: 0,
      longitude: 0,
      rating: '',
      comments: '',
      userID: user.id,
      listID: list.id,
      inputID: listDetails.id,
    })
  }

  return (
    <div class="modal-body">
      <div>
        <div>
          <LoadScript
            googleMapsApiKey="AIzaSyBpo6Q4DczOsVdDNje6c90zj-QmEsE-fY4"
          >
            <div class="container-sm pb-4">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={event => {
                  sendCoordinates(event)
                }}
              >
              </GoogleMap>
            </div>
          </LoadScript>
        </div>
      </div>

      <form onSubmit={submitNewLocation}>

        <div class="form-floating mb-3">
          <input class="form-control" type="text" name="name" id="name" placeholder="name" onChange={(event) => handleChangeNewLocation(event)} />
          <label for="name">Name</label>
        </div>

        <div class="row g-2">
          <div class="form-floating col-md-5 mb-3">
            <input class="form-control" type="text" name="city" id="city" placeholder="city" value={newLocation.city} onChange={(event) => handleChangeNewLocation(event)} />
            <label for="city">City</label>
          </div>
          <div class="form-floating col-md-4 mb-3">
            <select class="form-select" name="state" id="state" placeholder="state" value={newLocation.state} onChange={(event) => handleChangeNewLocation(event)}>
              <option selected>Select</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Louisiana</option>
              <option value="LA">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="DC">Washington DC</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            <label for="state">State</label>
          </div>
          <div class="form-floating col-md-3 mb-3">
            <input class="form-control" type="text" name="zip" id="zip" placeholder="ZIP code" value={newLocation.zip} onChange={(event) => handleChangeNewLocation(event)} />
            <label for="number">ZIP Code</label>
          </div>
        </div>

        <div class="row g-2">
          <div class="col-md-4 mg-3 form-floating">
            <input class="form-control" type="text" name="latitude" id="latitude" placeholder="latitude" value={newLocation.latitude} onChange={(event) => handleChangeNewLocation(event)} />
            <label for="latitude">Latitude</label>
          </div>
          <div class="col-md-4 mb-3 form-floating">
            <input class="form-control" type="text" name="longitude" id="longitude" placeholder="longitude" value={newLocation.longitude} onChange={(event) => handleChangeNewLocation(event)} />
            <label for="longitude">Longitude</label>
          </div>
          <div class="col-md-4 mb-3 form-floating">
            <input class="form-control" type="text" name="rating" id="rating" placeholder="rating" onChange={(event) => handleChangeNewLocation(event)} />
            <label for="rating">Rating</label>
          </div>
        </div>
        <div class="form-floating mb-3">
          <textarea name="comments" placeholder="comments" id="comments" onChange={(event) => handleChangeNewLocation(event)} class="form-control" rows="3" />
          <label for="comments">Comments</label>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
        </div>
      </form>

    </div>
  )
}

export default AddNewLocation;
