const GET_WORKOUTS = 'workouts/GET_WORKOUTS'
const CREATE_WORKOUT = 'workouts/CREATE_WORKOUT'
const UPDATE_WORKOUT = 'workouts/UPDATE_WORKOUT'
const REMOVE_WORKOUT = 'workouts/REMOVE_WORKOUT'

const getUserWorkouts = (workouts) => ({
    type: GET_WORKOUTS,
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

export const getWorkouts = (userId) => async dispatch => {
    const res = await fetch(`/api/users/${userId}/workouts`)
    const workouts = await res.json()
    dispatch(getUserWorkouts(workouts))
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

const initialState = {}

const workoutsReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_WORKOUTS:
            let workouts = {}
            action.payload.forEach(workout => {
                workouts[workout.id] = workout
            })
            newState = { ...state, ...workouts }
            return newState
        case CREATE_WORKOUT:
            newState = { ...state, 'created': action.payload }
            return newState
        case UPDATE_WORKOUT:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState
        case REMOVE_WORKOUT:
            newState = { ...state }
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}

export default workoutsReducer
