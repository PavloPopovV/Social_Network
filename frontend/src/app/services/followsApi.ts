import { Follows } from "../types";
import { api } from "./api";

export const followsApi = api.injectEndpoints({
    endpoints: (builder) => ({

        followUser: builder.mutation<void, string>({
            query: (followingId) => ({
                url: `/users/${followingId}`,
                method: "POST",
            }),
        }),

        unfollowUser: builder.mutation<void, string>({
            query: (followingId) => ({
                url: `/users/${followingId}`,
                method: "DELETE",
            }),
        }),
        
        getUsersFollows: builder.query<Follows[], { userId: string, type?: 'followers' | 'following' }>({
            query: ({ type, userId }) => ({
                url: `/users/follows/${userId}`,
                method: "GET",
                params: { type },
            }),
        }),
    })
})

export const { useFollowUserMutation, useUnfollowUserMutation, useGetUsersFollowsQuery, useLazyGetUsersFollowsQuery } = followsApi
export const { endpoints: { followUser, unfollowUser, getUsersFollows } } = followsApi