import { rootReducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, socketMiddleware("asd")],
});