import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import { Link } from 'react-router-dom';

function MyLists() {
  const dispatch = useDispatch();
  const store = useReduxStore();

  useEffect(() => {
    console.log('in useEffect');
    dispatch({type: 'GET_USER_LIST'});
  }, []);

  const setSelectedList = (list) => {
    let selectedListHUH = list;
    dispatch({
      type: 'SET_SELECTED_LIST',
      payload: selectedListHUH
    });
  }

  return (
    <div className="container">
      <p>My Lists</p>
      <ul>
        {store.userlist.map((list, index) => (
          <li key={index}>{list.name} <Link to="/listdetails"><button onClick={() => setSelectedList(list) }>More info</button></Link></li>
        ))}
      </ul>
    </div>
  );
}

export default MyLists;
