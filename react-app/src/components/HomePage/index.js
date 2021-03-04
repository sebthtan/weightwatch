import React, { useEffect } from 'react'
import LineGraph from '../LineGraph'
import { useSelector, useDispatch } from 'react-redux'
import { getUserEntries } from '../../store/entries'

const HomePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const entries = useSelector(state => state.entries)

    useEffect(() => {
        dispatch(getUserEntries())
    }, [dispatch])

    return (
        user && entries.length > 0 && (
            <div>
                <div>
                    <h2 className='text-white'>yes</h2>
                </div>
                <LineGraph />
            </div>
        )
    )
}

export default HomePage
