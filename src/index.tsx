// @ts-ignore
import React from 'react';
import './index.css';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createRoot} from "react-dom/client";
import store from "./redux/store";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as Element);

root.render(
    <Provider store={store}>
        {/*className="root"*/}
        <React.StrictMode >
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>);
