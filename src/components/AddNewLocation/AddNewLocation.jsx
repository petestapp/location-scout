import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    longitude: 0,
    rating: '',
    comments: '',
    userID: user.id,
    listID: list.id
  })

  const handleChange = (event) => {
    setNewLocation({...newLocation, [event.target.name]: event.target.value});
  }

  const submitNewLocation = () => {
    event.preventDefault();
    dispatch({
      type: 'ADD_NEW_LOCATION',
      payload: newLocation
    })
  }

  const consoleLogNewLocation = () => {
    console.log('newLocation:', newLocation);
  }

  return (
    <div>
      <h2>{heading}</h2>
      <h3>User ID: {user.id}</h3>
      <h4>{list.name}</h4>
      <button onClick={consoleLogNewLocation}>console.log newLocation</button>
      <form onSubmit={submitNewLocation}>
        <label>
          New Location:
          <input type="text" name="name" placeholder="Location Name" onChange={(event)=>handleChange(event)}/>
          <input type="text" name="city" placeholder="City" onChange={(event)=>handleChange(event)}/>
          <input type="text" name="state" placeholder="State" onChange={(event)=>handleChange(event)}/>
          <input type="number" name="zip" placeholder="ZIP Code" onChange={(event)=>handleChange(event)}/>
          <input type="number" name="latitude" placeholder="Latitude" onChange={(event)=>handleChange(event)}/>
          <input type="number" name="longitude" placeholder="Longitude" onChange={(event)=>handleChange(event)}/>
          <br/>
          <input type="text" name="rating" placeholder="rating" onChange={(event)=>handleChange(event)}/>
          <input type="text" name="comments" placeholder="comments" onChange={(event)=>handleChange(event)}/>
        </label>
        <input type="submit"/>
      </form>
    </div>
  );
}

export default AddNewLocation;
