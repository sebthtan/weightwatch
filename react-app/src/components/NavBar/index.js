import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { Menu, MenuOpen } from '@material-ui/icons'
import SideBar from '../SideBar'

const NavBar = ({ setAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <>
      <nav className='flex fixed top-0 items-center justify-between z-20 px-4 h-14 text-white w-full items-center' style={{ backgroundColor: '#272727' }}>
        <div>
          <button className='flex justify-center items-center focus:outline-none' onClick={toggleSidebar}>
            {isOpen ? <MenuOpen /> : <Menu />}
          </button>
        </div>
        <ul>
          <li className='flex items-center'>
            <NavLink to="/login" exact={true} activeClassName="active">
              <span>
                Login
            </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              <span>
                Sign Up
            </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" exact={true} activeClassName="active">
              <span>
                Users
            </span>
            </NavLink>
          </li>
          <li>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </li>
        </ul>
      </nav >
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default NavBar;
