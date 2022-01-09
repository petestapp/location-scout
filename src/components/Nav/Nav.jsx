import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-info mb-4">
      <div class="container-fluid">
        <a class="navbar-brand" href="">
          Location Scout</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="navbar-nav">
            {/* If no user is logged in, show these links */}
            {user.id === null &&
              // If there's no user, show login/registration links
              <a href="/login">Login / Register</a>
            }
            {/* If a user is logged in, show these links */}
            {user.id && (
              <>
                {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
                <a class="nav-link" href="#/mylists">My Lists</a>
                <a class="nav-link" href="#"
                  onClick={() => dispatch({ type: 'LOGOUT' })}>Log Out</a>
              </>
            )}
            <a class="nav-link" href="#/about">About</a>
          </div>
        </div>
      </div>
    </nav>

    // <div className="nav">
    //   <Link to="/home">
    //     <h2 className="nav-title">Location Scout</h2>
    //   </Link>
    //   <div>
    //     {/* If no user is logged in, show these links */}
    //     {user.id === null &&
    //       // If there's no user, show login/registration links
    //       <Link className="navLink" to="/login">
    //         Login / Register
    //       </Link>
    //     }

    //     {/* If a user is logged in, show these links */}
    //     {user.id && (
    //       <>
    //         <Link className="navLink" to="/user">
    //           Home
    //         </Link>

    //         <Link className="navLink" to="/mylists">
    //           My Lists
    //         </Link>

    //         <LogOutButton className="navLink" />
    //       </>
    //     )}

    //     <Link className="navLink" to="/about">
    //       About
    //     </Link>
    //   </div>
    // </div>


  );
}

export default Nav;
