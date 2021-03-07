const GET_WORKOUTS = 'workouts/GET_WORKOUTS'

const getUserWorkouts = (workouts) => ({
    type: GET_WORKOUTS,
    payload: workouts
})




export const getWorkouts = (userId) => async dispatch => {
    const res = await fetch(`/api/users/${userId}/workouts`)
    const workouts = await res.json()
    dispatch(getUserWorkouts(workouts))
    return workouts
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
        default:
            return state
    }
}

export default workoutsReducer
