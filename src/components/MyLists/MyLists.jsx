import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import { Link } from 'react-router-dom';

function MyLists() {
  const dispatch = useDispatch();
  const store = useReduxStore();
  const user = store.user;
  const [showAddNewList, setShowAddNewList] = useState(false);
  const [newList, setNewList] = useState({
    name: '',
    userID: user.id
  });

  useEffect(() => {
    console.log('in useEffect');
    dispatch({ type: 'GET_USER_LIST' });
  }, []);

  const setSelectedList = (list) => {
    let selectedList = list;
    dispatch({
      type: 'SET_SELECTED_LIST',
      payload: selectedList
    });
  }

  const handleChange = (event) => {
    setNewList({ ...newList, name: event.target.value });
  }

  const submitNewList = () => {
    event.preventDefault();
    dispatch({
      type: 'ADD_NEW_LIST',
      payload: newList
    })
    setNewList({
      name: '',
      userID: user.id
    })
    console.log('newList:', newList);
  }

  return (
    <div className="container">
      <h2>My Lists</h2>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {store.userlist.map((list, index) => (
            <tr>
              <td key={index}>{list.name}</td>
              <td>
                <Link to="/listdetails">
                  <button type="button" class="btn btn-outline-primary float-end" onClick={() => setSelectedList(list)}>More info</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Add New List
        </button>
      </p>
      <div class="collapse mr-2" id="collapseExample">
        <div class="card card-body">
          <form class="input-group" onSubmit={submitNewList}>
            <input type="text" class="form-control" id="listName" name="name" placeholder="New List Name" onChange={(event) => handleChange(event)} />
            <input class="btn btn-primary" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyLists;
