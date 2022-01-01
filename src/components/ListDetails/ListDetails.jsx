import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ListDetails(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const list = store.list;
  const listDetails = store.listdetails;
  const user = store.user;

  useEffect(() => {
    console.log('in useEffect: list.id:', list.id);
    dispatch({
      type: 'GET_LIST_DETAILS',
      payload: list.id
    });
  }, []);

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
    setNewLocation({ ...newLocation, [event.target.name]: event.target.value });
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
      <h2>{list.name}</h2>
      <p>{list.id}</p>
      <ul>
        {listDetails.map((place, index) => (
          <li key={index}>id: {place.id}, {place.name}, {place.comments} <button>More info</button></li>
        ))}
      </ul>
      {/* <p>
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Add New Location
        </button>
      </p> */}
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewLocation">
        Add New Location
      </button>
      <div class="modal fade" id="addNewLocation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add New Location</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={submitNewLocation}>

                <label>
                  <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input class="form-control" type="text" name="name" placeholder="name" onChange={(event) => handleChange(event)} />
                  </div>

                  <div class="row">
                    <div class="col-md-5 mb-3">
                      <label class="form-label">City</label>
                      <input class="form-control" type="text" name="city" placeholder="city" onChange={(event) => handleChange(event)} />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">State</label>
                      <select class="form-select" name="state" placeholder="State" onChange={(event) => handleChange(event)}>
                        <option selected>State</option>
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
                      </select>
                    </div>
                    <div class="col-md-3 mb-3">
                      <label class="form-label">ZIP Code</label>
                      <input class="form-control" type="text" name="zip" placeholder="ZIP code" onChange={(event) => handleChange(event)} />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4 mg-3">
                      <label class="form-label">Latitude</label>
                      <input class="form-control" type="text" name="latitude" placeholder="latitude" onChange={(event) => handleChange(event)} />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Longitude</label>
                      <input class="form-control" type="text" name="longitude" placeholder="longitude" onChange={(event) => handleChange(event)} />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Rating</label>
                      <input class="form-control" type="text" name="comments" placeholder="rating" onChange={(event) => handleChange(event)} />
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Comments</label>
                    <textarea name="comments" placeholder="comments" onChange={(event) => handleChange(event)} class="form-control" rows="3"></textarea>
                  </div>
                </label>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div class="collapse" id="collapseExample">
        <div class="card card-body">
          <form onSubmit={submitNewLocation}>
            <label>
              New Location:
              <input type="text" name="name" placeholder="Location Name" onChange={(event) => handleChange(event)} />
              <input type="text" name="city" placeholder="City" onChange={(event) => handleChange(event)} />
              <input type="text" name="state" placeholder="State" onChange={(event) => handleChange(event)} />
              <input type="number" name="zip" placeholder="ZIP Code" onChange={(event) => handleChange(event)} />
              <input type="number" name="latitude" placeholder="Latitude" onChange={(event) => handleChange(event)} />
              <input type="number" name="longitude" placeholder="Longitude" onChange={(event) => handleChange(event)} />
              <br />
              <input type="text" name="rating" placeholder="rating" onChange={(event) => handleChange(event)} />
              <input type="text" name="comments" placeholder="comments" onChange={(event) => handleChange(event)} />
            </label>
            <input type="submit" />
          </form>
        </div>
      </div> */}
      {/* <Link to="/addnewlocation"><button>Add a New Location</button></Link> */}
    </div>
  );
}

export default ListDetails;

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// function AddNewLocation(props) {
//   const dispatch = useDispatch();
//   const store = useSelector((store) => store);
//   const [heading, setHeading] = useState('Add New Location');
//   const list = store.list;
//   const user = store.user;

//   const [newLocation, setNewLocation] = useState({
//     name: '',
//     city: '',
//     state: '',
//     zip: 0,
//     latitude: 0,
//     longitude: 0,
//     rating: '',
//     comments: '',
//     userID: user.id,
//     listID: list.id
//   })

//   const handleChange = (event) => {
//     setNewLocation({...newLocation, [event.target.name]: event.target.value});
//   }

//   const submitNewLocation = () => {
//     event.preventDefault();
//     dispatch({
//       type: 'ADD_NEW_LOCATION',
//       payload: newLocation
//     })
//   }

//   const consoleLogNewLocation = () => {
//     console.log('newLocation:', newLocation);
//   }

//   return (
//     <div>
//       <h2>{heading}</h2>
//       <h3>User ID: {user.id}</h3>
//       <h4>{list.name}</h4>
//       <button onClick={consoleLogNewLocation}>console.log newLocation</button>
      // <form onSubmit={submitNewLocation}>
      //   <label>
      //     New Location:
      //     <input type="text" name="name" placeholder="Location Name" onChange={(event)=>handleChange(event)}/>
      //     <input type="text" name="city" placeholder="City" onChange={(event)=>handleChange(event)}/>
      //     <input type="text" name="state" placeholder="State" onChange={(event)=>handleChange(event)}/>
      //     <input type="number" name="zip" placeholder="ZIP Code" onChange={(event)=>handleChange(event)}/>
      //     <input type="number" name="latitude" placeholder="Latitude" onChange={(event)=>handleChange(event)}/>
      //     <input type="number" name="longitude" placeholder="Longitude" onChange={(event)=>handleChange(event)}/>
      //     <br/>
      //     <input type="text" name="rating" placeholder="rating" onChange={(event)=>handleChange(event)}/>
      //     <input type="text" name="comments" placeholder="comments" onChange={(event)=>handleChange(event)}/>
      //   </label>
      //   <input type="submit"/>
      // </form>
//     </div>
//   );
// }

// export default AddNewLocation;
