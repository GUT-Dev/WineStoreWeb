import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const defaultState = {
    authorised: false,
    jwtToken: null,
    user: {
        id: null,
        firstName: null,
        lastName: null,
    },
    searchByName: null,
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOGIN" :
            return {...state, jwtToken: action.payload}
        case "LOGOUT" :
            return {...state, jwtToken: action.payload}
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

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

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
