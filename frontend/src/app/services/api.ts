import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { BASE_URL } from "../../constantes/url";

const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    // додає токен в localStorage
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user?.token || localStorage.getItem('token');
        if (token && token !== null) headers.set('authorization', `Bearer ${token}`)
    }
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
})