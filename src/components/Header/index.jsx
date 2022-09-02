import React from 'react'
// import { Link, useLocation } from "react-router-dom";

export default function Header() {
  // const location = useLocation();

  return (
    <div className='main-header'>
      {/* <Link to="/"> */}
        <h1>Random Name Generator</h1>
      {/* </Link> */}
      {/* <ul>
        {location.pathname !== "/randomNumber" &&
          <li>
            <Link to="/randomNumber">
              Random Number
            </Link>
          </li>
        } 
         {location.pathname !== "/" &&
          <li>
            <Link to="/">
              Random Name
            </Link>
          </li>
        }
        {location.pathname !== "/history" &&
          <li>
            <Link to="/history">
              History
            </Link>
          </li>
        }
      </ul> */}
    </div>
  )
}

