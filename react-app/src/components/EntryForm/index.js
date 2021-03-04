import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createEntry } from '../../store/entries'

const EntryForm = ({ isModalOpen, setIsModalOpen }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [bodyWeight, setBodyWeight] = useState('')
    const [benchPress, setBenchPress] = useState('')
    const [squat, setSquat] = useState('')
    const [deadlift, setDeadlift] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createEntry({ bodyWeight, benchPress, squat, deadlift }))
        history.push('/')
        setIsModalOpen(false)
    }
    return (
        <form
            className='container flex flex-col text-gray-300 bg-light p-16'
            onSubmit={handleSubmit}
        >
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
            <div className='container flex justify-end items-center mt-10'>
                <button className='flex justify-center items-center w-28 h-8 border-2 custom-border-color bg-input-light' style={{ color: '#ea80fc' }} type='submit'>
                    <h2 >
                        Add Entry
                                    </h2>
                </button>
            </div>
        </form>
    )
}

export default EntryForm
