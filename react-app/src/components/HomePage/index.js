import React from 'react'
import LineGraph from '../LineGraph'
import { useSelector } from 'react-redux'

const HomePage = () => {
    const user = useSelector(state => state.session.user)

    return (
        user && (
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
