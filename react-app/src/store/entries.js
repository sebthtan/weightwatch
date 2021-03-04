const GET_ENTRIES = 'entries/GET_ENTRIES'
const NEW_ENTRY = 'entries/NEW_ENTRY'

const getEntries = (entries) => ({
    type: GET_ENTRIES,
    payload: entries
})

const newEntry = (entry) => ({
    type: NEW_ENTRY,
    payload: entry
})

export const getUserEntries = () => async dispatch => {
    const res = await fetch(`/api/users/entries`)
    const entries = await res.json()
    dispatch(getEntries(entries))
    return entries
}

export const createEntry = (entry) => async dispatch => {
    const { bodyWeight, benchPress, squat, deadlift } = entry
    const formData = new FormData()
    formData.append('body_weight', bodyWeight)
    if (benchPress) {
        formData.append('bench_press', benchPress)
    }
    if (squat) {
        formData.append('squat', squat)
    }
    if (deadlift) {
        formData.append('deadlift', deadlift)
    }
    const res = await fetch('/api/entries/new', {
        method: 'POST',
        body: formData
    })
    const data = await res.json()
    dispatch(newEntry(data))
    return data
}

const initialState = []

const entriesReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_ENTRIES:
            newState = [...state, ...action.payload]
            return newState
        case NEW_ENTRY:
            newState = [...state, action.payload]
            return newState
        default:
            return state
    }
}

export default entriesReducer
