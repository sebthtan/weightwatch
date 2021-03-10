const GET_WORKOUTS = 'workouts/GET_WORKOUTS'
const GET_CREATED = 'workouts/GET_CREATED'
const CREATE_WORKOUT = 'workouts/CREATE_WORKOUT'
const UPDATE_WORKOUT = 'workouts/UPDATE_WORKOUT'
const REMOVE_WORKOUT = 'workouts/REMOVE_WORKOUT'
const REMOVE_BOOKMARK = 'workouts/REMOVE_BOOKMARK'
const ADD_BOOKMARK = 'workouts/ADD_BOOKMARK'
const LOGOUT = 'workouts/LOGOUT'

export const logoutWorkouts = () => ({
    type: LOGOUT,
})

const getBookmarkedWorkouts = (workouts) => ({
    type: GET_WORKOUTS,
    payload: workouts
})

const getCWorkouts = (workouts) => ({
    type: GET_CREATED,
    payload: workouts
})

const addNewWorkout = (workout) => ({
    type: CREATE_WORKOUT,
    payload: workout
})

const updateOneWorkout = (workout) => ({
    type: UPDATE_WORKOUT,
    payload: workout
})

const removeWorkout = (workoutId) => ({
    type: REMOVE_WORKOUT,
    payload: workoutId
})

const removeBookmark = (workoutId) => ({
    type: REMOVE_BOOKMARK,
    payload: workoutId
})

const addBookmark = (workout) => ({
    type: ADD_BOOKMARK,
    payload: workout
})

export const getWorkouts = (userId) => async dispatch => {
    const res = await fetch(`/api/users/${userId}/workouts`)
    const workouts = await res.json()
    dispatch(getBookmarkedWorkouts(workouts))
    return workouts
}


export const getCreatedWorkouts = (userId) => async dispatch => {
    const res = await fetch(`/api/users/${userId}/workouts/created`)
    const workouts = await res.json()
    dispatch(getCWorkouts(workouts))
    return workouts
}

export const createWorkout = (workout) => async dispatch => {
    const { newWorkoutName, fields } = workout
    const formData = new FormData()
    formData.append('workout_name', newWorkoutName)
    formData.append('exercises', JSON.stringify(fields))
    try {
        const res = await fetch('/api/workouts/', {
            method: 'POST',
            body: formData
        })
        if (!res.ok) throw res
        const newWorkout = await res.json()
        console.log('NEW WORKOUT', newWorkout)
        dispatch(addNewWorkout(newWorkout))
        return newWorkout
    } catch (err) {
        return err
    }
}


export const updateWorkout = (workout) => async dispatch => {
    const { workoutId, exerciseId, sets, repetitions } = workout
    const formData = new FormData()
    formData.append('workout_id', workoutId)
    formData.append('exercise_id', exerciseId)
    formData.append('sets', sets)
    formData.append('repetitions', repetitions)
    try {
        const res = await fetch(`/api/workouts/${workoutId}`, {
            method: 'PUT',
            body: formData
        })
        if (!res.ok) throw res
        const workout = await res.json()
        dispatch(updateOneWorkout(workout))
        return workout
    } catch (e) {
        return e
    }
}

export const deleteWorkout = (workoutId) => async dispatch => {
    await fetch(`/api/workouts/${workoutId}`, {
        method: 'DELETE',
    })
    dispatch(removeWorkout(workoutId))
}

export const unbookmarkWorkout = (workoutId) => async dispatch => {
    await fetch(`/api/users/workouts/${workoutId}/bookmark`, {
        method: 'DELETE',
    })
    dispatch(removeBookmark(workoutId))
}

export const bookmarkWorkout = (workoutId) => async dispatch => {
    const res = await fetch(`/api/users/workouts/${workoutId}/bookmark`, {
        method: 'POST',
    })
    const workout = await res.json()
    dispatch(addBookmark(workout))
    return workout
}

const initialState = {
    saved: {},
    owned: {},
}

const workoutsReducer = (state = initialState, action) => {
    let newState
    let newOwned = {}
    let newSaved = {}
    switch (action.type) {
        case GET_WORKOUTS:
            action.payload.forEach(workout => {
                newSaved[workout.id] = workout
            })
            newState = {
                ...state,
                saved: {
                    ...state.saved,
                    ...newSaved,
                }
            }
            return newState
        case GET_CREATED:
            action.payload.forEach(workout => {
                newOwned[workout.id] = workout
            })
            newState = {
                ...state,
                owned: {
                    ...state.owned,
                    ...newOwned
                }
            }
            return newState
        case CREATE_WORKOUT:
            newState = {
                ...state,
                owned: {
                    ...state.owned,
                    [action.payload.id]: action.payload
                }
            }
            return newState
        case UPDATE_WORKOUT:
            newState = {
                ...state,
                owned: {
                    ...state.owned,
                    [action.payload.id]: action.payload
                }
            }
            return newState
        case REMOVE_WORKOUT:
            newState = { ...state }
            delete newState.owned[action.payload]
            delete newState.saved[action.payload]
            return newState
        case REMOVE_BOOKMARK:
            newState = { ...state }
            delete newState.saved[action.payload]
            return newState
        case ADD_BOOKMARK:
            newSaved[action.payload.id] = action.payload
            newState = {
                ...state,
                saved: {
                    ...state.saved,
                    ...newSaved
                }
            }
            return newState
        case LOGOUT:
            return {}
        default:
            return state
    }
}

export default workoutsReducer
