const GET_ENTRIES = 'entries/GET_ENTRIES'
const NEW_ENTRY = 'entries/NEW_ENTRY'
const DELETE_ENTRY = 'entries/DELETE_ENTRY'
const REMOVE_ENTRIES = 'entries/REMOVE_ENTRIES'

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
    formData.append('bench_press', benchPress)
    formData.append('squat', squat)
    formData.append('deadlift', deadlift)
    const res = await fetch('/api/entries/', {
        method: 'POST',
        body: formData
    })
    const data = await res.json()
    dispatch(newEntry(data))
    return data
}

export const deleteEntry = (entryId) => async dispatch => {
    const res = await fetch(`/api/entries/${entryId}`, {
        method: 'DELETE',
    })
    console.log('IN ACTION THUNK', entryId)
    dispatch(deleteOneEntry(entryId))
}

export const updateEntry = (entry) => async dispatch => {
    const { entryId, bodyWeight, benchPress, squat, deadlift } = entry
    const formData = new FormData()
    formData.append('body_weight', bodyWeight)
    formData.append('bench_press', benchPress)
    formData.append('squat', squat)
    formData.append('deadlift', deadlift)
    try {
        const res = await fetch(`/api/entries${entryId}`, {
            method: 'PUT',
            body: formData
        })
        const entry = res.json()
        dispatch(newEntry(entry))
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
            newState = { ...state, ['created']: action.payload }
            return newState
        case DELETE_ENTRY:
            newState = { ...state }
            delete newState[action.payload]
            // let found = newState.find(async entry => {
            //     await entry.id === action.payload
            // })
            // delete newState[newState.indexOf(found)]
            // newState.filter(entry => entry.id !== action.payload)
            return newState
        case REMOVE_ENTRIES:
            newState = {}
            return newState
        default:
            return state
    }
}

export default entriesReducer
