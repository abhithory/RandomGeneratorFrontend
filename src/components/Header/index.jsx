import React from 'react'
// import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ChangeLang from './ChangeLang';


export default function Header() {
  // const location = useLocation();

  const { t } = useTranslation();


  return (
    <div className='main-header'>
      {/* <Link to="/"> */}
        <h1 className='main-header-text'>{t('header_name')}</h1>
        <ChangeLang />
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

