const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setCurrentUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeCurrentSession = () => {
    return {
        type: REMOVE_USER,
    };
};

export const addUser = (user) => async (dispatch) => {
    dispatch(setCurrentUser(user));
    return user;
};

export const logoutUser = () => async (dispatch) => {
    dispatch(removeCurrentSession());
    return "Logged out";
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = { ...state };
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = { ...state };
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer
