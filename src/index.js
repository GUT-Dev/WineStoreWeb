import React from 'react';
import './index.css';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {createRoot} from "react-dom/client";

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

const store = createStore(reducer);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
        <React.StrictMode className="root">
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>);
