import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteEntry } from '../../store/entries'
import { BarChart, Delete, Edit, FitnessCenter, Event } from '@material-ui/icons'

const Dropdown = ({ trackWeight, dataPoint, monthNames }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    let bodyWeight
    let benchPress
    let squat
    let deadlift
    let createdAt
    let entryId

    if (dataPoint) {
        let payload = dataPoint[8].payload
        bodyWeight = payload.body_weight
        benchPress = payload.bench_press
        squat = payload.squat
        deadlift = payload.deadlift
        entryId = payload.id
        let dateObj = new Date(payload.created_at * 1000)
        createdAt = `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getUTCFullYear()}`
    }

    const editRequest = () => {
    }

    const deleteRequest = () => {
        dispatch(deleteEntry(Number(entryId)))
    }

    return (
        <>
            <div className='container flex flex-col rounded text-gray-300 py-6 pl-6'
            // style={{ backgroundColor: '#2D2D2D', borderColor: '#7C7C7C' }}
            >
                <div className='container flex flex-col justify-center items-start'>
                    <div className='container flex justify-between items-center'>
                        <h1 className='font-bold main-pink text-lg'>Selected Entry:</h1>
                        <div className='container flex justify-end items-center w-1/2'>
                            <div className='container flex justify-center items-center self-end w-8 h-8 '>
                                <button className='main-yellow w-6 h-6 flex justify-center items-center' onClick={editRequest}>
                                    <Edit />
                                </button>
                            </div>
                            <div className='container flex justify-center items-center self-end w-8 h-8 '>
                                <button className='main-yellow w-6 h-6 flex justify-center items-center' onClick={deleteRequest}>
                                    <Delete />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='container flex items-center justify-start'>
                        <BarChart />
                        <h4 className='text-sm p-3'>{trackWeight}</h4>
                    </div>
                    <div className='container flex items-center justify-start'>
                        <Event />
                        <h4 className='text-sm p-3'>{createdAt}</h4>
                    </div>
                    <div className='container flex items-center justify-start'>
                        <FitnessCenter />
                        <h4 className='text-sm p-3'>{`${bodyWeight || deadlift || benchPress || squat} lbs`}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

// let dateObj = new Date(unixTime * 1000)
// return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getUTCFullYear()}`

export default Dropdown
