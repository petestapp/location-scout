import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ListDetails(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const list = store.list;
  const listDetails = store.listdetails;

  useEffect(() => {
    console.log('in useEffect');
    dispatch({
      type: 'GET_LIST_DETAILS',
      payload: list
    });
  }, []);

  const [heading, setHeading] = useState('Functional Component');

  return (
    <div>
      <h2>{list.name}</h2>
      <p>{list.id}</p>
      <ul>
        {listDetails.map((place, index) => (
          <li key={index}>id:{place.id}, {place.name}, {place.comments}<button>More info</button></li>
        ))}
      </ul>
    </div>
  );
}

export default ListDetails;
