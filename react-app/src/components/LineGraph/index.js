import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './LineGraph.css'
import { AddOutlined } from '@material-ui/icons'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const LineGraph = () => {
    const entries = useSelector(state => state.entries)
    const [trackWeight, setTrackWeight] = useState('Body Weight')

    const isBodyWeight = trackWeight === 'Body Weight'
    const isBench = trackWeight === 'Bench Press'
    const isSquat = trackWeight === 'Squat'
    const isDeadlift = trackWeight === 'Deadlift'

    let weightType
    let domain
    if (trackWeight === 'Body Weight') {
        weightType = 'body_weight'
        domain = [80, 'auto']
    } else if (trackWeight === 'Bench Press') {
        weightType = 'bench_press'
        domain = [45, 'dataMax + 60']
    } else if (trackWeight === 'Squat') {
        weightType = 'squat'
        domain = [45, 'dataMax + 60']
    } else if (trackWeight === 'Deadlift') {
        weightType = 'deadlift'
        domain = [45, 'dataMax + 60']
    }

    const lbs = <span style={{ color: 'rgb(234, 128, 252, 0.3' }}>(lbs)</span>

    // Do not try to refactor; will cause infinite rerenders for some reason
    const changeToBodyWeight = () => {
        setTrackWeight('Body Weight')
    }

    const changeToBenchWeight = () => {
        setTrackWeight('Bench Press')
    }

    const changeToSquatWeight = () => {
        setTrackWeight('Squat')
    }

    const changeToDeadliftWeight = () => {
        setTrackWeight('Deadlift')
    }

    return (
        <div className='container flex justify-center min-w-full p-8'>
            <div className='m-0 container w-3/5 p-4 flex flex-col items-center justify-center font-sans bg-white  bg-opacity-5 rounded-xl'>
                <button className='self-end'>
                    <AddOutlined className='text-gray-300' style={{ color: '#fcf480' }} />
                </button>
                <div className='container flex justify-between items-center pb-8 px-4'>
                    <div className='container flex flex-col justify-center items-center'>
                        <button className='flex justify-center items-center focus:outline-none' onClick={changeToBodyWeight}>
                            <h1 className='text-gray-300 text-2xl' style={isBodyWeight ? { fontWeight: '750', color: '#ea80fc' } : { fontWeight: '300' }}>
                                Body Weight
                        </h1>
                        </button>
                        {isBodyWeight ? lbs : <></>}
                    </div>
                    <div className='container flex flex-col justify-center items-center'>
                        <button className='flex justify-center items-center focus:outline-none' onClick={changeToBenchWeight}>
                            <h1 className='text-gray-300 text-2xl' style={isBench ? { fontWeight: '750', color: '#ea80fc' } : { fontWeight: '300' }}>
                                Bench Press
                        </h1>
                        </button>
                        {isBench ? lbs : <></>}
                    </div>
                    <div className='container flex flex-col justify-center items-center'>
                        <button className='flex justify-center items-center focus:outline-none' onClick={changeToSquatWeight}>
                            <h1 className='text-gray-300 text-2xl' style={isSquat ? { fontWeight: '750', color: '#ea80fc' } : { fontWeight: '300' }}>
                                Squat
                        </h1>
                        </button>
                        {isSquat ? lbs : <></>}
                    </div>
                    <div className='container flex flex-col justify-center items-center'>
                        <button className='flex justify-center items-center focus:outline-none' onClick={changeToDeadliftWeight}>
                            <h1 className='text-gray-300 text-2xl' style={isDeadlift ? { fontWeight: '750', color: '#ea80fc' } : { fontWeight: '300' }}>
                                Deadlift
                        </h1>
                        </button>
                        {isDeadlift ? lbs : <></>}
                    </div>
                </div>
                {entries.length > 0 && (
                    <ResponsiveContainer width='90%' height={300}>
                        <LineChart
                            width={800}
                            height={300}
                            data={entries}
                        >
                            <XAxis dataKey="created_at" axisLine={false} tickLine={false} />
                            <YAxis domain={domain} dataKey={weightType} axisLine={false} tickLine={false} />
                            <Line type="monotone" dataKey={weightType} stroke="#ea80fc" yAxisId={0} activeDot={{ stroke: 'darkblue' }} />
                            <CartesianGrid vertical={false} strokeDasharray='3' />
                            <Tooltip className='text-gray' />
                        </LineChart>
                    </ResponsiveContainer>
                )}
                <div className='container flex items-center w-full justify-around text-gray-300'>
                    <button className='focus:outline-none flex justify-center items-center font-bold' >
                        <span>1M</span>
                    </button>
                    <button className='focus:outline-none flex justify-center items-center font-bold'>
                        <span>6M</span>
                    </button>
                    <button className='focus:outline-none flex justify-center items-center font-bold'>
                        <span>1Y</span>
                    </button>
                    <button className='focus:outline-none flex justify-center items-center font-bold'>
                        <span>All</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LineGraph
