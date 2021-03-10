import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { searchWorkouts } from '../../store/search'
import { unbookmarkWorkout, bookmarkWorkout } from '../../store/workouts'
import { Bookmark, BookmarkBorder } from '@material-ui/icons'
import { getCreatedWorkouts, getWorkouts } from '../../store/workouts'



const SearchPage = ({ savedWorkoutsArr, createdWorkoutsArr }) => {
    const useQuery = () => new URLSearchParams(useLocation().search)
    const dispatch = useDispatch()
    const results = useSelector(state => state.search.results)
    const user = useSelector(state => state.session.user)

    let resultsArr
    if (results) {
        resultsArr = Object.values(results)
    }

    let query = useQuery()
    let term = query.get('name')

    useEffect(() => {
        dispatch(searchWorkouts(term))
        dispatch(getWorkouts(user.id))
        dispatch(getCreatedWorkouts(user.id))
    }, [dispatch, term, user.id])

    const removeBookmarkRequest = (id) => {
        dispatch(unbookmarkWorkout(id))
    }

    const addBookmarkRequest = (id) => {
        dispatch(bookmarkWorkout(id))
    }

    return (
        resultsArr && (
            <div className='text-gray-300 w-screen flex flex-col items-center'>
                <div className='flex justify-start items-center w-3/5 mb-4 mt-10'>
                    <h1 className='text-5xl font-bold'>Search Results ({`${resultsArr.length}`})</h1>
                </div>
                {savedWorkoutsArr && createdWorkoutsArr && resultsArr.map(result =>
                    <div key={result.id} className='m-0 w-3/5 p-4 my-3 flex flex-col items-center justify-center font-sans bg-white  bg-opacity-5 rounded-xl shadow-md border-2' style={{ borderColor: '#373737' }}>
                        <div className='flex w-full justify-between items-center'>
                            <h2 className='self-start text-gray-300 text-2xl font-bold m-4 main-pink'>{result.workout_name}</h2>
                            <div className='flex '>
                                {JSON.stringify(savedWorkoutsArr).includes(JSON.stringify(result)) ? (
                                    <button
                                        className='main-yellow'
                                        type='button'
                                        onClick={() => removeBookmarkRequest(result.id)}
                                    >
                                        <Bookmark />
                                    </button>
                                ) : (
                                    <button
                                        className='main-yellow'
                                        type='button'
                                        onClick={() => addBookmarkRequest(result.id)}
                                    >
                                        <BookmarkBorder />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-4 container'>
                            <div className='flex justify-start items-center'>
                            </div>
                            <div className='flex justify-center items-center'>
                                <h2 className='font-bold'>Sets</h2>
                            </div>
                            <div className='flex justify-center items-center'>
                                <h2 className='font-bold'>Repetitions</h2>
                            </div>
                            {result.exercises && result.exercises.map((exercise, idx) =>
                                <React.Fragment key={`${exercise.id}-${idx}`}>
                                    <div className='flex container justify-start items-center'>
                                        <h2 className='font-bold p-4'>{`${exercise.exercise_name} :`}</h2>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <h2 className='font-bold'>{exercise.sets}</h2>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <h2 className='font-bold'>{exercise.repetitions}</h2>
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                        <div className='flex w-full justify-end items-center mt-4'>
                            <div className='text-xs'>
                                {user.id === result.created_by ? (
                                    <h2>Your workout</h2>
                                ) : (
                                    <h2>Created by {`${result.creator_username}`}</h2>
                                )
                                }
                            </div>
                        </div>
                    </div >
                )}
            </div >
        )
    )
}

export default SearchPage
