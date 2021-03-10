import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { Menu, MenuOpen } from '@material-ui/icons'
import SideBar from '../SideBar'
import logo3 from './logo3.png'

const NavBar = ({ setAuthenticated }) => {
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleSidebar = () => {
    setIsOpen(prev => !prev)
  }

  const searchRequest = (e) => {
    e.preventDefault()
    history.push(`/search?name=${searchTerm}`)
    setSearchTerm('')
  }

  return (
    user && (
      <>
        <nav className='flex fixed top-0 items-center justify-between z-20 px-4 h-14 text-white w-full items-center' style={{ backgroundColor: '#272727' }}>
          <div className='flex items-center justify-center p-2'>
            <button className='flex justify-center items-center focus:outline-none' onClick={toggleSidebar}>
              {isOpen ? <MenuOpen /> : <Menu />}
              <img src={logo3} alt='logo' className='max-h-14 w-auto' />
            </button>
          </div>
          <div className='flex items-center justify-center p-2'>
            <div>
              <form onSubmit={searchRequest}>
                <input
                  type='search'
                  onChange={e => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  className='bg-input-light border-2 custom-border-color w-full field-focus p-1'
                ></input>
              </form>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='flex items-center px-3'>
              <LogoutButton setAuthenticated={setAuthenticated} />
            </div>
          </div>
        </nav >
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    )
  );
}

export default NavBar;
