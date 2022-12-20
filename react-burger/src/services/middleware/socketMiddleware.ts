import type { Middleware, MiddlewareAPI } from "redux";

import type { AppDispatch, RootState } from "../../types/types";

export const socketMiddleware = (AppActions: any): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action: any) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const {
                wsClosed,
                wsError,
                wsGetMessage,
                wsSendMessage,
                wsStart,
                wsSuccess,
            } = AppActions;

            if (type === wsStart) {
                socket = new WebSocket(payload.wsUrl);
            }
            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = (event) => {
                    dispatch({ type: wsSuccess });
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = (event) => {
                    dispatch({ type: wsError });
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = (event) => {
                    const { data } = event;
                    dispatch({
                        type: wsGetMessage,
                        payload: JSON.parse(data),
                    });
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = (event) => {
                    dispatch({ type: wsClosed, payload: event });
                };

                if (type === "WS_SEND_MESSAGE") {
                    const message = payload;
                    // функция для отправки сообщения на сервер
                    socket.send(JSON.stringify(message));
                    dispatch({ type: wsSendMessage });
                }
            }

            next(action);
        };
    }) as Middleware;
};
