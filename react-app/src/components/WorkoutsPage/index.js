import './Workouts.css'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCreatedWorkouts, getWorkouts } from '../../store/workouts'
import { deleteWorkout, unbookmarkWorkout } from '../../store/workouts'
import { Add, Delete, Bookmark, BookmarkBorder } from '@material-ui/icons'
import Modal from 'react-modal'
import WorkoutForm from '../WorkoutForm'

const WorkoutsPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const workouts = useSelector(state => state.workouts)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }, [isModalOpen])

    const savedWorkoutsArr = Object.values(workouts.saved)
    const createdWorkoutsArr = Object.values(workouts.owned)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50vw',
            maxHeight: '70vh'
        },
        overlay: {
            backgroundColor: 'rgba(20, 20, 20, 0.9)',
            zIndex: '21'
        }
    };

    useEffect(() => {
        dispatch(getWorkouts(user.id))
        dispatch(getCreatedWorkouts(user.id))
    }, [dispatch, user.id])

    const deleteRequest = (id) => {
        dispatch(deleteWorkout(id))
    }

    const removeBookmarkRequest = (id) => {
        dispatch(unbookmarkWorkout(id))
    }

    return (
        <div className='w-screen flex flex-col text-gray-300 items-center'>
            <div className='flex w-3/5 mb-4 mt-10 items-end justify-between'>
                <div className='flex justify-start items-center '>
                    <h1 className='text-5xl font-bold'>{`Bookmarked Workouts (${savedWorkoutsArr.length})`}</h1>
                </div>
                <Modal className='absolute overflow-y-auto' isOpen={isModalOpen} onRequestClose={closeModal} contentLabel='test' style={customStyles}>
                    <div className='container flex bg-light'>
                        <WorkoutForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                    </div>
                </Modal>
            </div>
            {savedWorkoutsArr.length > 0 ? (savedWorkoutsArr.map(workout =>
                <div key={workout.id} className='m-0 w-3/5 p-4 my-3 flex flex-col items-center justify-center font-sans bg-white  bg-opacity-5 rounded-xl shadow-md border-2' style={{ borderColor: '#373737' }}>
                    <div className='flex w-full justify-between items-center'>
                        <h2 className='self-start text-gray-300 text-2xl font-bold m-4 main-pink'>{workout.workout_name}</h2>
                        <div className='flex '>
                            <button
                                className='main-yellow'
                                type='button'
                                onClick={() => removeBookmarkRequest(workout.id)}
                            >
                                <Bookmark />
                            </button>
                            {workout.created_by === user.id &&
                                <button
                                    className='main-yellow'
                                    type='button'
                                    onClick={() => deleteRequest(workout.id)}
                                >
                                    <Delete />
                                </button>
                            }
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-4 container'>
                        <div className='flex justify-start items-center'>
                            {/* <h2 className='p-4'>Exercise</h2> */}
                        </div>
                        <div className='flex justify-center items-center'>
                            <h2 className='font-bold'>Sets</h2>
                        </div>
                        <div className='flex justify-center items-center'>
                            <h2 className='font-bold'>Repetitions</h2>
                        </div>
                        {workout.exercises.map((exercise, idx) =>
                            <React.Fragment key={`${exercise.id}-${idx}`}>
                                <div className='flex container justify-start items-center'>
                                    <h2 className='font-bold p-4'>{exercise.exercise_name}</h2>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <input
                                        type='number'
                                        className='text-center main-yellow bg-white bg-opacity-10 rounded px-1 border hover:bg-opacity-20'
                                        style={{ borderColor: '#fcf480', width: '30px' }}
                                        placeholder={exercise.sets}
                                    >
                                        {/* <h2>{exercise.sets}</h2> */}
                                    </input>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <input
                                        type='number'
                                        className='text-center main-yellow bg-white bg-opacity-10 rounded px-1 border hover:bg-opacity-20'
                                        style={{ borderColor: '#fcf480', width: '30px' }}
                                        placeholder={exercise.repetitions}
                                    >
                                    </input>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            )) : (
                <div className='m-0 w-3/5 p-4 flex flex-col items-center justify-center font-sans bg-white  bg-opacity-5 rounded-xl shadow-md border-2' style={{ borderColor: '#373737' }}>
                    <h2 className='text-gray-300 text-2xl font-bold-hover font-700 m-4'>You have not bookmarked any workouts.</h2>
                </div>
            )}
            <div className='flex w-3/5 mb-4 mt-10 items-end justify-between'>
                <div className='flex justify-start items-center '>
                    <h1 className='text-5xl font-bold'>{`My Workouts (${createdWorkoutsArr.length})`}</h1>
                </div>
                <button
                    type='button'
                    className='flex items-center justify-center main-yellow bg-white bg-opacity-10 rounded-xl pr-3 pl-2 border hover:bg-opacity-20'
                    style={{ borderColor: '#fcf480' }}
                    onClick={openModal}
                >
                    <Add className='text-sm' />
                    <h1 className='ml-2'>Create a workout</h1>
                </button>
            </div>
            {createdWorkoutsArr.length > 0 ? (createdWorkoutsArr.map(workout =>
                <div key={workout.id} className='m-0 w-3/5 p-4 my-3 flex flex-col items-center justify-center font-sans bg-white  bg-opacity-5 rounded-xl shadow-md border-2' style={{ borderColor: '#373737' }}>
                    <div className='flex w-full justify-between items-center'>
                        <h2 className='self-start text-gray-300 text-2xl font-bold m-4 main-pink'>{workout.workout_name}</h2>
                        <div className='flex '>
                            <button
                                className='main-yellow'
                                type='button'
                            // onClick={() => removeBookmarkRequest(workout.id)}
                            >
                                <BookmarkBorder />
                            </button>
                            {workout.created_by === user.id &&
                                <button
                                    className='main-yellow'
                                    type='button'
                                    onClick={() => deleteRequest(workout.id)}
                                >
                                    <Delete />
                                </button>
                            }
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-4 container'>
                        <div className='flex justify-start items-center'>
                            {/* <h2 className='p-4'>Exercise</h2> */}
                        </div>
                        <div className='flex justify-center items-center'>
                            <h2 className='font-bold'>Sets</h2>
                        </div>
                        <div className='flex justify-center items-center'>
                            <h2 className='font-bold'>Repetitions</h2>
                        </div>
                        {workout.exercises.map((exercise, idx) =>
                            <React.Fragment key={`${exercise.id}-${idx}`}>
                                <div className='flex container justify-start items-center'>
                                    <h2 className='font-bold p-4'>{exercise.exercise_name}</h2>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <input
                                        type='number'
                                        className='text-center main-yellow bg-white bg-opacity-10 rounded px-1 border hover:bg-opacity-20'
                                        style={{ borderColor: '#fcf480', width: '30px' }}
                                        placeholder={exercise.sets}
                                    >
                                        {/* <h2>{exercise.sets}</h2> */}
                                    </input>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <input
                                        type='number'
                                        className='text-center main-yellow bg-white bg-opacity-10 rounded px-1 border hover:bg-opacity-20'
                                        style={{ borderColor: '#fcf480', width: '30px' }}
                                        placeholder={exercise.repetitions}
                                    >
                                    </input>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            )) : (
                <div className='m-0 w-3/5 p-4 flex flex-col items-center justify-center font-sans bg-white  bg-opacity-5 rounded-xl shadow-md border-2' style={{ borderColor: '#373737' }}>
                    <h2 className='text-gray-300 text-2xl font-bold-hover font-700 m-4'>You have not created any workouts.</h2>
                </div>
            )}
        </div>
    )
}

export default WorkoutsPage
