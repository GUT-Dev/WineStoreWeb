import {combineReducers} from "redux";

const defaultState = {
    authorised: false,
    jwtToken: null,
    user: {
        id: null,
        firstName: null,
        lastName: null,
        roles: [],
    },
    searchByName: null,
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOGIN" :
            state = defaultState
            return {...state, jwtToken: action.payload, authorised: true}
        case "LOGOUT" :
            return state = defaultState
        case "SET_USER" :
            return {...state, user: action.payload}
        case "ADD_SEARCH_PARAM" :
            return {...state, searchByName: action.payload}
        case "REMOVE_SEARCH_PARAM" :
            return {...state, searchByName: null}
        default:
            return state
    }
}

export const rootReducers = combineReducers({ list: reducer });
export default reducer;