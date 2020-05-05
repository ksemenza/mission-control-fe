import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../../images/logo.svg';

import {
  sidebar,
  logoContainer,
  logo,
  links,
  link,
  current,
  logoutButton,
  topLinks,
  bottomLinks,
} from './Sidebar.module.scss';
import { useMutation } from 'urql';
import { CREATE_PERSON } from '../../Project/Queries';
import { useEffect } from 'react';

const Sidebar = ({ logout }) => {
  const [, executeMutation] = useMutation(CREATE_PERSON);
  const location = useLocation();

  // const newUser = JSON.parse(localStorage.getItem('okta-token-storage'));
  // console.log('***LOOK HERE***', newUser.idToken.claims);

  // useEffect(() => {
  //   const newPerson = () => {
  //     executeMutation({
  //       variables: {
  //         name,
  //         email,
  //       },
  //     });
  //     newPerson();
  //   };
  // }, []);

  return (
    <div className={sidebar}>
      <div className={logoContainer}>
        <img src={Logo} className={logo} alt="mission-control-logo" />
      </div>
      <div className={links}>
        <div className={topLinks}>
          <NavLink
            to="/"
            className={link}
            activeClassName={location.pathname === '/' ? current : ''}
          >
            Projects
          </NavLink>
        </div>
        <div className={bottomLinks}>
          <button type="button" className={logoutButton}>
            <NavLink to="/" onClick={logout}>
              Logout
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
