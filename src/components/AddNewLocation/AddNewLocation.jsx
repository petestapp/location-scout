import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react';

function AddNewLocation(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Add New Location');
  const list = store.list;
  const user = store.user;

  const [newLocation, setNewLocation] = useState({
    name: '',
    city: '',
    state: '',
    zip: 0,
    latitude: 0,
    longitude: 0
  })

  const getName = (action) => {
    setNewLocation({...newLocation, name: event.target.value});
  }

  const getCity = (action) => {
    setNewLocation({...newLocation, city: event.target.value});
  }

  const getState = (action) => {
    setNewLocation({...newLocation, state: event.target.value});
  }

  const getZip = (action) => {
    setNewLocation({...newLocation, zip: event.target.value});
  }

  const getLatitude = (action) => {
    setNewLocation({...newLocation, latitude: event.target.value});
  }

  const getLongitude = (action) => {
    setNewLocation({...newLocation, longitude: event.target.value});
  }

  const submitNewLocation = () => {
    event.preventDefault();
    dispatch({
      type: 'ADD_NEW_LOCATION',
      payload: newLocation
    })
  }

  return (
    <div>
      <h2>{heading}</h2>
      <h3>User ID: {user.id}</h3>
      <h4>{list.name}</h4>
      <form onSubmit={submitNewLocation}>
        <label>
          New Location:
          <input type="text" name="name" placeholder="Location Name" onChange={(event)=>getName(event)}/>
          <input type="text" name="city" placeholder="City" onChange={(event)=>getCity(event)}/>
          <input type="text" name="state" placeholder="State" onChange={(event)=>getState(event)}/>
          <input type="number" name="zip" placeholder="ZIP Code" onChange={(event)=>getZip(event)}/>
          <input type="number" name="latitude" placeholder="Latitude" onChange={(event)=>getLatitude(event)}/>
          <input type="number" name="longitude" placeholder="Longitude" onChange={(event)=>getLongitude(event)}/>
        </label>
        <input type="submit"/>
      </form>
    </div>
  );
}

export default AddNewLocation;
