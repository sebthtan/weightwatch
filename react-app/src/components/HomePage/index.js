import React, { useEffect } from 'react'
import LineGraph from '../LineGraph'
import { useSelector, useDispatch } from 'react-redux'
import { getUserEntries } from '../../store/entries'
import { getAllExercises } from '../../store/exercises'

const HomePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getUserEntries())
        dispatch(getAllExercises())
    }, [dispatch])

    return (
        user && (
            <>
                <div className='w-screen flex flex-col items-center'>
                    <div className='w-7/12 pt-10 flex justify-start items-center'>
                        <h1 className='text-gray-300 font-normal text-5xl'>Dashboard</h1>
                    </div>
                    <LineGraph />
                </div>
            </>
        )
    )
}

export default HomePage
