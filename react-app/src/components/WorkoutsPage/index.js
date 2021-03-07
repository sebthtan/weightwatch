import './Workouts.css'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getWorkouts } from '../../store/workouts'

const WorkoutsPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const workouts = useSelector(state => state.workouts)

    useEffect(() => {
        dispatch(getWorkouts(user.id))
    }, [dispatch])

    return (workouts && (

        <div>
            <h2 className='text-gray-300'>Hello from Workouts Page</h2>
        </div>
    )
    )
}

export default WorkoutsPage
