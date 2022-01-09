import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LocationDetailsMap from '../LocationDetailsMap/LocationDetailsMap';
import ListDetailsMap from '../ListDetailsMap/ListDetailsMap';
import AddNewLocationMap from '../AddNewLocationMap/AddNewLocationMap';
import AddNewLocation from '../AddNewLocation/AddNewLocation';

function ListDetails(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const list = store.list;
  const listDetails = store.listdetails;
  const user = store.user;
  const coordinates = store.coordinates;

  useEffect(() => {
    const coordinates = listDetails.map((location) => { location.latitude }
    );
    dispatch({
      type: 'GET_LIST_DETAILS',
      payload: list.id
    });
    console.log('ListDetails:', listDetails);
    console.log('coordinates DETAILS:', coordinates)
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

  const [selectedLocation, setSelectedLocation] = useState({
    name: '',
    city: '',
    state: '',
    zip: 0,
    latitude: 0,
    longitude: 0,
    rating: '',
    comments: '',
    id: 0,
    listID: list.id
  });

  const clickOnLocation = (place) => {
    console.log(place);
    setSelectedLocation({
      name: place.name,
      city: place.city,
      state: place.state,
      zip: place.zip,
      latitude: place.latitude,
      longitude: place.longitude,
      rating: place.rating,
      comments: place.comments,
      inputID: place.id,
      listID: list.id,
      locationID: place.location_id
    });
  }



  const handleChangeExistingLocation = (event) => {
    setSelectedLocation({ ...selectedLocation, [event.target.name]: event.target.value });
  }

  const submitEditedLocation = () => {
    event.preventDefault();
    dispatch({
      type: "EDIT_LOCATION",
      payload: selectedLocation
    });
  }

  const deleteLocation = () => {
    console.log('in deleteLocation:', selectedLocation);
    dispatch({
      type: "DELETE_LOCATION",
      payload: {
        locationID: selectedLocation.locationID,
        listID: list.id
      }
    });
  }

  const deleteList = () => {
    console.log('in deleteList, list to deleted:', list.id);
    console.log('user.id:', user.id);
    dispatch({
      type: "DELETE_LIST",
      payload: {
        listID: list.id,
        userID: user.id
      }
    });
    setIsDeleted(true);
  }

  const [isDeleted, setIsDeleted] = useState(false);

  return (
    <div className="container">
      {isDeleted ? <h2><del>{list.name}</del></h2> :
        <h2>{list.name}</h2>}
      <div>
        <ListDetailsMap info={listDetails} />
      </div>
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
          {listDetails.sort((a, b) => a.id - b.id).map((place, index) => (
            <tr key={place.id}>
              <td>{place.name}</td>
              <td>{place.city}, {place.state}</td>
              <td>{place.rating}</td>
              <td>
                <button type="button" class="btn btn-outline-primary float-end" data-bs-toggle="modal" data-bs-target="#showLocationDetails" onClick={() => clickOnLocation(place)}>
                  More Info
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteListConfirm">
        Delete List
      </button>
      <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#addNewLocation">
        Add New Location
      </button>

      {/* deleteListConfirm */}
      <div class="modal fade" id="deleteListConfirm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteListConfirm" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteListConfirm">Are you sure?</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              This action cannot be reversed.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" data-bs-target="#postListDelete" data-bs-toggle="modal" onClick={deleteList}>Confirm</button>
            </div>
          </div>
        </div>
      </div>

      {/* postDelete */}
      <div class="modal fade" id="postListDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="postDelete" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="postDelete">List Deleted</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-footer">
              <Link to="/mylists">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Go back to my lists</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* showLocationDetails */}
      <div class="modal fade" id="showLocationDetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              {selectedLocation.name}
            </div>
            <div class="modal-body">
              <div>
                <LocationDetailsMap
                  lat={selectedLocation.latitude}
                  lng={selectedLocation.longitude}
                />
              </div>
              {selectedLocation.city}, {selectedLocation.state}, {selectedLocation.zip}
              <br />
              {selectedLocation.latitude}, {selectedLocation.longitude}
              <br />
              {selectedLocation.rating}, {selectedLocation.comments}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" data-bs-target="#editLocation" data-bs-toggle="modal">Edit</button>
            </div>
          </div>
        </div>
      </div>

      {/* editLocation */}
      <div class="modal fade" id="editLocation" tabindex="-1" aria-labelledby="EditLocationModal" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLocation">Edit Location</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={submitEditedLocation}>

                <div class="form-floating mb-3">
                  <input class="form-control" type="text" name="name" id="name" value={selectedLocation.name} onChange={(event) => handleChangeExistingLocation(event)} />
                  <label for="name">Name</label>
                </div>

                <div class="row g-2">
                  <div class="form-floating col-md-5 mb-3">
                    <input class="form-control" type="text" name="city" id="city" value={selectedLocation.city} onChange={(event) => handleChangeExistingLocation(event)} />
                    <label for="city">City</label>
                  </div>
                  <div class="form-floating col-md-4 mb-3">
                    <select class="form-select" name="state" id="state" value={selectedLocation.state} onChange={(event) => handleChangeExistingLocation(event)}>
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
                    <label for="state">State</label>
                  </div>
                  <div class="form-floating col-md-3 mb-3">
                    <input class="form-control" type="text" name="zip" id="zip" value={selectedLocation.zip} onChange={(event) => handleChangeExistingLocation(event)} />
                    <label for="zip">ZIP Code</label>
                  </div>
                </div>
                <div class="row g-2">
                  <div class="form-floating col-md-4 mg-3">
                    <input class="form-control" type="text" name="latitude" id="latitude" value={selectedLocation.latitude} onChange={(event) => handleChangeExistingLocation(event)} />
                    <label for="latitude">Latitude</label>
                  </div>
                  <div class="form-floating col-md-4 mb-3">
                    <input class="form-control" type="text" name="longitude" value={selectedLocation.longitude} onChange={(event) => handleChangeExistingLocation(event)} />
                    <label for="longitude">Longitude</label>
                  </div>
                  <div class="form-floating col-md-4 mb-3">
                    <input class="form-control" type="text" name="rating" id="rating" value={selectedLocation.rating} onChange={(event) => handleChangeExistingLocation(event)} />
                    <label for="rating">Rating</label>
                  </div>
                </div>
                <div class="form-floating mb-3">
                  <textarea name="comments" placeholder="comments" id="comments" value={selectedLocation.comments} onChange={(event) => handleChangeExistingLocation(event)} class="form-control" rows="3" />
                  <label for="comments">Comments</label>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger float-start" data-bs-toggle="modal" data-bs-target="#deleteLocationConfirm">
                    Delete
                  </button>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* deleteLocationConfirm */}
      <div class="modal fade" id="deleteLocationConfirm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteLocationConfirm" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteLocationConfirm">Are you sure?</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              This action cannot be reversed.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={deleteLocation}>Confirm</button>
            </div>
          </div>
        </div>
      </div>

      {/* addNewLocation */}
      <div class="modal fade" id="addNewLocation" tabindex="-1" aria-labelledby="addNewLocationModal" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add New Location</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <AddNewLocation />
            {/* <div class="modal-body">
              <div>
                <AddNewLocationMap />
              </div>

              <form onSubmit={submitNewLocation}>

                <div class="form-floating mb-3">
                  <input class="form-control" type="text" name="name" id="name" placeholder="name" onChange={(event) => handleChangeNewLocation(event)} />
                  <label for="name">Name</label>
                </div>

                <div class="row g-2">
                  <div class="form-floating col-md-5 mb-3">
                    <input class="form-control" type="text" name="city" id="city" placeholder="city" value={coordinates.city} onChange={(event) => handleChangeNewLocation(event)} />
                    <label for="city">City</label>
                  </div>
                  <div class="form-floating col-md-4 mb-3">
                    <select class="form-select" name="state" id="state" placeholder="state" defaultValue={coordinates.state} onChange={(event) => handleChangeNewLocation(event)}>
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
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                    <label for="state">State</label>
                  </div>
                  <div class="form-floating col-md-3 mb-3">
                    <input class="form-control" type="text" name="zip" id="zip" placeholder="ZIP code" value={coordinates.zip} onChange={(event) => handleChangeNewLocation(event)} />
                    <label for="number">ZIP Code</label>
                  </div>
                </div>

                <div class="row g-2">
                  <div class="col-md-4 mg-3 form-floating">
                    <input class="form-control" type="text" name="latitude" id="latitude" placeholder="latitude" value={coordinates.latitude} onChange={(event) => handleChangeNewLocation(event)} />
                    <label for="latitude">Latitude</label>
                  </div>
                  <div class="col-md-4 mb-3 form-floating">
                    <input class="form-control" type="text" name="longitude" id="longitude" placeholder="longitude" value={coordinates.longitude} onChange={(event) => handleChangeNewLocation(event)} />
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

            </div> */}
          </div>
        </div>
      </div>
    </div >
  );
}

export default ListDetails;
