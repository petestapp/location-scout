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
    dispatch({type: 'GET_USER_LIST'});
  }, []);

  const setSelectedList = (list) => {
    let selectedList = list;
    dispatch({
      type: 'SET_SELECTED_LIST',
      payload: selectedList
    });
  }

  const handleChange = (event) => {
    setNewList({...newList, name: event.target.value});
  }

  const submitNewList = () => {
    event.preventDefault();
    dispatch({
      type: 'ADD_NEW_LIST',
      payload: newList
    })
  }

  return (
    <div className="container">
      <p>My Lists</p>
      <ul>
        {store.userlist.map((list, index) => (
          <li key={list.id}>{list.name} <Link to="/listdetails"><button onClick={() => setSelectedList(list)}>More info</button></Link></li>
        ))}
      </ul>
      <button onClick={() => setShowAddNewList(!showAddNewList)}>Add New List</button>
      {
        showAddNewList?
        <form onSubmit={submitNewList}>
          <input type="text" name="name" placeholder="List Name" onChange={(event)=>handleChange(event)}/>
        <input type="submit"/>
        </form>:
        <p>showAddNewList = false</p>
      }
    </div>
  );
}

export default MyLists;
