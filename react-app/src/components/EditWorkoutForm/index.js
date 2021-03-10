import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Add, Delete } from '@material-ui/icons'

const EditWorkoutForm = ({ targetWorkout, setIsEditOpen }) => {
    const [errors, setErrors] = useState([])
    const [fields, setFields] = useState([{ exercise_id: 20, sets: '', repetitions: '' }])
    const [newWorkoutName, setNewWorkoutName] = useState('')
    const exercises = useSelector(state => state.exercises)

    const handleSelectChange = (i, e) => {
        const newFields = [...fields]
        newFields[i].exercise_id = e.target.value
        setFields(newFields)
    }

    const handleSetsChange = (i, e) => {
        const newFields = [...fields]
        newFields[i].sets = Number(e.target.value)
        setFields(newFields)
    }

    const handleRepsChange = (i, e) => {
        const newFields = [...fields]
        newFields[i].repetitions = Number(e.target.value)
        setFields(newFields)
    }

    const addField = () => {
        const newFields = [...fields]
        newFields.push({ exercise_id: 20, sets: '', repetitions: '' })
        setFields(newFields)
    }

    const removeField = i => {
        const newFields = [...fields]
        newFields.splice(i, 1)
        setFields(newFields)
    }

    const closeEditWorkout = () => {
        setIsEditOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        closeEditWorkout()
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
            {targetWorkout && (<>

                <div className='container flex flex-col justify-center items-start'>
                    <div className='flex container justify-between items-center'>
                        <label className='mx-1 my-3'>
                            Workout Name
                    </label>
                        <button
                            type='button'
                            onClick={addField}
                            className='flex justify-center items-center'
                        >
                            <Add className='text-gray-300' style={{ color: '#fcf480' }} />
                            <span>Add an exercise</span>
                        </button>
                    </div>
                    <div className='container flex w-full '>
                        <input
                            className='bg-input-light border-2 custom-border-color w-full field-focus p-1'
                            type='text'
                            onChange={e => setNewWorkoutName(e.target.value)}
                            value={newWorkoutName}
                            placeholder={targetWorkout.workout_name}
                        >
                        </input>
                    </div>
                </div>
                {fields.map((field, idx) =>
                    <div key={idx} className='container flex justify-between items-center'>
                        <div className='w-1/3 flex flex-col justify-center items-start'>
                            <label className='mx-1 my-3'>
                                Exercise
                        </label>
                            <div className='container flex w-full '>
                                <select
                                    className='bg-input-light border-2 custom-border-color w-full field-focus p-1'
                                    onChange={e => handleSelectChange(idx, e)}
                                    style={{ cursor: 'pointer' }}
                                    value={field.exercise_id}
                                >
                                    {Object.values(exercises).sort((a, b) => {
                                        const name1 = a.exercise_name.toUpperCase()
                                        const name2 = b.exercise_name.toUpperCase()
                                        return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0
                                    }).map(exercise =>
                                        <option key={exercise.id} value={exercise.id}>{exercise.exercise_name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className='w-1/6 flex flex-col justify-center items-start'>
                            <label className='mx-1 my-3'>
                                Set(s)
                        </label>
                            <div className='container flex w-full '>
                                <input
                                    className='bg-input-light border-2 custom-border-color w-full field-focus p-1'
                                    type='number'
                                    min='1'
                                    max='20'
                                    onChange={e => handleSetsChange(idx, e)}
                                    value={field.sets}
                                >
                                </input>
                            </div>
                        </div>
                        <div className='w-1/6 flex flex-col justify-center items-start'>
                            <label className='mx-1 my-3'>
                                Repetition(s)
                        </label>
                            <div className='container flex w-full '>
                                <input
                                    className='bg-input-light border-2 custom-border-color w-full field-focus p-1'
                                    type='number'
                                    min='1'
                                    max='20'
                                    onChange={e => handleRepsChange(idx, e)}
                                    value={field.repetitions}
                                >
                                </input>
                            </div>
                        </div>
                        <div className='main-yellow flex justify-center items-end h-full'>
                            <button
                                type='button'
                                onClick={() => removeField(idx)}
                            >
                                <Delete style={{ fontSize: '2rem' }} />
                            </button>
                        </div>
                    </div>
                )}
                <div className='container flex justify-end items-center mt-10'>
                    <button className='flex justify-center items-center w-28 h-8 border-2 custom-border-color bg-input-light hover:opacity-80 field-focus' style={{ color: '#ea80fc' }} type='submit'>
                        <h2>
                            Add Workout
                    </h2>
                    </button>
                </div>
            </>)}
        </form>
    )
}

export default EditWorkoutForm
