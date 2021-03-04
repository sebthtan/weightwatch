import React from 'react'
import { NavLink } from 'react-router-dom'
import Transition from '../Transition'

const SideBar = ({ isOpen }) => {


    return (
        <Transition
            show={isOpen}
            enter='transition-all duration-400'
            enterFrom='-ml-64'
            enterTo='ml-0'
            leave='transition-all duration-400'
            leaveTo='-ml-64'
        >
            <aside className='fixed w-64 min-h-screen flex flex-col z-20' style={{ backgroundColor: '#414141' }}>
                <div className='flex-grow text-white'>
                    <nav>
                        <ul>
                            <NavLink exact to='/'>
                                <li className='p-4'>
                                    <span>
                                        Dashboard
                                    </span>
                                </li>
                            </NavLink>
                            <NavLink to='/workouts'>
                                <li className='p-4'>
                                    <span>
                                        Workouts
                                </span>
                                </li>
                            </NavLink>
                            <NavLink to='/schedule'>
                                <li className='p-4'>
                                    <span>
                                        Schedule
                                </span>
                                </li>
                            </NavLink>
                            <NavLink to='/timer'>
                                <li className='p-4'>
                                    <span>
                                        Timer
                                </span>
                                </li>
                            </NavLink>
                        </ul>
                    </nav>
                </div>
            </aside>
        </Transition>
    )
}

export default SideBar
