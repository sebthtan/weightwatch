import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteEntry, updateEntry } from '../../store/entries'
import { BarChart, Delete, Edit, FitnessCenter, Event, Cancel, Save } from '@material-ui/icons'

const Dropdown = ({ trackWeight, dataPoint, setDataPoint, monthNames, isEditFormOpen, setIsEditFormOpen, errors, setErrors }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [entryBodyWeight, setEntryBodyWeight] = useState('')
    const [entryBenchPress, setEntryBenchPress] = useState('')
    const [entrySquat, setEntrySquat] = useState('')
    const [entryDeadlift, setEntryDeadlift] = useState('')
    const [entryDate, setEntryDate] = useState('')
    const [isSaved, setIsSaved] = useState(false)

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

    const editRequest = (e) => {
        e.preventDefault()
        if (!entryBodyWeight && !entryBenchPress && !entrySquat && !entryDeadlift) return setErrors(['Cannot update as an empty entry.'])
        if (isNaN(Number(entryBodyWeight)) || isNaN(Number(entryBenchPress)) || isNaN(Number(entrySquat)) || isNaN(Number(entryDeadlift))) return setErrors(['Cannot update an entry with non-numerical weights.'])
        if (40 > Number.parseInt(bodyWeight) || Number.parseInt(bodyWeight) > 800 || Number.parseInt(benchPress) < 0 || Number.parseInt(squat) < 0 || Number.parseInt(deadlift) < 0) return setErrors(['Please enter a reasonable weight.'])
        dispatch(updateEntry({ entryId, entryBodyWeight, entryBenchPress, entrySquat, entryDeadlift }))
        setIsSaved(true)
        setErrors([])
    }

    const openEditForm = () => {
        setIsSaved(false)
        setIsEditFormOpen(prev => !prev)
    }

    const closeEditForm = () => {
        setIsEditFormOpen(false)
        setErrors([])
    }

    const deleteRequest = () => {
        dispatch(deleteEntry(Number(entryId)))
        setDataPoint([])
    }

    return (
        <>
            <div className='container flex rounded text-gray-300 py-6 pl-6'
            // style={{ backgroundColor: '#2D2D2D', borderColor: '#7C7C7C' }}
            >
                <div className='container flex flex-col w-1/2 justify-start items-start'>
                    <div className='container flex justify-between items-center h-8 my-2'>
                        <h1 className='font-bold main-pink text-lg'>Selected Entry:</h1>
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
                <div className='container flex flex-col items-center w-1/2'>
                    <div className='container flex w-full my-2'>
                        <div className='container flex 2-1/2 font-bold main-yellow text-lg'>
                            {isEditFormOpen && (
                                <h2>{createdAt}</h2>
                            )}
                        </div>
                        <div className='container flex w-1/2 justify-end'>
                            <div className='container flex justify-center items-center w-8 h-8 '>
                                <button className='main-yellow w-6 h-6 flex justify-center items-center' onClick={openEditForm}>
                                    <Edit />
                                </button>
                            </div>
                            <div className='container flex justify-center items-center w-8 h-8 '>
                                <button className='main-yellow w-6 h-6 flex justify-center items-center' onClick={deleteRequest}>
                                    <Delete />
                                </button>
                            </div>
                        </div>
                    </div>
                    {isEditFormOpen && (
                        <div className='container flex flex-col w-full'>
                            <form onSubmit={editRequest}>
                                <div className='container flex justify-around w-full items-center'>
                                    <h3 className='text-sm w-1/2 py-3'>
                                        {`Body Weight:`}
                                    </h3>
                                    <input
                                        className='bg-input-light border-2 custom-border-color field-focus h-6 p-1 w-1/2'
                                        type='text'
                                        onChange={e => setEntryBodyWeight(e.target.value)}
                                        value={entryBodyWeight}
                                    >
                                    </input>
                                </div>
                                <div className='container flex justify-around w-full items-center'>
                                    <h3 className='text-sm w-1/2 py-3'>
                                        {`Bench Press:`}
                                    </h3>
                                    <input
                                        className='bg-input-light border-2 custom-border-color field-focus h-6 p-1 w-1/2'
                                        type='text'
                                        onChange={e => setEntryBenchPress(e.target.value)}
                                        value={entryBenchPress}
                                    >
                                    </input>
                                </div>
                                <div className='container flex justify-around w-full items-center'>
                                    <h3 className='text-sm w-1/2 py-3'>
                                        {`Squat:`}
                                    </h3>
                                    <input
                                        className='bg-input-light border-2 custom-border-color field-focus h-6 p-1 w-1/2'
                                        type='text'
                                        onChange={e => setEntrySquat(e.target.value)}
                                        value={entrySquat}
                                    >
                                    </input>
                                </div>
                                <div className='container flex justify-around w-full items-center'>
                                    <h3 className='text-sm w-1/2 py-3'>
                                        {`Deadlift:`}
                                    </h3>
                                    <input
                                        className='bg-input-light border-2 custom-border-color field-focus h-6 p-1 w-1/2'
                                        type='text'
                                        onChange={e => setEntryDeadlift(e.target.value)}
                                        value={entryDeadlift}
                                    >
                                    </input>
                                </div>
                                {/* <div className='container flex justify-around w-full items-center'>
                                    <h3 className='text-sm w-1/2 py-3'>
                                        Date:
                                    </h3>
                                    <input
                                        className='bg-input-light border-2 custom-border-color field-focus h-6 p-1 w-1/2'
                                        type='date'
                                        onChange={e => setEntryDate(e.target.value)}
                                        value={entryDate}
                                    >
                                    </input>
                                </div>

                                MAYBE IF I HAVE TIME: EDIT DATES

                                */}
                                <div className='py-3 container flex justify-between w-full items-center'>
                                    <button type='button' className='main-yellow w-6 h-6 flex justify-start items-center w-1/2' onClick={closeEditForm}>
                                        <Cancel />
                                    </button>
                                    <div className='container flex items-center w-1/2'>
                                        <div className='container flex items-center w-1/2'>
                                            {isSaved &&
                                                <h2 className='main-pink'>
                                                    Saved!
                                        </h2>
                                            }
                                        </div>
                                        <button type='submit' className='main-yellow w-6 h-6 flex justify-end items-center w-1/2'>
                                            <Save />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <ul className='text-sm'>
                                        {errors && errors.map((error, idx) => <li style={{ color: '#CF6679' }} key={idx}>{error}</li>)}
                                    </ul>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

// let dateObj = new Date(unixTime * 1000)
// return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getUTCFullYear()}`

export default Dropdown
