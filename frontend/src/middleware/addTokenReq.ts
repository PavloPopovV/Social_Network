import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../app/services/authApi";

export const listenerMiddleware = createListenerMiddleware();
//додає токен в кожен запит

listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled || authApi.endpoints.registration.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        if (action.payload.token) localStorage.setItem('token', action.payload.token)
    }
})