import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createEntry } from '../../store/entries'
import './EntryForm.css'

const EntryForm = ({ isModalOpen, setIsModalOpen }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [bodyWeight, setBodyWeight] = useState('')
    const [benchPress, setBenchPress] = useState('')
    const [squat, setSquat] = useState('')
    const [deadlift, setDeadlift] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!bodyWeight && !benchPress && !squat && !deadlift) return setErrors(['Cannot submit an empty entry.'])
        if (!createdAt)
            if (isNaN(Number(bodyWeight)) || isNaN(Number(benchPress)) || isNaN(Number(squat)) || isNaN(Number(deadlift))) return setErrors(['Cannot submit an entry with non-numerical weights.'])
        if (80 > Number.parseInt(bodyWeight) || Number.parseInt(bodyWeight) > 800 || Number.parseInt(benchPress) < 0 || Number.parseInt(squat) < 0 || Number.parseInt(deadlift) < 0) return setErrors(['Please enter a reasonable weight.'])
        dispatch(createEntry({ bodyWeight, benchPress, squat, deadlift, createdAt }))
        setIsModalOpen(false)
    }

    return (
        <form
            className='container flex flex-col text-gray-300 bg-light p-16'
            onSubmit={handleSubmit}
        >
            <div>
                <ul>
                    {errors.map((error, idx) => <li style={{ color: '#CF6679' }} key={idx}>{error}</li>)}
                </ul>
            </div>
            <div className='container flex flex-col justify-center items-start'>
                <label className='mx-1 my-3'>
                    Body Weight
                </label>
                <div className='container flex w-full '>
                    <input
                        className='bg-input-light border-2 custom-border-color w-full field-focus p-1'
                        type='text'
                        onChange={e => setBodyWeight(e.target.value)}
                        value={bodyWeight}>
                    </input>
                </div>
            </div>
            <div className='container flex flex-col justify-center items-start'>
                <label className='mx-1 my-3'>
                    Bench Press
                </label>
                <div className='container flex w-full '>
                    <input
                        className='bg-input-light border-2 custom-border-color w-full field-focus p-1'
                        type='text'
                        onChange={e => setBenchPress(e.target.value)}
                        value={benchPress}>
                    </input>
                </div>
            </div>
            <div className='container flex flex-col justify-center items-start'>
                <label className='mx-1 my-3'>
                    Squat
                </label>
                <div className='container flex w-full '>
                    <input
                        className='bg-input-light border-2 custom-border-color w-full field-focus p-1'
                        type='text'
                        onChange={e => setSquat(e.target.value)}
                        value={squat}>
                    </input>
                </div>
            </div>
            <div className='container flex flex-col justify-center items-start'>
                <label className='mx-1 my-3'>
                    Deadlift
                </label>
                <div className='container flex w-full '>
                    <input
                        className='bg-input-light border-2 custom-border-color w-full field-focus p-1'
                        type='text'
                        onChange={e => setDeadlift(e.target.value)}
                        value={deadlift}>
                    </input>
                </div>
            </div>
            <div className='container flex flex-col justify-center items-start'>
                <label className='mx-1 my-3'>
                    Date
                </label>
                <div className='container flex w-full '>
                    <input
                        className='bg-input-light border-2 custom-border-color w-full field-focus p-1'
                        type='date'
                        onChange={e => setCreatedAt(e.target.value)}
                        value={createdAt}>
                    </input>
                </div>
            </div>
            <div className='container flex justify-end items-center mt-10'>
                <button className='flex justify-center items-center w-28 h-8 border-2 custom-border-color bg-input-light field-focus' style={{ color: '#ea80fc' }} type='submit'>
                    <h2 >
                        Add Entry
                                    </h2>
                </button>
            </div>
        </form>
    )
}

export default EntryForm
