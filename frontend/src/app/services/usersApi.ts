import { User } from '../types'
import { api } from './api'

type UserSearchParams = Pick<User, 'firstName' | 'lastName'>;
export type ProfileEdit = Pick<
  User,
  "email" | "firstName" | "lastName" | "bio" | "location"
>

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({

        current: builder.query<User, void>({
            query: () => ({
                url: "/users/current",
                method: "GET",
            }),
        }),

        getUsers: builder.query<User[], Partial<UserSearchParams>>({
            query: ({firstName}) => ({
                url: `/users?firstName=${firstName}`,
                method: "GET",
            }),
        }),

        getUserById: builder.query<User, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            }),
        }),

        editUser: builder.mutation<User, { userData: ProfileEdit, id: string }>({
            query: ({ userData, id }) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: userData
            }),
        }),
    })
})

export const { useCurrentQuery, useGetUsersQuery, useLazyCurrentQuery, useGetUserByIdQuery, useLazyGetUserByIdQuery, useEditUserMutation, useLazyGetUsersQuery} = usersApi;
export const { endpoints: { current, getUsers, getUserById, editUser } } = usersApi;