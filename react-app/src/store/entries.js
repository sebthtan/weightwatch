const GET_ENTRIES = 'entries/GET_ENTRIES'

const getEntries = (entries) => ({
    type: GET_ENTRIES,
    payload: entries
})

export const getUserEntries = () => async dispatch => {
    const res = await fetch(`/api/users/entries`)
    const entries = await res.json()
    dispatch(getEntries(entries))
    return entries
}

const initialState = []

const entriesReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_ENTRIES:
            newState = [...state, ...action.payload]
            return newState
        default:
            return state
    }
}

export default entriesReducer
