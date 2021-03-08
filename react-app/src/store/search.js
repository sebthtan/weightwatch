const SET_RESULTS = 'search/SET_RESULTS'

const setSearchResults = (results) => ({
    type: SET_RESULTS,
    payload: results
})

export const searchWorkouts = (term) => async dispatch => {
    const res = await fetch(`/api/workouts/search/${term}`)
    console.log(term)
    const workouts = await res.json()
    dispatch(setSearchResults(workouts))
    console.log(workouts)
    return workouts
}


const initialState = {
    results: {}
};

const searchReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_RESULTS:
            let results = {}
            action.payload.forEach(result =>
                results[result.id] = result
            )
            newState = { ...state, results }
            return newState
        default:
            return state;
    }
};

export default searchReducer
