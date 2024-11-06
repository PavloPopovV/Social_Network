import { User } from '../types'
import { api } from './api'

export type UserLogin = Pick<User, "email" | "password">;
export type UserRegistration = Pick<User, "email" | "password" | "firstName" | "lastName">;

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation<{ token: string }, UserLogin>({
            query: (userData) => ({
                url: '/auth/login',
                method: "POST",
                body: userData,
            })
        }),
        
        registration: builder.mutation<{ token: string }, UserRegistration>({
            query: (userData) => ({
                url: '/auth/register',
                method: "POST",
                body: userData,
            })
        })

    })
})

export const {useLoginMutation, useRegistrationMutation } = authApi;
export const { endpoints: {login, registration } } = authApi;