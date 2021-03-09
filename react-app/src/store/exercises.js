const GET_EXERCISES = 'exercises/GET_EXERCISES'

const setAll = (exercises) => ({
    type: GET_EXERCISES,
    payload: exercises
})

export const getAllExercises = () => async dispatch => {
    const res = await fetch('/api/exercises/')
    const exercises = await res.json()
    dispatch(setAll(exercises))
    return exercises
}

const initialState = {}

const exercisesReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_EXERCISES:
            let exercises = {}
            action.payload.forEach(exercise => {
                exercises[exercise.id] = exercise
            })
            newState = { ...state, ...exercises }
            return newState
        default:
            return state
    }
}

export default exercisesReducer
