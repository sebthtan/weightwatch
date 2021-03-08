const GET_ENTRIES = 'entries/GET_ENTRIES'
const NEW_ENTRY = 'entries/NEW_ENTRY'
const DELETE_ENTRY = 'entries/DELETE_ENTRY'
const REMOVE_ENTRIES = 'entries/REMOVE_ENTRIES'
const UPDATE_ENTRIES = 'entries/UPDATE_ENTRIES'

const getEntries = (entries) => ({
    type: GET_ENTRIES,
    payload: entries
})

const newEntry = (entry) => ({
    type: NEW_ENTRY,
    payload: entry
})

const deleteOneEntry = (entryId) => ({
    type: DELETE_ENTRY,
    payload: entryId
})

const removeUserEntries = () => ({
    type: REMOVE_ENTRIES,
})

const updatedEntry = (entry) => ({
    type: UPDATE_ENTRIES,
    payload: entry
})

export const getUserEntries = () => async dispatch => {
    const res = await fetch(`/api/users/entries`)
    const entries = await res.json()
    dispatch(getEntries(entries))
    return entries
}

export const createEntry = (entry) => async dispatch => {
    const { bodyWeight, benchPress, squat, deadlift, createdAt } = entry
    const formData = new FormData()
    formData.append('body_weight', bodyWeight)
    formData.append('bench_press', benchPress)
    formData.append('squat', squat)
    formData.append('deadlift', deadlift)
    formData.append('created_at', createdAt)
    const res = await fetch('/api/entries/', {
        method: 'POST',
        body: formData
    })
    const data = await res.json()
    dispatch(newEntry(data))
    return data
}

export const deleteEntry = (entryId) => async dispatch => {
    await fetch(`/api/entries/${entryId}`, {
        method: 'DELETE',
    })
    dispatch(deleteOneEntry(entryId))
}

export const updateEntry = (entry) => async dispatch => {
    const { entryId, entryBodyWeight, entryBenchPress, entrySquat, entryDeadlift, entryCreatedAt } = entry
    const formData = new FormData()
    formData.append('body_weight', entryBodyWeight)
    formData.append('bench_press', entryBenchPress)
    formData.append('squat', entrySquat)
    formData.append('deadlift', entryDeadlift)
    formData.append('created_at', entryCreatedAt)
    try {
        const res = await fetch(`/api/entries/${entryId}`, {
            method: 'PUT',
            body: formData
        })
        const entry = await res.json()
        dispatch(updatedEntry(entry))
        return entry
    } catch (err) {
        return err
    }
}

export const logoutEntries = () => async dispatch => {
    dispatch(removeUserEntries())
}

const initialState = {}

const entriesReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_ENTRIES:
            let entries = {}
            action.payload.forEach(entry => {
                entries[entry.id] = entry
            })
            newState = { ...state, ...entries }
            return newState
        case NEW_ENTRY:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState
        case DELETE_ENTRY:
            newState = { ...state }
            delete newState[action.payload]
            return newState
        case REMOVE_ENTRIES:
            newState = {}
            return newState
        case UPDATE_ENTRIES:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState
        default:
            return state
    }
}

export default entriesReducer
