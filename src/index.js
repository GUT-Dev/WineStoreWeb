import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

const defaultState = {
    authorised: false,
    jwtToken: null,
    user: {
        id: null,
        firstName: null,
        lastName: null,
        roles: []
    },
    searchByName: null,
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOGIN" :
            state = defaultState
            return {...state, jwtToken: action.payload}
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

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode className="root">
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
