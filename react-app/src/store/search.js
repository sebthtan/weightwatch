const SET_RESULTS = 'search/SET_RESULTS'
const LOGOUT = 'search/LOGOUT'

export const logoutSearch = () => ({
    type: LOGOUT,
})

const setSearchResults = (results) => ({
    type: SET_RESULTS,
    payload: results
})

export const searchWorkouts = (term) => async dispatch => {
    const res = await fetch(`/api/workouts/search/${term}`)
    const workouts = await res.json()
    dispatch(setSearchResults(workouts))
    return workouts
}


const initialState = {
    results: {}
};

const searchReducer = (state = initialState, action) => {
    let newState;
    let results = {}
    switch (action.type) {
        case SET_RESULTS:
            action.payload.forEach(result =>
                results[result.id] = result
            )
            newState = { ...state, results }
            return newState
        case LOGOUT:
            return {}
        default:
            return state;
    }
};

export default searchReducer
