import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import listdetails from '../../redux/reducers/listdetails.reducer';

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
    })
  }

  const [clickedLocationIndex, setClickedLocationIndex] = useState(0);

  const setClickedLocation = (index) => {
    setClickedLocationIndex(index);
    console.log('clickedLocationIndex:', clickedLocationIndex)
  }

  return (
    <div>
      <h2>{list.name}</h2>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Rating</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {listDetails.map((place, index) => (
            <tr key={index}>
              <td>{index}, {place.name}</td>
              <td>{place.city}, {place.state}</td>
              <td>{place.rating}</td>
              <td>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showLocationDetails" onClick={() => setClickedLocation(index)}>
                  More Info
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div class="modal fade" id="showLocationDetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              {listDetails[clickedLocationIndex].name}
            </div>
          </div>
        </div>
      </div>

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
                    <input class="form-control" type="text" name="name" placeholder="name" onChange={(event) => handleChangeNewLocation(event)} />
                  </div>

                  <div class="row">
                    <div class="col-md-5 mb-3">
                      <label class="form-label">City</label>
                      <input class="form-control" type="text" name="city" placeholder="city" onChange={(event) => handleChangeNewLocation(event)} />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">State</label>
                      <select class="form-select" name="state" placeholder="State" onChange={(event) => handleChangeNewLocation(event)}>
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
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                    </div>
                    <div class="col-md-3 mb-3">
                      <label class="form-label">ZIP Code</label>
                      <input class="form-control" type="text" name="zip" placeholder="ZIP code" onChange={(event) => handleChangeNewLocation(event)} />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4 mg-3">
                      <label class="form-label">Latitude</label>
                      <input class="form-control" type="text" name="latitude" placeholder="latitude" onChange={(event) => handleChangeNewLocation(event)} />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Longitude</label>
                      <input class="form-control" type="text" name="longitude" placeholder="longitude" onChange={(event) => handleChangeNewLocation(event)} />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Rating</label>
                      <input class="form-control" type="text" name="rating" placeholder="rating" onChange={(event) => handleChangeNewLocation(event)} />
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Comments</label>
                    <textarea name="comments" placeholder="comments" onChange={(event) => handleChangeNewLocation(event)} class="form-control" rows="3"></textarea>
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
    </div>
  );
}

export default ListDetails;
