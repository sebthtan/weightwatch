import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Transition from '../Transition'
import { InsertChart, FitnessCenter, DateRange, AccessAlarm } from '@material-ui/icons'

const SideBar = ({ isOpen, setIsOpen }) => {

    useEffect(() => {
        if (!isOpen) return;

        const close = () => {
            setIsOpen(false);
        };

        document.addEventListener('click', close);

        return () => document.removeEventListener("click", close);
    }, [isOpen, setIsOpen]);

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
                <div className='flex-grow text-gray-300'>
                    <nav>
                        <div>
                            <NavLink exact to='/'>
                                <div className='p-4 flex items-center'>
                                    <InsertChart />
                                    <span className='font-medium ml-2'>
                                        Dashboard
                                    </span>
                                </div>
                            </NavLink>
                            <NavLink to='/workouts'>
                                <div className='p-4 flex items-center'>
                                    <FitnessCenter />
                                    <span className='font-medium ml-2'>
                                        Workouts
                                </span>
                                </div>
                            </NavLink>
                            <NavLink to='/schedule'>
                                <div className='p-4 flex items-center'>
                                    <DateRange />
                                    <span className='font-medium ml-2'>
                                        Schedule
                                </span>
                                </div>
                            </NavLink>
                            <NavLink to='/timer'>
                                <div className='p-4 flex items-center'>
                                    <AccessAlarm />
                                    <span className='font-medium ml-2'>
                                        Timer
                                </span>
                                </div>
                            </NavLink>
                        </div>
                    </nav>
                </div>
            </aside>
        </Transition>
    )
}

export default SideBar
