import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';

function MyLists() {
  const dispatch = useDispatch();
  const store = useReduxStore();

  useEffect(() => {
    console.log('in useEffect');
    dispatch({type: 'GET_USER_LIST'});
  }, []);

  return (
    <div className="container">
      <p>My Lists</p>
      <ul>
        {store.userlist.map((userlist, index) => (
          <li>{userlist.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyLists;
