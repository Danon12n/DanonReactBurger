import type { Middleware, MiddlewareAPI } from "redux";

// import type { AppActions, AppDispatch, RootState } from "../../types/types";
import type { AppDispatch, RootState } from "../../types/types";
import { boundWS } from "../actions/web-socket";

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action: any) => {
            // return (next) => (action:<AppActions>) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;

            if (type === "WS_CONNECTION_START") {
                // объект класса WebSocket
                socket = new WebSocket(wsUrl);
            }
            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = (event) => {
                    // boundWS.wsSuccess(event)
                    dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = (event) => {
                    // dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = (event) => {
                    const { data } = event;
                    dispatch({ type: "WS_GET_MESSAGE", payload: data });
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = (event) => {
                    dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
                };

                if (type === "WS_SEND_MESSAGE") {
                    const message = payload;
                    // функция для отправки сообщения на сервер
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};
