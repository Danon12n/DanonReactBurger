import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers";
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
})

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
