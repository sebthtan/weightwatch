import React from 'react'
import LineGraph from '../LineGraph'
import { useSelector } from 'react-redux'

const HomePage = () => {
    const user = useSelector(state => state.session.user)

    return (
        user && (
            <>

                <div className='bg-dark'>
                    <div>
                        <p className='font-sans text-white'>
                            {`Hello, ${user.username}`}
                        </p>
                    </div>
                </div>
                <LineGraph />
            </>
        )
    )
}

export default HomePage
