const GET_WORKOUTS = 'workouts/GET_WORKOUTS'
const GET_CREATED = 'workouts/GET_CREATED'
const CREATE_WORKOUT = 'workouts/CREATE_WORKOUT'
const UPDATE_WORKOUT = 'workouts/UPDATE_WORKOUT'
const REMOVE_WORKOUT = 'workouts/REMOVE_WORKOUT'
const REMOVE_BOOKMARK = 'workouts/REMOVE_BOOKMARK'

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
    formData.append('exercises', fields)
    try {

        const res = await fetch('/api/workouts', {
            method: 'POST',
            body: formData
        })
        if (!res.ok) throw res
        const newWorkout = await res.json()
        dispatch(addNewWorkout('yes'))
        console.log(newWorkout)
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

const initialState = {
    saved: {},
    owned: {},
}

const workoutsReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_WORKOUTS:
            let saved = {}
            action.payload.forEach(workout => {
                saved[workout.id] = workout
            })
            newState = { ...state, saved }
            return newState
        case GET_CREATED:
            let owned = {}
            action.payload.forEach(workout => {
                owned[workout.id] = workout
            })
            newState = { ...state, owned }
            return newState
        case CREATE_WORKOUT:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState
        case UPDATE_WORKOUT:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState
        case REMOVE_WORKOUT:
            newState = { ...state }
            delete newState[action.payload]
            return newState
        case REMOVE_BOOKMARK:
            newState = { ...state }
            delete newState.saved[action.payload]
            return newState
        default:
            return state
    }
}

export default workoutsReducer
